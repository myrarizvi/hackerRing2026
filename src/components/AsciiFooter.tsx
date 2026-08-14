import { useState, useEffect } from "react";
import { ArrowUp, Terminal, Shield, Sparkles, Building2 } from "lucide-react";

export function AsciiFooter() {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const asciiArt = `
██╗   ██╗ ██████╗ ██╗ ██████╗███████╗     █████╗ ██╗    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
██║   ██║██╔═══██╗██║██╔════╝██╔════╝    ██╔══██╗██║    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
██║   ██║██║   ██║██║██║     █████╗      ███████║██║    ███████║███████║██║     █████═╝ 
╚██╗ ██╔╝██║   ██║██║██║     ██╔══╝      ██╔══██║██║    ██╔══██║██╔══██║██║     ██╔═██╗ 
 ╚████╔╝ ╚██████╔╝██║╚██████╗███████╗    ██║  ██║██║    ██║  ██║██║  ██║╚██████╗██║  ██╗
  ╚═══╝   ╚═════╝ ╚═╝ ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

  const sponsors = [
    { name: "RESERVED_SPONSOR_01", type: "TITLE SPONSOR" },
    { name: "RESERVED_SPONSOR_02", type: "TRACK PARTNER" },
    { name: "RESERVED_SPONSOR_03", type: "HARDWARE LABS" },
    { name: "RESERVED_SPONSOR_04", type: "CLOUD PLATFORM" },
    { name: "RESERVED_SPONSOR_05", type: "COMMUNITY PARTNER" },
  ];

  return (
    <footer className="relative pt-16 pb-12 overflow-hidden font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Sponsors Placeholder Strip */}
        <div className="mb-16 pb-12 border-b border-neutral-900">
          <div className="flex items-center justify-between font-mono text-xs text-neutral-500 pb-3 mb-6 border-b border-neutral-900">
            <span className="text-white font-bold">// OUR SPONSORS & PARTNERS //</span>
            <span>[SLOTS_OPEN_FOR_RESERVATION]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {sponsors.map((sp, idx) => (
              <div
                key={idx}
                className="border border-dashed border-neutral-800 bg-neutral-950/60 p-4 h-24 flex flex-col items-center justify-center text-center group hover:border-neutral-600 transition-colors"
              >
                <div className="w-8 h-8 mb-2 border border-neutral-800 flex items-center justify-center text-neutral-600 group-hover:text-white transition-colors">
                  <Building2 size={16} />
                </div>
                <div className="text-[10px] text-neutral-500 font-bold group-hover:text-neutral-300">
                  {sp.name}
                </div>
                <div className="text-[9px] text-neutral-600 mt-0.5">
                  [{sp.type}]
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-neutral-500 text-center mt-3">
            // Sponsor logos & partner tier allocations are finalized in rolling batches //
          </div>
        </div>

        {/* ASCII Art Wordmark Display */}
        <div className="relative border border-neutral-800 bg-neutral-950/80 p-4 sm:p-8 mb-12 overflow-x-auto text-center">
          <div className="absolute top-2 left-2 text-[10px] text-neutral-600">[ASCII_SYS_RENDER]</div>
          <div className="absolute top-2 right-2 text-[10px] text-neutral-600">[MONOCHROME_V1]</div>
          
          <pre
            className={`font-mono text-[6px] xs:text-[8px] sm:text-[10px] md:text-[12px] leading-tight text-white inline-block select-none transition-opacity duration-75 ${
              flicker ? "opacity-40" : "opacity-100"
            }`}
          >
            {asciiArt}
          </pre>

          <div className="mt-3 pt-3 border-t border-neutral-900 text-[11px] text-neutral-400">
            &lt; 36 HOURS &bull; ₹1,00,000 PRIZE POOL &bull; HARDWARE & SOFTWARE TRACKS &gt;
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-neutral-900 text-neutral-400">
          <div>
            <div className="text-white font-bold mb-2">[VOICE AI HACK]</div>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              Organized by Department of ECE & AIML at RV Institute of Technology and Management in collaboration with Voice AI Space.
            </p>
          </div>

          <div>
            <div className="text-white font-bold mb-2">[KEY DIRECTIVES]</div>
            <ul className="text-neutral-500 text-[11px] space-y-1">
              <li>&gt; Registration Window: 17 Aug - 17 Sep</li>
              <li>&gt; Round 1 (Online): 19th Sep</li>
              <li>&gt; Round 2 (Offline Sprint): 25th Sep</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-2">[SYSTEM CONTROL]</div>
            <button
              onClick={scrollToTop}
              className="border border-neutral-800 bg-black hover:border-white hover:text-white px-4 py-2 text-neutral-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowUp size={14} />
              <span>RETURN TO TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-[10px] text-neutral-600">
          <div>
            &copy; 2026 RVITM & VOICE AI SPACE. ALL RIGHTS RESERVED.
          </div>
          <div>
            // TERMINAL_BUILD_STATE: STABLE //
          </div>
        </div>

      </div>
    </footer>
  );
}
