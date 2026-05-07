export const LEAD_SOURCES = [
  "WEBSITE",
  "WHATSAPP",
  "REFERRAL",
  "CALL",
  "WALK_IN",
  "OTHER",
] as const;

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE_VISIT_SCHEDULED",
  "QUOTATION_SENT",
  "WON",
  "LOST",
] as const;

export const LEAD_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export const BUDGET_RANGES = [
  "Below Rs. 50,000",
  "Rs. 50,000 - Rs. 2,00,000",
  "Rs. 2,00,000 - Rs. 5,00,000",
  "Rs. 5,00,000 - Rs. 10,00,000",
  "Above Rs. 10,00,000",
] as const;

export const LEAD_STATUS_LABELS: Record<(typeof LEAD_STATUSES)[number], string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  SITE_VISIT_SCHEDULED: "Site Visit Scheduled",
  QUOTATION_SENT: "Quotation Sent",
  WON: "Won",
  LOST: "Lost",
};

export const LEAD_PRIORITY_LABELS: Record<(typeof LEAD_PRIORITIES)[number], string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export const LEAD_SOURCE_LABELS: Record<(typeof LEAD_SOURCES)[number], string> = {
  WEBSITE: "Website",
  WHATSAPP: "WhatsApp",
  REFERRAL: "Referral",
  CALL: "Call",
  WALK_IN: "Walk-in",
  OTHER: "Other",
};
