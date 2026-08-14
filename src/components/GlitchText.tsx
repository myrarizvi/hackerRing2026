import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  scrambleInterval?: number;
}

const GLITCH_CHARS = "01#$_<>/%*&@!~+=[]{}";

export function GlitchText({
  text,
  className = "",
  scrambleOnMount = true,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<number | null>(null);

  const runScramble = () => {
    let iteration = 0;
    const maxIterations = text.length;

    if (frameRef.current) clearInterval(frameRef.current);

    frameRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (frameRef.current) clearInterval(frameRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 30);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      runScramble();
    }
    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, scrambleOnMount]);

  return (
    <span
      className={`inline-block cursor-default font-mono transition-all duration-150 ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        runScramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
      title="Hover to re-scramble"
    >
      {displayText}
    </span>
  );
}
