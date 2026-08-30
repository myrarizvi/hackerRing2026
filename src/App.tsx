import { Routes, Route, Link } from "react-router-dom";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { OrganizingUnitsSection } from "@/components/OrganizingUnitsSection";
import { KeyDatesSection } from "@/components/KeyDatesSection";
import { PrizeSection } from "@/components/PrizeSection";
import { TracksSection } from "@/components/TracksSection";
import { PhasesSection } from "@/components/PhasesSection";
import { TimingSection } from "@/components/TimingSection";
import { RegisterSection } from "@/components/RegisterSection";
import { SupportSection } from "@/components/SupportSection";
import { AsciiFooter } from "@/components/AsciiFooter";
import { NotFoundPage } from "@/components/NotFoundPage";
import { RegistrationPage } from "@/components/RegistrationPage";
import { ArrowUpRight } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#080907] bg-workbench-gradient text-[#f7f8ef] font-mono selection:bg-[#c7f85a] selection:text-[#10120f] overflow-x-hidden">
      {/* Background grid overlay using rgba(247, 248, 239, 0.045) */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-grid-overlay opacity-80" />

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
      <div className="pointer-events-none fixed inset-0 z-10 scanline-overlay opacity-20" />

      {/* Sticky top terminal navigation */}
      <Navbar />

      {/* Main Content View */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Main Single-page Content Flow */}
              <main className="relative z-20">
                <HeroSection />
                <OrganizingUnitsSection />
                <KeyDatesSection />
                <PrizeSection />
                <TracksSection />
                <PhasesSection />
                <TimingSection />
                <RegisterSection />
                <SupportSection />
              </main>

              {/* ASCII Art & Sponsors Footer */}
              <div className="relative z-20 bg-[#12140f]/90 border-t border-[rgba(247,248,239,0.13)]">
                <AsciiFooter />
              </div>

              {/* Mobile Sticky Quick Register Action Bar */}
              <div className="mobile-sticky-register sm:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 bg-gradient-to-t from-[#050604] via-[#050604]/95 to-transparent">
                <Link
                  to="/register"
                  className="w-full btn-primary min-h-[54px] px-4 font-mono font-bold flex items-center justify-between gap-3 shadow-2xl active:scale-[0.98]"
                >
                  <span className="min-w-0 text-left leading-tight">
                    <span className="block whitespace-nowrap text-[11px] tracking-wider">REGISTRATION OPEN</span>
                    <span className="mt-0.5 block whitespace-nowrap text-[9px] font-semibold opacity-70">2–4 MEMBERS · NO FEE</span>
                  </span>
                  <span className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-bold tracking-wide">
                    JOIN NOW <ArrowUpRight size={15} />
                  </span>
                </Link>
              </div>
            </>
          }
        />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
