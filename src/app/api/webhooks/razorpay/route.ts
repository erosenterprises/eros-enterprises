import "server-only";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { createPaymentNumber } from "@/features/crm/numbering";
import { sendPaymentReceipt } from "@/lib/email";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

const VALID_METHODS = ["CASH", "UPI", "BANK_TRANSFER", "CHEQUE", "CARD", "OTHER"] as const;
type PaymentMethod = (typeof VALID_METHODS)[number];

function verifySignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return false;
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  if (!verifySignature(rawBody, signature)) {
    console.warn("[webhook/razorpay] Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { event: string; payload: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event !== "payment.captured") {
    return NextResponse.json({ received: true });
  }

  const payment = (event.payload as { payment?: { entity?: Record<string, unknown> } })?.payment?.entity;
  if (!payment) {
    return NextResponse.json({ error: "Missing payment entity" }, { status: 400 });
  }

  const razorpayPaymentId = payment.id as string;
  const razorpayOrderId = payment.order_id as string | undefined;
  const amountPaid = (payment.amount as number) / 100;
  const rawMethod = (payment.method as string)?.toUpperCase() ?? "";
  const paymentMethod: PaymentMethod = VALID_METHODS.includes(rawMethod as PaymentMethod)
    ? (rawMethod as PaymentMethod)
    : "UPI";
  const notes = payment.notes as Record<string, string> | undefined;
  const invoiceId = notes?.invoice_id;

  if (!invoiceId) {
    console.warn("[webhook/razorpay] No invoice_id in notes, skipping");
    return NextResponse.json({ received: true });
  }

  const existing = await prisma.payment.findFirst({
    where: { razorpayPaymentId },
  });
  if (existing) {
    console.log("[webhook/razorpay] Payment already recorded:", razorpayPaymentId);
    return NextResponse.json({ received: true });
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      customer: { select: { legalName: true, email: true } },
      lead: { select: { name: true, email: true, id: true } },
    },
  });

  if (!invoice) {
    console.error("[webhook/razorpay] Invoice not found:", invoiceId);
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const paymentNumber = await createPaymentNumber();
  const newBalance = Math.max(0, Number(invoice.balanceAmount) - amountPaid);
  const newStatus = newBalance <= 0 ? "PAID" : "PARTIALLY_PAID";

  await prisma.$transaction([
    prisma.payment.create({
      data: {
        paymentNumber,
        invoiceId,
        leadId: invoice.leadId,
        customerId: invoice.customerId,
        amount: amountPaid,
        method: paymentMethod,
        status: "CAPTURED",
        razorpayPaymentId,
        razorpayOrderId: razorpayOrderId ?? null,
        transactionReference: razorpayPaymentId,
        notes: "Auto-recorded via Razorpay webhook",
      },
    }),
    prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        paidAmount: { increment: amountPaid },
        balanceAmount: newBalance,
        status: newStatus,
        paidAt: newStatus === "PAID" ? new Date() : undefined,
      },
    }),
  ]);

  const clientEmail = invoice.customer?.email ?? invoice.lead?.email;
  const clientName = invoice.customer?.legalName ?? invoice.lead?.name ?? "Client";
  if (clientEmail) {
    sendPaymentReceipt({
      clientName,
      clientEmail,
      invoiceNumber: invoice.invoiceNumber,
      amountPaid: "₹" + amountPaid.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
      paymentDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      paymentId: razorpayPaymentId,
    }).catch(err => console.error("[webhook/razorpay] Receipt email failed:", err));
  }

  revalidatePath("/dashboard/invoices");
  revalidatePath(`/dashboard/invoices/${invoiceId}`);
  revalidatePath("/dashboard/payments");

  console.log(`[webhook/razorpay] Payment ${paymentNumber} recorded for invoice ${invoice.invoiceNumber} — ₹${amountPaid}`);
  return NextResponse.json({ received: true });
}
