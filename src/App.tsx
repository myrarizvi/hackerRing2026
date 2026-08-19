import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import { NotFoundPage } from "@/components/NotFoundPage";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { RegistrationPage } from "@/components/RegistrationPage";
import { ArrowUpRight } from "lucide-react";
import { supabase } from './lib/supabase';
import { useEffect } from 'react';

useEffect(() => {
  supabase.from('teams').select('*').limit(1).then(({ data, error }) => {
    console.log('Test query:', { data, error });
  });
}, []);

export default function App() {
  const [transitionKey] = useState<number>(Date.now());

  return (
    <div className="relative min-h-screen bg-[#080907] bg-workbench-gradient text-[#f7f8ef] font-mono selection:bg-[#c7f85a] selection:text-[#10120f] overflow-x-hidden">
      {/* Full-screen Hot Pink Curtain Split Transition Overlay */}
      <LoadingOverlay triggerKey={transitionKey} />

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
              <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40">
                <Link
                  to="/register"
                  className="w-full btn-primary px-4 font-mono font-bold text-xs tracking-wider flex items-center justify-between shadow-2xl active:scale-95"
                >
                  <span>// REGISTER FOR Hacker-Ring 2.0 //</span>
                  <span className="flex items-center gap-1 font-bold">
                    JOIN NOW <ArrowUpRight size={14} />
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
