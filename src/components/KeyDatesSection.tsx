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
    description: "Online Shortlisting Round. Evaluation of  tech architectures.",
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
    <section id="dates" className="py-16 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // TIMELINE //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
              KEY DATES & MILESTONES
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd] flex items-center gap-2">
            <span className="w-2 h-2 rounded-[1px] bg-[#c7f85a] inline-block animate-pulse" />
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
              className="relative border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 sm:p-5 rounded-[8px] flex flex-col justify-between group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[rgba(247,248,239,0.26)] opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-[7px]" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[rgba(247,248,239,0.26)] opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-[7px]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[rgba(247,248,239,0.26)] opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[7px]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[rgba(247,248,239,0.26)] opacity-0 group-hover:opacity-100 transition-opacity rounded-br-[7px]" />

              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#aab1a2] pb-2 mb-3 border-b border-[rgba(247,248,239,0.13)]">
                  <span className="text-[#c7f85a] font-bold">[{item.id}]</span>
                  <span className="uppercase text-[10px] tracking-wider text-[#c8cfbd]">
                    PHASE {index + 1}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <div className="text-xl sm:text-2xl font-black font-display text-[#f7f8ef] group-hover:text-[#c7f85a] tracking-tight transition-colors">
                    {item.date}
                  </div>
                  <h3 className="font-mono font-semibold text-xs sm:text-sm text-[#c8cfbd]">
                    {item.milestone}
                  </h3>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(247,248,239,0.08)]">
                <p className="font-mono text-[11px] text-[#aab1a2] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        

      </div>
    </section>
  );
}
