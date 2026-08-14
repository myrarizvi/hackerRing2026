import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Milestone } from "@/types";

const MILESTONES: Milestone[] = [
  {
    id: "01",
    milestone: "Registration Opens",
    date: "17th August",
    status: "completed",
    description: "Portal online for team formations & track selection.",
  },
  {
    id: "02",
    milestone: "Registration Closes",
    date: "17th September",
    status: "active",
    description: "Final deadline for proposal & team verification.",
  },
  {
    id: "03",
    milestone: "Hackathon Round 1",
    date: "19th September",
    status: "upcoming",
    description: "Online Shortlisting Round. Evaluation of voice tech architectures.",
  },
  {
    id: "04",
    milestone: "Round 1 Results",
    date: "20th September",
    status: "upcoming",
    description: "Shortlisted teams announced for offline 36-hour sprint.",
  },
  {
    id: "05",
    milestone: "Round 2 (Offline)",
    date: "25th September",
    status: "upcoming",
    description: "36-Hour Offline sprint at RVITM campus.",
  },
];

export function KeyDatesSection() {
  return (
    <section id="dates" className="py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase mb-1">
              // TIMELINE //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
              KEY DATES & MILESTONES
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-white inline-block animate-pulse" />
            <span>[SCHEDULE_LOCKED_2026]</span>
          </div>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
          {MILESTONES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative border border-neutral-800 bg-neutral-950/80 p-4 sm:p-5 flex flex-col justify-between group hover:border-white transition-all duration-200"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-neutral-500 pb-2 mb-3 border-b border-neutral-900">
                  <span>[{item.id}]</span>
                  <span className="uppercase text-[10px] tracking-wider text-neutral-400">
                    PHASE {index + 1}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-white tracking-tight">
                    {item.date}
                  </div>
                  <h3 className="font-mono font-semibold text-xs sm:text-sm text-neutral-200">
                    {item.milestone}
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900/80">
                <p className="font-mono text-[11px] text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline Bar Indicator */}
        <div className="mt-8 p-3 border border-neutral-800 bg-black flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">&gt;&gt;</span>
            <span>CRITICAL PATH: 17 AUG &rarr; 17 SEP &rarr; 19 SEP &rarr; 20 SEP &rarr; 25 SEP</span>
          </div>
          <span className="text-neutral-500 text-[10px]">[OFFLINE VENUE: RVITM CAMPUS]</span>
        </div>

      </div>
    </section>
  );
}
