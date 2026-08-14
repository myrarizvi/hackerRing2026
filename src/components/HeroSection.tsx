import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const asciiArt = `
██╗   ██╗ ██████╗ ██╗ ██████╗███████╗     █████╗ ██╗    ██╗  ██╗ █████╗  ██████╗██╗  ██╗
██║   ██║██╔═══██╗██║██╔════╝██╔════╝    ██╔══██╗██║    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝
██║   ██║██║   ██║██║██║     █████╗      ███████║██║    ███████║███████║██║     █████═╝ 
╚██╗ ██╔╝██║   ██║██║██║     ██╔══╝      ██╔══██║██║    ██╔══██║██║  ██║██║     ██╔═██╗ 
 ╚████╔╝ ╚██████╔╝██║╚██████╗███████╗    ██║  ██║██║    ██║  ██║██║  ██║╚██████╗██║  ██╗
  ╚═══╝   ╚═════╝ ╚═╝ ╚═════╝╚══════╝    ╚═╝  ╚═╝╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
`;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex flex-col justify-between py-8 sm:py-12 overflow-hidden border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between">

        {/* Top Spacer for Vertical Balance */}
        <div className="hidden sm:block h-2" />

        {/* Main Title, Collaboration Tag & CTA Grouping (Unified Center Stack) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="my-auto py-4 sm:py-6 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5"
        >
          {/* ASCII Art Wordmark */}
          <div className="w-full overflow-x-auto py-1 flex justify-center">
            <pre
              className={`font-mono text-[8px] xs:text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] xl:text-[18px] leading-tight text-white inline-block select-none transition-opacity duration-75 ${
                flicker ? "opacity-40" : "opacity-100"
              }`}
            >
              {asciiArt}
            </pre>
          </div>

          {/* Collaboration Sub-banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-neutral-300">
            <span className="text-neutral-500">// COLLABORATION //</span>
            <span>In Collaboration with</span>
            <span className="border border-white/40 bg-white text-black px-2.5 py-0.5 font-bold tracking-wider">
              VOICE AI SPACE
            </span>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="#register"
              className="relative group border-2 border-white bg-white text-black px-6 sm:px-7 py-3 sm:py-3.5 font-mono font-bold tracking-wider text-sm flex items-center gap-2.5 hover:bg-black hover:text-white transition-all duration-200 shadow-md"
            >
              <span>ACCESS REGISTRATION</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="#dates"
              className="border border-neutral-700 bg-neutral-950/60 text-neutral-300 hover:text-white hover:border-white px-5 py-3 sm:py-3.5 font-mono text-sm flex items-center gap-2 transition-colors"
            >
              <span>[EXPLORE DATES]</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>

        {/* Organizing Departments & College Info Grid (3 in Top Row, 2 Centered Below) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3.5 sm:gap-4 pt-4 pb-2 font-mono text-xs text-neutral-300 w-full"
        >
          {/* Top Row: 3 Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 w-full">
            <div className="border border-neutral-800 bg-neutral-950/80 p-3.5 sm:p-4 h-full flex flex-col justify-between relative group hover:border-white/60 transition-colors">
              <span className="text-[10px] text-neutral-500 block mb-1.5">[ORGANIZER_01]</span>
              <p className="font-semibold text-white leading-snug">Department of Electronics & Communications Engineering</p>
            </div>
            <div className="border border-neutral-800 bg-neutral-950/80 p-3.5 sm:p-4 h-full flex flex-col justify-between relative group hover:border-white/60 transition-colors">
              <span className="text-[10px] text-neutral-500 block mb-1.5">[ORGANIZER_02]</span>
              <p className="font-semibold text-white leading-snug">Department of AI/ML Engineering</p>
            </div>
            <div className="border border-neutral-800 bg-neutral-950/80 p-3.5 sm:p-4 h-full flex flex-col justify-between relative group hover:border-white/60 transition-colors">
              <span className="text-[10px] text-neutral-500 block mb-1.5">[INSTITUTION]</span>
              <p className="font-bold text-white leading-snug">RV Institute of Technology and Management</p>
            </div>
          </div>

          {/* Bottom Row: 2 Boxes Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-3xl mx-auto w-full">
            <div className="border border-neutral-800 bg-neutral-950/80 p-3.5 sm:p-4 h-full flex flex-col justify-between relative group hover:border-white/60 transition-colors text-center sm:text-left">
              <span className="text-[10px] text-neutral-500 block mb-1.5">[ORGANIZER_03]</span>
              <p className="font-semibold text-white leading-snug">Startup Ignition Cell</p>
            </div>
            <div className="border border-neutral-800 bg-neutral-950/80 p-3.5 sm:p-4 h-full flex flex-col justify-between relative group hover:border-white/60 transition-colors text-center sm:text-left">
              <span className="text-[10px] text-neutral-500 block mb-1.5">[ORGANIZER_04]</span>
              <p className="font-semibold text-white leading-snug">GDG RVITM</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}



