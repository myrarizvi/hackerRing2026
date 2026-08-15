import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DotPatternProps {
  width?: number;
  height?: number;
  cr?: number;
  className?: string;
  interactive?: boolean;
  gravityRadius?: number;
  maxPull?: number;
  damping?: number;
  stiffness?: number;
  [key: string]: any;
}

export function DotPattern({
  width = 24,
  height = 24,
  cr = 1.25,
  className,
  interactive = true,
  gravityRadius = 220,
  maxPull = 12,
  damping = 0.82,
  stiffness = 0.08,
  ...props
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let widthPx = 0;
    let heightPx = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      mass: number;
    }

    let dots: Dot[] = [];

    const initDots = () => {
      const dpr = window.devicePixelRatio || 1;
      widthPx = window.innerWidth;
      heightPx = window.innerHeight;

      canvas.width = widthPx * dpr;
      canvas.height = heightPx * dpr;
      canvas.style.width = `${widthPx}px`;
      canvas.style.height = `${heightPx}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(widthPx / width) + 2;
      const rows = Math.ceil(heightPx / height) + 2;
      const offsetX = (widthPx % width) / 2;
      const offsetY = (heightPx % height) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const bx = i * width + offsetX;
          const by = j * height + offsetY;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            mass: 0.9 + ((i + j) % 3) * 0.15, // Mass variation for weighted physical inertia
          });
        }
      }
    };

    initDots();

    const handleResize = () => {
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
    }

    const render = () => {
      if (mouse.active) {
        if (mouse.x === -9999) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          // Weighted cursor lag for fluid heavy feeling
          mouse.x += (mouse.targetX - mouse.x) * 0.22;
          mouse.y += (mouse.targetY - mouse.y) * 0.22;
        }
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      ctx.clearRect(0, 0, widthPx, heightPx);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Calculate equilibrium target position based on gravity well displacement
        let targetX = dot.baseX;
        let targetY = dot.baseY;
        let distFromMouse = 9999;

        if (mouse.active) {
          const dx = mouse.x - dot.baseX;
          const dy = mouse.y - dot.baseY;
          distFromMouse = Math.hypot(dx, dy);

          if (distFromMouse < gravityRadius && distFromMouse > 0.1) {
            // Smooth quadratic attraction factor
            const factor = Math.pow(1 - distFromMouse / gravityRadius, 2);
            // Pull dot towards cursor without exceeding maxPull (keeps grid completely unscrambled)
            const pullDistance = factor * maxPull;
            targetX = dot.baseX + (dx / distFromMouse) * pullDistance;
            targetY = dot.baseY + (dy / distFromMouse) * pullDistance;
          }
        }

        // Weighted spring mechanics driving dot towards equilibrium target
        const forceX = targetX - dot.x;
        const forceY = targetY - dot.y;

        dot.vx += (forceX * stiffness) / dot.mass;
        dot.vy += (forceY * stiffness) / dot.mass;

        // Friction / viscosity damping
        dot.vx *= damping;
        dot.vy *= damping;

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Default warm off-white dot rendering (#f7f8ef)
        let r = 247;
        let g = 248;
        let b = 239;
        let opacity = 0.22; // Subtle ambient warm off-white dot opacity
        let currentRadius = cr;

        if (distFromMouse < gravityRadius) {
          const factor = Math.pow(1 - distFromMouse / gravityRadius, 1.2);
          // Smoothly convert color to PromptCompiler metallic lime (#c7f85a -> rgb(199, 248, 90))
          r = Math.round(247 - (247 - 199) * factor);
          g = 248;
          b = Math.round(239 - (239 - 90) * factor);
          opacity = 0.25 + factor * 0.75; // Brightens up to 1.0 at cursor center
          currentRadius = cr + factor * 1.8; // Smooth weight expansion
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [width, height, cr, interactive, gravityRadius, maxPull, damping, stiffness]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        {...props}
      />
    </div>
  );
}


