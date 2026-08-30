import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";

export function PrizeSection() {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const asciiPrize = `
██████╗ ███████╗     ██╗    ██████╗  ██████╗     ██████╗  ██████╗  ██████╗ 
██╔══██╗██╔════╝    ███║   ██╔═████╗██╔═████╗   ██╔═████╗██╔═████╗██╔═████╗
██████╔╝███████╗    ╚██║   ██║██╔██║██║██╔██║   ██║██╔██║██║██╔██║██║██╔██║
██╔══██╗╚════██║     ██║   ████╔╝██║████╔╝██║   ████╔╝██║████╔╝██║████╔╝██║
██║  ██║███████║     ██║▄█╗╚██████╔╝╚██████╔╝▄█╗╚██████╔╝╚██████╔╝╚██████╔╝
╚═╝  ╚═╝╚══════╝     ╚═╝╚═╝ ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ 
`;

  return (
    <section id="prizes" className="py-12 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // REWARDS & BOUNTIES //
            </div>
            {/* ANSI Shadow ASCII Art Title */}
            <div className="overflow-x-auto py-1">
              <pre className="font-mono text-[7px] sm:text-[10px] md:text-[12px] leading-tight text-[#c7f85a] select-none">
{`██████╗ ██████╗ ██╗███████╗███████╗███████╗
██╔══██╗██╔══██╗██║╚══███╔╝██╔════╝██╔════╝
██████╔╝██████╔╝██║  ███╔╝ █████╗  ███████╗
██╔═══╝ ██╔══██╗██║ ███╔╝  ██╔══╝  ╚════██║
██║     ██║  ██║██║███████╗███████╗███████║
╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}
              </pre>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              PRIZE POOL
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c7f85a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c7f85a]"></span>
            </span>
            <span>[GUARANTEED_TOTAL_REWARDS]</span>
          </div>
        </div>

        {/* Hero Prize Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border border-[rgba(247,248,239,0.26)] bg-[#12140f] px-4 pb-12 pt-14 sm:p-12 text-center group overflow-hidden rounded-[8px] shadow-2xl"
        >
          {/* Halftone texture overlay inside card */}
          <div className="absolute inset-0 dither-pattern opacity-20 pointer-events-none" />

          {/* Corner brackets */}
<<<<<<< HEAD
          <div className="absolute top-2.5 left-3 font-mono text-xs text-[#aab1a2]">[0xPRIZE_VAULT]</div>
          <div className="absolute top-2.5 right-3 font-mono text-xs text-[#aab1a2]">[INR_CURRENCY]</div>
          <div className="absolute bottom-2.5 left-3 font-mono text-xs text-[#aab1a2]">[STATUS: COMMITTED]</div>
          <div className="absolute bottom-2.5 right-3 font-mono text-xs text-[#aab1a2]">[RVITM]</div>
=======
          <div className="absolute top-3 left-3 font-mono text-[9px] sm:text-xs text-[#aab1a2]">[0xPRIZE_VAULT]</div>
          <div className="absolute top-3 right-3 font-mono text-[9px] sm:text-xs text-[#aab1a2]">[INR_CURRENCY]</div>
          <div className="absolute bottom-3 left-3 font-mono text-[9px] sm:text-xs text-[#aab1a2]">[STATUS: COMMITTED]</div>
          <div className="absolute bottom-3 right-3 hidden min-[380px]:block font-mono text-[9px] sm:text-xs text-[#aab1a2]">[RVITM x VOICE AI SPACE]</div>
>>>>>>> 816e081 (feat: enhance mobile responsiveness, add Vite environment support, and improve navigation accessibility.)

          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center p-3 border border-[rgba(247,248,239,0.13)] bg-[#181b14] rounded-[8px] mb-2">
              <Trophy size={36} className="text-[#c7f85a]" />
            </div>

            <div className="text-xs sm:text-sm font-mono text-[#aab1a2] tracking-widest uppercase">
              TOTAL CUMULATIVE PRIZE POOL
            </div>

            {/* ASCII Art Prize Render from prizemoney.md */}
            <div className="sm:hidden py-3 font-display text-[clamp(2rem,12vw,3rem)] font-black tracking-[-0.06em] text-[#c7f85a] lime-text-glow">
              ₹1,00,000
            </div>
            <div className="hidden sm:block overflow-x-auto py-3 text-center">
              <pre
                className={`font-mono text-[5px] xs:text-[7px] sm:text-[9px] md:text-[11px] leading-tight text-[#c7f85a] inline-block select-none whitespace-pre transition-opacity duration-75 lime-text-glow ${flicker ? "opacity-40" : "opacity-100"
                  }`}
              >
                {asciiPrize}
              </pre>
            </div>

            <p className="text-sm sm:text-base font-mono text-[#c8cfbd] max-w-lg mx-auto pt-2">
              <span className="text-[#c7f85a] font-bold">₹1,00,000</span> Total Prize Pool across all Tracks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 font-mono text-xs text-left">
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <span className="text-[10px] text-[#aab1a2] block mb-0.5">// TRACK 01 //</span>
                <div className="font-bold text-[#f7f8ef]"> Voice AI</div>
                <div className="text-[#aab1a2] text-[11px] mt-1"></div>
              </div>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <span className="text-[10px] text-[#aab1a2] block mb-0.5">// TRACK 02 //</span>
                <div className="font-bold text-[#f7f8ef]">Agentic AI</div>
                <div className="text-[#aab1a2] text-[11px] mt-1"></div>
              </div>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <span className="text-[10px] text-[#aab1a2] block mb-0.5">// TRACK 03 //</span>
                <div className="font-bold text-[#f7f8ef]">Open Track</div>
                <div className="text-[#aab1a2] text-[11px] mt-1"></div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
