import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TiltCard } from "./TiltCard";

const GLITCH_CHARS = "█▓▒░#$/@%&*+=~<>[]01";

const ASCII_ART_LINES = [
  "██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗       ██████╗ ██╗███╗   ██╗ ██████╗     ██████╗     ██████╗ ",
  "██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗      ██╔══██╗██║████╗  ██║██╔════╝     ╚════██╗   ██╔═████╗",
  "███████║███████║██║     █████╔╝ █████╗  ██████╔╝█████╗██████╔╝██║██╔██╗ ██║██║  ███╗     █████╔╝   ██║██╔██║",
  "██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗╚════╝██╔══██╗██║██║╚██╗██║██║   ██║    ██╔═══╝    ████╔╝██║",
  "██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║      ██║  ██║██║██║ ╚████║╚██████╔╝    ███████╗██╗╚██████╔╝",
  "╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝╚═╝ ╚═════╝ ",
];

export function HeroSection() {
  const [flicker, setFlicker] = useState(false);
  const [lines, setLines] = useState<string[]>(ASCII_ART_LINES);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const intervalRef = useRef<number | null>(null);

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

  return (
    <section className="relative sm:min-h-[calc(100vh-4rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col justify-between pt-16 sm:pt-12 pb-24 sm:pb-12 overflow-hidden border-b border-[rgba(247,248,239,0.13)]">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between relative z-10">

        {/* Top Spacer for Vertical Balance */}
        <div className="hidden sm:block h-2" />

        {/* Main Title, Collaboration Tag & CTA Grouping (Unified Center Stack) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="my-auto py-2 sm:py-6 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5"
        >
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
                fontSize: "clamp(4px, 1.35vw, 17px)",
                lineHeight: "1.05",
              }}
              className={`font-mono text-[#f7f8ef] group-hover/ascii:text-[#c7f85a] inline-block select-none transition-all duration-150 warm-text-glow tracking-normal ${
                flicker ? "opacity-40 translate-x-[1px]" : "opacity-100"
              }`}
            >
              {lines.join("\n")}
            </motion.pre>
          </div>

      

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 w-full sm:w-auto px-2">
            <a
              href="#register"
              className="w-full sm:w-auto btn-primary px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2.5 group"
            >
              <span>ACCESS REGISTRATION</span>
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#dates"
              className="w-full sm:w-auto btn-secondary px-5 py-3 sm:py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 group"
            >
              <span>[EXPLORE DATES]</span>
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Organizing Departments & College Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-3 sm:gap-4 pt-4 pb-2 font-mono text-xs text-[#c8cfbd] w-full"
        >
          {/* Top Row: 3 Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 w-full">
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 sm:p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <span className="text-[10px] text-[#aab1a2] block mb-1.5">[ORGANIZER_01]</span>
                <p className="font-semibold text-[#f7f8ef] leading-snug">Department of Electronics & Communications Engineering</p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 sm:p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <span className="text-[10px] text-[#aab1a2] block mb-1.5">[ORGANIZER_02]</span>
                <p className="font-semibold text-[#f7f8ef] leading-snug text-center">
                  <span className="block">Department of CSE (AI/ML) Engineering</span>
                  <span className="block">CSE Cluster </span>
                </p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 sm:p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <span className="text-[10px] text-[#aab1a2] block mb-1.5">[INSTITUTION]</span>
                <p className="font-bold text-[#f7f8ef] leading-snug">RV Institute of Technology and Management</p>
              </div>
            </TiltCard>
          </div>

          {/* Bottom Row: 2 Boxes Centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto w-full">
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 sm:p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200 text-left">
                <span className="text-[10px] text-[#aab1a2] block mb-1.5">[ORGANIZER_03]</span>
                <p className="font-semibold text-[#f7f8ef] leading-snug">Startup Ignition Cell</p>
              </div>
            </TiltCard>
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-3 sm:p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200 text-left">
                <span className="text-[10px] text-[#aab1a2] block mb-1.5">[ORGANIZER_04]</span>
                <p className="font-semibold text-[#f7f8ef] leading-snug">GDG RVITM</p>
              </div>
            </TiltCard>
          </div>
        </motion.div>

      </div>
    </section>
  );
}



