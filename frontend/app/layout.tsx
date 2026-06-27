import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendPulse",
  description: "AI-powered review intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#eaddca] antialiased">
        {/* GLOBAL FIXED NAVBAR */}
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-[#2b241a]/10 px-12 py-4 bg-[#eaddca]">
          {/* Logo Group */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-2xl font-black tracking-tight text-[#2b241a]">
              TrendPulse
            </Link>
          </div>
          
          {/* Navigation Links & Buttons */}
          <div className="flex items-center gap-8 font-sans text-sm font-medium text-[#6e6353]">
            <Link href="#" className="hover:text-black transition-colors">Home</Link>
            <Link href="#" className="hover:text-black transition-colors">Features</Link>            
            <Link href="/login">
              <button className="flex items-center gap-1 rounded-full bg-[#526e3d] px-6 py-2.5 font-sans font-bold text-white hover:bg-[#435b32] transition-colors">
                Log in &rarr;
              </button>
            </Link>
            <Link href="/signup">
              <button className="flex items-center gap-1 rounded-full bg-[#526e3d] px-6 py-2.5 font-sans font-bold text-white hover:bg-[#435b32] transition-colors">
                Sign up &rarr;
              </button>
            </Link>
          </div>
        </nav>

        {/* This renders the actual individual page content below the nav */}
        {children}
        <footer className="relative w-full bg-[#3e2f20] px-16 py-16 text-[#c7baa8] overflow-hidden">
  
  {/* Giant Background Watermark Text */}
  <div className="absolute top-2 left-10 right-10 select-none opacity-[0.04] pointer-events-none">
    <h1 className="font-serif text-[9rem] font-black tracking-widest uppercase text-white leading-none">
      TrendPulse
    </h1>
  </div>

  {/* Top Section: Link Matrix Grid */}
  <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4 border-b border-white/10 pb-12 pt-14">
    
    {/* Column 1: Brand Info */}
    <div className="flex flex-col gap-3">
      <h3 className="font-serif text-2xl font-black text-[#a1be88]">
        TrendPulse
      </h3>
      <p className="max-w-[240px] font-sans text-sm leading-relaxed opacity-80">
        AI-powered review intelligence for local business owners.
      </p>
    </div>
  </div>

  {/* Bottom Section: Copyright & CTA Button */}
  <div className="relative z-10 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row font-sans text-xs opacity-70">
    <p>&copy; 2026 TrendPulse. All rights reserved.</p>

  </div>
</footer>
      </body>
    </html>
  );
}