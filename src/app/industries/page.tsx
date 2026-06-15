import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries We Serve — Residential, Commercial, Hospitality & Retail | Eros Enterprises",
  description: "Eros Enterprises delivers lighting, security and automation solutions across residential, commercial, hospitality, retail, healthcare and industrial sectors in Mumbai.",
};

const industries = [
  { emoji: "🏠", title: "Residential", desc: "Luxury villas, apartments, bungalows and housing complexes. Interior, exterior and smart home lighting solutions.", count: "200+", href: "/projects" },
  { emoji: "🏢", title: "Commercial Office", desc: "Corporate HQs, IT parks and co-working spaces. Scene control, energy management, and integrated security.", count: "120+", href: "/projects" },
  { emoji: "🏨", title: "Hospitality", desc: "Hotels, restaurants, banquet halls and resorts. Atmospheric lighting and guest-experience automation systems.", count: "60+", href: "/projects" },
  { emoji: "🛍", title: "Retail & Showrooms", desc: "Jewellery, fashion, electronics and furniture stores. High-CRI spotlights and display lighting for product presentation.", count: "80+", href: "/projects" },
  { emoji: "🏥", title: "Healthcare", desc: "Hospitals, clinics and diagnostic centres. Hygienic lighting, colour temperature control, and CCTV security.", count: "25+", href: "/projects" },
  { emoji: "🏭", title: "Industrial", desc: "Factories, warehouses and campuses. Industrial LED flood lighting, perimeter security and AMC contracts.", count: "15+", href: "/projects" },
];

export default function IndustriesPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Industries</span></div>
          <div className="eros-eyebrow mb-1.5">Sectors We Serve</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Lighting Solutions for <span className="text-[#F5A623]">Every Industry</span>
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">From luxury homes to industrial campuses — our expertise spans every sector across Mumbai and Maharashtra.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind) => (
            <div key={ind.title} className="rounded-[14px] p-6 text-center group hover:border-[rgba(21,101,192,0.5)] transition-colors"
                 style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              <span className="text-[42px] block mb-3">{ind.emoji}</span>
              <h2 className="font-heading font-bold text-[15px] text-white mb-2">{ind.title}</h2>
              <p className="text-[12px] text-[#8896AA] leading-[1.55] mb-4">{ind.desc}</p>
              <div className="font-heading font-extrabold text-[18px] text-[#F5A623] mb-3">{ind.count} Projects</div>
              <Link href={ind.href}
                className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#5B9BD5] hover:text-white transition-colors">
                View projects →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Work in a different sector?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>Our team has experience across many more industries. Let us talk about your specific needs.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">
            Talk to Our Team
          </Link>
        </div>
      </div>
    </>
  );
}
