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

  const asciiArt = `██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗       ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗     ██████╗ 
██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗      ██╔══██╗██║████╗  ██║██╔════╝     ╚════██╗   ██╔═████╗
███████║███████║██║     █████╔╝ █████╗  ██████╔╝█████╗██████╔╝██║██╔██╗ ██║██║  ███╗     █████╔╝   ██║██╔██║
██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗╚════╝██╔══██╗██║██║╚██╗██║██║   ██║    ██╔═══╝    ████╔╝██║
██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║      ██║  ██║██║██║ ╚████║╚██████╔╝    ███████╗██╗╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚═╝ ╚═════╝ `;

  const sponsors = [
    { name: "RESERVED_SPONSOR_01", type: "TITLE SPONSOR" },
    { name: "RESERVED_SPONSOR_02", type: "TRACK PARTNER" },
    { name: "RESERVED_SPONSOR_03", type: "HARDWARE LABS" },
    { name: "RESERVED_SPONSOR_04", type: "CLOUD PLATFORM" },
    { name: "RESERVED_SPONSOR_05", type: "COMMUNITY PARTNER" },
  ];

  return (
    <footer className="relative pt-10 sm:pt-16 pb-28 sm:pb-12 overflow-hidden font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Sponsors Placeholder Strip */}
        <div className="mb-8 sm:mb-16 pb-6 sm:pb-12 border-b border-[rgba(247,248,239,0.13)]">
          <div className="flex flex-col min-[430px]:flex-row min-[430px]:items-center justify-between gap-2 font-mono text-xs text-[#aab1a2] pb-3 mb-6 border-b border-[rgba(247,248,239,0.13)]">
            <span className="text-[#c7f85a] font-bold">// OUR SPONSORS & PARTNERS //</span>
            <span className="text-[#c8cfbd]">[SLOTS_OPEN_FOR_RESERVATION]</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {sponsors.map((sp, idx) => (
              <div
                key={idx}
                className="border border-dashed border-[rgba(247,248,239,0.13)] bg-[#12140f]/60 p-4 min-h-24 rounded-[6px] flex flex-col items-center justify-center text-center group hover:border-[rgba(247,248,239,0.26)] hover:bg-[#181b14] transition-all duration-200"
              >
                <div className="w-8 h-8 mb-2 border border-[rgba(247,248,239,0.13)] bg-[#181b14] rounded-[4px] flex items-center justify-center text-[#aab1a2] group-hover:text-[#c7f85a] transition-colors">
                  <Building2 size={16} />
                </div>
                <div className="text-[10px] text-[#c8cfbd] font-bold group-hover:text-[#f7f8ef]">
                  {sp.name}
                </div>
                <div className="text-[9px] text-[#aab1a2] mt-0.5">
                  [{sp.type}]
                </div>
              </div>
            ))}
          </div>
          <div className="text-[10px] text-[#aab1a2] text-center mt-3">
            // Sponsor logos & partner tier allocations are finalized in rolling batches //
          </div>
        </div>

        {/* ASCII Art Wordmark Display */}
        <div className="relative border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 sm:p-8 mb-8 sm:mb-12 rounded-[8px] overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-2.5 left-3 text-[10px] text-[#aab1a2]">[ASCII_SYS_RENDER]</div>
          <div className="absolute top-2.5 right-3 text-[10px] text-[#aab1a2]">[PROMPTCOMPILER_V1]</div>
          
          <div className="sm:hidden pt-5 font-display text-3xl min-[380px]:text-4xl font-black leading-none tracking-[-0.05em] text-[#f7f8ef]">
            HACKER-RING <span className="metallic-lime-text">2.0</span>
          </div>
          <pre
            style={{
              fontSize: "clamp(4px, 1.25vw, 13px)",
              lineHeight: "1.05",
            }}
            className={`hidden sm:inline-block font-mono text-[#f7f8ef] select-none transition-opacity duration-75 warm-text-glow pt-4 ${
              flicker ? "opacity-40" : "opacity-100"
            }`}
          >
            {asciiArt}
          </pre>

          <div className="mt-3 pt-3 border-t border-[rgba(247,248,239,0.08)] text-[11px] text-[#c8cfbd]">
            &lt; 36 HOURS &bull; <span className="text-[#c7f85a] font-bold">₹1,00,000 PRIZE POOL</span> &bull; HARDWARE & SOFTWARE TRACKS &gt;
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[rgba(247,248,239,0.13)] text-[#c8cfbd]">
          <div>
            <div className="text-[#f7f8ef] font-bold mb-2">[Hacker-Ring 2.0]</div>
            <p className="text-[#aab1a2] text-[11px] leading-relaxed">
              Organized by RV Institute of Technology and Management.
            </p>
          </div>

          <div>
            <div className="text-[#f7f8ef] font-bold mb-2">[KEY DIRECTIVES]</div>
            <ul className="text-[#aab1a2] text-[11px] space-y-1">
              <li>&gt; Registration Window: 17 Aug - 17 Sep</li>
              <li>&gt; Round 1 (Online): 19th Sep</li>
              <li>&gt; Round 2 (Offline Sprint): 25th Sep</li>
            </ul>
          </div>

          <div>
            <div className="text-[#f7f8ef] font-bold mb-2">[SYSTEM CONTROL]</div>
            <button
              onClick={scrollToTop}
              className="btn-secondary px-4 py-2 text-xs flex items-center gap-2"
            >
              <ArrowUp size={14} />
              <span>RETURN TO TOP</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 text-[10px] text-[#aab1a2]">
          <div>
            &copy; 2026 Hacker-Ring. All rights reserved.
          </div>
          <div>
            // TERMINAL_BUILD_STATE: STABLE //
          </div>
        </div>

      </div>
    </footer>
  );
}
