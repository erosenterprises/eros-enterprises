import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const caseStudies = [
  {
    slug: "bkc-corporate-hq",
    tag: "Commercial", tag2: "Automation",
    emoji: "🏢", bg: "from-[#1c0800] to-[#311400]",
    title: "BKC Corporate HQ — Full ELV Integration",
    client: "Leading Financial Services Firm",
    loc: "BKC, Mumbai", year: "2024", sqft: "8,000 sqft",
    results: [{ num: "₹2.1L", label: "Annual Energy Saving" }, { num: "120+", label: "Smart Control Points" }, { num: "35%", label: "Energy Reduction" }, { num: "3 Wks", label: "Project Duration" }],
    challenge: "The client needed a complete ELV overhaul for their new 8,000 sq ft office before a board-level inauguration in 3 weeks. Requirements included smart lighting control, HD surveillance, biometric access and Alexa integration — all from a single vendor with zero disruption to ongoing operations.",
    solution: "Eros deployed a fully integrated ELV package: 120 smart touch switches with scene control, 48 IP cameras with NVR, 6 biometric access points, and a centralised app-based control panel accessible from anywhere. Commissioned on schedule with a single handover manual.",
    outcome: "The client reported a 35% reduction in energy consumption within 3 months. The smart scene system reduced lighting management overhead significantly and the surveillance footage quality was praised by their internal security team. They enrolled in a Standard AMC plan immediately after handover.",
    quote: "Eros handled everything from first meeting to final handover. The quality of work and professionalism of the team was outstanding. We have referred them to two subsidiary offices already.",
    quoteName: "Sunita Kapoor", quoteRole: "COO, Financial Services Firm · BKC, Mumbai",
    scope: [["Area","8,000 sq ft"],["Duration","3 weeks"],["Smart Points","120+"],["CCTV Cameras","48 × 4MP"],["Access Points","6 biometric"],["AMC Plan","Standard"]],
  },
  {
    slug: "juhu-villa-lighting",
    tag: "Residential", tag2: "Lighting",
    emoji: "🏠", bg: "from-[#091b37] to-[#0F2D54]",
    title: "Juhu Villa — Full Lighting Overhaul",
    client: "Private Homeowner",
    loc: "Juhu, Mumbai", year: "2025", sqft: "5,000 sqft",
    results: [{ num: "48", label: "Pendant Fixtures" }, { num: "12", label: "Lighting Zones" }, { num: "8", label: "Rooms Done" }, { num: "2 Wks", label: "Project Duration" }],
    challenge: "A luxury villa owner wanted a complete lighting transformation — replacing dated fittings with a cohesive design that worked across interior rooms, cove areas, facade and garden. The staircase feature wall needed a statement installation with dimmable control.",
    solution: "Our design team created a 12-zone lighting plan covering all interior spaces, garden, facade and gate. The staircase received a custom 48-pendant crystal cluster. All zones are controlled via a Lutron dimmer system with preset scenes for daytime, evening and entertaining.",
    outcome: "The homeowner described the transformation as dramatic. The chandelier cluster on the staircase has become the talking point of every visitor. Energy consumption dropped 28% despite the expanded fixture count due to LED specification throughout.",
    quote: "Eros completely transformed our villa. The chandelier they recommended is now the focal point of our living room. Exceptional quality and a very professional team from start to finish.",
    quoteName: "Rajesh Shah", quoteRole: "Homeowner · Juhu, Mumbai",
    scope: [["Area","5,000 sq ft"],["Duration","2 weeks"],["Zones","12 lighting zones"],["Staircase","48-pendant cluster"],["Control","Lutron dimmer system"],["Warranty","2 year parts & labour"]],
  },
];

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return { title: `${cs.title} | Case Study — Eros Enterprises`, description: cs.challenge.slice(0, 155) };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-[#8896AA]">›</span>
            <Link href="/projects" className="hover:text-white transition-colors text-[#8896AA]">Projects</Link>
            <span className="text-[#8896AA]">›</span>
            <span className="bc-cur">Case Study</span>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="tag-gold">{cs.tag}</span>
            {cs.tag2 && <span className="tag-blue">{cs.tag2}</span>}
          </div>
          <h1 className="font-heading font-extrabold text-[28px] text-white mb-3 max-w-[650px]">{cs.title}</h1>
          <div className="flex gap-4 text-[13px] text-[#8896AA] flex-wrap">
            <span>📍 {cs.loc}</span>
            <span>📅 {cs.year}</span>
            <span>📐 {cs.sqft}</span>
            <span>🏢 {cs.client}</span>
          </div>
        </div>
      </div>

      {/* Results strip */}
      <div className="bg-[#0A1628] px-6 lg:px-10 py-6"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[900px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cs.results.map((r) => (
            <div key={r.label} className="text-center">
              <div className="font-heading text-[30px] font-extrabold text-[#F5A623] leading-none">{r.num}</div>
              <div className="text-[11px] text-[#8896AA] mt-1.5">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10 grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-6">
          {/* Visual */}
          <div className={`h-[200px] bg-gradient-to-br ${cs.bg} rounded-[14px] flex items-center justify-center text-[72px]`}
               style={{border:"1px solid rgba(21,101,192,0.22)"}}>
            {cs.emoji}
          </div>

          {[
            { label: "The Challenge", text: cs.challenge },
            { label: "Our Solution", text: cs.solution },
            { label: "The Results", text: cs.outcome },
          ].map((sec) => (
            <div key={sec.label}>
              <h2 className="font-heading font-bold text-[18px] text-white mb-3">{sec.label}</h2>
              <p className="text-[14px] text-[#8896AA] leading-[1.75]">{sec.text}</p>
            </div>
          ))}

          {/* Testimonial */}
          <div className="rounded-[14px] p-5" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
            <div className="text-[30px] text-[#F5A623] leading-none mb-2 font-serif" style={{opacity:0.2}}>&ldquo;</div>
            <p className="text-[13px] text-[#B0B8CC] italic leading-[1.75] mb-4">&ldquo;{cs.quote}&rdquo;</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-[#5B9BD5]"
                   style={{background:"rgba(21,101,192,0.2)",border:"1px solid rgba(21,101,192,0.3)"}}>
                {cs.quoteName.split(" ").map(n => n[0]).join("").slice(0,2)}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-white">{cs.quoteName}</div>
                <div className="text-[11px] text-[#8896AA]">{cs.quoteRole}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Scope */}
          <div className="rounded-[14px] p-5" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
            <h3 className="font-bold text-[14px] text-white mb-4">Project Scope</h3>
            {cs.scope.map(([k, v]) => (
              <div key={k} className="flex justify-between text-[12px] py-2"
                   style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <span className="text-[#8896AA]">{k}</span>
                <span className="text-white font-semibold">{v}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-[14px] p-5" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
            <h3 className="font-bold text-[14px] text-white mb-2">Similar Project?</h3>
            <p className="text-[12px] text-[#8896AA] leading-[1.6] mb-4">Tell us about your space and we will prepare a tailored proposal at no cost.</p>
            <Link href="/contact"
              className="block w-full bg-[#1565C0] hover:bg-[#1E7FE8] text-white py-3 rounded-[8px] text-[13px] font-semibold text-center transition-colors">
              Request a Proposal
            </Link>
          </div>

          <Link href="/projects" className="block text-center text-[12px] font-semibold text-[#5B9BD5] hover:text-white transition-colors py-2">
            ← Back to All Projects
          </Link>
        </div>
      </div>
    </>
  );
}
