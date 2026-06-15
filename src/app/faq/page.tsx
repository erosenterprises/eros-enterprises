import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions | Eros Enterprises Mumbai",
  description: "Answers to common questions about our lighting, security, smart automation and AMC services. Free site visit, timelines, brands, coverage areas and more.",
};

const faqs = [
  { cat: "General", q: "Do you provide free site visits?", a: "Yes — we offer a completely free, no-obligation site visit across Mumbai and surrounding areas. Our expert will assess your space, understand your requirements, and provide a detailed quotation within 24 hours of the visit." },
  { cat: "General", q: "How long does a typical installation take?", a: "It depends on the scope. A single-room lighting upgrade typically takes 1–2 days. A full home or office lighting and automation installation usually takes 1–3 weeks. We provide a detailed project timeline before work begins." },
  { cat: "General", q: "What areas in Mumbai do you serve?", a: "We serve all of Mumbai — South Mumbai, Western Suburbs (Bandra to Virar), Eastern Suburbs (Powai, Thane, Navi Mumbai) and BKC. We also undertake projects in Pune and Lonavala on request." },
  { cat: "Brands", q: "What brands do you supply and install?", a: "We are authorised resellers and installation partners for Philips, Havells, Hikvision, Dahua, Legrand, Schneider, Lutron and Wipro among others. All products carry original manufacturer warranty." },
  { cat: "AMC", q: "What does an AMC contract include?", a: "Our AMC plans include scheduled preventive maintenance visits, emergency callout support with guaranteed response times, and labour for repairs. Spare parts coverage depends on the tier — Standard and Premium plans include parts. We offer Basic (quarterly), Standard (monthly) and Premium (fortnightly) plans." },
  { cat: "AMC", q: "What is the response time under your AMC contracts?", a: "Basic plan: within 48 hours. Standard plan: within 24 hours. Premium plan: within 12 hours. Emergency callout is included in Standard and Premium plans at no extra charge." },
  { cat: "Lighting", q: "Can you work with my architect or interior designer?", a: "Absolutely. We regularly collaborate with architects, interior designers and PMCs. We can provide lighting layouts, LUX calculations and BOQs at the design stage and then handle full execution once construction reaches the appropriate stage." },
  { cat: "Smart", q: "Do you offer smart automation for existing homes?", a: "Yes — we offer retrofit smart automation solutions that work with your existing wiring. Our smart switches replace standard switches and are controllable via app and voice assistants without any rewiring in most cases." },
  { cat: "Lighting", q: "Do you supply products without installation?", a: "Yes, we can supply products independently for clients who have their own contractors. However, we recommend our end-to-end service for warranty and post-sale support coverage." },
];

const cats = ["All", "General", "Lighting", "Smart", "AMC", "Brands"];

export default function FaqPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">FAQ</span></div>
          <div className="eros-eyebrow mb-1.5">Frequently Asked Questions</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Questions? <span className="text-[#F5A623]">We Have Answers</span>
          </h1>
          <div className="flex gap-2 flex-wrap mt-4">
            {cats.map((c, i) => (
              <button key={c} className="px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors"
                      style={i===0 ? {background:"#1565C0",color:"#fff"} : {background:"rgba(21,101,192,0.1)",border:"1px solid rgba(21,101,192,0.22)",color:"#8896AA"}}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[780px] mx-auto px-6 lg:px-10 py-10 space-y-2">
        {faqs.map((faq, i) => (
          <details key={i} className="group rounded-[12px] overflow-hidden"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}
                   {...(i === 0 ? { open: true } : {})}>
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
              <span className="font-semibold text-[14px] text-white group-open:text-[#F5A623] transition-colors pr-4">{faq.q}</span>
              <span className="text-[#1565C0] text-[18px] flex-shrink-0 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-5 pb-4 text-[13px] text-[#8896AA] leading-[1.7]"
                 style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="pt-3">{faq.a}</div>
            </div>
          </details>
        ))}
      </div>

      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Still have questions?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>WhatsApp us and we will answer within 30 minutes during business hours.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://wa.me/919920111774" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">
              💬 Ask on WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-semibold text-white"
                  style={{border:"1px solid rgba(255,255,255,0.3)"}}>
              ✉️ Send an Email
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
