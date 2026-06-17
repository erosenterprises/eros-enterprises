import "server-only";
import { NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getQuotationDetail } from "@/features/billing/repository";
import { siteConfig } from "@/config/site";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9, padding: 36, backgroundColor: "#FFFFFF", color: "#1A1A2E" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 16, borderBottom: "1.5pt solid #1565C0" },
  logo: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#1565C0" },
  tagline: { fontSize: 7, color: "#8896AA", marginTop: 2 },
  docTitle: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#1565C0", textAlign: "right" },
  docNum: { fontSize: 9, color: "#8896AA", textAlign: "right", marginTop: 3 },
  section: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  box: { width: "47%" },
  boxLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#1565C0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 },
  boxText: { fontSize: 8.5, color: "#1A1A2E", lineHeight: 1.5 },
  boxSub: { fontSize: 8, color: "#8896AA", lineHeight: 1.5 },
  tableHeader: { flexDirection: "row", backgroundColor: "#1565C0", padding: "6 8", borderRadius: 3, marginBottom: 1 },
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
  grandRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6, paddingTop: 6, borderTop: "1pt solid #1565C0", width: 200 },
  grandLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1565C0", width: 110 },
  grandValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1565C0", textAlign: "right", width: 90 },
  footer: { position: "absolute", bottom: 24, left: 36, right: 36, borderTop: "0.5pt solid #E0E0E0", paddingTop: 8, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7, color: "#8896AA" },
  badge: { backgroundColor: "#EBF2FF", padding: "3 8", borderRadius: 3, alignSelf: "flex-start", marginTop: 6 },
  badgeText: { fontSize: 7, color: "#1565C0", fontFamily: "Helvetica-Bold" },
  notes: { marginTop: 20, padding: "10 12", backgroundColor: "#F8FAFF", borderLeft: "3pt solid #1565C0", borderRadius: 2 },
  notesLabel: { fontSize: 7, fontFamily: "Helvetica-Bold", color: "#1565C0", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
  notesText: { fontSize: 8.5, color: "#374151", lineHeight: 1.5 },
});

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function statusColor(s: string) {
  const map: Record<string, string> = { DRAFT: "#8896AA", SENT: "#1565C0", ACCEPTED: "#25D366", REJECTED: "#EF5350", EXPIRED: "#F5A623" };
  return map[s] ?? "#8896AA";
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let quotation;
  try {
    quotation = await getQuotationDetail(id);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (!quotation) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const clientName = quotation.customer?.legalName ?? quotation.lead?.name ?? "Client";
  const clientContact = quotation.customer?.primaryContactName ?? "";
  const clientEmail = quotation.customer?.email ?? quotation.lead?.email ?? "";
  const clientPhone = quotation.customer?.phone ?? quotation.lead?.phone ?? "";
  const clientAddress = quotation.customer?.billingAddress ?? "";
  const clientGstin = quotation.customer?.gstin ?? "";

  const subtotal = Number(quotation.subtotalAmount ?? 0);
  const tax = Number(quotation.taxAmount ?? 0);
  const total = Number(quotation.totalAmount ?? 0);
  const discount = Number(quotation.discountAmount ?? 0);

  const validUntil = quotation.validUntil
    ? new Date(quotation.validUntil).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;
  const createdAt = new Date(quotation.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const pdf = await renderToBuffer(
    <Document title={`${quotation.quotationNumber} — Eros Enterprises`} author="Eros Enterprises">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Eros Enterprises</Text>
            <Text style={styles.tagline}>Lighting with Purpose · Mumbai, Maharashtra</Text>
            <Text style={[styles.boxSub, { marginTop: 4 }]}>{siteConfig.phone} · {siteConfig.email}</Text>
          </View>
          <View>
            <Text style={styles.docTitle}>QUOTATION</Text>
            <Text style={styles.docNum}>{quotation.quotationNumber}</Text>
            <View style={[styles.badge, { backgroundColor: statusColor(quotation.status) + "22", marginLeft: "auto" }]}>
              <Text style={[styles.badgeText, { color: statusColor(quotation.status) }]}>{quotation.status}</Text>
            </View>
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
            <Text style={styles.boxLabel}>Quotation Details</Text>
            <Text style={styles.boxSub}>Date: <Text style={styles.boxText}>{createdAt}</Text></Text>
            {validUntil ? <Text style={styles.boxSub}>Valid Until: <Text style={styles.boxText}>{validUntil}</Text></Text> : null}
            {quotation.lead?.leadNumber ? <Text style={styles.boxSub}>Lead Ref: <Text style={styles.boxText}>{quotation.lead.leadNumber}</Text></Text> : null}
            {quotation.title ? <Text style={[styles.boxSub, { marginTop: 4 }]}>{quotation.title}</Text> : null}
          </View>
        </View>

        {/* Line items table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.colDesc]}>Description</Text>
          <Text style={[styles.thText, styles.colNum]}>Qty</Text>
          <Text style={[styles.thText, styles.colNum]}>Rate (₹)</Text>
          <Text style={[styles.thText, styles.colNum]}>Tax %</Text>
          <Text style={[styles.thText, styles.colNum]}>Amount (₹)</Text>
        </View>
        {(quotation.items ?? []).map((item, i) => (
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
          <View style={styles.grandRow}><Text style={styles.grandLabel}>Total Amount</Text><Text style={styles.grandValue}>{fmt(total)}</Text></View>
        </View>

        {/* Notes */}
        {quotation.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{quotation.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Eros Enterprises · {siteConfig.url}</Text>
          <Text style={styles.footerText}>{quotation.quotationNumber} · Page 1</Text>
        </View>
      </Page>
    </Document>
  );

  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${quotation.quotationNumber}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
