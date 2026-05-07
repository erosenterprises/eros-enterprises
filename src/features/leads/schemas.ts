import { z } from "zod";

import {
  BUDGET_RANGES,
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from "@/features/leads/constants";
import {
  sanitizeMultilineTextInput,
  sanitizePhoneInput,
  sanitizeTextInput,
} from "@/features/leads/sanitizers";

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const sanitizedOptionalString = z.preprocess(
  emptyStringToUndefined,
  z.string().transform(sanitizeTextInput).pipe(z.string().min(1)).optional(),
);

const sanitizedOptionalMultilineString = z.preprocess(
  emptyStringToUndefined,
  z
    .string()
    .transform(sanitizeMultilineTextInput)
    .pipe(z.string().min(1))
    .optional(),
);

const utmSchema = z.object({
  utmSource: sanitizedOptionalString,
  utmMedium: sanitizedOptionalString,
  utmCampaign: sanitizedOptionalString,
});

export const leadCaptureSchema = z
  .object({
    name: z
      .string()
      .transform(sanitizeTextInput)
      .pipe(z.string().min(2, "Please enter your name.")),
    phone: z
      .string()
      .transform(sanitizePhoneInput)
      .pipe(
        z
          .string()
          .min(7, "Please enter a valid phone number.")
          .max(20, "Phone number is too long."),
      ),
    email: z.preprocess(
      emptyStringToUndefined,
      z.email("Please enter a valid email address.").optional(),
    ),
    serviceInterest: z
      .string()
      .transform(sanitizeTextInput)
      .pipe(z.string().min(2, "Please choose a service.")),
    source: z.enum(LEAD_SOURCES).default("WEBSITE"),
    sourcePage: z
      .string()
      .transform(sanitizeTextInput)
      .pipe(z.string().min(1, "Source page is required.")),
    ctaLocation: z
      .string()
      .transform(sanitizeTextInput)
      .pipe(z.string().min(1, "CTA location is required.")),
    message: sanitizedOptionalMultilineString,
    location: sanitizedOptionalString,
    budgetRange: z.preprocess(
      emptyStringToUndefined,
      z.enum(BUDGET_RANGES).optional(),
    ),
    status: z.enum(LEAD_STATUSES).default("NEW"),
    priority: z.enum(LEAD_PRIORITIES).default("MEDIUM"),
    assignedToId: sanitizedOptionalString,
    honeypot: z.string().trim().max(0, "Spam detected."),
  })
  .merge(utmSchema);

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;
export type LeadCaptureFormValues = z.input<typeof leadCaptureSchema>;

export type LeadCaptureField = keyof LeadCaptureInput;

export const leadCaptureServerSchema = leadCaptureSchema.omit({
  honeypot: true,
});

export type LeadCreateInput = z.infer<typeof leadCaptureServerSchema>;
