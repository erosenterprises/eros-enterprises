import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — Free Guides, Brochures & Checklists | Eros Enterprises",
  description: "Download free resources from Eros Enterprises — company profile, lighting design guide, security system checklist, smart home starter kit, AMC brochure and LUX calculator.",
};

const resources = [
  { emoji: "📄", title: "Company Profile", desc: "Full overview of Eros Enterprises — services, team, credentials and past projects. Share with your architect or interior designer.", label: "Download PDF" },
  { emoji: "💡", title: "Lighting Design Guide", desc: "Practical guide to residential lighting — LUX levels, colour temperatures, fixture selection and room-by-room recommendations.", label: "Download PDF" },
  { emoji: "🔒", title: "Security System Checklist", desc: "Complete checklist for planning CCTV, access control and alarm systems for homes and commercial properties.", label: "Download PDF" },
  { emoji: "⚙️", title: "Smart Home Starter Kit", desc: "Everything you need to know before planning a home automation project — from wiring to app setup and scene programming.", label: "Download PDF" },
  { emoji: "🔧", title: "AMC Plan Brochure", desc: "Detailed breakdown of our Basic, Standard and Premium AMC plans — inclusions, SLAs, pricing and FAQs.", label: "Download PDF" },
  { emoji: "📐", title: "LUX Calculator Guide", desc: "How to calculate the right number of fixtures for any room size. Includes reference tables for residential and commercial spaces.", label: "Download PDF" },
];

export default function ResourcesPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Resources</span></div>
          <div className="eros-eyebrow mb-1.5">Downloads & Guides</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Free <span className="text-[#F5A623]">Resources</span> for You
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">Brochures, technical guides, planning checklists and AMC documentation — all free to download.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r) => (
            <div key={r.title} className="rounded-[14px] p-5 flex flex-col gap-3"
                 style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              <div className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center text-[22px]"
                   style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                {r.emoji}
              </div>
              <h2 className="font-heading font-bold text-[14px] text-white">{r.title}</h2>
              <p className="text-[12px] text-[#8896AA] leading-[1.55] flex-1">{r.desc}</p>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[7px] text-[11px] font-semibold w-fit transition-colors hover:bg-[rgba(21,101,192,0.25)]"
                      style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)",color:"#5B9BD5"}}>
                ⬇️ {r.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
