"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { startTransition, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { createLeadAction } from "@/features/leads/actions";
import {
  leadCaptureSchema,
  type LeadCaptureFormValues,
  type LeadCaptureInput,
} from "@/features/leads/schemas";
import type { LeadCaptureActionResponse } from "@/features/leads/types";

type UseLeadCaptureFormOptions = {
  defaultValues: Partial<LeadCaptureInput>;
};

const initialResponse: LeadCaptureActionResponse = {
  success: false,
  message: "",
  data: null,
  errors: null,
};

export function useLeadCaptureForm({ defaultValues }: UseLeadCaptureFormOptions) {
  const searchParams = useSearchParams();
  const [response, setResponse] = useState<LeadCaptureActionResponse>(initialResponse);
  const [isPending, setIsPending] = useState(false);

  const utmDefaults = useMemo(
    () => ({
      utmSource: searchParams.get("utm_source") ?? "",
      utmMedium: searchParams.get("utm_medium") ?? "",
      utmCampaign: searchParams.get("utm_campaign") ?? "",
    }),
    [searchParams],
  );

  const form = useForm<LeadCaptureFormValues, unknown, LeadCaptureInput>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceInterest: "",
      source: "WEBSITE",
      sourcePage: "",
      ctaLocation: "",
      message: "",
      location: "",
      budgetRange: undefined,
      status: "NEW",
      priority: "MEDIUM",
      assignedToId: "",
      honeypot: "",
      ...defaultValues,
      ...utmDefaults,
    },
  });

  useEffect(() => {
    form.setValue("utmSource", utmDefaults.utmSource);
    form.setValue("utmMedium", utmDefaults.utmMedium);
    form.setValue("utmCampaign", utmDefaults.utmCampaign);
  }, [form, utmDefaults]);

  const submit = form.handleSubmit((values) => {
    setIsPending(true);
    setResponse(initialResponse);

    startTransition(async () => {
      const result = await createLeadAction(values);
      setResponse(result);
      setIsPending(false);

      if (result.success) {
        form.reset({
          ...form.getValues(),
          name: "",
          phone: "",
          email: "",
          serviceInterest: defaultValues.serviceInterest ?? "",
          message: "",
          location: "",
          budgetRange: undefined,
          honeypot: "",
          ...utmDefaults,
        });
        return;
      }

      if (result.errors) {
        for (const [field, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];

          if (!message) {
            continue;
          }

          form.setError(field as keyof LeadCaptureFormValues, {
            type: "server",
            message,
          });
        }
      }
    });
  });

  return {
    form,
    response,
    isPending,
    submit,
  };
}
