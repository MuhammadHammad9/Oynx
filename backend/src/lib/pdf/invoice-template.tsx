import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,

} from "@react-pdf/renderer";
import type { invoices, invoiceLineItems } from "../db/schema";

export type Invoice = typeof invoices.$inferSelect;
export type InvoiceLineItem = typeof invoiceLineItems.$inferSelect;

export interface InvoiceWithLineItems extends Invoice {
  lineItems: InvoiceLineItem[];
  organizationName: string;
}

// Design Tokens (Approved Brand Guidelines)
const COLORS = {
  bg: "#09090b", // zinc-950
  surface: "#18181b", // zinc-900
  accent: "#0bbdf4", // Onyx signature blue
  text: "#fafafa", // zinc-50
  textMuted: "#a1a1aa", // zinc-400
  border: "#27272a", // zinc-800
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 20,
    marginBottom: 30,
  },
  brand: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  brandAccent: {
    color: COLORS.accent,
  },
  meta: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 12,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
    color: COLORS.accent,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  detailsBlock: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  detailsText: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 4,
  },
  table: {
    width: "auto",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(39, 39, 42, 0.5)",
  },
  colDesc: {
    flex: 3,
    fontSize: 11,
  },
  colQty: {
    flex: 1,
    fontSize: 11,
    textAlign: "right",
  },
  colRate: {
    flex: 1.5,
    fontSize: 11,
    textAlign: "right",
  },
  colAmount: {
    flex: 1.5,
    fontSize: 11,
    textAlign: "right",
    color: COLORS.text,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalBlock: {
    width: 200,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  totalValue: {
    fontSize: 11,
    color: COLORS.text,
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 9,
    color: COLORS.textMuted,
  },
});

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount / 100);
}

export function InvoiceTemplate({ invoice }: { invoice: InvoiceWithLineItems }) {
  const issueDateStr = new Date(invoice.issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const dueDateStr = new Date(invoice.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>
            Onyx<Text style={styles.brandAccent}>.</Text>
          </Text>
          <View style={styles.meta}>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsBlock}>
            <Text style={styles.detailsTitle}>Billed To</Text>
            <Text style={styles.detailsText}>{invoice.organizationName}</Text>
          </View>
          <View style={styles.detailsBlock}>
            <Text style={styles.detailsTitle}>Invoice Details</Text>
            <Text style={styles.detailsText}>Issued: {issueDateStr}</Text>
            <Text style={styles.detailsText}>Due: {dueDateStr}</Text>
            <Text style={styles.detailsText}>Status: {invoice.status.toUpperCase()}</Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colDesc, { color: COLORS.textMuted }]}>Description</Text>
            <Text style={[styles.colQty, { color: COLORS.textMuted }]}>Qty</Text>
            <Text style={[styles.colRate, { color: COLORS.textMuted }]}>Rate</Text>
            <Text style={[styles.colAmount, { color: COLORS.textMuted }]}>Amount</Text>
          </View>

          {invoice.lineItems.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{Number(item.quantity).toFixed(0)}</Text>
              <Text style={styles.colRate}>{formatMoney(item.unitAmount, invoice.currency)}</Text>
              <Text style={styles.colAmount}>{formatMoney(item.amount, invoice.currency)}</Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Due</Text>
              <Text style={[styles.totalValue, styles.grandTotalValue]}>
                {formatMoney(invoice.amountTotal, invoice.currency)}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for partnering with Onyx. For billing inquiries, contact finance@onyx.engineering
          </Text>
        </View>
      </Page>
    </Document>
  );
}
