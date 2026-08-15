import { motion } from "motion/react";
import { Globe, Zap, CheckSquare, Terminal, MapPin, Laptop, Flame } from "lucide-react";

export function PhasesSection() {
  const phases = [
    {
      round: "ROUND 01",
      name: "Online Shortlisting Round",
      mode: "VIRTUAL / REMOTE",
      duration: "Concept & Prototype Evaluation",
      description:
        "Initial competitive screening. Teams submit system architectures, problem statements, and prototype proof-of-concept videos online for evaluation by the jury panel.",
      deliverables: [
        "System Architecture Design & Flowcharts",
        "Repository / Prototype Codebase",
        "3-Minute Video Pitch & Demo",
      ],
      icon: Globe,
    },
    {
      round: "ROUND 02",
      name: "36 Hour Offline Sprint",
      mode: "IN-PERSON HACKATHON",
      duration: "Continuous 36 Hours Marathon",
      description:
        "Shortlisted teams assemble at the RVITM Campus for an uninterrupted 36-hour physical build marathon with hardware benches, live testing rigs, and on-site industry mentorship from Voice AI Space.",
      deliverables: [
        "Working Voice AI Hardware / Software Deployment",
        "Live Physical Demonstration to Jury",
        "Final Q&A and Prototype Stress-Testing",
      ],
      icon: Flame,
    },
  ];

  return (
    <section id="phases" className="py-16 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // PROTOCOL EXECUTION //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
              PROTOCOL & PHASES
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [TWO_STAGE_EVALUATION]
          </div>
        </div>

        {/* Phases Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            const accentColor = idx === 0 ? "text-[#0f8c7f]" : "text-[#8b63ff]";
            return (
              <motion.div
                key={phase.round}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-6 sm:p-8 rounded-[8px] flex flex-col justify-between group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200"
              >
                {/* Top badges */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#aab1a2] pb-3 mb-4 border-b border-[rgba(247,248,239,0.13)]">
                    <span className="text-[#c7f85a] font-bold">{phase.round}</span>
                    <span className="px-2.5 py-0.5 border border-[rgba(247,248,239,0.13)] bg-[#181b14] text-[10px] text-[#c8cfbd] font-mono rounded-[4px]">
                      {phase.mode}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 border border-[rgba(247,248,239,0.13)] bg-[#181b14] rounded-[6px]">
                      <Icon size={22} className={accentColor} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-[#f7f8ef] tracking-tight">
                      {phase.name}
                    </h3>
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-[#c8cfbd] leading-relaxed my-4">
                    {phase.description}
                  </p>

                  <div className="space-y-2 mt-4 pt-4 border-t border-[rgba(247,248,239,0.08)]">
                    <div className="text-[10px] font-mono text-[#aab1a2] uppercase tracking-wider">
                      // PHASE CRITERIA & DELIVERABLES:
                    </div>
                    <ul className="space-y-1.5 font-mono text-xs text-[#c8cfbd]">
                      {phase.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-[#c7f85a] font-bold">&gt;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(247,248,239,0.08)] font-mono text-[11px] text-[#aab1a2] flex items-center justify-between">
                  <span>{phase.duration}</span>
                  <span className="text-[#0f8c7f] font-bold">[VERIFIED]</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
