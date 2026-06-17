import "server-only";
import { NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getInvoiceDetail } from "@/features/billing/repository";
import { siteConfig } from "@/config/site";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 36, backgroundColor: "#FFFFFF", color: "#1A1A2E" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 16, borderBottom: "1.5pt solid #1565C0" },
  logo: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#1565C0" },
  tagline: { fontSize: 7, color: "#8896AA", marginTop: 2 },
  docTitle: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#0D1B2A", textAlign: "right" },
  docNum: { fontSize: 9, color: "#8896AA", textAlign: "right", marginTop: 3 },
  section: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  box: { width: "47%" },
  boxLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#1565C0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 },
  boxText: { fontSize: 8.5, color: "#1A1A2E", lineHeight: 1.5 },
  boxSub: { fontSize: 8, color: "#8896AA", lineHeight: 1.5 },
  tableHeader: { flexDirection: "row", backgroundColor: "#0D1B2A", padding: "6 8", borderRadius: 3, marginBottom: 1 },
  tableRow: { flexDirection: "row", padding: "5 8", borderBottom: "0.5pt solid #F0F4FF" },
  tableRowAlt: { flexDirection: "row", padding: "5 8", backgroundColor: "#F8FAFF", borderBottom: "0.5pt solid #F0F4FF" },
  thText: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#FFFFFF" },
  tdText: { fontSize: 8.5, color: "#1A1A2E" },
  colDesc: { flex: 3 },
  colNum: { flex: 1, textAlign: "right" },
  totals: { marginTop: 12, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 3, width: 200 },
  totalLabel: { fontSize: 8.5, color: "#8896AA", width: 110 },
  totalValue: { fontSize: 8.5, color: "#1A1A2E", textAlign: "right", width: 90 },
  grandRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6, paddingTop: 6, borderTop: "1.5pt solid #0D1B2A", width: 200 },
  grandLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#0D1B2A", width: 110 },
  grandValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#0D1B2A", textAlign: "right", width: 90 },
  dueBox: { backgroundColor: "#FFF8E7", padding: "10 14", borderRadius: 4, marginTop: 12, borderLeft: "3pt solid #F5A623" },
  dueLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#92600A", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 },
  dueAmount: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#0D1B2A" },
  bankBox: { marginTop: 16, padding: "10 12", backgroundColor: "#F0F6FF", borderRadius: 4, borderLeft: "3pt solid #1565C0" },
  bankLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#1565C0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 },
  bankRow: { flexDirection: "row", marginBottom: 3 },
  bankKey: { fontSize: 8, color: "#8896AA", width: 80 },
  bankVal: { fontSize: 8, color: "#1A1A2E", fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 24, left: 36, right: 36, borderTop: "0.5pt solid #E0E0E0", paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7, color: "#8896AA" },
});

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let invoice;
  try {
    invoice = await getInvoiceDetail(id);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const clientName = invoice.customer?.legalName ?? invoice.lead?.name ?? "Client";
  const clientContact = invoice.customer?.primaryContactName ?? "";
  const clientEmail = invoice.customer?.email ?? invoice.lead?.email ?? "";
  const clientPhone = invoice.customer?.phone ?? invoice.lead?.phone ?? "";
  const clientAddress = invoice.customer?.billingAddress ?? "";
  const clientGstin = invoice.customer?.gstin ?? "";

  const subtotal = Number(invoice.subtotalAmount ?? 0);
  const tax = Number(invoice.taxAmount ?? 0);
  const total = Number(invoice.totalAmount ?? 0);
  const discount = Number(invoice.discountAmount ?? 0);
  const balance = Number(invoice.balanceAmount ?? total);
  const paid = total - balance;

  const createdAt = new Date(invoice.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const dueDate = invoice.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const pdf = await renderToBuffer(
    <Document title={`${invoice.invoiceNumber} — Eros Enterprises`} author="Eros Enterprises">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Eros Enterprises</Text>
            <Text style={styles.tagline}>Lighting with Purpose · Mumbai, Maharashtra</Text>
            <Text style={[styles.boxSub, { marginTop: 4 }]}>{siteConfig.phone} · {siteConfig.email}</Text>
          </View>
          <View>
            <Text style={styles.docTitle}>INVOICE</Text>
            <Text style={styles.docNum}>{invoice.invoiceNumber}</Text>
          </View>
        </View>

        {/* Parties */}
        <View style={styles.section}>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Billed To</Text>
            <Text style={[styles.boxText, { fontFamily: "Helvetica-Bold" }]}>{clientName}</Text>
            {clientContact ? <Text style={styles.boxText}>{clientContact}</Text> : null}
            {clientAddress ? <Text style={styles.boxSub}>{clientAddress}</Text> : null}
            {clientGstin ? <Text style={styles.boxSub}>GSTIN: {clientGstin}</Text> : null}
            {clientEmail ? <Text style={styles.boxSub}>{clientEmail}</Text> : null}
            {clientPhone ? <Text style={styles.boxSub}>{clientPhone}</Text> : null}
          </View>
          <View style={styles.box}>
            <Text style={styles.boxLabel}>Invoice Details</Text>
            <Text style={styles.boxSub}>Invoice Date: <Text style={styles.boxText}>{createdAt}</Text></Text>
            {dueDate ? <Text style={styles.boxSub}>Due Date: <Text style={[styles.boxText, { color: "#F5A623" }]}>{dueDate}</Text></Text> : null}
            {invoice.quotation?.quotationNumber ? <Text style={styles.boxSub}>Quote Ref: <Text style={styles.boxText}>{invoice.quotation.quotationNumber}</Text></Text> : null}
            {invoice.lead?.leadNumber ? <Text style={styles.boxSub}>Lead Ref: <Text style={styles.boxText}>{invoice.lead.leadNumber}</Text></Text> : null}
          </View>
        </View>

        {/* Line items */}
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.colDesc]}>Description</Text>
          <Text style={[styles.thText, styles.colNum]}>Qty</Text>
          <Text style={[styles.thText, styles.colNum]}>Rate (₹)</Text>
          <Text style={[styles.thText, styles.colNum]}>Tax %</Text>
          <Text style={[styles.thText, styles.colNum]}>Amount (₹)</Text>
        </View>
        {(invoice.items ?? []).map((item, i) => (
          <View key={item.id} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
            <View style={styles.colDesc}>
              <Text style={styles.tdText}>{item.name}</Text>
              {item.description ? <Text style={[styles.boxSub, { fontSize: 7.5 }]}>{item.description}</Text> : null}
            </View>
            <Text style={[styles.tdText, styles.colNum]}>{Number(item.quantity)}</Text>
            <Text style={[styles.tdText, styles.colNum]}>{Number(item.unitPrice).toFixed(2)}</Text>
            <Text style={[styles.tdText, styles.colNum]}>{Number(item.taxRate)}%</Text>
            <Text style={[styles.tdText, styles.colNum]}>{Number(item.lineTotal).toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Subtotal</Text><Text style={styles.totalValue}>{fmt(subtotal)}</Text></View>
          {discount > 0 && <View style={styles.totalRow}><Text style={styles.totalLabel}>Discount</Text><Text style={[styles.totalValue, { color: "#25D366" }]}>-{fmt(discount)}</Text></View>}
          <View style={styles.totalRow}><Text style={styles.totalLabel}>GST / Tax</Text><Text style={styles.totalValue}>{fmt(tax)}</Text></View>
          <View style={styles.grandRow}><Text style={styles.grandLabel}>Invoice Total</Text><Text style={styles.grandValue}>{fmt(total)}</Text></View>
          {paid > 0 && <View style={styles.totalRow}><Text style={styles.totalLabel}>Amount Received</Text><Text style={[styles.totalValue, { color: "#25D366" }]}>-{fmt(paid)}</Text></View>}
        </View>

        {/* Amount due box */}
        <View style={styles.dueBox}>
          <Text style={styles.dueLabel}>Amount Due</Text>
          <Text style={styles.dueAmount}>{fmt(balance)}</Text>
          {dueDate ? <Text style={[styles.boxSub, { marginTop: 4 }]}>Please pay by {dueDate}</Text> : null}
        </View>

        {/* Bank details */}
        <View style={styles.bankBox}>
          <Text style={styles.bankLabel}>Payment Details</Text>
          <View style={styles.bankRow}><Text style={styles.bankKey}>Account Name</Text><Text style={styles.bankVal}>Eros Enterprises</Text></View>
          <View style={styles.bankRow}><Text style={styles.bankKey}>Bank</Text><Text style={styles.bankVal}>HDFC Bank</Text></View>
          <View style={styles.bankRow}><Text style={styles.bankKey}>UPI</Text><Text style={styles.bankVal}>{siteConfig.phone}@upi</Text></View>
          <View style={[styles.bankRow, { marginTop: 4 }]}><Text style={styles.bankKey}>Reference</Text><Text style={styles.bankVal}>{invoice.invoiceNumber}</Text></View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Eros Enterprises · {siteConfig.url} · {siteConfig.phone}</Text>
          <Text style={styles.footerText}>{invoice.invoiceNumber}</Text>
        </View>
      </Page>
    </Document>
  );

  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
