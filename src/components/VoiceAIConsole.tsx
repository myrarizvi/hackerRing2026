import { useState, useEffect } from "react";
import { Mic, Cpu, Radio, Sparkles, Terminal, Activity, Zap, Play } from "lucide-react";

export function VoiceAIConsole() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [latency, setLatency] = useState(18);
  const [logs, setLogs] = useState<string[]>([
    "[00:01] System initialized. Waiting for audio input...",
    "[00:02] WebRTC audio stream connected @ 16kHz PCM.",
    "[00:03] Whisper STT engine standby. TTFT target: <50ms.",
  ]);

  // Cycle pipeline steps automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
      setLatency(14 + Math.floor(Math.random() * 8));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const triggerSimulation = () => {
    setIsSimulating(true);
    const newLogs = [
      `[${new Date().toLocaleTimeString().slice(3, 8)}] > User Voice Input: "Build real-time voice assistant"`,
      `[${new Date().toLocaleTimeString().slice(3, 8)}] > STT Transcribed in 12ms. Confidence: 99.2%`,
      `[${new Date().toLocaleTimeString().slice(3, 8)}] > LLM Reasoning Token Stream: 180 tokens/sec`,
      `[${new Date().toLocaleTimeString().slice(3, 8)}] > TTS Audio Synth: Streaming 24kHz PCM chunk`,
    ];
    setLogs(newLogs);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="relative border border-neutral-800 bg-neutral-950/90 p-4 sm:p-6 font-mono text-xs overflow-hidden group">
      {/* Corner bracket accents */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

      {/* Halftone texture overlay inside console */}
      <div className="absolute inset-0 dither-pattern opacity-10 pointer-events-none" />

      {/* Top Header Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 mb-4 gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <span className="text-white font-bold tracking-widest text-xs sm:text-sm">
            [VOICE_AI_NEURAL_CONSOLE]
          </span>
          <span className="hidden md:inline text-neutral-500 text-[11px]">
            // ARCHITECTURE: STT ➔ LLM ➔ TTS //
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="border border-neutral-800 bg-black px-2.5 py-1 text-[11px] text-neutral-300 flex items-center gap-1.5">
            <Activity size={12} className="text-white animate-pulse" />
            <span>LATENCY:</span>
            <span className="text-white font-bold">{latency}ms</span>
          </div>

          <button
            onClick={triggerSimulation}
            className="border border-white bg-white text-black hover:bg-black hover:text-white px-2.5 py-1 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Play size={10} className="fill-current" />
            <span>{isSimulating ? "RUNNING..." : "TEST PIPELINE"}</span>
          </button>
        </div>
      </div>

      {/* 3-Stage Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 relative z-10">
        {/* Stage 1: STT Input */}
        <div
          className={`border p-3.5 transition-all duration-300 ${
            activeStep === 0 || isSimulating
              ? "border-white bg-neutral-900/80 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
              : "border-neutral-800/80 bg-neutral-950/40"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-2">
            <span>01 // INPUT</span>
            <Mic size={14} className={activeStep === 0 ? "text-white" : "text-neutral-600"} />
          </div>
          <div className="font-bold text-white mb-1">STT Speech Capture</div>
          <div className="text-[11px] text-neutral-400">16kHz PCM Stream</div>
          
          {/* Animated mini spectrum bars */}
          <div className="flex items-end gap-1 h-6 mt-3 pt-1 border-t border-neutral-800">
            {[40, 75, 30, 90, 60, 85, 45, 95, 50, 70].map((h, idx) => (
              <span
                key={idx}
                className={`w-full block bg-white transition-all duration-150 ${
                  activeStep === 0 ? "opacity-100" : "opacity-30"
                }`}
                style={{
                  height: activeStep === 0 ? `${(h * (idx % 2 === 0 ? 1 : 0.7))}%` : "20%",
                }}
              />
            ))}
          </div>
        </div>

        {/* Stage 2: Neural LLM Processing */}
        <div
          className={`border p-3.5 transition-all duration-300 ${
            activeStep === 1 || isSimulating
              ? "border-white bg-neutral-900/80 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
              : "border-neutral-800/80 bg-neutral-950/40"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-2">
            <span>02 // REASONING</span>
            <Cpu size={14} className={activeStep === 1 ? "text-white" : "text-neutral-600"} />
          </div>
          <div className="font-bold text-white mb-1">LLM Intent Matrix</div>
          <div className="text-[11px] text-neutral-400">Sub-50ms TTFT Engine</div>

          <div className="flex items-center justify-between mt-3 pt-1 border-t border-neutral-800 text-[10px] text-neutral-400">
            <span>TOKENS/S: 184</span>
            <span className="text-white font-bold">FP16 ACCEL</span>
          </div>
        </div>

        {/* Stage 3: TTS Audio Output */}
        <div
          className={`border p-3.5 transition-all duration-300 ${
            activeStep === 2 || isSimulating
              ? "border-white bg-neutral-900/80 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
              : "border-neutral-800/80 bg-neutral-950/40"
          }`}
        >
          <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-2">
            <span>03 // SYNTHESIS</span>
            <Radio size={14} className={activeStep === 2 ? "text-white" : "text-neutral-600"} />
          </div>
          <div className="font-bold text-white mb-1">TTS Voice Stream</div>
          <div className="text-[11px] text-neutral-400">24kHz Neural Audio</div>

          <div className="flex items-center justify-between mt-3 pt-1 border-t border-neutral-800 text-[10px] text-neutral-400">
            <span>BUFFER: READY</span>
            <span className="text-white font-bold">ZERO_JITTER</span>
          </div>
        </div>
      </div>

      {/* Terminal Live Telemetry Log Feed */}
      <div className="border border-neutral-800 bg-black p-3 font-mono text-[11px] relative z-10">
        <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1.5 pb-1 border-b border-neutral-900">
          <span className="flex items-center gap-1.5">
            <Terminal size={11} className="text-white" />
            <span>LIVE_TELEMETRY_LOG</span>
          </span>
          <span className="text-neutral-600">// STREAMING //</span>
        </div>

        <div className="space-y-1 text-neutral-300">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-neutral-600 font-bold">&gt;</span>
              <span className={i === logs.length - 1 ? "text-white font-bold" : "text-neutral-400"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
