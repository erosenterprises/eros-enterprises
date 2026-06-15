import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Lighting, Smart Controls & Security Hardware | Eros Enterprises",
  description: "Browse our curated product range — chandeliers, LED strips, smart switches, CCTV cameras and more. All products with manufacturer warranty and professional installation.",
};

const products = [
  { emoji: "🔆", bg: "from-[#0A1628] to-[#162842]", cat: "Chandelier", name: "Crystal Pendant XL", desc: "Hand-crafted K9 crystal, 80cm, 12 bulbs, dimmer compatible", price: "₹28,500" },
  { emoji: "🏮", bg: "from-[#1a1200] to-[#2e2000]", cat: "Chandelier", name: "Antique Brass Cluster", desc: "12-bulb statement piece, brushed brass finish, E27", price: "₹42,000" },
  { emoji: "💡", bg: "from-[#0D1E0A] to-[#162E12]", cat: "LED Strip", name: "Cove Light Pro Kit", desc: "5m RGBW strip + smart controller + aluminium profile channel", price: "₹4,200" },
  { emoji: "🔌", bg: "from-[#0A0A1A] to-[#14143A]", cat: "Smart", name: "Touch Switch 6-Gang", desc: "Wi-Fi, Alexa & Google Home, glass panel finish", price: "₹8,500" },
  { emoji: "📹", bg: "from-[#1A0A00] to-[#2A1500]", cat: "Security", name: "4MP IP Dome Camera", desc: "Indoor/outdoor, IR night vision, PoE, H.265 compression", price: "₹6,800" },
  { emoji: "🌿", bg: "from-[#001826] to-[#003348]", cat: "Outdoor", name: "Garden Spike Light (Set/4)", desc: "IP65, warm 3000K, 5W each, stainless steel spike", price: "₹3,600" },
  { emoji: "🔐", bg: "from-[#130022] to-[#220038]", cat: "Security", name: "Biometric Access Panel", desc: "Fingerprint + RFID + PIN, 1000-user capacity, weatherproof", price: "₹12,500" },
  { emoji: "📺", bg: "from-[#001818] to-[#003030]", cat: "Security", name: "8-Channel NVR Kit", desc: "4K NVR with 2TB HDD, supports 8 × IP cameras, HDMI output", price: "₹18,900" },
  { emoji: "🎛️", bg: "from-[#0A1628] to-[#0D2040]", cat: "Smart", name: "Scene Controller Panel", desc: "4-scene touch panel, wired, compatible with all major brands", price: "₹6,200" },
];

const cats = ["All", "Chandeliers", "LED Lights", "Smart Controls", "Security", "Outdoor", "Accessories"];

export default function ProductsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-bc"><span>Home</span><span className="text-[#8896AA]">›</span><span className="bc-cur">Products</span></div>
          <div className="eros-eyebrow mb-1.5">Product Catalogue</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            Premium Lighting & <span className="text-[#F5A623]">Smart Products</span>
          </h1>
          <p className="text-[14px] text-[#8896AA] leading-[1.7]">All products supplied with manufacturer warranty and available with professional installation.</p>
          <div className="flex gap-2 flex-wrap mt-5">
            {cats.map((c, i) => (
              <button key={c} className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${i===0 ? "bg-[#1565C0] text-white" : "text-[#8896AA] hover:text-[#F5A623]"}`}
                      style={i===0 ? {} : {background:"rgba(21,101,192,0.1)",border:"1px solid rgba(21,101,192,0.22)"}}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.name} className="rounded-[14px] overflow-hidden"
                 style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
              <div className={`h-[130px] bg-gradient-to-br ${p.bg} flex items-center justify-center text-[48px]`}
                   style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
                {p.emoji}
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase text-[#5B9BD5] mb-1.5"
                     style={{background:"rgba(21,101,192,0.14)",border:"1px solid rgba(21,101,192,0.22)"}}>
                  {p.cat}
                </div>
                <div className="font-heading font-bold text-[14px] text-white mb-1.5">{p.name}</div>
                <div className="text-[12px] text-[#8896AA] mb-2.5 leading-[1.5]">{p.desc}</div>
                <div className="flex items-center justify-between">
                  <div className="text-[16px] font-extrabold text-[#F5A623]">{p.price}</div>
                  <Link href="/contact"
                    className="bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-3.5 py-1.5 rounded-[6px] text-[11px] font-semibold transition-colors">
                    Enquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-10 py-12 text-center"
           style={{background:"linear-gradient(130deg,#0C2060 0%,#0E3080 50%,#0A1840 100%)",borderTop:"1px solid rgba(21,101,192,0.4)"}}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-heading font-extrabold text-[24px] text-white mb-2.5">Need something not listed?</h2>
          <p className="text-[14px] mb-6" style={{color:"rgba(255,255,255,0.65)"}}>We source and supply products on request. Tell us what you are looking for.</p>
          <a href="https://wa.me/919920111774" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 bg-[#F5A623] text-[#050A14] px-5 py-3 rounded-[8px] text-[13px] font-bold">
            💬 WhatsApp Your Requirement
          </a>
        </div>
      </div>
    </>
  );
}
