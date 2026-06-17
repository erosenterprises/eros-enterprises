import "server-only";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://erosenterprises.in";

export async function POST(req: Request) {
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 });
  }

  let body: { invoiceId: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { invoiceId } = body;
  if (!invoiceId) {
    return NextResponse.json({ error: "invoiceId is required" }, { status: 400 });
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      customer: { select: { legalName: true, email: true, phone: true } },
      lead: { select: { name: true, email: true, phone: true } },
    },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const balanceAmount = Number(invoice.balanceAmount ?? invoice.totalAmount);
  if (balanceAmount <= 0) {
    return NextResponse.json({ error: "Invoice already fully paid" }, { status: 400 });
  }

  const clientName = invoice.customer?.legalName ?? invoice.lead?.name ?? "Client";
  const clientEmail = invoice.customer?.email ?? invoice.lead?.email ?? "";
  const clientPhone = invoice.customer?.phone ?? invoice.lead?.phone ?? "";

  const authHeader = "Basic " + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
  const expireBy = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days

  const rzpPayload = {
    amount: Math.round(balanceAmount * 100), // paise
    currency: "INR",
    accept_partial: false,
    reference_id: invoice.invoiceNumber,
    description: `Payment for ${invoice.invoiceNumber} — Eros Enterprises`,
    customer: {
      name: clientName,
      email: clientEmail || undefined,
      contact: clientPhone || undefined,
    },
    notify: { sms: !!clientPhone, email: !!clientEmail },
    reminder_enable: true,
    notes: {
      invoice_id: invoice.id,
      invoice_number: invoice.invoiceNumber,
    },
    callback_url: `${SITE_URL}/api/webhooks/razorpay`,
    callback_method: "get",
    expire_by: expireBy,
  };

  let rzpResponse;
  try {
    const res = await fetch("https://api.razorpay.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(rzpPayload),
    });
    rzpResponse = await res.json();
    if (!res.ok) {
      console.error("[razorpay] create-link error:", rzpResponse);
      return NextResponse.json({ error: "Razorpay API error", details: rzpResponse }, { status: 502 });
    }
  } catch (err) {
    console.error("[razorpay] fetch error:", err);
    return NextResponse.json({ error: "Failed to reach Razorpay" }, { status: 502 });
  }

  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      razorpayPaymentLinkId: rzpResponse.id,
      razorpayPaymentLinkUrl: rzpResponse.short_url,
    },
  });

  revalidatePath("/dashboard/invoices");
  revalidatePath(`/dashboard/invoices/${invoiceId}`);

  return NextResponse.json({
    paymentLinkId: rzpResponse.id,
    paymentLinkUrl: rzpResponse.short_url,
  });
}
