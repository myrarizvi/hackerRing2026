import { useEffect, useRef, useState } from "react";
import { Mic, Volume2 } from "lucide-react";

interface WaveformVisualizerProps {
  className?: string;
  barsCount?: number;
  height?: number;
}

export function WaveformVisualizer({
  className = "",
  barsCount = 48,
  height = 96,
}: WaveformVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    canvas.height = height;

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        canvas.height = height;
      }
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const barWidth = Math.max(2, Math.floor(width / barsCount) - 3);
      const totalSpacing = width / barsCount;

      phaseRef.current += 0.04 * speed;

      for (let i = 0; i < barsCount; i++) {
        const x = i * totalSpacing + (totalSpacing - barWidth) / 2;
        const normalizedI = i / barsCount;

        // Symmetric speech envelope (bell curve + harmonics)
        const envelope = Math.sin(normalizedI * Math.PI);
        
        // Multi-frequency wave synthesis
        const wave1 = Math.sin(phaseRef.current * 1.5 + i * 0.35);
        const wave2 = Math.cos(phaseRef.current * 2.2 - i * 0.2);
        const wave3 = Math.sin(phaseRef.current * 0.8 + i * 0.55);

        const composite = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2 + 1) / 2;
        const barHeight = Math.max(
          4,
          (composite * envelope * (height - 16) + 4) * (isPlaying ? 1 : 0.15)
        );

        const y = (height - barHeight) / 2;

        // Monochrome dither/gradient look
        const alpha = 0.35 + (composite * envelope) * 0.65;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Top and bottom terminal tick marks for center region
        if (i % 4 === 0 && envelope > 0.4) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(x, y - 3, barWidth, 1.5);
          ctx.fillRect(x, y + barHeight + 1.5, barWidth, 1.5);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [barsCount, height, isPlaying, speed]);

  return (
    <div className={`relative border border-neutral-800 bg-neutral-950/80 p-3 sm:p-4 rounded-none ${className}`}>
      {/* Corner bracket styling */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 text-[11px] font-mono tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
          <span className="text-white font-semibold tracking-widest">[VOICE_AUDIO_FREQ_SYNTH]</span>
          <span className="hidden sm:inline text-neutral-500">// 44.1 kHz • PCM //</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSpeed((s) => (s === 1 ? 1.75 : s === 1.75 ? 0.6 : 1))}
            className="text-[10px] px-2 py-0.5 border border-neutral-700 hover:border-white hover:text-white transition-colors cursor-pointer"
            title="Cycle wave modulation frequency"
          >
            MOD: {speed === 1 ? "1.0x" : speed === 1.75 ? "FAST" : "SLOW"}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 border border-neutral-700 hover:border-white hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? <Volume2 size={12} /> : <Mic size={12} />}
            <span>{isPlaying ? "MUTE_WAVE" : "LIVE"}</span>
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="w-full overflow-hidden flex items-center justify-center relative">
        <canvas ref={canvasRef} className="w-full block" />
        
        {/* Center crosshair overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-full h-[1px] bg-neutral-800/40" />
        </div>
      </div>

      {/* Frequency legend */}
      <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-neutral-500 pt-1 border-t border-neutral-900">
        <span>20 Hz</span>
        <span className="text-neutral-400">SPEECH HARMONICS : 300Hz - 3.4kHz</span>
        <span>20 kHz</span>
      </div>
    </div>
  );
}
