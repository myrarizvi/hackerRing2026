import { motion } from "motion/react";
import { Cpu, Code2, Microchip, Layers, Radio, Sparkles, Terminal, Activity } from "lucide-react";

export function TracksSection() {
  const tracks = [
    {
      code: "TRK_01",
      title: "Voice AI Hardware",
      icon: Cpu,
      subtitle: "Embedded Speech & Edge Audio Architectures",
      description:
        "Engineered for hardware innovators building dedicated voice micro-controllers, low-power DSP interfaces, smart acoustic arrays, custom IoT edge devices, or tactile physical voice interfaces.",
      keywords: ["Edge DSP", "Microcontrollers", "Acoustic Arrays", "Whisper on Edge", "ESP32 / Pi / FPGA", "Custom PCBs"],
      promptIdea: "Build low-latency physical voice devices, smart ambient hardware, or wearable assistive speech units.",
    },
    {
      code: "TRK_02",
      title: "Voice AI Software",
      icon: Code2,
      subtitle: "Full-Stack Speech AI, LLM Voice Agents & Audio Pipelines",
      description:
        "Engineered for software developers building ultra-low-latency real-time voice agents, multilingual translation pipelines, synthesized emotional voice cloning, neural audio engines, or conversational applications.",
      keywords: ["Real-time LLM Agents", "STT / TTS Pipelines", "Voice Cloning", "Audio Multimodal", "Conversational AI", "WebSockets / WebRTC"],
      promptIdea: "Build autonomous voice agents, multi-turn phone assistants, healthcare transcription, or vocal accessibility platforms.",
    },
  ];

  return (
    <section id="tracks" className="py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase mb-1">
              // DOMAIN ARCHITECTURES //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
              HACKATHON TRACKS
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            [TWO_PARALLEL_CATEGORIES]
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <motion.div
                key={track.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative border border-neutral-800 bg-neutral-950/90 p-6 sm:p-8 flex flex-col justify-between group hover:border-white transition-all duration-200"
              >
                {/* Visual Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500 pb-3 mb-4 border-b border-neutral-800">
                    <span className="text-white font-bold">[{track.code}]</span>
                    <span className="text-[11px] text-neutral-400 uppercase">// ACTIVE DIVISION //</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 border border-neutral-700 bg-black group-hover:border-white transition-colors">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                        {track.title}
                      </h3>
                      <p className="font-mono text-xs text-neutral-400 mt-1">
                        {track.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed my-4">
                    {track.description}
                  </p>

                  {/* Keywords Tag Matrix */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase mb-2">// TECHNICAL SCOPE:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {track.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="font-mono text-[11px] px-2 py-0.5 border border-neutral-800 bg-black text-neutral-300"
                        >
                          +{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Footer */}
                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between font-mono text-[11px] text-neutral-400">
                  <span>ELIGIBILITY: OPEN TO ALL</span>
                  <span className="text-white font-bold">&gt; REGISTER THIS TRACK</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
