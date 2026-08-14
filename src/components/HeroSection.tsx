import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { WaveformVisualizer } from "@/components/WaveformVisualizer";
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
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-24 overflow-hidden border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* System Alert Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/20 bg-neutral-950/90 px-3 py-1.5 font-mono text-[11px] sm:text-xs text-white tracking-widest mb-6"
        >
          <span className="w-2 h-2 bg-white rounded-none animate-ping" />
          <span className="font-bold">// SYSTEM ALERT : HACKATHON ANNOUNCEMENT //</span>
        </motion.div>

        {/* ASCII Art Wordmark Display in Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 overflow-x-auto text-center py-2"
        >
          <pre
            className={`font-mono text-[6px] xs:text-[8px] sm:text-[10px] md:text-[12px] leading-tight text-white inline-block select-none transition-opacity duration-75 ${
              flicker ? "opacity-40" : "opacity-100"
            }`}
          >
            {asciiArt}
          </pre>

          {/* Collaboration Sub-banner */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-neutral-300">
            <span className="text-neutral-500">// COLLABORATION //</span>
            <span>In Collaboration with</span>
            <span className="border border-white/40 bg-white text-black px-2 py-0.5 font-bold tracking-wider">
              VOICE AI SPACE
            </span>
          </div>
        </motion.div>

        {/* Organizing Departments & College Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 my-8 font-mono text-xs text-neutral-300"
        >
          <div className="border border-neutral-800 bg-neutral-950/60 p-3.5 relative group hover:border-white/60 transition-colors">
            <span className="text-[10px] text-neutral-500 block mb-1">[ORGANIZER_01]</span>
            <p className="font-semibold text-white">Department of Electronics & Communications Engineering</p>
          </div>
          <div className="border border-neutral-800 bg-neutral-950/60 p-3.5 relative group hover:border-white/60 transition-colors">
            <span className="text-[10px] text-neutral-500 block mb-1">[ORGANIZER_02]</span>
            <p className="font-semibold text-white">Department of AI/ML Engineering</p>
          </div>
          <div className="border border-neutral-800 bg-neutral-950/60 p-3.5 relative group hover:border-white/60 transition-colors">
            <span className="text-[10px] text-neutral-500 block mb-1">[INSTITUTION]</span>
            <p className="font-bold text-white">RV Institute of Technology and Management</p>
          </div>
        </motion.div>

        {/* Live Audio Waveform Visualizer Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="my-8"
        >
          <WaveformVisualizer barsCount={52} height={104} />
        </motion.div>

        {/* Tagline & Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-neutral-800"
        >
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-neutral-500 tracking-widest">
              // CORE DIRECTIVE //
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-wider text-white">
              BUILD. VOICE. IMPACT.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#register"
              className="relative group border-2 border-white bg-white text-black px-6 py-3 font-mono font-bold tracking-wider text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all duration-200"
            >
              <span>ACCESS REGISTRATION</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="#dates"
              className="border border-neutral-700 bg-transparent text-neutral-300 hover:text-white hover:border-white px-4 py-3 font-mono text-sm flex items-center gap-2 transition-colors"
            >
              <span>[EXPLORE DATES]</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

