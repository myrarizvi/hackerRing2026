import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Radio } from "lucide-react";
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
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#c7f85a] z-50 origin-left"
        style={{ scaleX }}
      />

      <header className="fixed top-0 left-0 right-0 z-40 nav-glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-mono text-xs">
          {/* Brand / Terminal Identity */}
          <a
            href="#"
            className="flex items-center gap-2 text-[#f7f8ef] font-bold tracking-widest hover:text-[#c7f85a] transition-colors"
          >
            <div className="w-5 h-5 border border-[rgba(247,248,239,0.26)] flex items-center justify-center bg-[#12140f] rounded-[4px]">
              <span className="w-2 h-2 bg-[#c7f85a] block animate-pulse rounded-[1px]" />
            </div>
            <span className="text-sm tracking-tighter sm:tracking-widest">HACKERRING_26'</span>
            <span className="hidden md:inline text-[#aab1a2] text-[10px]">// RVITM //</span>
          </a>

          {/* Center navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[#aab1a2]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#f7f8ef] transition-colors duration-150 relative py-1 hover:border-b hover:border-[#c7f85a]"
              >
                [{link.label}]
              </a>
            ))}
          </nav>

          {/* Right Status & Register CTA */}
          <div className="flex items-center gap-3">
            {/* UTC Clock / Status */}
            <div className="hidden sm:flex items-center gap-2 text-[#c8cfbd] bg-[#12140f] border border-[rgba(247,248,239,0.13)] px-2.5 py-1 rounded-[6px]">
              <Radio size={12} className="text-[#0f8c7f] animate-pulse" />
              <span className="text-[11px]">{currentTime || "SYS_READY"}</span>
            </div>

            <a
              href="#register"
              className="btn-primary px-3.5 py-1 text-xs tracking-wider flex items-center gap-1.5"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 border border-[rgba(247,248,239,0.26)] bg-[#12140f] text-[#c8cfbd] hover:text-[#f7f8ef] hover:border-[rgba(247,248,239,0.45)] rounded-[6px]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[rgba(247,248,239,0.13)] bg-[#12140f]/98 backdrop-blur-lg px-6 py-5 font-mono text-sm space-y-3 shadow-2xl">
            <div className="text-[11px] text-[#aab1a2] pb-2 border-b border-[rgba(247,248,239,0.13)]">
              // TERMINAL NAVIGATION //
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#c8cfbd] hover:text-[#c7f85a] hover:translate-x-1 transition-transform border-b border-[rgba(247,248,239,0.08)]"
              >
                &gt; {link.label}
              </a>
            ))}
            <div className="pt-3 text-[11px] text-[#aab1a2] flex items-center justify-between">
              <span>SYS STATUS: <span className="text-[#0f8c7f] font-bold">ONLINE</span></span>
              <span>PRIZE: <span className="text-[#c7f85a] font-bold">₹1,00,000</span></span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}


