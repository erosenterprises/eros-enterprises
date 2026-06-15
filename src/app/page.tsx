import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const stats = [
  { num: "500+", label: "Projects Delivered" },
  { num: "15+", label: "Years Experience" },
  { num: "4", label: "Service Verticals" },
  { num: "48hr", label: "AMC Response" },
];

const services = [
  {
    icon: "💡", title: "Decorative Lighting (ELV)",
    desc: "Chandelier installations, cove lighting, facade illumination, and bespoke design for homes and commercial spaces.",
    features: ["Chandelier supply & installation", "LED cove & profile lighting", "Facade & landscape lighting"],
    href: "/services/decorative-lighting",
  },
  {
    icon: "🔒", title: "Security Systems",
    desc: "CCTV, access control, video door phones, and alarm systems — complete security for homes and offices.",
    features: ["CCTV & NVR systems", "Biometric access control", "Video door phones"],
    href: "/services/security-systems",
  },
  {
    icon: "⚙️", title: "Smart Automation (AUT)",
    desc: "Home and office automation — smart switches, scene control, voice integration, and energy management.",
    features: ["Smart switches & dimmers", "Alexa & Google Home", "Energy monitoring"],
    href: "/services/smart-automation",
  },
  {
    icon: "🔧", title: "AMC Contracts",
    desc: "Annual Maintenance Contracts with guaranteed response times. Keep systems at peak performance year-round.",
    features: ["Basic / Standard / Premium tiers", "Emergency callout included", "Spare parts coverage"],
    href: "/services/amc-services",
  },
];

const whyUs = [
  { n: "1", title: "End-to-End Ownership", desc: "We design, supply, install and maintain — no handoffs to third parties." },
  { n: "2", title: "Transparent Quotations", desc: "Detailed line-item quotes with zero hidden costs. What you see is what you pay." },
  { n: "3", title: "On-Time Delivery", desc: "We commit to timelines and honour them. Professionally managed projects." },
  { n: "4", title: "Dedicated AMC Support", desc: "Post-sale service backed by SLA guarantees and a dedicated ops team." },
];

const metrics = [
  { num: "500+", label: "Projects Completed" },
  { num: "15+", label: "Years in Business" },
  { num: "98%", label: "Client Satisfaction" },
  { num: "50+", label: "Team Members" },
];

const projects = [
  { tag: "Residential", tag2: null as null | string, emoji: "🏠", bg: "from-[#091b37] to-[#0F2D54]", title: "Juhu Villa — Full Lighting", desc: "Interior, cove, facade & garden for 5,000 sq ft luxury villa.", loc: "Juhu", year: "2025" },
  { tag: "Commercial", tag2: "Automation", emoji: "🏢", bg: "from-[#1c0800] to-[#311400]", title: "BKC Corporate HQ", desc: "Smart automation, CCTV & lighting for 8,000 sq ft office.", loc: "BKC", year: "2024" },
  { tag: "Hospitality", tag2: null as null | string, emoji: "🏨", bg: "from-[#07180e] to-[#0e2d1c]", title: "Hotel Powai — Lobby", desc: "Bespoke chandelier array and atmospheric lighting.", loc: "Powai", year: "2025" },
  { tag: "Retail", tag2: "Security", emoji: "🛍", bg: "from-[#130022] to-[#220038]", title: "Jewellery Showroom", desc: "High-CRI spotlight, CCTV & access control.", loc: "Andheri", year: "2024" },
  { tag: "Residential", tag2: "Smart", emoji: "🏡", bg: "from-[#001826] to-[#003348]", title: "Smart Home, Bandra", desc: "Full automation — lighting scenes, climate & security.", loc: "Bandra", year: "2025" },
  { tag: "Industrial", tag2: null as null | string, emoji: "🏭", bg: "from-[#1a1200] to-[#2e2000]", title: "Factory Campus, Thane", desc: "Industrial LED flood lighting and perimeter security.", loc: "Thane", year: "2024" },
];

