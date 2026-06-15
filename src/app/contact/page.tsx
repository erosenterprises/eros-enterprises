import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Free Site Visit & Quote | Eros Enterprises Mumbai",
  description: "Contact Eros Enterprises for a free site visit, lighting consultation, or quick quote. Call +91 99201 11774 or WhatsApp for same-day response.",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-10"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Contact</span></div>
          <div className="eros-eyebrow mb-1.5">Get In Touch</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Let&apos;s <span className="text-[#F5A623]">Talk</span>
          </h1>
          <p className="text-[14px] text-[#8896AA]">We respond within 2 business hours. Free site visit available across all of Mumbai.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Left: info */}
        <div>
          <h2 className="font-heading font-bold text-[22px] text-white mb-2.5">We&apos;re a message away</h2>
          <p className="text-[14px] text-[#8896AA] leading-[1.7] mb-7">Get in touch for a free site visit, product enquiry, quotation, or to discuss your project. We serve all of Mumbai and surrounding areas.</p>

          <div className="space-y-5 mb-8">
            {[
              { icon:"📞", label:"Phone", val:"+91 99201 11774", href:"tel:+919920111774" },
              { icon:"💬", label:"WhatsApp", val:"99201 11774", href:"https://wa.me/919920111774" },
              { icon:"✉️", label:"Email", val:"info@erosenterprises.in", href:"mailto:info@erosenterprises.in" },
              { icon:"🌐", label:"Website", val:"erosenterprises.in", href:"https://erosenterprises.in" },
              { icon:"⏰", label:"Business Hours", val:"Mon–Sat, 9:00am – 7:00pm", href:null as null|string },
            ].map((c) => (
              <div key={c.label} className="flex gap-3.5 items-start">
                <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[20px] flex-shrink-0"
                     style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  {c.icon}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#E8EAF0] mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-[13px] text-[#8896AA] hover:text-white transition-colors">{c.val}</a>
                  ) : (
                    <span className="text-[13px] text-[#8896AA]">{c.val}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp box */}
          <div className="rounded-[14px] p-5" style={{background:"rgba(37,211,102,0.06)",border:"1px solid rgba(37,211,102,0.2)"}}>
            <div className="font-bold text-[13px] text-[#25D366] mb-1.5 flex items-center gap-2">💬 WhatsApp for Fastest Response</div>
            <p className="text-[12px] text-[#8896AA] mb-3">Send your requirement on WhatsApp and get a reply within 30 minutes during business hours. No sign-up needed.</p>
            <a href="https://wa.me/919920111774" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-[#25D366] text-[#050A14] px-4 py-2 rounded-[7px] text-[12px] font-bold">
              Open WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-[14px] p-6" style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
          <h3 className="font-heading font-bold text-[18px] text-white mb-1.5">Send an Enquiry</h3>
          <p className="text-[12px] text-[#8896AA] mb-5">We will get back to you within 2 hours.</p>
          <div className="space-y-3">
            {[
              { label:"Your Name", type:"text", ph:"Rahul Sharma" },
              { label:"Phone / WhatsApp", type:"tel", ph:"+91 98765 43210" },
              { label:"Email Address", type:"email", ph:"rahul@example.com" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-[11px] font-semibold text-[#8896AA] uppercase tracking-[0.05em] mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.ph} className="eros-input" />
              </div>
            ))}
            <div>
              <label className="block text-[11px] font-semibold text-[#8896AA] uppercase tracking-[0.05em] mb-1.5">Service Required</label>
              <select className="eros-input" style={{appearance:"none"}}>
                <option>Select a service...</option>
                <option>Decorative Lighting</option>
                <option>Security Systems</option>
                <option>Smart Automation</option>
                <option>AMC Contract</option>
                <option>Product Enquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#8896AA] uppercase tracking-[0.05em] mb-1.5">Property Type</label>
              <select className="eros-input" style={{appearance:"none"}}>
                <option>Select type...</option>
                <option>Residential</option>
                <option>Commercial Office</option>
                <option>Hotel / Hospitality</option>
                <option>Retail / Showroom</option>
                <option>Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#8896AA] uppercase tracking-[0.05em] mb-1.5">Message</label>
              <textarea className="eros-input" rows={4} placeholder="Tell us about your project or requirement..." />
            </div>
            <button className="w-full bg-[#1565C0] hover:bg-[#1E7FE8] text-white py-3 rounded-[8px] text-[13px] font-semibold transition-colors flex items-center justify-center gap-2">
              ✉️ Send Enquiry
            </button>
            <p className="text-[11px] text-center" style={{color:"#5A6B82"}}>We reply within 2 business hours · No spam, ever</p>
          </div>
        </div>
      </div>
    </>
  );
}
