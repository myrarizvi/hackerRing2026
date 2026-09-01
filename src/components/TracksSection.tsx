import { motion } from "motion/react";
import { Cpu, Radio, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function TracksSection() {
  const tracks = [
    {
      code: "TRK_01",
      title: "Voice AI",
      icon: Radio,
      subtitle: "Speech Intelligence, Conversational AI & Voice Experiences",
      description:
        "Build intelligent voice-powered solutions that understand, process, and respond to human speech — covering speech recognition, voice assistants, multilingual experiences, and audio applications.",
      keywords: ["Speech Recognition", "Conversational AI", "STT / TTS", "Voice Agents", "Multilingual AI", "Audio Intelligence"],
    },
    {
      code: "TRK_02",
      title: "Agentic AI",
      icon: Cpu,
      subtitle: "Autonomous Agents, Intelligent Workflows & AI Systems",
      description:
        "Build AI systems that reason, plan, and act to solve real-world problems — from autonomous agents and multi-agent pipelines to tool use, intelligent workflows, and LLM-driven decision making.",
      keywords: ["AI Agents", "Multi-Agent Systems", "Tool Calling", "Autonomous Workflows", "LLM Reasoning", "AI Automation"],
    },
    {
      code: "TRK_03",
      title: "Open Track",
      icon: Sparkles,
      subtitle: "Creative Solutions, Emerging Technology & Real-World Impact",
      description:
        "Have an idea that doesn't fit a category? Pick a problem that matters and build a technology-driven solution using whatever tools and approaches work best for you.",
      keywords: ["Web / Mobile", "AI / ML", "IoT & Hardware", "Cybersecurity", "Cloud & APIs", "Emerging Tech"],
    },
  ];

  return (
    <section id="tracks" className="py-12 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // DOMAIN ARCHITECTURES //
            </div>
            {/* ANSI Shadow ASCII Art Title */}
            <div className="overflow-x-auto py-1">
              <pre className="font-mono text-[7px] sm:text-[10px] md:text-[12px] leading-tight text-[#c7f85a] select-none">
{`████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝
   ██║   ██████╔╝███████║██║     █████═╝ ███████╗
   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ╚════██║
   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝`}
              </pre>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              HACKATHON TRACKS
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [THREE ACTIVE TRACKS]
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            const accentColors = ["text-[#0f8c7f]", "text-[#3f8cff]", "text-[#c7f85a]"];
            const accentColor = accentColors[idx] ?? "text-[#c7f85a]";
            return (
              <motion.div
                key={track.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 min-[380px]:p-5 sm:p-6 lg:p-8 rounded-[8px] flex flex-col justify-between group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200"
              >
                {/* Visual Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[rgba(247,248,239,0.26)] rounded-tl-[7px]" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[rgba(247,248,239,0.26)] rounded-tr-[7px]" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[rgba(247,248,239,0.26)] rounded-bl-[7px]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[rgba(247,248,239,0.26)] rounded-br-[7px]" />

                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#aab1a2] pb-3 mb-4 border-b border-[rgba(247,248,239,0.13)]">
                    <span className="text-[#c7f85a] font-bold">[{track.code}]</span>
                    <span className="text-[11px] text-[#c8cfbd] uppercase">// ACTIVE DIVISION //</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex-shrink-0 p-2.5 sm:p-3 border border-[rgba(247,248,239,0.13)] bg-[#181b14] rounded-[6px] group-hover:border-[rgba(247,248,239,0.26)] transition-colors">
                      <Icon size={28} className={accentColor} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-[#f7f8ef] tracking-tight">
                        {track.title}
                      </h3>
                      <p className="font-mono text-xs text-[#aab1a2] mt-1">
                        {track.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-xs text-[#c8cfbd] leading-relaxed my-4">
                    {track.description}
                  </p>

                  {/* Keywords Tag Matrix */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-[#aab1a2] uppercase mb-2">// TECHNICAL SCOPE:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="font-mono text-[11px] px-2.5 py-1 border border-[rgba(247,248,239,0.13)] bg-[#181b14] text-[#c8cfbd] rounded-[4px]"
                        >
                          +{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="mt-6 pt-4 border-t border-[rgba(247,248,239,0.08)] flex flex-col min-[430px]:flex-row min-[430px]:items-center justify-between gap-2 font-mono text-[11px] text-[#aab1a2]">
                  <span>ELIGIBILITY: OPEN TO ALL</span>
                  <Link to="/register" className="text-[#c7f85a] font-bold hover:underline">&gt; REGISTER THIS TRACK</Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
