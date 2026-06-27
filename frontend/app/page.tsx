import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#eaddca] text-[#2b241a] antialiased selection:bg-green-200">

      {/* 2. HERO SPLIT CONTAINER */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-between gap-12 px-8 py-16 lg:flex-row">
        
        {/* LEFT COLUMN: HERO TEXT & CTA */}
        <main className="flex flex-1 flex-col items-start gap-6 max-w-2xl">
          {/* Subtitle Badge */}
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#556b2f]">
            AI Review Analysis
          </span>
          
          {/* Massive Headline */}
          <h1 className="font-serif text-6xl font-black leading-[0.9] tracking-tighter text-[#2b241a] sm:text-7xl md:text-[5.5rem]">
            Turn reviews <br />
            <span className="text-[#4c6a37]">into revenue.</span>
          </h1>
          
          {/* Subparagraph */}
          <p className="max-w-md font-sans text-base leading-relaxed text-[#5c5346]">
            Upload customer feedback. TrendPulse finds the trends your competitors 
            haven't spotted yet — in under 30 seconds.
          </p>
          

          {/* Micro pills under buttons */}
          <div className="flex flex-wrap gap-2 pt-6 font-sans text-xs font-medium">
            <span className="rounded-full bg-[#cbe3b3] px-4 py-1.5 text-[#354f24]">2M+ reviews</span>
            <span className="rounded-full bg-[#cbe3b3] px-4 py-1.5 text-[#354f24]">&lt;30s</span>
            <span className="rounded-full bg-[#cbe3b3] px-4 py-1.5 text-[#354f24]">best suggestions</span>
          </div>
        </main>

        {/* RIGHT COLUMN: INTERACTIVE CARD/WIDGET */}
        <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl border border-[#2b241a]/10 bg-[#e3d5c1] p-6 shadow-sm">
          
          {/* Mini Chart Row */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-2xl bg-[#cbe3b3]/60 p-4 border border-[#4c6a37]/10">
              <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#354f24]/70">Trending Now</span>
              <h3 className="font-serif text-2xl font-bold text-[#354f24] mt-1">Matcha Latte</h3>
              <p className="font-sans text-xs text-[#4c6a37] mt-0.5">+16pp velocity &middot; 30d</p>
              <div className="mt-3 h-1.5 w-full rounded-full bg-[#4c6a37]/20">
                <div className="h-full w-[85%] rounded-full bg-[#4c6a37]"></div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-[#2b241a]/10 bg-[#eaddca]/60 p-4 w-[40%]">
              <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-[#5c5346]">Sentiment</span>
              <h3 className="font-serif text-3xl font-bold text-[#2b241a] mt-1">+0.68</h3>
              <p className="font-sans text-xs text-[#5c5346] mt-0.5">&uarr; vs last month</p>
            </div>
          </div>

          {/* Top Opportunity Row */}
          <div className="rounded-2xl border border-[#2b241a]/10 bg-[#f5eade] p-4">
            <p className="font-sans text-xs font-medium text-[#5c5346]">
              <span className="font-semibold text-[#2b241a]">Top opportunity:</span> Cold Brew Launch &middot; <span className="text-[#4c6a37] font-semibold">Feasibility: High</span>
            </p>
          </div>

         
          

        </div>
        
      </div>
    </div>
  );
  
}
