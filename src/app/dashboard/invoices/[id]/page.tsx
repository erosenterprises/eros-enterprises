import { notFound } from "next/navigation";

import { DashboardDataUnavailable } from "@/features/crm/components/dashboard-data-unavailable";
import { InvoiceDetailView } from "@/features/billing/components/invoice-detail-view";
import { getBillingOptions, getInvoiceDetail } from "@/features/billing/repository";

export const dynamic = "force-dynamic";

export default async function DashboardInvoiceDetailPage(
  props: PageProps<"/dashboard/invoices/[id]">,
) {
  const { id } = await props.params;
  let invoice;
  let options;

  try {
    [invoice, options] = await Promise.all([
      getInvoiceDetail(id),
      getBillingOptions(),
    ]);
  } catch {
    return <DashboardDataUnavailable title="Invoice data unavailable" />;
  }

  if (!invoice) {
    notFound();
  }

  return <InvoiceDetailView invoice={invoice} options={options} />;
}
