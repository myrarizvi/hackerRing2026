import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { Link } from "react-router-dom";
import rvLogo from "../assets/logos/rv-logo.png";
import startupLogo from "../assets/logos/startup-cell-logo.png";
import gdgLogo from "../assets/logos/gdg-logo.png";

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
    <section className="relative sm:min-h-[calc(100vh-4rem)] sm:min-h-[calc(100dvh-4rem)] flex flex-col justify-between pt-16 sm:pt-12 pb-10 sm:pb-12 overflow-hidden border-b border-[rgba(247,248,239,0.13)]">

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

        {/* Organizing Departments & College Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-2.5 pt-4 pb-2 font-mono text-xs text-[#c8cfbd] w-full"
        >
          {/* Host Institution — compact, centered, visually distinct */}
          <div className="flex justify-center">
            <TiltCard>
              <div className="border border-[rgba(199,248,90,0.25)] bg-[#141710] px-4 py-2.5 rounded-[8px] flex items-center gap-3 relative group hover:bg-[#191e0f] hover:border-[rgba(199,248,90,0.4)] transition-all duration-200">
                <img src={rvLogo} alt="RV Institute of Technology and Management logo" className="w-10 h-10 object-contain flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-[#c7f85a] tracking-widest uppercase block mb-0.5">[HOST_INSTITUTION]</span>
                  <p className="font-bold text-[#f7f8ef] leading-snug text-sm">RV Institute of Technology and Management</p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Section label */}
          <div className="text-[10px] font-mono text-[#aab1a2] tracking-widest uppercase text-center pt-0.5">
            // ORGANIZING_UNITS //
          </div>

          {/* 4-card grid — all organizers in one row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 w-full">
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

      </div>
    </section>
  );
}



