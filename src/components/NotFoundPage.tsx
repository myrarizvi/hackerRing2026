import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Terminal, AlertTriangle, RefreshCw, Home } from "lucide-react";
import { TiltCard } from "./TiltCard";

export function NotFoundPage() {
  const [glitchText, setGlitchText] = useState("SIGNAL_LOST");
  const [pingTime, setPingTime] = useState(404);

  useEffect(() => {
    const glitchChars = "404_ERR_SIGNAL_LOST_0101#$_<>";
    const interval = setInterval(() => {
      const scrambled = "404_SIGNAL_LOST"
        .split("")
        .map((char) => (Math.random() < 0.2 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char))
        .join("");
      setGlitchText(scrambled);
      setTimeout(() => setGlitchText("404_SIGNAL_LOST"), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ascii404 = `
██╗██████╗  ██████╗     ███████╗██████╗ ██████╗  ██████╗ ██╗  ██╗
██║██╔══██╗██╔═══██╗    ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██║  ██║
██║██████╔╝██║   ██║    ███████╗██████╔╝██████╔╝██║   ██║███████║
██║██╔═══╝ ██║   ██║    ╚════██║██╔═══╝ ██╔══██╗██║   ██║██╔══██║
██║██║     ╚██████╔╝    ███████║██║     ██║  ██║╚██████╔╝██║  ██║
╚═╝╚═╝      ╚═════╝     ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
`;

  return (
    <div className="min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 font-mono text-[#f7f8ef] relative z-20">
      
      {/* Top Bar Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-[rgba(247,248,239,0.13)] pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs text-[#aab1a2]">
          <Terminal size={14} className="text-[#ff6f4e]" />
          <span>// TERMINAL_DIAGNOSTICS //</span>
        </div>
        <div className="text-xs text-[#ff6f4e] font-bold tracking-wider">
          [ERR_CODE: 0x404_UNREACHABLE]
        </div>
      </div>

      {/* Main 404 Terminal Center Container */}
      <div className="max-w-4xl mx-auto w-full my-auto text-center space-y-8">
        
        {/* ASCII 404 Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full overflow-x-auto py-2 flex justify-center"
        >
          <pre className="font-mono text-[6px] min-[380px]:text-[8px] sm:text-[13px] md:text-[16px] leading-tight text-[#ff6f4e] drop-shadow-[0_0_15px_rgba(255,111,78,0.4)] select-none">
            {ascii404}
          </pre>
        </motion.div>

        {/* Glitch Status Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#ff6f4e] bg-[#12140f] border border-[rgba(255,111,78,0.3)] px-4 py-1.5 rounded-full shadow-lg">
          <AlertTriangle size={14} className="animate-pulse" />
          <span className="tracking-widest font-bold">[{glitchText}]</span>
        </div>

        {/* Diagnostic Error Box */}
        <div className="max-w-xl mx-auto">
          <TiltCard>
            <div className="border border-[rgba(247,248,239,0.18)] bg-[#12140f] p-6 rounded-[8px] text-left space-y-3 font-mono text-xs relative overflow-hidden shadow-2xl">
              <div className="absolute top-2.5 right-3 text-[10px] text-[#aab1a2]">[DIAG: FAILED]</div>
              
              <div className="text-[#aab1a2] text-[11px] pb-2 border-b border-[rgba(247,248,239,0.1)]">
                // SYSTEM LOG //
              </div>

              <div className="space-y-1.5 text-[#c8cfbd]">
                <p><span className="text-[#ff6f4e]">&gt; REQUEST_URI:</span> {typeof window !== "undefined" ? window.location.pathname : "/unknown"}</p>
                <p><span className="text-[#ff6f4e]">&gt; STATUS:</span> 404 NOT_FOUND (Target node non-existent or moved)</p>
                <p><span className="text-[#0f8c7f]">&gt; RECOMMENDATION:</span> Reroute navigation back to primary index protocol.</p>
              </div>

              <div className="pt-2 border-t border-[rgba(247,248,239,0.08)] text-[10px] text-[#aab1a2] flex justify-between">
                <span>PING_LATENCY: {pingTime}ms</span>
                <span>PROTOCOL: HTTP/2_TERMINAL</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="/"
            className="w-full sm:w-auto btn-primary px-8 py-3.5 text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 group"
          >
            <Home size={16} />
            <span>[ RETURN TO MAIN TERMINAL ]</span>
          </a>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto btn-secondary px-6 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} className="animate-spin-slow" />
            <span>RETRY SIGNAL PING</span>
          </button>
        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-5xl mx-auto w-full pt-8 border-t border-[rgba(247,248,239,0.13)] mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#aab1a2] gap-2">
        <span>HackerRing 26' // RVITM 2026</span>
        <span>ERROR_PROTOCOL_V2.4</span>
      </div>

    </div>
  );
}
