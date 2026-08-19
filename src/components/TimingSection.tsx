import { motion } from "motion/react";
import { Timer, Clock, Flame, Zap, CheckCircle } from "lucide-react";
import { CountUpNumber } from "./CountUpNumber";

export function TimingSection() {
  return (
    <section id="timing" className="py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // ENDURANCE SPECIFICATION //
            </div>
            {/* ANSI Shadow ASCII Art Title */}
            <div className="overflow-x-auto py-1">
              <pre className="font-mono text-[7px] sm:text-[10px] md:text-[12px] leading-tight text-[#c7f85a] select-none">
{`██████╗ ██╗   ██╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
██╔══██╗██║   ██║██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
██║  ██║██║   ██║██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
██║  ██║██║   ██║██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
██████╔╝╚██████╔╝██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`}
              </pre>
            </div>  
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              HACKATHON DURATION
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [36_HOUR_NON_STOP_SPRINT]
          </div>
        </div>

        {/* 36 Hours Display Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-6 sm:p-12 rounded-[8px] overflow-hidden group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200"
        >
          {/* Background grid accents */}
          <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[#aab1a2]/30 select-none hidden sm:block">
            01001000 01000001 01000011 01001011
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 border border-[rgba(247,248,239,0.13)] bg-[#181b14] px-3 py-1 font-mono text-xs text-[#f7f8ef] rounded-[6px]">
                <Timer size={14} className="animate-spin text-[#c7f85a]" style={{ animationDuration: '6s' }} />
                <span>CONTINUOUS OFFLINE MARATHON</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-8xl md:text-9xl font-black font-display text-[#f7f8ef] tracking-tighter leading-none warm-text-glow">
                  <CountUpNumber end={36} duration={1800} />
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-[#f7f8ef] uppercase tracking-tight">
                  HOURS
                </span>
              </div>

              <p className="font-mono text-xs sm:text-sm text-[#c8cfbd] max-w-lg leading-relaxed">
                36 Hours of uninterrupted hacking, rapid hardware prototyping, neural audio training, and voice interface deployment at the RVITM Campus.
              </p>
            </div>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs lg:w-96">
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 space-y-1 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <div className="text-[#aab1a2] text-[10px]">// POWER & NETWORK //</div>
                <div className="text-[#f7f8ef] font-bold">24/7 Gigabit LAN & Labs</div>
                <div className="text-[#c8cfbd] text-[11px]">Continuous test benches</div>
              </div>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 space-y-1 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <div className="text-[#aab1a2] text-[10px]">// MENTORSHIP //</div>
                <div className="text-[#f7f8ef] font-bold">Voice AI Space Experts</div>
                <div className="text-[#c8cfbd] text-[11px]">Round-the-clock reviews</div>
              </div>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 space-y-1 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <div className="text-[#aab1a2] text-[10px]">// SUSTENANCE //</div>
                <div className="text-[#f7f8ef] font-bold">Meals, Snacks & Caffeine</div>
                <div className="text-[#c8cfbd] text-[11px]">Provided for all participants</div>
              </div>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3.5 space-y-1 rounded-[6px] hover:border-[rgba(247,248,239,0.26)] transition-all">
                <div className="text-[#aab1a2] text-[10px]">// JURY REVIEW //</div>
                <div className="text-[#f7f8ef] font-bold">Live Pitch Stalls</div>
                <div className="text-[#c8cfbd] text-[11px]">Hour 36 evaluation</div>
              </div>
            </div>
          </div>

          {/* Bottom ticker bar */}
          <div className="mt-8 pt-4 border-t border-[rgba(247,248,239,0.08)] flex flex-wrap items-center justify-between font-mono text-[11px] text-[#aab1a2] gap-2">
            <span>TIMER PROTOCOL: T-36:00:00 DOWN TO T-00:00:00</span>
            <span className="text-[#c7f85a] font-bold">START: 25TH SEPTEMBER 2026</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
