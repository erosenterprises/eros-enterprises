import { notFound } from "next/navigation";

import { DashboardDataUnavailable } from "@/features/crm/components/dashboard-data-unavailable";
import { QuotationDetailView } from "@/features/billing/components/quotation-detail-view";
import { getBillingOptions, getQuotationDetail } from "@/features/billing/repository";

export const dynamic = "force-dynamic";

export default async function DashboardQuotationDetailPage(
  props: PageProps<"/dashboard/quotations/[id]">,
) {
  const { id } = await props.params;
  let quotation;
  let options;

  try {
    [quotation, options] = await Promise.all([
      getQuotationDetail(id),
      getBillingOptions(),
    ]);
  } catch {
    return <DashboardDataUnavailable title="Quotation data unavailable" />;
  }

  if (!quotation) {
    notFound();
  }

  return <QuotationDetailView quotation={quotation} options={options} />;
}
