import { useId, useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  interactive?: boolean;
  [key: string]: any;
}

export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.5,
  className,
  interactive = true,
  ...props
}: DotPatternProps) {
  const id = useId();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsTouch(false);
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setIsTouch(true);
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [interactive]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base ambient dot grid */}
      <svg
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-neutral-700/40",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>

      {/* Interactive cursor highlight dot layer */}
      {mousePos && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full fill-white transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(${isTouch ? "280px" : "380px"} circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(${isTouch ? "280px" : "380px"} circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)`,
          }}
        >
          <defs>
            <pattern
              id={`${id}-highlight`}
              width={width}
              height={height}
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
              x={x}
              y={y}
            >
              <circle cx={cx} cy={cy} r={cr * 1.5} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id}-highlight)`} />
        </svg>
      )}

      {/* Ambient drifting & pulsing glow fallback for mobile and idle devices */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen animate-pulse-subtle"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,255,255,0.12), transparent 70%)"
        }}
      />
    </div>
  );
}
