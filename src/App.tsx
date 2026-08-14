import { DotPattern } from "@/components/ui/dot-pattern";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { KeyDatesSection } from "@/components/KeyDatesSection";
import { PrizeSection } from "@/components/PrizeSection";
import { TracksSection } from "@/components/TracksSection";
import { PhasesSection } from "@/components/PhasesSection";
import { TimingSection } from "@/components/TimingSection";
import { RegisterSection } from "@/components/RegisterSection";
import { SupportSection } from "@/components/SupportSection";
import { AsciiFooter } from "@/components/AsciiFooter";
import { ArrowUpRight } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-x-hidden">
      {/* Site-wide interactive cursor-reactive dotted background */}
      <DotPattern
        width={24}
        height={24}
        cr={1.25}
        interactive={true}
        gravityRadius={240}
        maxPull={12}
        stiffness={0.08}
        damping={0.82}
      />

      {/* Subtle scanline CRT raster texture */}
      <div className="pointer-events-none fixed inset-0 z-10 scanline-overlay opacity-30" />

      {/* Sticky top terminal navigation */}
      <Navbar />

      {/* Main Single-page Content Flow */}
      <main className="relative z-20">
        <HeroSection />
        <KeyDatesSection />
        <PrizeSection />
        <TracksSection />
        <PhasesSection />
        <TimingSection />
        <RegisterSection />
        <SupportSection />
      </main>

      {/* ASCII Art & Sponsors Footer */}
      <div className="relative z-20 bg-black/90 border-t border-neutral-900">
        <AsciiFooter />
      </div>

      {/* Mobile Sticky Quick Register Action Bar */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
        <a
          href="#register"
          className="w-full py-3 px-4 bg-white text-black font-mono font-black text-xs tracking-wider flex items-center justify-between border-2 border-white shadow-2xl active:scale-95 transition-transform"
        >
          <span>// REGISTER FOR VOICE AI HACK //</span>
          <span className="flex items-center gap-1 font-bold">
            SCAN/JOIN <ArrowUpRight size={14} />
          </span>
        </a>
      </div>
    </div>
  );
}
