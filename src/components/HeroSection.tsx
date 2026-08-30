import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const GLITCH_CHARS = "█▓▒░#$/@%&*+=~<>[]01";

const ASCII_ART_LINES = [
  "██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗       ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗     ██████╗ ",
  "██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗      ██╔══██╗██║████╗  ██║██╔════╝     ╚════██╗   ██╔═████╗",
  "███████║███████║██║     █████╔╝ █████╗  ██████╔╝█████╗██████╔╝██║██╔██╗ ██║██║  ███╗     █████╔╝   ██║██╔██║",
  "██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗╚════╝██╔══██╗██║██║╚██╗██║██║   ██║    ██╔═══╝    ████╔╝██║",
  "██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║      ██║  ██║██║██║ ╚████║╚██████╔╝    ███████╗██╗╚██████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚═╝ ╚═════╝ ",
];

const TAGLINE_FULL = "HACK. BUILD. WIN.";

export function HeroSection() {
  // ── Wordmark glitch state ──────────────────────────────────────────────
  const [flicker, setFlicker] = useState(false);
  const [lines, setLines] = useState<string[]>(ASCII_ART_LINES);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // ── Tagline typewriter state ───────────────────────────────────────────
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // CRT Signal Flicker Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 120);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Matrix Scramble / Decrypt Animation Sequence
  const triggerScramble = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    let step = 0;
    const maxSteps = 14;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      step++;
      setLines(
        ASCII_ART_LINES.map((originalLine) => {
          return originalLine
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              if (Math.random() < step / maxSteps) {
                return char;
              }
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("");
        })
      );

      if (step >= maxSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLines(ASCII_ART_LINES);
        setIsDecrypting(false);
      }
    }, 35);
  };

  // Trigger boot-up scramble on initial load
  useEffect(() => {
    triggerScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ── Typewriter loop — recursive setTimeout, ref-based to avoid stale closures ──
  // Phases: TYPING → PAUSE_FULL → ERASING → PAUSE_EMPTY → repeat
  const twTimerRef  = useRef<number | null>(null);
  const twIndexRef  = useRef(0);            // current char count
  const twPhaseRef  = useRef<"typing" | "pause_full" | "erasing" | "pause_empty">("typing");

  useEffect(() => {
    // Kick off after initial wordmark scramble settles
    const startDelay = window.setTimeout(tick, 700);

    function tick() {
      const phase = twPhaseRef.current;
      const idx   = twIndexRef.current;

      if (phase === "typing") {
        const next = idx + 1;
        setTypedText(TAGLINE_FULL.slice(0, next));
        twIndexRef.current = next;
        if (next >= TAGLINE_FULL.length) {
          twPhaseRef.current = "pause_full";
          twTimerRef.current = window.setTimeout(tick, 1800);
        } else {
          twTimerRef.current = window.setTimeout(tick, 48);
        }
      } else if (phase === "pause_full") {
        twPhaseRef.current = "erasing";
        twTimerRef.current = window.setTimeout(tick, 38);
      } else if (phase === "erasing") {
        const next = idx - 1;
        setTypedText(TAGLINE_FULL.slice(0, next));
        twIndexRef.current = next;
        if (next <= 0) {
          twPhaseRef.current = "pause_empty";
          twTimerRef.current = window.setTimeout(tick, 400);
        } else {
          twTimerRef.current = window.setTimeout(tick, 38);
        }
      } else {
        // pause_empty → restart
        twPhaseRef.current = "typing";
        twTimerRef.current = window.setTimeout(tick, 48);
      }
    }

    return () => {
      clearTimeout(startDelay);
      if (twTimerRef.current !== null) clearTimeout(twTimerRef.current);
    };
  }, []);

  // Cursor blink — independent of typing state, runs forever
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
<<<<<<< HEAD
    <section className="relative sm:min-h-[calc(100vh-4rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col justify-center pt-16 sm:pt-0 pb-12 sm:pb-0 overflow-hidden border-b border-[rgba(247,248,239,0.13)]">
=======
    <section className="relative sm:min-h-[calc(100vh-4rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col justify-between pt-20 sm:pt-16 pb-10 sm:pb-12 overflow-hidden border-b border-[rgba(247,248,239,0.13)]">
>>>>>>> 816e081 (feat: enhance mobile responsiveness, add Vite environment support, and improve navigation accessibility.)

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">

        {/* Wordmark + Tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h1 className="sr-only">Hacker-Ring 2.0</h1>
          <div className="sm:hidden w-full text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(199,248,90,0.3)] bg-[#12140f]/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#c7f85a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c7f85a]" />
              36-HOUR NATIONAL HACKATHON
            </div>
          </div>

          {/* Animated ASCII Art Wordmark with Cyber Hover Scramble */}
          <div
            onMouseEnter={triggerScramble}
            className="w-full overflow-hidden py-1 flex justify-center items-center cursor-pointer group/ascii select-none"
            title="Hover to decrypt terminal signal"
          >
            <motion.pre
              animate={{
                textShadow: flicker
                  ? "0 0 20px rgba(199, 248, 90, 0.8), 0 0 30px rgba(199, 248, 90, 0.4)"
                  : "0 0 12px rgba(247, 248, 239, 0.2)",
              }}
              style={{
                fontSize: "clamp(3px, 1.12vw, 17px)",
                lineHeight: "1.05",
              }}
              className={`font-mono text-[#f7f8ef] group-hover/ascii:text-[#c7f85a] inline-block select-none transition-all duration-150 warm-text-glow tracking-normal ${
                flicker ? "opacity-40 translate-x-[1px]" : "opacity-100"
              }`}
            >
              {lines.join("\n")}
            </motion.pre>
          </div>

<<<<<<< HEAD
          {/* Tagline — typewriter with blinking cursor */}
          <div className="mt-6 sm:mt-8 font-mono text-base sm:text-xl md:text-2xl tracking-[0.25em] uppercase text-[#c7f85a] select-none" aria-label="HACK. BUILD. WIN.">
            <span className="opacity-60">// </span>
            <span>{typedText}</span>
            <span
              className="inline-block w-[0.6ch] transition-opacity duration-75"
              style={{ opacity: cursorVisible ? 1 : 0 }}
              aria-hidden="true"
            >█</span>
            <span className="opacity-60"> //</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-2">
=======
          <p className="sm:hidden max-w-2xl text-left font-mono text-xs leading-relaxed text-[#c8cfbd]">
            Build bold hardware and software ideas in a 36-hour sprint at RVITM, Bengaluru.
            Compete for a <span className="font-bold text-[#c7f85a]">₹1,00,000 prize pool</span> with a team of 2–4.
          </p>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 w-full sm:w-auto">
>>>>>>> 816e081 (feat: enhance mobile responsiveness, add Vite environment support, and improve navigation accessibility.)
            <Link
              to="/register"
              className="w-full sm:w-auto btn-primary px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2.5 group"
            >
              <span>ACCESS REGISTRATION</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#dates"
              className="w-full sm:w-auto btn-secondary px-5 py-3 sm:py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 group"
            >
              <span>[EXPLORE DATES]</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

<<<<<<< HEAD
=======
        {/* Organizing Departments & College Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-2.5 pt-4 pb-2 font-mono text-xs text-[#c8cfbd] w-full"
        >
          {/* Host Institution — compact, centered, visually distinct */}
          <div className="flex justify-center">
            <TiltCard className="w-full sm:w-auto">
              <div className="border border-[rgba(199,248,90,0.25)] bg-[#141710] px-3 sm:px-4 py-2.5 rounded-[8px] flex items-center gap-3 relative group hover:bg-[#191e0f] hover:border-[rgba(199,248,90,0.4)] transition-all duration-200">
                <img src={rvLogo} alt="RV Institute of Technology and Management logo" className="w-10 h-10 object-contain flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#c7f85a] tracking-widest uppercase block mb-0.5">[HOST_INSTITUTION]</span>
                  <p className="font-bold text-[#f7f8ef] leading-snug text-xs min-[380px]:text-sm">RV Institute of Technology and Management</p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Section label */}
          <div className="text-[10px] font-mono text-[#aab1a2] tracking-widest uppercase text-center pt-0.5">
            // ORGANIZING_UNITS //
          </div>

          {/* 4-card grid — all organizers in one row */}
          <div className="grid grid-cols-1 min-[370px]:grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-2.5">
                  <img src={rvLogo} alt="ECE Department logo" className="w-9 h-9 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#aab1a2] block mb-1">[ORGANIZER_01]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-[11px]">Dept. of Electronics &amp; Communications Engineering</p>
                  </div>
                </div>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-2.5">
                  <img src={rvLogo} alt="CSE AI/ML Department logo" className="w-9 h-9 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#aab1a2] block mb-1">[ORGANIZER_02]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-[11px]">Dept. of CSE (AI/ML) Engineering</p>
                  </div>
                </div>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-2.5">
                  <img src={startupLogo} alt="Startup Ignition Cell logo" className="w-9 h-9 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#aab1a2] block mb-1">[ORGANIZER_03]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-[11px]">Startup Ignition Cell</p>
                  </div>
                </div>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-2.5">
                  <img src={gdgLogo} alt="GDG RVITM logo" className="w-9 h-9 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#aab1a2] block mb-1">[ORGANIZER_04]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-[11px]">GDG RVITM</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </motion.div>

>>>>>>> 816e081 (feat: enhance mobile responsiveness, add Vite environment support, and improve navigation accessibility.)
      </div>
    </section>
  );
}