const products = [
  { emoji: "🔆", bg: "from-[#0A1628] to-[#162842]", cat: "Chandelier", name: "Crystal Pendant XL", price: "₹28,500" },
  { emoji: "💡", bg: "from-[#0D1E0A] to-[#162E12]", cat: "LED Strip", name: "Cove Light Pro Kit", price: "₹4,200" },
  { emoji: "📹", bg: "from-[#1A0A00] to-[#2A1500]", cat: "Security", name: "4MP IP Camera", price: "₹6,800" },
  { emoji: "🔌", bg: "from-[#0A0A1A] to-[#14143A]", cat: "Smart", name: "Touch Switch 6-Gang", price: "₹8,500" },
];

const testimonials = [
  { initials: "RS", name: "Rajesh Shah", loc: "Juhu, Mumbai · Homeowner", svc: "Lighting", svcColor: "blue", quote: "Eros transformed our villa completely. The chandelier they recommended is now the focal point of our living room. Exceptional quality and a very professional team." },
  { initials: "PM", name: "Priya Mehta", loc: "BKC, Mumbai · Facility Manager", svc: "AMC", svcColor: "gold", quote: "We have had their AMC contract for 3 years. Response is always within the promised time and the team is extremely knowledgeable. Complete peace of mind." },
  { initials: "AK", name: "Amit Kulkarni", loc: "Powai, Mumbai · Office Owner", svc: "Security", svcColor: "green", quote: "They installed CCTV and access control across our entire office. The system works flawlessly and the remote monitoring app is excellent." },
];

