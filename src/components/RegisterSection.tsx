import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export function RegisterSection() {
  return (
    <section id="register" className="py-16 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // AUTHENTICATION &amp; ACCESS //
            </div>
            {/* ANSI Shadow ASCII Art Title */}
            <div className="overflow-x-auto py-1">
              <pre className="font-mono text-[6.5px] sm:text-[9px] md:text-[11px] leading-tight text-[#c7f85a] select-none">
{`██████╗ ███████╗ ██████╗ ██╗███████╗████████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   █████╗  ██████╔╝
██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║  ██║███████╗╚██████╔╝██║███████║   ██║   ███████╗██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`}
              </pre>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              REGISTER &amp; PARTICIPATE
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c7f85a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c7f85a]"></span>
            </span>
            <span>[REGISTRATION_OPEN]</span>
          </div>
        </div>

        {/* Teaser Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border border-[rgba(247,248,239,0.26)] bg-[#12140f] p-6 sm:p-10 lg:p-12 rounded-[8px] overflow-hidden shadow-2xl"
        >
          {/* Subtle Dither background */}
          <div className="absolute inset-0 dither-pattern opacity-25 pointer-events-none" />

          {/* Corner marks */}
          <div className="absolute top-2.5 left-3 font-mono text-[10px] text-[#aab1a2]">[AUTH_PASS]</div>
          <div className="absolute top-2.5 right-3 font-mono text-[10px] text-[#aab1a2]">[PORTAL: READY]</div>

          <div className="relative z-10 flex flex-col items-start gap-6 max-w-2xl">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#c8cfbd] mb-3">
                <ShieldCheck size={14} className="text-[#0f8c7f]" />
                <span>REGISTRATION PROTOCOL // 2026</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
                ENTER Hacker-Ring 2.0
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#c8cfbd] mt-3 leading-relaxed">
                Open to all student developers, hardware engineers, and AI researchers.
                Form teams of <span className="text-[#c7f85a] font-bold">2–4 participants</span> to compete.
              </p>
            </div>

            {/* Criteria badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-[#aab1a2] pt-1 border-t border-[rgba(247,248,239,0.08)] w-full">
              <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> Team: 2–4 Participants</div>
              <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> No Registration Fee</div>
              <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> Hardware / Software Tracks</div>
            </div>

            {/* CTA */}
            <Link
              to="/register"
              className="btn-primary px-8 py-4 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2"
            >
              <span>[REGISTER NOW →]</span>
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
