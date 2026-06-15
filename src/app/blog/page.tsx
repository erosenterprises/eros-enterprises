import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Lighting Tips, Smart Home Guides & Project Stories | Eros Enterprises",
  description: "Expert advice on decorative lighting design, smart home automation, security systems, and AMC from the Eros Enterprises team in Mumbai.",
};

const posts = [
  { emoji: "💡", bg: "from-[#0A1628] to-[#152030]", cat: "Lighting Design", date: "12 Jun 2026", read: "4 min", title: "How to Choose the Right Chandelier Size for Your Living Room", excerpt: "The most common mistake homeowners make is buying a chandelier that is too small. Here is the formula our designers use on every project." },
  { emoji: "🏠", bg: "from-[#0D1E0A] to-[#162010]", cat: "Smart Home", date: "5 Jun 2026", read: "6 min", title: "5 Automation Features Every Modern Mumbai Home Should Have", excerpt: "From voice-controlled scenes to energy monitoring — here is what our most satisfied clients all have in common after installation." },
  { emoji: "📹", bg: "from-[#180800] to-[#2A1400]", cat: "Security", date: "28 May 2026", read: "5 min", title: "CCTV vs Smart Doorbell: What Is Right for Your Apartment?", excerpt: "A clear guide to choosing between a full CCTV system and a smart video doorbell for different apartment types and budgets." },
  { emoji: "🌿", bg: "from-[#001826] to-[#003348]", cat: "Outdoor Lighting", date: "20 May 2026", read: "5 min", title: "Garden Lighting That Actually Works: Our Top 7 Tips", excerpt: "Creating the perfect garden ambience is about layering light. Here is how we approach every outdoor lighting project from concept to installation." },
  { emoji: "💰", bg: "from-[#1a1200] to-[#2e2000]", cat: "AMC", date: "10 May 2026", read: "7 min", title: "Is an Annual Maintenance Contract Worth It? Our Honest Answer", excerpt: "We explain the real cost of unplanned repairs vs a structured AMC — and when it makes genuine financial sense for homeowners and offices." },
  { emoji: "🏢", bg: "from-[#07180e] to-[#0e2d1c]", cat: "Commercial", date: "2 May 2026", read: "6 min", title: "Office Lighting for Productivity: What the Research Says", excerpt: "Colour temperature, LUX levels, and glare control all impact employee focus and wellbeing. Here is the science and our practical solution." },
];

export default function BlogPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Blog</span></div>
          <div className="eros-eyebrow mb-1.5">Lighting Insights</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Tips, Trends & <span className="text-[#F5A623]">Project Stories</span>
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">Expert advice on lighting design, smart automation, and security from the Eros team.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((p) => (
            <article key={p.title} className="rounded-[14px] overflow-hidden"
                     style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              <div className={`h-[140px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-[48px]`}
                   style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
                {p.emoji}
              </div>
              <div className="p-4">
                <div className="text-[10px] font-bold text-[#1E7FE8] uppercase tracking-[0.06em] mb-2">{p.cat}</div>
                <h2 className="font-heading font-bold text-[14px] text-white mb-2 leading-[1.35]">{p.title}</h2>
                <p className="text-[12px] text-[#8896AA] leading-[1.6] mb-3">{p.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-[11px] text-[#5A6B82]">
                    <span>📅 {p.date}</span>
                    <span>⏱ {p.read} read</span>
                  </div>
                  <button className="text-[11px] font-semibold text-[#F5A623] hover:underline">Read →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Have a lighting or automation question?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>WhatsApp us directly and our team will answer within 30 minutes during business hours.</p>
          <a href="https://wa.me/919920111774" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">
            💬 Ask on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
