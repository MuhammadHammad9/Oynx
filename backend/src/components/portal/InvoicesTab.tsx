"use client";

import React, { useState, useTransition } from "react";
import { Download, WarningTriangle, Clock, CheckCircle, Page } from "iconoir-react";
import { downloadInvoicePdf } from "@/actions/invoices";

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: "draft" | "sent" | "due" | "paid" | "overdue" | "void";
  currency: string;
  amountTotal: number;
  issueDate: string | Date;
  dueDate: string | Date;
  pdfFileId?: string | null;
}

interface InvoicesTabProps {
  initialInvoices: Invoice[];
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount / 100);
}

function getStatusBadge(status: Invoice["status"]) {
  switch (status) {
    case "paid":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
          <CheckCircle className="w-3.5 h-3.5" />
          Paid
        </span>
      );
    case "due":
    case "sent":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0BBDF4]/10 text-[#0BBDF4] border border-[#0BBDF4]/20 animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          Outstanding
        </span>
      );
    case "overdue":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
          <WarningTriangle className="w-3.5 h-3.5" />
          Overdue
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 text-white/40 border border-white/10">
          {status}
        </span>
      );
  }
}

export function InvoicesTab({ initialInvoices }: InvoicesTabProps) {
  const [invoicesList] = useState<Invoice[]>(initialInvoices);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleDownload = (invoiceId: string) => {
    setDownloadingId(invoiceId);
    setError(null);

    startTransition(async () => {
      const result = await downloadInvoicePdf({ invoiceId });

      if (result.error) {
        setError(result.error.message);
        setDownloadingId(null);
        return;
      }

      if (result.data?.downloadUrl) {
        window.open(result.data.downloadUrl, "_blank");
      }
      setDownloadingId(null);
    });
  };

  if (invoicesList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center rounded-xl border border-white/[0.06] bg-neutral-950/50">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
          <Page className="w-7 h-7 text-white/20" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/60 mb-1">No invoices found</h3>
          <p className="text-xs text-white/30 max-w-64 mx-auto">
            Your billing history is empty. Contact your account lead if you expect invoices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="px-5 py-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-xl">
          Error: {error} — please try again later.
        </div>
      )}

      <div className="rounded-xl border border-white/[0.06] bg-neutral-950/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-xs font-semibold text-white/40 uppercase tracking-wider">
                <th className="px-6 py-4">Invoice Number</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Issue Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {invoicesList.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-white/[0.02] text-sm transition-colors text-white/80"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    {new Date(invoice.issueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-white/60">
                    {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-white">
                    {formatMoney(invoice.amountTotal, invoice.currency)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={downloadingId !== null}
                      onClick={() => handleDownload(invoice.id)}
                      aria-label={`Download Invoice ${invoice.invoiceNumber}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-white/[0.08] hover:border-[#0BBDF4] hover:bg-[#0BBDF4]/10 hover:text-[#0BBDF4] disabled:opacity-30 disabled:cursor-not-allowed bg-white/[0.02] text-white/70"
                    >
                      {downloadingId === invoice.id ? (
                        <span className="flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded-full border border-current border-t-transparent animate-spin inline-block" />
                          Preparing...
                        </span>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Download PDF
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
