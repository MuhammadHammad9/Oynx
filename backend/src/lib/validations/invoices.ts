import { z } from "zod";

export const InvoiceListQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  status: z.enum(["draft", "sent", "due", "paid", "overdue", "void"]).optional(),
  organizationId: z.string().uuid().optional(),
});

export type InvoiceListQueryInput = z.infer<typeof InvoiceListQuerySchema>;

export const InvoiceDownloadSchema = z.object({
  invoiceId: z.string().uuid("Invalid invoice ID"),
});

export type InvoiceDownloadInput = z.infer<typeof InvoiceDownloadSchema>;
