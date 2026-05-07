import type { Lead, LeadPriority, LeadSource, LeadStatus } from "@prisma/client";

import type { ActionResponse } from "@/lib/action-response";
import type { LeadCaptureField } from "@/features/leads/schemas";

export type LeadCaptureResultData = {
  id: Lead["id"];
  leadNumber: Lead["leadNumber"];
};

export type LeadCaptureActionResponse = ActionResponse<
  LeadCaptureResultData,
  LeadCaptureField
>;

export type LeadListItem = Pick<
  Lead,
  | "id"
  | "leadNumber"
  | "name"
  | "phone"
  | "email"
  | "serviceInterest"
  | "source"
  | "sourcePage"
  | "ctaLocation"
  | "location"
  | "budgetRange"
  | "status"
  | "priority"
  | "createdAt"
>;

export type LeadDetailRecord = Lead & {
  assignedTo: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
  } | null;
  activities: Array<{
    id: string;
    action: string;
    description: string | null;
    occurredAt: Date;
  }>;
};

export type LeadStatusValue = LeadStatus;
export type LeadPriorityValue = LeadPriority;
export type LeadSourceValue = LeadSource;
