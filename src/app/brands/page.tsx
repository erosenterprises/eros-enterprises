import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands We Supply — Philips, Havells, Hikvision & More | Eros Enterprises",
  description: "Eros Enterprises stocks and installs products from Philips, Havells, Hikvision, Dahua, Legrand, Schneider, Lutron and Wipro. All with original manufacturer warranty.",
};

const brands = [
  { emoji: "💡", name: "Philips", cat: "Lighting", catColor: "blue", desc: "LED lamps, downlights, panel lights, outdoor fixtures and Philips Hue smart lighting systems." },
  { emoji: "⚡", name: "Havells", cat: "Electrical", catColor: "blue", desc: "Switches, fans, wiring accessories, LED batten lights and home appliances." },
  { emoji: "📹", name: "Hikvision", cat: "Security", catColor: "blue", desc: "IP cameras, NVR systems, AI-powered surveillance, access control and alarm systems." },
  { emoji: "🔒", name: "Dahua", cat: "Security", catColor: "blue", desc: "Full HD surveillance cameras, video management systems and network video recorders." },
  { emoji: "🏠", name: "Legrand", cat: "Smart", catColor: "gold", desc: "Modular switches, home automation panels, electrical enclosures and energy meters." },
  { emoji: "⚙️", name: "Schneider", cat: "Smart", catColor: "gold", desc: "Smart home switches, EV chargers, energy management systems and MCB panels." },
  { emoji: "🎛️", name: "Lutron", cat: "Premium", catColor: "gold", desc: "Premium dimmer systems, motorised shades, keypads and sophisticated scene control panels." },
  { emoji: "🔆", name: "Wipro", cat: "Lighting", catColor: "blue", desc: "Industrial LED fixtures, street lights, commercial panels and area lighting solutions." },
];

const catStyle = {
  blue: { bg: "rgba(21,101,192,0.14)", border: "rgba(21,101,192,0.25)", text: "#5B9BD5" },
  gold: { bg: "rgba(245,166,35,0.12)", border: "rgba(245,166,35,0.3)", text: "#F5A623" },
};

export default function BrandsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Brands</span></div>
          <div className="eros-eyebrow mb-1.5">Our Partners</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Trusted <span className="text-[#F5A623]">Brands</span> We Supply & Install
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">We stock and install products from leading global and Indian manufacturers. All products carry original manufacturer warranty.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((b) => {
            const cs = catStyle[b.catColor as keyof typeof catStyle];
            return (
              <div key={b.name} className="rounded-[14px] p-5 text-center"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className="w-[54px] h-[54px] rounded-[12px] flex items-center justify-center mx-auto mb-3 text-[26px]"
                     style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  {b.emoji}
                </div>
                <h2 className="font-heading font-bold text-[14px] text-white mb-2">{b.name}</h2>
                <p className="text-[12px] text-[#8896AA] leading-[1.5] mb-3">{b.desc}</p>
                <span className="inline-block px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase"
                      style={{background:cs.bg,border:`1px solid ${cs.border}`,color:cs.text}}>
                  {b.cat}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
