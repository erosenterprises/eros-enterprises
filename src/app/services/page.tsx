import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Decorative Lighting, Security & Smart Automation | Eros Enterprises",
  description: "Explore our four core services: Decorative Lighting, Security Systems, Smart Automation, and AMC Contracts. Serving Mumbai since 2009.",
};

const services = [
  {
    num: "01", icon: "💡", title: "Decorative Lighting (ELV)",
    desc: "Design-forward lighting for homes, hotels, offices and retail. Chandeliers, cove lighting, facade, landscape — concept to commissioning.",
    tags: ["Chandeliers", "Cove Lighting", "Facade", "Landscape"],
    href: "/services/decorative-lighting",
  },
  {
    num: "02", icon: "🔒", title: "Security Systems",
    desc: "Complete surveillance and access infrastructure — CCTV, video door phones, biometric access control, perimeter alarms and NVR/DVR setups.",
    tags: ["CCTV & NVR", "Access Control", "Video Door Phone", "Alarm Systems"],
    href: "/services/security-systems",
  },
  {
    num: "03", icon: "⚙️", title: "Smart Automation (AUT)",
    desc: "Intelligent controls for home and office. Voice commands, mobile app, scene programming, and energy management in one seamless system.",
    tags: ["Smart Switches", "Scene Control", "Voice Control", "Energy Mgmt"],
    href: "/services/smart-automation",
  },
  {
    num: "04", icon: "🔧", title: "AMC Contracts",
    desc: "Annual Maintenance Contracts with flexible tiers. Guaranteed SLA response times, emergency callout coverage, and dedicated support.",
    tags: ["Basic", "Standard", "Premium"],
    href: "/services/amc-services",
    tagStyle: "gold",
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Services</span></div>
          <div className="eros-eyebrow mb-1.5">What We Offer</div>
          <h1 className="font-heading font-extrabold text-[32px] text-white mb-2.5">
            Comprehensive <span className="text-[#F5A623]">ELV Solutions</span> for Every Space
          </h1>
          <p className="text-[14px] text-[#8896AA] max-w-[540px] leading-[1.7]">
            From a single chandelier to full smart-home automation — we handle everything end to end.
          </p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto">
        {services.map((s, i) => (
          <div key={s.num} className="flex gap-6 items-start px-6 lg:px-10 py-8"
               style={{borderBottom: i < services.length-1 ? "1px solid rgba(255,255,255,0.06)" : "none"}}>
            <div className="w-[64px] h-[64px] rounded-[14px] flex items-center justify-center text-[28px] flex-shrink-0"
                 style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
              {s.icon}
            </div>
            <div className="flex-1">
              <div className="eros-eyebrow mb-1">Service {s.num}</div>
              <h2 className="font-heading font-bold text-[20px] text-white mb-2">{s.title}</h2>
              <p className="text-[13px] text-[#8896AA] leading-[1.65] max-w-[580px] mb-3">{s.desc}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {s.tags.map((tag) => (
                  <span key={tag} className={s.tagStyle === "gold" ? "tag-gold" : "tag-blue"}>{tag}</span>
                ))}
              </div>
              <Link href={s.href}
                className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-4 py-2 rounded-[7px] text-[12px] font-semibold transition-colors">
                Explore & Get Quote →
              </Link>
            </div>
            <div className="hidden md:flex w-[42px] h-[42px] rounded-[9px] items-center justify-center text-[20px] text-[#5B9BD5] flex-shrink-0 mt-1"
                 style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
              →
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 lg:px-10 py-14 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[26px] text-white mb-2.5">Not sure which service you need?</h2>
          <p className="text-[14px] mb-7" style={{color:"rgba(255,255,255,0.65)"}}>Our experts visit your site for free and recommend the right solution.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">
              📅 Book Free Site Visit
            </Link>
            <a href="tel:+919920111774" className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-semibold text-white"
               style={{border:"1px solid rgba(255,255,255,0.3)"}}>
              📞 Call Us Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