const brands = ["Philips", "Havells", "Hikvision", "Dahua", "Legrand", "Schneider", "Lutron", "Wipro"];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-20 lg:py-24 min-h-[520px] flex items-center">
        <div className="absolute top-[-80px] right-[-60px] w-[440px] h-[440px] rounded-full pointer-events-none"
             style={{background:"radial-gradient(circle,rgba(21,101,192,0.09) 0%,transparent 70%)"}} />
        <div className="max-w-[1100px] mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-[1fr_250px] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold text-[#F5A623] uppercase tracking-[0.06em] mb-5"
                   style={{background:"rgba(245,166,35,0.12)",border:"1px solid rgba(245,166,35,0.3)"}}>
                Mumbai&apos;s Premier Lighting &amp; ELV Integrator
              </div>
              <h1 className="font-heading font-extrabold text-[40px] lg:text-[50px] text-white leading-[1.1] mb-4 max-w-[520px]">
                Lighting that{" "}<em className="not-italic text-[#F5A623]">Elevates</em><br />Every Space
              </h1>
              <p className="text-[15px] text-[#8896AA] leading-[1.75] max-w-[460px] mb-7">
                From chandelier installations to smart automation and security systems — Eros Enterprises designs,
                supplies, and maintains environments that inspire. Trusted by 500+ clients since 2009.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors">
                  Book Free Site Visit
                </Link>
                <Link href="/projects"
                  className="inline-flex items-center gap-2 text-[#E8EAF0] px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors"
                  style={{border:"1px solid rgba(255,255,255,0.18)"}}>
                  View Projects
                </Link>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col gap-2.5 flex-wrap">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 min-w-[85px] rounded-[12px] px-4 py-3.5 text-center"
                     style={{background:"rgba(15,31,61,0.85)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  <div className="font-heading text-[28px] font-extrabold text-[#F5A623] leading-none">{s.num}</div>
                  <div className="text-[10px] text-[#8896AA] uppercase tracking-[0.05em] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-[#0F1F3D]" style={{borderTop:"1px solid rgba(21,101,192,0.22)",borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🛡️", title: "ISO Certified", sub: "Quality Assured" },
            { icon: "⏱️", title: "48-Hour SLA", sub: "AMC Guaranteed" },
            { icon: "🏗️", title: "500+ Projects", sub: "Across Mumbai" },
            { icon: "🎧", title: "24/7 Support", sub: "For AMC Clients" },
          ].map((t, i) => (
            <div key={t.title} className={`flex items-center gap-3 px-5 py-4 ${i<3?"border-r":""} ${i<2?"border-b lg:border-b-0":""}`}
                 style={{borderColor:"rgba(255,255,255,0.06)"}}>
              <div className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[18px] flex-shrink-0"
                   style={{background:"rgba(21,101,192,0.14)"}}>
                {t.icon}
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">{t.title}</div>
                <div className="text-[11px] text-[#8896AA]">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">What We Do</div>
          <h2 className="font-heading font-extrabold text-[28px] text-white mb-2.5">Our <span className="text-[#F5A623]">Services</span></h2>
          <p className="text-[14px] text-[#8896AA] max-w-[480px] leading-[1.7] mb-8">End-to-end solutions across decorative lighting, security, smart automation, and maintenance contracts.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="relative overflow-hidden group rounded-[14px] p-6"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)",transition:"border-color 0.2s"}}>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px] bg-[#1565C0] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-[46px] h-[46px] rounded-[11px] flex items-center justify-center text-[22px] mb-3.5"
                     style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  {s.icon}
                </div>
                <h3 className="font-heading font-bold text-[16px] text-white mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-[#8896AA] leading-[1.6] mb-3">{s.desc}</p>
                <ul className="space-y-1.5 mb-4">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-[12px] text-[#B0B8CC]">
                      <CheckCircle2 className="w-3 h-3 text-[#25D366] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#F5A623] hover:gap-2 transition-all">
                  Explore service <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[#0A1628] px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="eros-eyebrow mb-1.5">Why Eros</div>
              <h2 className="font-heading font-extrabold text-[28px] text-white mb-2.5">15 Years of <span className="text-[#F5A623]">Trusted</span> Expertise</h2>
              <p className="text-[14px] text-[#8896AA] leading-[1.7] mb-6">Built on quality, transparency, and long-term client relationships.</p>
              <div className="space-y-4">
                {whyUs.map((w) => (
                  <div key={w.n} className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 bg-[#1565C0] rounded-[9px] flex items-center justify-center font-heading font-extrabold text-[13px] text-white flex-shrink-0">{w.n}</div>
                    <div>
                      <div className="font-semibold text-[14px] text-white mb-0.5">{w.title}</div>
                      <div className="text-[12px] text-[#8896AA] leading-[1.6]">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-[14px] p-5 text-center"
                     style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                  <div className="font-heading text-[34px] font-extrabold text-[#F5A623] leading-none">{m.num}</div>
                  <div className="text-[11px] text-[#8896AA] mt-1.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Our Work</div>
          <h2 className="font-heading font-extrabold text-[28px] text-white mb-2.5">Featured <span className="text-[#F5A623]">Projects</span></h2>
          <p className="text-[14px] text-[#8896AA] max-w-[480px] leading-[1.7] mb-8">Recent installations across Mumbai&apos;s premier residential and commercial spaces.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {projects.map((p) => (
              <div key={p.title} className="rounded-[14px] overflow-hidden"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className={`h-[155px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-[50px] relative`}>
                  <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                    <span className="tag-gold">{p.tag}</span>
                    {p.tag2 && <span className="tag-blue">{p.tag2}</span>}
                  </div>
                  {p.emoji}
                </div>
                <div className="p-3.5">
                  <h3 className="font-heading font-bold text-[13px] text-white mb-1">{p.title}</h3>
                  <p className="text-[11px] text-[#8896AA] mb-2">{p.desc}</p>
                  <div className="flex gap-2.5 text-[10px] text-[#5A6B82]">
                    <span>📍 {p.loc}</span><span>📅 {p.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link href="/projects" className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#0A1628] px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Products</div>
          <h2 className="font-heading font-extrabold text-[28px] text-white mb-2.5">Premium <span className="text-[#F5A623]">Product Range</span></h2>
          <p className="text-[14px] text-[#8896AA] max-w-[480px] leading-[1.7] mb-8">Curated lighting, smart controls, and security hardware with professional installation.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((p) => (
              <div key={p.name} className="rounded-[14px] overflow-hidden"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className={`h-[106px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-[40px]`}
                     style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
                  {p.emoji}
                </div>
                <div className="p-3">
                  <div className="text-[10px] font-bold text-[#1E7FE8] uppercase tracking-[0.05em] mb-1">{p.cat}</div>
                  <div className="font-heading font-semibold text-[12px] text-white mb-1.5">{p.name}</div>
                  <div className="text-[13px] font-bold text-[#F5A623] mb-2">{p.price}</div>
                  <button className="w-full rounded-[5px] py-1.5 text-[11px] font-semibold text-[#5B9BD5] transition-colors"
                          style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors">
              Browse Full Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 lg:px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Testimonials</div>
          <h2 className="font-heading font-extrabold text-[28px] text-white mb-2.5">What Clients <span className="text-[#F5A623]">Say</span></h2>
          <p className="text-[14px] text-[#8896AA] max-w-[480px] leading-[1.7] mb-8">Genuine feedback from homeowners, architects, facility managers, and business owners.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {testimonials.map((t) => (
              <div key={t.name} className="relative rounded-[14px] p-5"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className="text-[30px] text-[#F5A623] leading-none mb-1.5 font-serif" style={{opacity:0.2}}>&ldquo;</div>
                <div className="text-[#F5A623] text-[11px] tracking-[2px] mb-2.5">★★★★★</div>
                <div className="absolute top-3.5 right-3.5">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-[4px] border ${
                    t.svcColor==="blue" ? "text-[#5B9BD5]" :
                    t.svcColor==="gold" ? "text-[#F5A623]" : "text-[#25D366]"
                  }`} style={{
                    background: t.svcColor==="blue" ? "rgba(21,101,192,0.14)" : t.svcColor==="gold" ? "rgba(245,166,35,0.12)" : "rgba(37,211,102,0.1)",
                    borderColor: t.svcColor==="blue" ? "rgba(21,101,192,0.25)" : t.svcColor==="gold" ? "rgba(245,166,35,0.3)" : "rgba(37,211,102,0.25)"
                  }}>{t.svc}</span>
                </div>
                <p className="text-[12px] text-[#B0B8CC] leading-[1.7] italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-[#5B9BD5]"
                       style={{background:"rgba(21,101,192,0.2)",border:"1px solid rgba(21,101,192,0.3)"}}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-white">{t.name}</div>
                    <div className="text-[10px] text-[#8896AA]">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <div className="bg-[#0A1628] py-7 px-6 lg:px-10"
           style={{borderTop:"1px solid rgba(255,255,255,0.06)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div className="text-[11px] font-semibold text-[#8896AA] uppercase tracking-[0.1em] text-center mb-5">Trusted Brands We Install &amp; Supply</div>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {brands.map((b) => (
            <div key={b} className="rounded-[7px] px-4 py-2 text-[11px] font-bold text-[#8896AA] uppercase tracking-[0.06em]"
                 style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 lg:px-10 py-14 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)",borderBottom:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[28px] lg:text-[32px] text-white mb-2.5">Ready to Transform Your Space?</h2>
          <p className="text-[14px] mb-7" style={{color:"rgba(255,255,255,0.65)"}}>Talk to our experts. Get a free site visit and customised quote within 24 hours.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold hover:brightness-105 transition-all">
              💬 WhatsApp Us Now
            </a>
            <a href={`tel:${siteConfig.phone}`}
               className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-semibold text-white transition-colors"
               style={{border:"1px solid rgba(255,255,255,0.3)"}}>
              📞 Call {siteConfig.phone}
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] text-[13px] font-semibold text-white transition-colors"
              style={{border:"1px solid rgba(255,255,255,0.3)"}}>
              📅 Book Site Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
