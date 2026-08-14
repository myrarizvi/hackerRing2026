import { motion } from "motion/react";
import { Trophy, Award, Sparkles, Shield, Coins } from "lucide-react";
import { CountUpNumber } from "@/components/CountUpNumber";

export function PrizeSection() {
  return (
    <section id="prizes" className="py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase mb-1">
              // REWARDS & BOUNTIES //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
              PRIZE POOL
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            [GUARANTEED_TOTAL_REWARDS]
          </div>
        </div>

        {/* Hero Prize Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border-2 border-white bg-black p-6 sm:p-12 text-center group overflow-hidden"
        >
          {/* Halftone texture overlay inside card */}
          <div className="absolute inset-0 dither-pattern opacity-20 pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 font-mono text-xs text-neutral-500">[0xPRIZE_VAULT]</div>
          <div className="absolute top-2 right-2 font-mono text-xs text-neutral-500">[INR_CURRENCY]</div>
          <div className="absolute bottom-2 left-2 font-mono text-xs text-neutral-500">[STATUS: COMMITTED]</div>
          <div className="absolute bottom-2 right-2 font-mono text-xs text-neutral-500">[RVITM x VOICE AI SPACE]</div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center p-3 border border-neutral-700 bg-neutral-950 mb-2">
              <Trophy size={36} className="text-white" />
            </div>

            <div className="text-xs sm:text-sm font-mono text-neutral-400 tracking-widest uppercase">
              TOTAL CUMULATIVE PRIZE POOL
            </div>

            <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display text-white tracking-tighter mono-text-glow leading-none py-2">
              <CountUpNumber
                end={100000}
                duration={2000}
                prefix="₹"
                className="font-mono sm:font-display tracking-tight"
              />
            </div>

            <p className="text-sm sm:text-base font-mono text-neutral-300 max-w-lg mx-auto pt-2">
              ₹1,00,000 Total Prize Pool across Voice AI Hardware & Software Tracks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 font-mono text-xs text-left">
              <div className="border border-neutral-800 bg-neutral-950 p-3">
                <span className="text-[10px] text-neutral-500 block mb-0.5">// TRACK 01 //</span>
                <div className="font-bold text-white">Voice AI Hardware</div>
                <div className="text-neutral-400 text-[11px] mt-1">Cash Bounties + Mentorship</div>
              </div>
              <div className="border border-neutral-800 bg-neutral-950 p-3">
                <span className="text-[10px] text-neutral-500 block mb-0.5">// TRACK 02 //</span>
                <div className="font-bold text-white">Voice AI Software</div>
                <div className="text-neutral-400 text-[11px] mt-1">Cash Bounties + Deployment Grants</div>
              </div>
              <div className="border border-neutral-800 bg-neutral-950 p-3">
                <span className="text-[10px] text-neutral-500 block mb-0.5">// SPECIAL //</span>
                <div className="font-bold text-white">Voice AI Space Perks</div>
                <div className="text-neutral-400 text-[11px] mt-1">Direct Industry Incubation</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
