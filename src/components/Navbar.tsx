import { useState, useEffect } from "react";
import { Terminal, ArrowUpRight, Menu, X, Radio } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

export function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "DATES", href: "#dates" },
    { label: "PRIZES", href: "#prizes" },
    { label: "TRACKS", href: "#tracks" },
    { label: "PHASES", href: "#phases" },
    { label: "TIMING", href: "#timing" },
    { label: "REGISTER", href: "#register" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the absolute top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-mono text-xs">
          {/* Brand / Terminal Identity */}
          <a
            href="#"
            className="flex items-center gap-2 text-white font-bold tracking-widest hover:opacity-80 transition-opacity"
          >
            <div className="w-5 h-5 border border-white flex items-center justify-center bg-black">
              <span className="w-2 h-2 bg-white block animate-pulse" />
            </div>
            <span className="text-sm tracking-tighter sm:tracking-widest">VOICE_AI_HACK</span>
            <span className="hidden md:inline text-neutral-500 text-[10px]">// RVITM //</span>
          </a>

          {/* Center navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-neutral-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-150 relative py-1 hover:border-b hover:border-white"
              >
                [{link.label}]
              </a>
            ))}
          </nav>

          {/* Right Status & Register CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-neutral-400 border border-neutral-800 px-2.5 py-1">
              <Radio size={12} className="text-white animate-pulse" />
              <span className="text-[11px]">{currentTime || "SYS_READY"}</span>
            </div>

            <a
              href="#register"
              className="relative group overflow-hidden border border-white bg-white text-black px-3.5 py-1.5 font-bold tracking-wider text-xs flex items-center gap-1.5 transition-all duration-200 hover:bg-black hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-1">
                REGISTER NOW
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-neutral-800 -translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-800 bg-black/98 px-6 py-5 font-mono text-sm space-y-3">
            <div className="text-[11px] text-neutral-500 pb-2 border-b border-neutral-800">
              // TERMINAL NAVIGATION //
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-neutral-300 hover:text-white hover:translate-x-1 transition-transform border-b border-neutral-900"
              >
                &gt; {link.label}
              </a>
            ))}
            <div className="pt-3 text-[11px] text-neutral-500">
              SYS STATUS: ONLINE • PRIZE: ₹1,00,000
            </div>
          </div>
        )}
      </header>
    </>
  );
}
