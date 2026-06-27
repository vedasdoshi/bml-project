"use client";

import { useState, useEffect } from "react";

export default function WorkspaceDashboard() {
  const [userName, setUserName] = useState("Guest");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (storedUsers.length > 0) {
        const latestUser = storedUsers[storedUsers.length - 1];
        setUserName(latestUser.name || "User");
      }
    } catch (e) { console.error(e); }
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileText = event.target?.result as string;
      await processAnalysis(fileText); // Extracts and passes the real file content
    };
    reader.readAsText(file);
  };

  const processAnalysis = async (rawText: string) => {
    setLoading(true);
    setReport(null);
    setCurrentStep(1);

    // Progress pipeline animation steps
    const step2 = setTimeout(() => setCurrentStep(2), 1000);
    const step3 = setTimeout(() => setCurrentStep(3), 2000);
    const step4 = setTimeout(() => setCurrentStep(4), 3000);
    const step5 = setTimeout(() => setCurrentStep(5), 4000);

    try {
      // Fires the text data directly to your local route handler
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileContent: rawText })
      });

      const data = await res.json();

      if (data.success) {
        setReport(data.report); // Plugs the unique Gemini generated response object into your cards
      } else {
        alert("AI Processing failure: " + (data.detail || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Failed communicating with the Next.js analysis engine.");
    } finally {
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(step5);
      setLoading(false);
      setCurrentStep(0);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full flex-col bg-[#eaddca] p-6 text-[#2b241a] antialiased font-sans">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        
        {/* TOP GREETER BANNER */}
        <div className="px-1 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-3xl font-black tracking-tight">Hello, {userName}!</h2>
            <p className="text-sm text-[#6e6353]">Compile dynamic business metrics from raw review text profiles.</p>
          </div>
          {report && (
            <button onClick={() => setReport(null)} className="text-xs font-bold px-4 py-2 bg-[#dfd3c3] hover:bg-[#2b241a]/5 rounded-full border border-[#2b241a]/10 transition-all">
              ← Reset Workspace
            </button>
          )}
        </div>

        {/* WORKSPACE LOGIC CONTROLS CARD HOLDER */}
        {!report && (
          <div className="flex w-full flex-col gap-6 lg:flex-row items-stretch justify-center">
            <div className="flex-[2.2] rounded-[2.5rem] border border-[#2b241a]/10 bg-[#e3d5c1] p-10 flex flex-col justify-between gap-6 min-h-[420px]">
              
              {!loading ? (
                <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed p-10 text-center transition-all duration-200 flex-1 w-full
                    ${dragActive ? "border-[#4c6a37] bg-[#cbdcb9]/20" : "border-[#6e6353]/30 bg-transparent"}`}
                >
                  <input type="file" id="target-dash-upload" accept=".txt,.csv" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-16 items-center justify-center rounded-2xl bg-[#f0e4d3] text-3xl border border-[#2b241a]/5 shadow-sm">📁</div>
                    <h3 className="font-serif text-2xl font-black mt-2">Drop your file here</h3>
                    <p className="text-sm text-[#6e6353]">or <label htmlFor="target-dash-upload" className="cursor-pointer font-medium hover:underline text-[#2b241a]/90">click to upload</label></p>
                    <div className="flex gap-2 mt-2 text-[10px] font-extrabold text-[#6e6353] font-mono">
                      <span className="rounded bg-[#dfd3c3] px-2 py-0.5 border border-[#2b241a]/5">.TXT</span>
                      <span className="rounded bg-[#dfd3c3] px-2 py-0.5 border border-[#2b241a]/5">.CSV</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* PROGRESS GRAPHIC PIPELINE COMPONENT */
                <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-[#2b241a]/10 bg-[#f0e4d3]/30 p-6 flex-1 w-full animate-pulse">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#4c6a37] mb-8">Analysing your data</span>
                  <div className="flex items-center w-full max-w-lg">
                    {[
                      { num: 1, label: "Strip PII" },
                      { num: 2, label: "Run ABSA" },
                      { num: 3, label: "Trend velocity" },
                      { num: 4, label: "Opportunities" },
                      { num: 5, label: "Build report" }
                    ].map((step, idx) => (
                      <div key={step.num} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center relative">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs border transition-all duration-300
                            ${currentStep >= step.num ? "bg-[#526e3d] border-[#526e3d] text-white" : "bg-transparent border-[#c4b7a1] text-[#6e6353]"}`}
                          >
                            {step.num}
                          </div>
                          <span className="text-[9px] mt-2 font-semibold absolute top-9 whitespace-nowrap text-[#2b241a]/80">{step.label}</span>
                        </div>
                        {idx < 4 && <div className={`h-[2px] w-full mx-1 rounded transition-all duration-300 ${currentStep > step.num ? "bg-[#526e3d]" : "bg-[#c4b7a1]/40"}`} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WHAT GETS ANALYSED RIGHT PIPELINE SIDEBAR */}
            <div className="flex-1 rounded-[2.5rem] border border-[#2b241a]/10 bg-[#e3d5c1] p-8 flex flex-col gap-5 min-w-[300px]">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#6e6353] border-b border-[#2b241a]/10 pb-3 mt-1">What gets analysed</h3>
              <div className="flex flex-col gap-3 font-sans text-sm font-bold text-[#2b241a]">
                <div className="flex items-center gap-3 rounded-xl bg-[#cbdcb9]/50 px-4 py-3 border border-[#4c6a37]/10"><span>📊</span><span>Aspect-based sentiment</span></div>
                <div className="flex items-center gap-3 rounded-xl bg-[#cbdcb9]/50 px-4 py-3 border border-[#4c6a37]/10"><span>📈</span><span>Trend velocity 30d</span></div>
                <div className="flex items-center gap-3 rounded-xl bg-[#dfd3c3]/70 px-4 py-3 border border-[#2b241a]/5 opacity-90"><span>🎯</span><span>Opportunity scoring</span></div>
                <div className="flex items-center gap-3 rounded-xl bg-[#dfd3c3]/70 px-4 py-3 border border-[#2b241a]/5 opacity-90"><span>✦</span><span>AI strategic summary</span></div>
              </div>
            </div>
          </div>
        )}

        {/* LIVE TARGET ANALYTICS REPORT INTERFACE GRID */}
        {report && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 font-sans text-xs font-bold text-[#6e6353]">
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4"><span>REVIEWS</span><span className="font-serif text-4xl font-black text-[#2b241a] block mt-1">{report.metrics?.total_reviews}</span></div>
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4"><span>SENTIMENT</span><span className="font-serif text-4xl font-black text-[#4c6a37] block mt-1">{report.metrics?.sentiment_score}</span></div>
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4"><span>TRENDS</span><span className="font-serif text-4xl font-black text-[#2b241a] block mt-1">{report.metrics?.total_trends}</span></div>
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4"><span>OPPORTUNITIES</span><span className="font-serif text-4xl font-black text-[#526e3d] block mt-1">{report.metrics?.high_priority_opportunities}</span></div>
            </div>

            {/* Middle row cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-3xl bg-[#2b241a] text-[#eaddca] p-6 flex flex-col justify-between min-h-[190px]">
                <div>
                  <span className="text-[10px] tracking-widest font-bold uppercase text-amber-500">🔥 Trending Fast</span>
                  <h2 className="font-serif text-3xl font-black mt-2 tracking-tight">{report.trending_fast?.title}</h2>
                  <p className="text-sm opacity-85 mt-2 font-sans font-medium">{report.trending_fast?.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4 text-xs font-mono opacity-80">
                  <span>{report.trending_fast?.meta_tags}</span>
                  <span className="font-bold text-green-400">{report.trending_fast?.percentage}</span>
                </div>
              </div>

              <div className="rounded-3xl bg-[#e3d5c1] border border-[#2b241a]/10 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] tracking-widest font-bold uppercase text-[#526e3d]">↗ Rising</span>
                  <h3 className="font-serif text-xl font-black mt-2 tracking-tight">{report.rising_concept?.title}</h3>
                  <p className="text-xs text-[#6e6353] mt-2 font-medium leading-relaxed">{report.rising_concept?.description}</p>
                </div>
                <div className="text-xs font-mono font-bold text-[#4c6a37] pt-4">{report.rising_concept?.percentage}</div>
              </div>
            </div>

            {/* Horizontal micro-cards blocks */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4">
                <span className="rounded-full bg-[#cbdcb9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#354f24]">✦ Emerging</span>
                <h4 className="font-serif text-lg font-bold mt-2">{report.emerging_cluster?.title}</h4>
                <p className="text-xs text-[#6e6353] mt-0.5 font-semibold">{report.emerging_cluster?.subtitle}</p>
              </div>
              <div className="rounded-2xl border border-[#2b241a]/10 bg-red-100/40 p-4">
                <span className="rounded-full bg-red-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-800">⚠️ Pain Point</span>
                <h4 className="font-serif text-lg font-bold mt-2">{report.pain_point?.title}</h4>
                <p className="text-xs text-[#6e6353] mt-0.5 font-semibold">{report.pain_point?.subtitle} · <span className="text-red-700">{report.pain_point?.percentage}</span></p>
              </div>
              <div className="rounded-2xl border border-[#2b241a]/10 bg-[#e3d5c1] p-4">
                <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-800">📉 Declining</span>
                <h4 className="font-serif text-lg font-bold mt-2">{report.declining_metric?.title}</h4>
                <p className="text-xs text-[#6e6353] mt-0.5 font-semibold">{report.declining_metric?.subtitle}</p>
              </div>
            </div>

            {/* Opportunities List Container */}
            <div className="rounded-3xl border border-[#2b241a]/10 bg-[#e3d5c1] p-6 flex flex-col gap-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#6e6353]">Top Opportunities — Ranked by Impact</h3>
              <div className="flex flex-col gap-3">
                {report.top_opportunities?.map((opp: any, i: number) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-4 rounded-2xl bg-[#f5eade]/40 border border-[#2b241a]/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#526e3d] text-xs font-bold text-white">{opp.rank || i+1}</span>
                        <h4 className="font-serif font-bold text-lg text-[#2b241a]">{opp.title}</h4>
                      </div>
                      <p className="text-xs text-[#6e6353] mt-1 font-semibold pl-8">{opp.meta}</p>
                    </div>
                    {opp.badge1 && (
                      <div className="flex gap-1.5 pl-8 sm:pl-0">
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-[#cbdcb9] text-[#354f24] rounded-md">{opp.badge1}</span>
                        {opp.badge2 && <span className="text-[10px] font-bold px-2.5 py-1 bg-[#2b241a] text-white rounded-md">{opp.badge2}</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Summary footer block */}
            <div className="rounded-3xl bg-[#526e3d] p-6 text-white shadow-md">
              <h3 className="font-serif text-xl font-bold border-b border-white/20 pb-2 mb-3">✨ AI Strategic Summary</h3>
              <p className="text-sm font-medium leading-relaxed opacity-95">{report.ai_strategic_summary}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}