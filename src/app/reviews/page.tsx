import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Reviews — 4.9★ Rated Lighting & Automation Company | Eros Enterprises",
  description: "Read genuine reviews from 120+ homeowners, architects and facility managers across Mumbai who have used Eros Enterprises for lighting, security and automation.",
};

const reviews = [
  { initials:"RS", name:"Rajesh Shah", loc:"Juhu, Mumbai", role:"Homeowner", svc:"Lighting", col:"blue", quote:"Eros completely transformed our villa. The chandelier they recommended is stunning — cove lighting in every room sets the perfect mood. Very professional team from start to finish." },
  { initials:"PM", name:"Priya Mehta", loc:"BKC, Mumbai", role:"Facility Manager", svc:"AMC", col:"gold", quote:"We have been on their AMC plan for 3 years. Response always within the promised time and the team is extremely knowledgeable. Complete peace of mind for our facility." },
  { initials:"AK", name:"Amit Kulkarni", loc:"Powai, Mumbai", role:"Office Owner", svc:"Security", col:"green", quote:"CCTV and access control installed flawlessly across our entire office. The remote monitoring app is excellent. Great value for money and outstanding service." },
  { initials:"DT", name:"Deepa Thakur", loc:"Bandra, Mumbai", role:"Homeowner", svc:"Smart", col:"gold", quote:"The smart home automation Eros installed is genuinely life-changing. One app controls everything — lights, climate, security. I only wish I had done it sooner." },
  { initials:"SK", name:"Sunita Kapoor", loc:"BKC, Mumbai", role:"COO, Finance Firm", svc:"Automation", col:"blue", quote:"Eros handled everything from first meeting to final handover. The quality of work and professionalism of the team was outstanding. We have referred them to two subsidiary offices already." },
  { initials:"VR", name:"Vikram Rao", loc:"Andheri, Mumbai", role:"Showroom Owner", svc:"Lighting", col:"blue", quote:"The jewellery display lighting they designed is perfect. Our products look incredible under the high-CRI spotlights. Sales have visibly improved since the installation." },
];

function svcBadge(col: string, svc: string) {
  const styles: Record<string, {bg:string,border:string,text:string}> = {
    blue: {bg:"rgba(21,101,192,0.14)",border:"rgba(21,101,192,0.25)",text:"#5B9BD5"},
    gold: {bg:"rgba(245,166,35,0.12)",border:"rgba(245,166,35,0.3)",text:"#F5A623"},
    green:{bg:"rgba(37,211,102,0.1)",border:"rgba(37,211,102,0.25)",text:"#25D366"},
  };
  const s = styles[col] || styles.blue;
  return {background:s.bg,borderColor:s.border,color:s.text};
}

export default function ReviewsPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-[#0C1E42] to-[#050A14] px-6 lg:px-10 py-12 text-center"
           style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[1100px] mx-auto">
          <div className="eros-eyebrow mb-1.5">Client Testimonials</div>
          <h1 className="font-heading font-extrabold text-[30px] text-white mb-2.5">
            What Our <span className="text-[#F5A623]">Clients Say</span>
          </h1>
          <p className="text-[14px] text-[#8896AA] max-w-[400px] mx-auto">Genuine reviews from homeowners, architects, facility managers and business owners.</p>
        </div>
      </div>

      {/* Rating summary */}
      <div className="bg-[#0A1628] px-6 lg:px-10 py-8" style={{borderBottom:"1px solid rgba(21,101,192,0.22)"}}>
        <div className="max-w-[680px] mx-auto grid sm:grid-cols-2 gap-8 items-center">
          <div className="text-center">
            <div className="font-heading text-[64px] font-extrabold text-white leading-none">4.9</div>
            <div className="text-[20px] text-[#F5A623] tracking-[3px] my-1">★★★★★</div>
            <div className="text-[12px] text-[#8896AA]">Based on 120+ reviews</div>
          </div>
          <div className="space-y-2">
            {[["5★", "92%"], ["4★", "6%"], ["3★", "2%"], ["2★", "0%"], ["1★", "0%"]].map(([star, pct]) => (
              <div key={star} className="flex items-center gap-2.5 text-[12px] text-[#8896AA]">
                <span className="w-6">{star}</span>
                <div className="flex-1 h-[6px] rounded-[3px] overflow-hidden" style={{background:"rgba(255,255,255,0.08)"}}>
                  <div className="h-full rounded-[3px] bg-[#F5A623]" style={{width:pct}} />
                </div>
                <span className="w-7 text-right">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 py-8">
        <div className="grid sm:grid-cols-2 gap-4">
          {reviews.map((r) => {
            const badge = svcBadge(r.col, r.svc);
            return (
              <div key={r.name} className="rounded-[14px] p-5"
                   style={{background:"#0F1F3D",border:"1px solid rgba(21,101,192,0.22)"}}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-[#5B9BD5]"
                         style={{background:"rgba(21,101,192,0.2)",border:"1px solid rgba(21,101,192,0.3)"}}>
                      {r.initials}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">{r.name}</div>
                      <div className="text-[10px] text-[#8896AA]">{r.loc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-[4px] border"
                        style={badge}>{r.svc}</span>
                </div>
                <div className="text-[#F5A623] text-[11px] tracking-[2px] mb-2.5">★★★★★</div>
                <p className="text-[12px] text-[#B0B8CC] leading-[1.7] italic">&ldquo;{r.quote}&rdquo;</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1565C0] hover:bg-[#1E7FE8] text-white px-5 py-3 rounded-[8px] text-[13px] font-semibold transition-colors">
            Leave Your Review ★
          </Link>
        </div>
      </div>
    </>
  );
}
