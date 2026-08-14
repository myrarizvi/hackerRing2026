import { useState, type MouseEvent } from "react";
import { motion } from "motion/react";
import { QrCode, ArrowUpRight, Copy, Check, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

export function RegisterSection() {
  const [copied, setCopied] = useState(false);
  const registerUrl = "https://voiceaihack.rvitm.edu.in/register";

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
    <section id="register" className="py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-neutral-800">
          <div>
            <div className="text-[11px] font-mono text-neutral-500 tracking-widest uppercase mb-1">
              // ACCESS GATEWAY //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight uppercase">
              SCAN TO REGISTER
            </h2>
          </div>
          <div className="font-mono text-xs text-neutral-400">
            [WINDOW: 17 AUG — 17 SEP]
          </div>
        </div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border-2 border-white bg-black p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          {/* Subtle Dither background */}
          <div className="absolute inset-0 dither-pattern opacity-25 pointer-events-none" />

          {/* Corner marks */}
          <div className="absolute top-2 left-2 font-mono text-[10px] text-neutral-500">[AUTH_PASS]</div>
          <div className="absolute top-2 right-2 font-mono text-[10px] text-neutral-500">[PORTAL: READY]</div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left QR Code Visual Block */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative p-4 border-2 border-white bg-white text-black shadow-2xl">
                {/* SVG QR Code Simulation */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-2 flex flex-col items-center justify-center relative">
                  {/* Stylized QR Code Matrix */}
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                    {/* Top-Left Finder */}
                    <rect x="5" y="5" width="26" height="26" stroke="black" strokeWidth="4" fill="none" />
                    <rect x="11" y="11" width="14" height="14" fill="black" />
                    
                    {/* Top-Right Finder */}
                    <rect x="69" y="5" width="26" height="26" stroke="black" strokeWidth="4" fill="none" />
                    <rect x="75" y="11" width="14" height="14" fill="black" />
                    
                    {/* Bottom-Left Finder */}
                    <rect x="5" y="69" width="26" height="26" stroke="black" strokeWidth="4" fill="none" />
                    <rect x="11" y="75" width="14" height="14" fill="black" />

                    {/* Dotted Matrix Blocks */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="12" />
                    <rect x="56" y="8" width="8" height="6" />
                    
                    <rect x="8" y="36" width="12" height="6" />
                    <rect x="8" y="46" width="6" height="10" />
                    <rect x="8" y="60" width="8" height="6" />

                    {/* Central Data Matrix */}
                    <rect x="35" y="35" width="30" height="30" fill="none" stroke="black" strokeWidth="2" />
                    <rect x="42" y="42" width="16" height="16" fill="black" />
                    <rect x="47" y="47" width="6" height="6" fill="white" />

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
                <div className="mt-2 text-black font-mono font-bold text-xs tracking-wider border-t border-black pt-1">
                  SCAN TO REGISTER
                </div>
              </div>
              <p className="font-mono text-xs text-neutral-400 mt-3">
                Scan with mobile camera to open registration form directly
              </p>
            </div>

            {/* Right Information & Big CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
                  <ShieldCheck size={14} className="text-white" />
                  <span>REGISTRATION PROTOCOL // 2026</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight uppercase">
                  ENTER VOICE AI HACK
                </h3>
                <p className="font-mono text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                  Open to all student developers, hardware engineers, and AI researchers. Form teams of 2 to 4 members or register individually to join the talent pool.
                </p>
              </div>

              {/* URL and Copy box */}
              <div className="border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs flex items-center justify-between gap-2">
                <span className="text-neutral-400 truncate select-all">{registerUrl}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-white hover:text-neutral-300 border border-neutral-700 px-2.5 py-1 text-[11px] shrink-0 hover:border-white transition-colors cursor-pointer"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "COPIED!" : "COPY LINK"}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://voiceaihack.rvitm.edu.in/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleRegisterClick}
                  className="relative group border-2 border-white bg-white text-black px-8 py-4 font-mono font-extrabold text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all duration-200"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                <a
                  href="#dates"
                  className="border border-neutral-800 bg-black text-neutral-300 hover:text-white hover:border-white px-6 py-4 font-mono text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>REVIEW SCHEDULE</span>
                </a>
              </div>

              {/* Criteria badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px] text-neutral-400 pt-2 border-t border-neutral-900">
                <div>&bull; Team: 2-4 Members</div>
                <div>&bull; No Registration Fee</div>
                <div>&bull; Hardware/Software</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
