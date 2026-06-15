import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Eros Enterprises, Mumbai's Trusted ELV Partner Since 2009",
  description: "Learn about Eros Enterprises — 15 years of decorative lighting, security systems and smart automation across Mumbai. 500+ projects, 50+ team members, 4.9★ client rating.",
};

const values = [
  { title: "Quality First", desc: "We only source from certified manufacturers. Every installation is tested before handover." },
  { title: "On-Time Delivery", desc: "We commit to timelines and honour them. No surprises, no delays." },
  { title: "Post-Sale Support", desc: "Our relationship does not end at installation. AMC contracts keep us accountable long-term." },
  { title: "Transparent Pricing", desc: "Detailed quotations with no hidden costs. You know exactly what you are paying for." },
];

const team = [
  { init: "VM", name: "Vikram Mehta", role: "Founder & Director" },
  { init: "RE", name: "Rohan Eros", role: "Head of Projects" },
  { init: "AS", name: "Anjali Shah", role: "Lead Designer" },
  { init: "KN", name: "Kiran Nair", role: "AMC & Operations" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero split */}
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14]" style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">About Us</span></div>
            <div className="eros-eyebrow mb-1.5">About Eros Enterprises</div>
            <h1 className="font-heading font-extrabold text-[30px] text-white mb-3">
              15 Years of <span className="text-[#F5A623]">Lighting</span><br />with Purpose
            </h1>
            <p className="text-[14px] text-[#8896AA] leading-[1.75] mb-6">
              Founded in Mumbai in 2009, Eros Enterprises has grown from a decorative lighting showroom into a comprehensive ELV integrator — delivering lighting, security, and automation solutions to homes, hotels, offices and retail spaces across Maharashtra.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors">Get in Touch</Link>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-semibold text-white" style={{border:"1px solid rgba(255,255,255,0.18)"}}>Download Company Profile</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[["2009","Founded"],["500+","Projects"],["50+","Team Members"],["4.9★","Client Rating"]].map(([num,lbl]) => (
              <div key={lbl} className="rounded-[12px] p-5 text-center" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className="font-heading text-[30px] font-extrabold text-[#F5A623]">{num}</div>
                <div className="text-[11px] text-[#8896AA] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <section className="bg-[#0A1628] px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Our Values</div>
          <h2 className="font-heading font-extrabold text-[26px] text-white mb-7">What We <span className="text-[#F5A623]">Stand For</span></h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {values.map((v) => (
              <div key={v.title} className="p-4" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)",borderLeft:"3px solid #1565C0",borderRadius:"0 10px 10px 0"}}>
                <h3 className="font-semibold text-[14px] text-[#E8EAF0] mb-1.5">{v.title}</h3>
                <p className="text-[12px] text-[#8896AA] leading-[1.55]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Our Team</div>
          <h2 className="font-heading font-extrabold text-[26px] text-white mb-7">The People <span className="text-[#F5A623]">Behind the Work</span></h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-[14px] p-5 text-center" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className="w-[58px] h-[58px] rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-[18px] text-[#5B9BD5]"
                     style={{background:"rgba(21,101,192,0.2)",border:"2px solid rgba(21,101,192,0.3)"}}>
                  {t.init}
                </div>
                <div className="font-heading font-bold text-[14px] text-white mb-1">{t.name}</div>
                <div className="text-[12px] text-[#F5A623]">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Want to work with us?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>Reach out for a free consultation or to discuss a long-term partnership.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">Get in Touch</Link>
          </div>
        </div>
      </div>
    </>
  );
}
