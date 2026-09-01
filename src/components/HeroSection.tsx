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
    <section className="relative sm:min-h-[calc(100vh-4rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col justify-center pt-20 sm:pt-16 pb-12 sm:pb-16 overflow-hidden border-b border-[rgba(247,248,239,0.13)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">

        {/* Wordmark + Tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h1 className="sr-only">Hacker-Ring 2.0</h1>
          <div className="w-full text-center mb-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(199,248,90,0.3)] bg-[#12140f]/80 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.16em] text-[#c7f85a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c7f85a]" />
              36-HOUR NATIONAL HACKATHON // RVITM JP NAGAR 8TH PHASE
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

          {/* Tagline — typewriter with blinking cursor */}
          <div className="mt-4 sm:mt-6 font-mono text-base sm:text-xl md:text-2xl tracking-[0.25em] uppercase text-[#c7f85a] select-none" aria-label="HACK. BUILD. WIN.">
            <span className="opacity-60">// </span>
            <span>{typedText}</span>
            <span
              className="inline-block w-[0.6ch] transition-opacity duration-75"
              style={{ opacity: cursorVisible ? 1 : 0 }}
              aria-hidden="true"
            >█</span>
            <span className="opacity-60"> //</span>
          </div>

          <p className="max-w-2xl text-center font-mono text-xs sm:text-sm leading-relaxed text-[#c8cfbd] mt-4">
            Build bold hardware and software ideas in a 36-hour sprint at <span className="text-[#f7f8ef] font-bold">RVITM JP Nagar 8th Phase, Bengaluru</span>.
            Compete for a <span className="font-bold text-[#c7f85a]">₹1,00,000 prize pool</span> with teams of 2–4.
          </p>

          {/* Action Buttons Section */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-2">
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

      </div>
    </section>
  );
}
