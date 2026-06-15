import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Portfolio of Lighting & Automation Work | Eros Enterprises Mumbai",
  description: "Browse 500+ completed projects across residential, commercial, hospitality and retail sectors in Mumbai. Decorative lighting, smart automation and security installations.",
};

const projects = [
  { tag: "Residential", tag2: "Lighting", emoji: "🏠", bg: "from-[#091b37] to-[#0F2D54]", title: "Juhu Villa — Full Lighting Overhaul", desc: "Interior, cove, facade & garden lighting for a 5,000 sq ft luxury villa. Feature staircase with 48-pendant cluster.", loc: "Juhu, Mumbai", year: "2025", sqft: "5,000 sqft" },
  { tag: "Commercial", tag2: "Automation", emoji: "🏢", bg: "from-[#1c0800] to-[#311400]", title: "BKC Corporate HQ", desc: "Smart automation, CCTV, access control & scene lighting for 8,000 sq ft office. 120+ smart points.", loc: "BKC, Mumbai", year: "2024", sqft: "8,000 sqft" },
  { tag: "Hospitality", tag2: "Lighting", emoji: "🏨", bg: "from-[#07180e] to-[#0e2d1c]", title: "Hotel Powai — Lobby & Banquet", desc: "Bespoke chandelier array and atmospheric lighting across lobby, banquet hall and restaurant zones.", loc: "Powai, Mumbai", year: "2025", sqft: "12,000 sqft" },
  { tag: "Retail", tag2: "Security", emoji: "🛍", bg: "from-[#130022] to-[#220038]", title: "Jewellery Showroom, Andheri", desc: "High-CRI spotlight and display lighting with integrated CCTV and biometric access control.", loc: "Andheri, Mumbai", year: "2024", sqft: "2,800 sqft" },
  { tag: "Residential", tag2: "Smart", emoji: "🏡", bg: "from-[#001826] to-[#003348]", title: "Smart Home, Bandra", desc: "Full home automation — lighting scenes, climate, security and entertainment in one app.", loc: "Bandra, Mumbai", year: "2025", sqft: "3,200 sqft" },
  { tag: "Industrial", tag2: null as null|string, emoji: "🏭", bg: "from-[#1a1200] to-[#2e2000]", title: "Factory Campus, Thane", desc: "Industrial LED flood lighting and perimeter security system across 3-acre campus.", loc: "Thane, Mumbai", year: "2024", sqft: "22,000 sqft" },
];

const filters = ["All", "Residential", "Commercial", "Hospitality", "Retail", "Industrial"];

export default function ProjectsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Projects</span></div>
          <div className="eros-eyebrow mb-1.5">Portfolio</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Our <span className="text-[#F5A623]">Project Gallery</span>
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">500+ completed projects across residential, commercial, hospitality, and retail sectors in Mumbai.</p>
          <div className="flex gap-2 flex-wrap mt-5">
            {filters.map((f, i) => (
              <button key={f} className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${i===0 ? "bg-[#1565C0] text-white" : "text-[#8896AA]"}`}
                      style={i===0 ? {} : {background:"rgba(21,101,192,0.1)",border:"1px solid rgba(21,101,192,0.22)"}}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.title} className="rounded-[14px] overflow-hidden"
                 style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              <div className={`h-[180px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-[56px] relative`}>
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="tag-gold">{p.tag}</span>
                  {p.tag2 && <span className="tag-blue">{p.tag2}</span>}
                </div>
                {p.emoji}
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-[15px] text-white mb-1.5">{p.title}</h3>
                <p className="text-[12px] text-[#8896AA] leading-[1.6] mb-3">{p.desc}</p>
                <div className="flex gap-3 text-[11px] text-[#5A6B82]">
                  <span>📍 {p.loc}</span>
                  <span>📅 {p.year}</span>
                  <span>📐 {p.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Have a project in mind?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>Tell us about your space and we will suggest the best solution.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">Start Your Project</Link>
          </div>
        </div>
      </div>
    </>
  );
}
