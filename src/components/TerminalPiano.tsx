import { useState, useEffect, useRef } from "react";
import { Radio, Activity, Music, Sparkles, Volume2, VolumeX } from "lucide-react";

interface KeyConfig {
  note: string;
  keyLabel: string;
  isBlack: boolean;
  offsetPercent?: number; // For positioning black keys
}

const NOTE_FREQUENCIES: Record<string, number> = {
  C4: 261.63,
  "C#4": 277.18,
  D4: 293.66,
  "D#4": 311.13,
  E4: 329.63,
  F4: 349.23,
  "F#4": 369.99,
  G4: 392.0,
  "G#4": 415.3,
  A4: 440.0,
  "A#4": 466.16,
  B4: 493.88,
  C5: 523.25,
  "C#5": 554.37,
  D5: 587.33,
  "D#5": 622.25,
  E5: 659.25,
  F5: 698.46,
};

export function TerminalPiano() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [lastNotePressed, setLastNotePressed] = useState<string>("READY");
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Keyboard mapping for 12 White Keys + 7 Black Keys
  const keys: KeyConfig[] = [
    // Octave 1
    { note: "C4", keyLabel: "A", isBlack: false },
    { note: "C#4", keyLabel: "W", isBlack: true, offsetPercent: 5.73 },
    { note: "D4", keyLabel: "S", isBlack: false },
    { note: "D#4", keyLabel: "E", isBlack: true, offsetPercent: 14.06 },
    { note: "E4", keyLabel: "D", isBlack: false },
    { note: "F4", keyLabel: "F", isBlack: false },
    { note: "F#4", keyLabel: "T", isBlack: true, offsetPercent: 30.73 },
    { note: "G4", keyLabel: "G", isBlack: false },
    { note: "G#4", keyLabel: "Y", isBlack: true, offsetPercent: 39.06 },
    { note: "A4", keyLabel: "H", isBlack: false },
    { note: "A#4", keyLabel: "U", isBlack: true, offsetPercent: 47.40 },
    { note: "B4", keyLabel: "J", isBlack: false },
    // Octave 2
    { note: "C5", keyLabel: "K", isBlack: false },
    { note: "C#5", keyLabel: "O", isBlack: true, offsetPercent: 64.06 },
    { note: "D5", keyLabel: "L", isBlack: false },
    { note: "D#5", keyLabel: "P", isBlack: true, offsetPercent: 72.40 },
    { note: "E5", keyLabel: ";", isBlack: false },
    { note: "F5", keyLabel: "'", isBlack: false },
  ];

  const whiteKeys = keys.filter((k) => !k.isBlack);
  const blackKeys = keys.filter((k) => k.isBlack);

  const playNoteAudio = (note: string) => {
    if (isMuted) return;
    const freq = NOTE_FREQUENCIES[note];
    if (!freq) return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Warm synthesizer timbre (triangle + sub-harmonics)
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.012);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch {
      // Ignore browser autoplay policies until user clicks
    }
  };

  const handleKeyDown = (note: string) => {
    setActiveNotes((prev) => new Set(prev).add(note));
    setLastNotePressed(note);
    playNoteAudio(note);
  };

  const handleKeyUp = (note: string) => {
    setActiveNotes((prev) => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const keyToNoteMap: Record<string, string> = {
      a: "C4",
      w: "C#4",
      s: "D4",
      e: "D#4",
      d: "E4",
      f: "F4",
      t: "F#4",
      g: "G4",
      y: "G#4",
      h: "A4",
      u: "A#4",
      j: "B4",
      k: "C5",
      o: "C#5",
      l: "D5",
      p: "D#5",
      ";": "E5",
      "'": "F5",
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyLower = e.key.toLowerCase();
      if (keyToNoteMap[keyLower]) {
        handleKeyDown(keyToNoteMap[keyLower]);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const keyLower = e.key.toLowerCase();
      if (keyToNoteMap[keyLower]) {
        handleKeyUp(keyToNoteMap[keyLower]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isMuted]);

  return (
    <div className="relative border border-neutral-800 bg-neutral-950/90 p-4 sm:p-6 font-mono text-xs overflow-hidden group select-none">
      {/* Corner brackets styling */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

      {/* Background halftone texture */}
      <div className="absolute inset-0 dither-pattern opacity-10 pointer-events-none" />

      {/* Header bar with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-3 mb-4 gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <Music size={16} className="text-white animate-pulse" />
          <span className="text-white font-bold tracking-widest text-xs sm:text-sm">
            [TERMINAL_SYNTH_PIANO]
          </span>
          <span className="hidden md:inline text-neutral-500 text-[11px]">
            // POINTED TO USER • LIVE SYNTH //
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute/Unmute Audio Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[11px] text-neutral-300 hover:border-white hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX size={13} className="text-neutral-500" /> : <Volume2 size={13} className="text-white animate-pulse" />}
            <span>{isMuted ? "MUTE" : "AUDIO ON"}</span>
          </button>

          {/* Note Readout Badge */}
          <div className="border border-neutral-800 bg-black px-3 py-1 text-[11px] text-neutral-300 flex items-center gap-2">
            <Activity size={12} className="text-white" />
            <span className="text-neutral-500">ACTIVE_NOTE:</span>
            <span className="text-white font-bold tracking-wider">{lastNotePressed}</span>
          </div>

          <div className="border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-[10px] text-neutral-400">
            [KEYS: A-L / W,E,T,Y,U]
          </div>
        </div>
      </div>

      {/* 3D Perspective Keyboard Stage */}
      <div className="relative pt-2 pb-6 px-1 sm:px-4 max-w-4xl mx-auto flex justify-center items-center">
        {/* Piano Bed / Housing Container */}
        <div
          className="relative w-full border-2 border-neutral-800 bg-black p-2 sm:p-3 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          style={{
            perspective: "800px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top Wooden / Metal Trim Header */}
          <div className="w-full h-4 sm:h-5 bg-neutral-900 border-b border-neutral-800 mb-1 flex items-center justify-between px-3 text-[9px] text-neutral-500">
            <span>VOICE_AI_SYNTH_V1.0</span>
            <span className="flex items-center gap-1 text-white">
              <Radio size={10} className="animate-pulse" /> {isMuted ? "MUTED" : "WEB_AUDIO_DSP"}
            </span>
          </div>

          {/* Piano Key Bed Facing User */}
          <div
            className="relative flex w-full h-36 sm:h-44 md:h-52 bg-neutral-950 border border-neutral-800 overflow-hidden"
            style={{
              transform: "rotateX(12deg)",
              transformOrigin: "top center",
            }}
          >
            {/* White Keys Row */}
            {whiteKeys.map((key) => {
              const isActive = activeNotes.has(key.note);
              return (
                <button
                  key={key.note}
                  onMouseDown={() => handleKeyDown(key.note)}
                  onMouseUp={() => handleKeyUp(key.note)}
                  onMouseLeave={() => handleKeyUp(key.note)}
                  onTouchStart={() => handleKeyDown(key.note)}
                  onTouchEnd={() => handleKeyUp(key.note)}
                  className={`relative flex-1 h-full border-r border-neutral-800 flex flex-col justify-end items-center pb-2.5 font-mono transition-all duration-75 cursor-pointer outline-none ${
                    isActive
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.9)] translate-y-1.5"
                      : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
                  }`}
                >
                  {/* Subtle top bevel reflection */}
                  <div
                    className={`absolute top-0 inset-x-0 h-2 ${
                      isActive ? "bg-neutral-300" : "bg-neutral-800/60"
                    }`}
                  />
                  <span className="font-bold text-[10px] sm:text-xs tracking-tight">
                    {key.note}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1 border ${
                      isActive
                        ? "border-black bg-black text-white font-bold"
                        : "border-neutral-700 bg-black/60 text-neutral-400"
                    }`}
                  >
                    [{key.keyLabel}]
                  </span>
                </button>
              );
            })}

            {/* Black Keys Absolute Overlay */}
            {blackKeys.map((key) => {
              const isActive = activeNotes.has(key.note);
              return (
                <button
                  key={key.note}
                  onMouseDown={() => handleKeyDown(key.note)}
                  onMouseUp={() => handleKeyUp(key.note)}
                  onMouseLeave={() => handleKeyUp(key.note)}
                  onTouchStart={() => handleKeyDown(key.note)}
                  onTouchEnd={() => handleKeyUp(key.note)}
                  style={{ left: `${key.offsetPercent}%` }}
                  className={`absolute top-0 w-[5.8%] h-[58%] z-20 border border-neutral-700 flex flex-col justify-end items-center pb-1 font-mono transition-all duration-75 cursor-pointer outline-none ${
                    isActive
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.9)] translate-y-1"
                      : "bg-black hover:bg-neutral-900 text-white"
                  }`}
                >
                  <div
                    className={`absolute top-0 inset-x-0 h-1.5 ${
                      isActive ? "bg-neutral-300" : "bg-neutral-800"
                    }`}
                  />
                  <span className="font-bold text-[8px] sm:text-[9px] hidden sm:inline">
                    {key.note}
                  </span>
                  <span
                    className={`text-[8px] px-0.5 border ${
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-neutral-700 bg-neutral-900 text-neutral-300"
                    }`}
                  >
                    {key.keyLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-900">
        <span className="flex items-center gap-1 text-neutral-400">
          <Sparkles size={11} className="text-white" />
          <span>USE YOUR PHYSICAL KEYBOARD OR CLICK KEYS TO PLAY REAL AUDIO</span>
        </span>
        <span className="text-white font-bold">// SOUND ACTIVE • WEB_AUDIO_API //</span>
      </div>
    </div>
  );
}

