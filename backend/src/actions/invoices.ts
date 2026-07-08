"use server";

import { can } from "@/lib/auth/rbac";
import { db } from "@/lib/db/db";
import { invoices, files, auditLogs, organizationMembers, users, organizations } from "@/lib/db/schema";
import {
  getInvoiceById,
  getInvoicesByOrg,
} from "@/lib/db/queries/invoices";
import { getSignedDownloadUrl, uploadToStorage } from "@/lib/supabase/storage";
import { InvoiceListQuerySchema, InvoiceDownloadSchema } from "@/lib/validations/invoices";
import { renderToBuffer } from "@react-pdf/renderer";
import { InvoiceTemplate, InvoiceWithLineItems } from "@/lib/pdf/invoice-template";
import { invoiceRateLimiter, checkActionRateLimit } from "@/lib/rate-limit";
import { getAuthedAppUser } from "@/lib/supabase/server";
import { eq, and } from "drizzle-orm";

type ActionResponse<T = null> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };

/**
 * Lists all invoices for the organization.
 */
export async function listInvoices(
  rawInput: unknown
): Promise<ActionResponse<{ items: any[]; nextCursor: string | null }>> {
  const parsed = InvoiceListQuerySchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      data: null,
      error: { code: "VALIDATION_ERROR", message: parsed.error.errors[0].message },
    };
  }

  const user = await getAuthedAppUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  // Derive org ID if not provided, or verify membership
  let orgId = parsed.data.organizationId;
  if (!orgId) {
    const [member] = await db
      .select({ organizationId: organizationMembers.organizationId })
      .from(organizationMembers)
      .where(and(eq(organizationMembers.userId, user.id), eq(organizationMembers.status, "active")))
      .limit(1);
    if (!member) {
      return { data: null, error: { code: "FORBIDDEN", message: "No active organization membership found" } };
    }
    orgId = member.organizationId;
  }

  // Get user details for RBAC
  const [userRow] = await db
    .select({ userType: users.userType, internalRole: users.internalRole })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!userRow) {
    return { data: null, error: { code: "USER_NOT_FOUND", message: "User not found" } };
  }

  // RBAC check
  const allowed = await can(
    { id: user.id, userType: userRow.userType, internalRole: userRow.internalRole },
    "view_billing",
    { organizationId: orgId }
  );

  if (!allowed) {
    return { data: null, error: { code: "FORBIDDEN", message: "You don't have permission to view billing" } };
  }

  const result = await getInvoicesByOrg(orgId, parsed.data.cursor, parsed.data.status);
  return { data: result, error: null };
}

/**
 * Downloads or generates and uploads the invoice PDF, then returns a signed R2 download URL.
 */
