import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { services } from "@/content/website";
import type { ServiceSlug } from "@/content/website";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug) ?? null;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.name, description: service.seoDescription, path: service.href });
}

const iconMap: Record<string, string> = {
  sparkles: "✨", house: "🏠", cpu: "⚙️", building: "🏢",
  panel: "🔌", cable: "🔗", shield: "🔒", leaf: "🌿",
  star: "⭐", clock: "⏱️", badge: "🏅", workflow: "🔄",
  quote: "💬", phone: "📞",
};

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedServices
    .map((rs) => services.find((s) => s.slug === rs))
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#8896AA]">›</span>
            <Link href="/services" className="hover:text-white transition-colors text-[#8896AA]">Services</Link>
            <span className="text-[#8896AA]">›</span>
            <span className="bc-cur">{service.name}</span>
          </div>
          <div className="w-[60px] h-[60px] rounded-[14px] flex items-center justify-center text-[28px] mb-4"
               style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
            {iconMap[service.icon] ?? "💡"}
          </div>
          <div className="eros-eyebrow mb-1.5">{service.eyebrow}</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-3 max-w-[600px]">{service.heroTitle}</h1>
          <p className="text-[14px] text-[#8896AA] max-w-[560px] leading-[1.7] mb-5">{service.heroDescription}</p>
          {service.heroStats.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {service.heroStats.map((stat) => (
                <div key={stat.label} className="rounded-[10px] px-4 py-3 text-center min-w-[100px]"
                     style={{background:"rgba(15,31,61,0.85)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  <div className="font-heading font-extrabold text-[22px] text-[#F5A623] leading-none">{stat.value}</div>
                  <div className="text-[10px] text-[#8896AA] mt-1 uppercase tracking-[0.05em]">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10 grid lg:grid-cols-[1fr_300px] gap-8">
        <div>
          {/* Highlights */}
          <h2 className="font-heading font-bold text-[18px] text-white mb-4">What&apos;s Included</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {service.highlights.map((h) => (
              <div key={h} className="flex gap-3 p-3.5 rounded-[10px]"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <span className="text-[#25D366] text-[16px] flex-shrink-0 mt-0.5">✓</span>
                <span className="text-[13px] text-[#E8EAF0]">{h}</span>
              </div>
            ))}
          </div>

          {/* Process */}
          {service.process.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading font-bold text-[18px] text-white mb-4">How We Work</h2>
              <div className="space-y-3">
                {service.process.map((step, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="w-8 h-8 rounded-[8px] flex items-center justify-center font-heading font-extrabold text-[12px] text-white flex-shrink-0"
                         style={{background:"#1565C0"}}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-[13px] text-[#8896AA] leading-[1.65] pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {service.faq.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading font-bold text-[18px] text-white mb-4">Frequently Asked</h2>
              <div className="space-y-2">
                {service.faq.map((q) => (
                  <div key={q.question} className="rounded-[10px] p-4"
                       style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                    <div className="font-semibold text-[13px] text-white mb-1.5">{q.question}</div>
                    <div className="text-[12px] text-[#8896AA] leading-[1.65]">{q.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-[18px] text-white mb-4">Related Services</h2>
              <div className="flex gap-3 flex-wrap">
                {related.map((rs) => rs && (
                  <Link key={rs.slug} href={rs.href}
                    className="px-4 py-2 rounded-[8px] text-[13px] font-semibold text-[#E8EAF0] hover:border-[rgba(21,101,192,0.5)] transition-colors"
                    style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                    {iconMap[rs.icon] ?? "💡"} {rs.shortName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quote box */}
          <div className="rounded-[14px] p-5" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
            <h3 className="font-heading font-bold text-[16px] text-white mb-1.5">Get a Free Quote</h3>
            <p className="text-[12px] text-[#8896AA] mb-4">Tell us about your project — we respond within 2 hours.</p>
            <Link href="/contact"
              className="block w-full bg-[#1565C0] hover:bg-[#1E7FE8] text-white py-3 rounded-[8px] text-[13px] font-semibold transition-colors text-center mb-3">
              📋 Request a Quote
            </Link>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
               className="block w-full py-3 rounded-[8px] text-[13px] font-bold text-center"
               style={{background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.25)",color:"#25D366"}}>
              💬 WhatsApp Us
            </a>
          </div>

          {/* Contact */}
          <div className="rounded-[14px] p-4" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
            <h4 className="font-bold text-[13px] text-white mb-3">Speak Directly</h4>
            <div className="space-y-2 text-[12px] text-[#8896AA]">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#1565C0]">📞</span> {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-[#1565C0]">✉️</span> {siteConfig.email}
              </a>
              <div className="flex items-center gap-2">
                <span className="text-[#1565C0]">⏰</span> Mon–Sat, 9am–7pm
              </div>
            </div>
          </div>

          {/* AMC note */}
          <div className="rounded-[14px] p-4" style={{background:"rgba(245,166,35,0.06)",border:"1px solid rgba(245,166,35,0.2)"}}>
            <div className="font-bold text-[12px] text-[#F5A623] mb-1.5">🔧 AMC Coverage Available</div>
            <p className="text-[12px] text-[#8896AA] mb-3 leading-[1.55]">All installations can be protected with our Annual Maintenance Contract.</p>
            <Link href="/services/amc-services" className="text-[12px] font-semibold text-[#F5A623] hover:underline">
              View AMC Plans →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
