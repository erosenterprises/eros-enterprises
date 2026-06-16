"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/website";
import { siteConfig } from "@/config/site";
import { useLeadCaptureForm } from "@/features/leads/hooks/use-lead-capture-form";
import { BUDGET_RANGES } from "@/features/leads/constants";
import { cn } from "@/lib/utils";

type QuoteFormProps = {
  sourcePage?: string;
  compact?: boolean; // true = hero embed, false = full page
};

export function QuoteForm({ sourcePage = "/get-quote", compact = false }: QuoteFormProps) {
  return (
    <Suspense fallback={<QuoteFormSkeleton compact={compact} />}>
      <QuoteFormInner sourcePage={sourcePage} compact={compact} />
    </Suspense>
  );
}

function QuoteFormInner({ sourcePage, compact }: Required<QuoteFormProps>) {
  const [step, setStep] = useState(1);
  const { form, response, isPending, submit } = useLeadCaptureForm({
    defaultValues: {
      sourcePage,
      ctaLocation: compact ? "hero_quote_form" : "quote_page",
      source: "WEBSITE",
      status: "NEW",
      priority: "HIGH",
    },
  });

  const errors = form.formState.errors;

  const nextStep = async () => {
    let valid = false;
    if (step === 1) valid = await form.trigger(["name", "phone", "email"]);
    if (step === 2) valid = await form.trigger(["serviceInterest", "location", "budgetRange"]);
    if (valid) setStep((s) => s + 1);
  };

  const inputCls = "w-full h-[46px] rounded-[10px] px-4 text-[13px] font-medium transition-all outline-none focus:ring-2 focus:ring-[#1565C0] focus:ring-offset-0";
  const inputStyle = {
    background: "var(--e-input-bg)",
    border: "1px solid var(--e-input-bdr)",
    color: "var(--e-text)",
  };
  const inputStyleFocus = { ...inputStyle };
  const labelCls = "block text-[11px] font-700 uppercase tracking-[0.07em] mb-1.5";
  const labelStyle = { color: "var(--e-muted)" };
  const errCls = "text-[10px] text-red-400 mt-1";

  const steps = ["Contact", "Project", "Confirm"];

  return (
    <div
      className={cn("rounded-[20px] overflow-hidden", compact ? "w-full" : "max-w-[560px] mx-auto w-full")}
      style={{
        background: "rgba(10,22,40,0.92)",
        border: "1px solid rgba(21,101,192,0.25)",
        boxShadow: "0 24px 60px rgba(5,10,20,0.5)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-0">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3"
             style={{ background:"rgba(21,101,192,0.15)", border:"1px solid rgba(21,101,192,0.3)" }}>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color:"#93C5FD" }}>Lead Capture</span>
        </div>
        <h3 className={cn("font-heading font-bold text-white mb-1", compact ? "text-[20px]" : "text-[24px]")}>
          Quote request form
        </h3>
        <p className="text-[12px] leading-[1.6] mb-4" style={{ color:"#8896AA" }}>
          Share the scope so we can shape the project into a clear quotation path.
        </p>

        {/* Step progress */}
        <div className="flex items-center gap-0 mb-5">
          {steps.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                    style={{
                      background: done ? "#1565C0" : active ? "#F5A623" : "rgba(255,255,255,0.08)",
                      border: active ? "2px solid #F5A623" : done ? "2px solid #1565C0" : "1px solid rgba(255,255,255,0.15)",
                      color: done || active ? "#fff" : "#8896AA",
                    }}
                  >
                    {done ? "✓" : n}
                  </div>
                  <span className="text-[9px] mt-1 font-600 whitespace-nowrap"
                        style={{ color: active ? "#F5A623" : done ? "#93C5FD" : "#8896AA" }}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-[1px] mx-2 mb-4"
                       style={{ background: done ? "#1565C0" : "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={submit}>
        <input type="hidden" {...form.register("source")} value="WEBSITE" />
        <input type="hidden" {...form.register("sourcePage")} />
        <input type="hidden" {...form.register("ctaLocation")} />
        <input type="hidden" {...form.register("utmSource")} />
        <input type="hidden" {...form.register("utmMedium")} />
        <input type="hidden" {...form.register("utmCampaign")} />
        <input type="hidden" {...form.register("status")} value="NEW" />
        <input type="hidden" {...form.register("priority")} value="HIGH" />
        <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...form.register("honeypot")} />

        <div className="px-6 pb-2">

          {/* ── STEP 1: Contact details ── */}
          {step === 1 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls} style={labelStyle}>Name</label>
                  <input placeholder="Your full name" {...form.register("name")}
                    className={inputCls} style={inputStyle} />
                  {errors.name && <p className={errCls}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelCls} style={labelStyle}>Phone</label>
                  <input placeholder="Phone number" {...form.register("phone")}
                    className={inputCls} style={inputStyle} />
                  {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
                </div>
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>Email</label>
                <input type="email" placeholder="name@company.com" {...form.register("email")}
                  className={inputCls} style={inputStyle} />
                {errors.email && <p className={errCls}>{errors.email.message}</p>}
              </div>
            </div>
          )}

          {/* ── STEP 2: Project details ── */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className={labelCls} style={labelStyle}>Service interest</label>
                <select {...form.register("serviceInterest")} className={inputCls} style={{ ...inputStyle, appearance:"none" }}>
                  <option value="" style={{ background:"#0A1628" }}>Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name} style={{ background:"#0A1628" }}>{s.name}</option>
                  ))}
                </select>
                {errors.serviceInterest && <p className={errCls}>{errors.serviceInterest.message}</p>}
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>Location</label>
                <input placeholder="Project city or site location" {...form.register("location")}
                  className={inputCls} style={inputStyle} />
                {errors.location && <p className={errCls}>{errors.location.message}</p>}
              </div>
              <div>
                <label className={labelCls} style={labelStyle}>Budget range</label>
                <select {...form.register("budgetRange")} className={inputCls} style={{ ...inputStyle, appearance:"none" }}>
                  <option value="" style={{ background:"#0A1628" }}>Select budget range</option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b} style={{ background:"#0A1628" }}>{b}</option>
                  ))}
                </select>
                {errors.budgetRange && <p className={errCls}>{errors.budgetRange.message}</p>}
              </div>
            </div>
          )}

          {/* ── STEP 3: Message + submit ── */}
          {step === 3 && (
            <div className="space-y-3">
              <div>
                <label className={labelCls} style={labelStyle}>Message</label>
                <textarea rows={compact ? 3 : 4}
                  placeholder="Tell us about the project, scope, urgency, or support requirement."
                  {...form.register("message")}
                  className="w-full rounded-[10px] px-4 py-3 text-[13px] font-medium transition-all outline-none focus:ring-2 focus:ring-[#1565C0] resize-none"
                  style={inputStyle}
                />
                {errors.message && <p className={errCls}>{errors.message.message}</p>}
              </div>

              {/* Quick contact bar */}
              <div className="rounded-[10px] p-3 flex items-center gap-3"
                   style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-[12px] font-semibold hover:opacity-80 transition-opacity" style={{ color:"#25D366" }}>
                  💬 WhatsApp now
                </a>
                <div className="flex-1 text-center" style={{ color:"rgba(255,255,255,0.15)", fontSize:"11px" }}>or</div>
                <a href={`tel:${siteConfig.phone}`}
                   className="flex items-center gap-2 text-[12px] font-semibold hover:opacity-80 transition-opacity" style={{ color:"#93C5FD" }}>
                  📞 Call {siteConfig.phone}
                </a>
              </div>

              {/* Success / error */}
              {response.success && (
                <div className="rounded-[10px] px-4 py-3 text-[12px]"
                     style={{ background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.25)", color:"#4ade80" }}>
                  ✓ Quote request submitted! Reference: {response.data?.leadNumber}. We&apos;ll respond within 2 hours.
                </div>
              )}
              {!response.success && response.message && (
                <div className="rounded-[10px] px-4 py-3 text-[12px]"
                     style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#fca5a5" }}>
                  {response.message}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 mt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] leading-[1.5]" style={{ color:"#5A6B82" }}>
              {step < 3 ? `Step ${step} of 3` : "Leads go directly into the CRM with source tracking and activity logging."}
            </p>
            <div className="flex gap-2">
              {step > 1 && !response.success && (
                <button type="button" onClick={() => setStep((s) => s - 1)}
                  className="h-[42px] px-4 rounded-[10px] text-[12px] font-semibold transition-colors"
                  style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#E8EAF0" }}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button type="button" onClick={nextStep}
                  className="h-[42px] px-6 rounded-[10px] text-[13px] font-bold transition-all hover:brightness-110"
                  style={{ background:"#1565C0", color:"#fff" }}>
                  Next →
                </button>
              )}
              {step === 3 && !response.success && (
                <button type="submit" disabled={isPending}
                  className="h-[42px] px-6 rounded-[10px] text-[13px] font-bold transition-all hover:brightness-110"
                  style={{ background:"linear-gradient(135deg,#F5A623,#FFCC33)", color:"#050A14", boxShadow:"0 8px 24px rgba(245,166,35,0.3)" }}>
                  {isPending ? "Submitting..." : "Request quote"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function QuoteFormSkeleton({ compact }: { compact: boolean }) {
  return (
    <div className={cn("rounded-[20px] overflow-hidden", compact ? "w-full" : "max-w-[560px] mx-auto w-full")}
         style={{ background:"rgba(10,22,40,0.92)", border:"1px solid rgba(21,101,192,0.25)" }}>
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-4 w-24 rounded-full" style={{ background:"rgba(255,255,255,0.08)" }} />
        <div className="h-7 w-48 rounded-lg" style={{ background:"rgba(255,255,255,0.08)" }} />
        <div className="h-4 w-full rounded" style={{ background:"rgba(255,255,255,0.05)" }} />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 rounded-[10px]" style={{ background:"rgba(255,255,255,0.06)" }} />
          <div className="h-11 rounded-[10px]" style={{ background:"rgba(255,255,255,0.06)" }} />
        </div>
        <div className="h-11 rounded-[10px]" style={{ background:"rgba(255,255,255,0.06)" }} />
      </div>
    </div>
  );
}
