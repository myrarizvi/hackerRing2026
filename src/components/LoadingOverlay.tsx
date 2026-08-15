import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingOverlayProps {
  /** Optional manual trigger signal to re-play transition */
  triggerKey?: string | number;
  /** Callback after transition unmounts */
  onComplete?: () => void;
}

export function LoadingOverlay({ triggerKey, onComplete }: LoadingOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isSplitting, setIsSplitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsSplitting(false);

    // Hold solid metallic-lime screen for ~400ms
    const holdTimer = setTimeout(() => {
      setIsSplitting(true);
    }, 400);

    // Unmount after dramatic 1.1s split transition
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1550);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(unmountTimer);
    };
  }, [triggerKey]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden bg-black">
          {/* Left Curtain Panel (Pure Metallic Lime) */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: isSplitting ? "-100%" : "0%" }}
            transition={{
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="w-1/2 h-full bg-[#c7f85a] relative select-none"
          />

          {/* Right Curtain Panel (Pure Metallic Lime) */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: isSplitting ? "100%" : "0%" }}
            transition={{
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="w-1/2 h-full bg-[#c7f85a] relative select-none"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
