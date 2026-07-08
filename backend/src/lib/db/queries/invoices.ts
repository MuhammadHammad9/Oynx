import { db } from "../db";
import { invoices, invoiceLineItems } from "../schema";
import { and, eq, gt, isNull } from "drizzle-orm";

export async function getInvoicesByOrg(
  organizationId: string,
  cursor?: string,
  statusFilter?: "draft" | "sent" | "due" | "paid" | "overdue" | "void",
  limit = 20
) {
  const conditions = [
    eq(invoices.organizationId, organizationId),
    isNull(invoices.deletedAt),
  ];

  if (statusFilter) {
    conditions.push(eq(invoices.status, statusFilter));
  }

  if (cursor) {
    conditions.push(gt(invoices.id, cursor));
  }

  // Fetch limit + 1 items to see if there is a next page
  const results = await db
    .select()
    .from(invoices)
    .where(and(...conditions))
    .orderBy(invoices.id)
    .limit(limit + 1);

  const hasNextPage = results.length > limit;
  const items = hasNextPage ? results.slice(0, limit) : results;
  const nextCursor = hasNextPage ? items[items.length - 1].id : null;

  return {
    items,
    nextCursor,
  };
}

export async function getInvoiceById(id: string, organizationId: string) {
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.id, id),
        eq(invoices.organizationId, organizationId),
        isNull(invoices.deletedAt)
      )
    )
    .limit(1);

  if (!invoice) return null;

  const lineItems = await db
    .select()
    .from(invoiceLineItems)
    .where(eq(invoiceLineItems.invoiceId, id));

  return {
    ...invoice,
    lineItems,
  };
}

export async function attachPdfToInvoice(invoiceId: string, fileId: string) {
  await db
    .update(invoices)
    .set({ pdfFileId: fileId })
    .where(eq(invoices.id, invoiceId));
}