export async function downloadInvoicePdf(
  rawInput: unknown
): Promise<ActionResponse<{ downloadUrl: string }>> {
  const parsed = InvoiceDownloadSchema.safeParse(rawInput);
  if (!parsed.success) {
    return {
      data: null,
      error: { code: "VALIDATION_ERROR", message: parsed.error.errors[0].message },
    };
  }

  const user = await getAuthedAppUser();
  if (!user) {
    return { data: null, error: { code: "UNAUTHENTICATED", message: "Not authenticated" } };
  }

  // Rate limit — PDF generation + R2 upload is expensive; cap at 5/min per user.
  const rateCheck = await checkActionRateLimit(invoiceRateLimiter, user.id);
  if (rateCheck.limited) {
    return {
      data: null,
      error: {
        code: "TOO_MANY_REQUESTS",
        message: `Invoice download limit reached. Please wait ${rateCheck.secondsLeft} seconds.`,
      },
    };
  }

  // Find invoice first to verify ownership/RBAC scope
  const [invoiceRecord] = await db
    .select({ organizationId: invoices.organizationId })
    .from(invoices)
    .where(eq(invoices.id, parsed.data.invoiceId))
    .limit(1);

  if (!invoiceRecord) {
    return { data: null, error: { code: "NOT_FOUND", message: "Invoice not found" } };
  }

  // Get user details for RBAC
  const [userRow] = await db
    .select({ userType: users.userType, internalRole: users.internalRole })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!userRow) {
    return { data: null, error: { code: "USER_NOT_FOUND", message: "User not found" } };
  }

  // RBAC check
  const allowed = await can(
    { id: user.id, userType: userRow.userType, internalRole: userRow.internalRole },
    "view_billing",
    { organizationId: invoiceRecord.organizationId }
  );

  if (!allowed) {
    return { data: null, error: { code: "FORBIDDEN", message: "You don't have permission to view billing" } };
  }

  // Fetch full invoice detail
  const invoice = await getInvoiceById(parsed.data.invoiceId, invoiceRecord.organizationId);
  if (!invoice) {
    return { data: null, error: { code: "NOT_FOUND", message: "Invoice not found" } };
  }

  let fileStorageKey = "";

  // If PDF already exists in files table, fetch its key
  if (invoice.pdfFileId) {
    const [fileRecord] = await db
      .select({ storageKey: files.storageKey })
      .from(files)
      .where(eq(files.id, invoice.pdfFileId))
      .limit(1);
    if (fileRecord) {
      fileStorageKey = fileRecord.storageKey;
    }
  }

  // Generate & upload to R2 if it does not exist
  if (!fileStorageKey) {
    // Get organization name for printing
    const [org] = await db
      .select({ name: organizations.name })
      .from(organizations)
      .where(eq(organizations.id, invoiceRecord.organizationId))
      .limit(1);
    const orgName = org?.name || "Unknown Org";

    const invoiceWithDetails: InvoiceWithLineItems = {
      ...invoice,
      organizationName: orgName,
    };

    // Render PDF to Buffer
    let pdfBuffer: Buffer;
    try {
      const element = InvoiceTemplate({ invoice: invoiceWithDetails });
      pdfBuffer = await renderToBuffer(element);
    } catch (renderErr) {
      console.error("PDF generation failed:", renderErr);
      return { data: null, error: { code: "PDF_GEN_FAILED", message: "Failed to render PDF document" } };
    }

    const storageKey = `invoices/${invoice.id}.pdf`;
    
    // Upload PDF to R2
    try {
      await uploadToStorage(storageKey, pdfBuffer, "application/pdf");
    } catch (uploadErr) {
      console.error("R2 Upload failed:", uploadErr);
      return { data: null, error: { code: "STORAGE_UPLOAD_FAILED", message: "Failed to store PDF on R2" } };
    }

    // Insert to files table and associate with invoice within transaction
    try {
      await db.transaction(async (tx) => {
        const [fileInserted] = await tx
          .insert(files)
          .values({
            organizationId: invoiceRecord.organizationId,
            context: "invoice_pdf",
            fileName: `Invoice-${invoice.invoiceNumber}.pdf`,
            storageKey,
            mimeType: "application/pdf",
            sizeBytes: BigInt(pdfBuffer.length),
          })
          .returning({ id: files.id });

        await tx
          .update(invoices)
          .set({ pdfFileId: fileInserted.id })
          .where(eq(invoices.id, invoice.id));

        // Audit Log entry (Rule §9: File downloads / Invoice generation)
        await tx.insert(auditLogs).values({
          organizationId: invoiceRecord.organizationId,
          actorId: user.id,
          action: "invoice.download",
          targetType: "invoice",
          targetId: invoice.id,
          metadata: JSON.stringify({
            invoiceNumber: invoice.invoiceNumber,
            fileId: fileInserted.id,
          }),
        });
      });
      fileStorageKey = storageKey;
    } catch (dbErr) {
      console.error("DB transaction failed:", dbErr);
      return { data: null, error: { code: "DB_TRANSACTION_FAILED", message: "Failed to save file reference in database" } };
    }
  } else {
    // Log audit trail for subsequent downloads
    await db.insert(auditLogs).values({
      organizationId: invoiceRecord.organizationId,
      actorId: user.id,
      action: "invoice.download",
      targetType: "invoice",
      targetId: invoice.id,
      metadata: JSON.stringify({
        invoiceNumber: invoice.invoiceNumber,
        cached: true,
      }),
    });
  }

  // Generate short-lived pre-signed URL (60s as requested in Verification Plan)
  const downloadUrl = await getSignedDownloadUrl(fileStorageKey);
  return { data: { downloadUrl }, error: null };
}
