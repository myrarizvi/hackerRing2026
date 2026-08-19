import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { QrCode, ArrowUpRight, Copy, Check, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function RegisterSection() {
  const [copied, setCopied] = useState(false);
  const registerUrl = "https://hackerring26.rvitm.edu.in/register";

  const handleCopy = () => {
    navigator.clipboard.writeText(registerUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegisterClick = (e: MouseEvent) => {
    // Trigger monochrome/white sparks confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ffffff", "#cccccc", "#888888", "#444444"],
    });
  };

  return (
    <section id="register" className="py-16 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // AUTHENTICATION & ACCESS //
            </div>
            {/* ANSI Shadow ASCII Art Title */}
            <div className="overflow-x-auto py-1">
              <pre className="font-mono text-[6.5px] sm:text-[9px] md:text-[11px] leading-tight text-[#c7f85a] select-none">
{`██████╗ ███████╗ ██████╗ ██╗███████╗████████╗███████╗██████╗ 
██╔══██╗██╔════╝██╔════╝ ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝█████╗  ██║  ███╗██║███████╗   ██║   █████╗  ██████╔╝
██╔══██╗██╔══╝  ██║   ██║██║╚════██║   ██║   ██╔══╝  ██╔══██╗
██║  ██║███████╗╚██████╔╝██║███████║   ██║   ███████╗██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝`}
              </pre>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              REGISTER & PARTICIPATE
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd] flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c7f85a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c7f85a]"></span>
            </span>
            <span>[OFFICIAL_PORTAL_ACTIVE]</span>
          </div>
        </div>

        {/* Hero Portal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border border-[rgba(247,248,239,0.26)] bg-[#12140f] p-6 sm:p-10 lg:p-12 rounded-[8px] overflow-hidden shadow-2xl"
        >
          {/* Subtle Dither background */}
          <div className="absolute inset-0 dither-pattern opacity-25 pointer-events-none" />

          {/* Corner marks */}
          <div className="absolute top-2.5 left-3 font-mono text-[10px] text-[#aab1a2]">[AUTH_PASS]</div>
          <div className="absolute top-2.5 right-3 font-mono text-[10px] text-[#aab1a2]">[PORTAL: READY]</div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left QR Code Visual Block */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative p-4 border border-[rgba(247,248,239,0.26)] bg-[#181b14] text-[#f7f8ef] rounded-[8px] shadow-xl">
                {/* SVG QR Code Simulation */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-[#f7f8ef] p-2 flex flex-col items-center justify-center relative rounded-[4px]">
                  {/* Stylized QR Code Matrix */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-[#080907]">
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="26" height="26" stroke="#080907" strokeWidth="4" fill="none" />
                    <rect x="11" y="11" width="14" height="14" fill="#080907" />

                    {/* Top-Right Finder */}
                    <rect x="69" y="5" width="26" height="26" stroke="#080907" strokeWidth="4" fill="none" />
                    <rect x="75" y="11" width="14" height="14" fill="#080907" />

                    {/* Bottom-Left Finder */}
                    <rect x="5" y="69" width="26" height="26" stroke="#080907" strokeWidth="4" fill="none" />
                    <rect x="11" y="75" width="14" height="14" fill="#080907" />

                    {/* Dotted Matrix Blocks */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="12" />
                    <rect x="56" y="8" width="8" height="6" />

                    <rect x="8" y="36" width="12" height="6" />
                    <rect x="8" y="46" width="6" height="10" />
                    <rect x="8" y="60" width="8" height="6" />

                    {/* Central Data Matrix */}
                    <rect x="35" y="35" width="30" height="30" fill="none" stroke="#080907" strokeWidth="2" />
                    <rect x="42" y="42" width="16" height="16" fill="#080907" />
                    <rect x="47" y="47" width="6" height="6" fill="#f7f8ef" />

                    {/* Random alignment bits */}
                    <rect x="36" y="24" width="6" height="6" />
                    <rect x="46" y="24" width="10" height="6" />
                    <rect x="70" y="36" width="10" height="6" />
                    <rect x="84" y="46" width="8" height="10" />
                    <rect x="70" y="60" width="12" height="6" />
                    <rect x="36" y="70" width="6" height="12" />
                    <rect x="46" y="76" width="12" height="6" />
                    <rect x="62" y="70" width="8" height="8" />
                    <rect x="74" y="80" width="16" height="10" />
                  </svg>
                </div>
                <div className="mt-2 text-[#c7f85a] font-mono font-bold text-xs tracking-wider border-t border-[rgba(247,248,239,0.13)] pt-2">
                  SCAN TO REGISTER
                </div>
              </div>
              <p className="font-mono text-xs text-[#aab1a2] mt-3">
                Scan with mobile camera to open registration form directly
              </p>
            </div>

            {/* Right Information & Big CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#c8cfbd] mb-2">
                  <ShieldCheck size={14} className="text-[#0f8c7f]" />
                  <span>REGISTRATION PROTOCOL // 2026</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
                  ENTER Hacker-Ring 2.0
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#c8cfbd] mt-2 leading-relaxed">
                  Open to all student developers, hardware engineers, and AI researchers. Form teams of 2 to 4 members or register individually to join the talent pool.
                </p>
              </div>

              {/* URL and Copy box */}
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#181b14] p-3 rounded-[6px] font-mono text-xs flex items-center justify-between gap-2">
                <span className="text-[#c8cfbd] truncate select-all">{registerUrl}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[#f7f8ef] bg-[#12140f] hover:bg-[#181b14] border border-[rgba(247,248,239,0.26)] px-2.5 py-1 text-[11px] rounded-[5px] shrink-0 hover:border-[rgba(247,248,239,0.45)] transition-all cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-[#c7f85a]" /> : <Copy size={12} />}
                  <span>{copied ? "COPIED!" : "COPY LINK"}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://hackerring26.rvitm.edu.in/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleRegisterClick}
                  className="btn-primary px-8 py-4 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight size={20} />
                </a>

                <a
                  href="#dates"
                  className="btn-secondary px-6 py-4 text-sm flex items-center justify-center gap-2"
                >
                  <span>REVIEW SCHEDULE</span>
                </a>
              </div>

              {/* Criteria badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-[#aab1a2] pt-2 border-t border-[rgba(247,248,239,0.08)]">
                <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> Team: 2-4 Members</div>
                <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> No Registration Fee</div>
                <div className="flex items-center gap-1.5"><span className="text-[#c7f85a]">&bull;</span> Hardware/Software</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
