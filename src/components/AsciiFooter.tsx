import { useState, useEffect } from "react";
import { ArrowUp, Terminal, Shield, Sparkles } from "lucide-react";
import agnaiIcon from "../assets/logos/agnai-icon.webp";
import agnaiWordmark from "../assets/logos/agnai-wordmark.webp";
import codechefLogo from "../assets/logos/codechef-logo.webp";

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



  return (
    <footer className="relative pt-10 sm:pt-16 pb-28 sm:pb-12 overflow-hidden font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Sponsors Strip */}
        <div className="mb-8 sm:mb-16 pb-6 sm:pb-12 border-b border-[rgba(247,248,239,0.13)]">
          <div className="font-mono text-xs text-[#aab1a2] pb-3 mb-6 border-b border-[rgba(247,248,239,0.13)]">
            <span className="text-[#c7f85a] font-bold">// OUR SPONSORS &amp; PARTNERS //</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* AgnAI Card */}
            <div className="border border-dashed border-[rgba(247,248,239,0.13)] bg-[#12140f]/60 p-6 min-h-28 rounded-[6px] flex items-center justify-center group hover:border-[rgba(247,248,239,0.26)] hover:bg-[#181b14] transition-all duration-200">
              <div className="flex items-center gap-4">
                <img
                  src={agnaiIcon}
                  alt="AgnAI icon"
                  className="w-14 h-14 object-contain flex-shrink-0"
                />
                <img
                  src={agnaiWordmark}
                  alt="AgnAI"
                  className="h-10 max-w-[140px] object-contain"
                />
              </div>
            </div>

            {/* CodeChef Card */}
            <div className="border border-dashed border-[rgba(247,248,239,0.13)] bg-[#12140f]/60 p-6 min-h-28 rounded-[6px] flex items-center justify-center group hover:border-[rgba(247,248,239,0.26)] hover:bg-[#181b14] transition-all duration-200">
              <img
                src={codechefLogo}
                alt="CodeChef"
                className="h-14 max-w-[200px] object-contain"
              />
            </div>
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
            <p className="text-[#aab1a2] text-[11px] leading-relaxed mb-2">
              Organized by RV Institute of Technology and Management.
            </p>
            <p className="text-[11px]">
              <span className="text-[#aab1a2]">Offline Venue: </span>
              <a
                href="https://share.google/9h9nFLWiZuUwD1DwN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c7f85a] underline hover:text-[#f7f8ef] transition-colors"
              >
                RVITM JP Nagar 8th Phase ↗
              </a>
            </p>
          </div>

          <div>
            <div className="text-[#f7f8ef] font-bold mb-2">[KEY DIRECTIVES]</div>
            <ul className="text-[#aab1a2] text-[11px] space-y-1">
              <li>&gt; Registration Window: 1 Sep - 28 Sep</li>
              <li>&gt; Round 1 (Online): 30th Sep · Fee ₹200</li>
              <li>&gt; Round 2 (Offline Sprint): 8th Oct · Fee ₹600</li>
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
