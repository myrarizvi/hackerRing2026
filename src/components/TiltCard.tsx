import { useState, useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center (-1 to +1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate rotation angles
    const rotateX = -mouseY * maxTilt;
    const rotateY = mouseX * maxTilt;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`);

    // Calculate percentage position for spotlight
    const spotX = ((e.clientX - rect.left) / width) * 100;
    const spotY = ((e.clientY - rect.top) / height) * 100;
    setSpotlightPos({ x: spotX, y: spotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(199, 248, 90, 0.15), transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
