import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import rvLogo from "../assets/logos/rv-logo.webp";
import startupLogo from "../assets/logos/startup-cell-logo.webp";
import gdgLogo from "../assets/logos/gdg-logo.webp";

export function OrganizingUnitsSection() {
  return (
    <section className="py-12 sm:py-16 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[rgba(247,248,239,0.13)]"
        >
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // ORGANIZING_UNITS //
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
              ORGANIZERS
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [HACKER-RING 2.0 ORGANIZING TEAM]
          </div>
        </motion.div>

        {/* Host Institution */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <TiltCard>
            <div className="border border-[rgba(199,248,90,0.25)] bg-[#141710] px-4 py-2.5 rounded-[8px] flex items-center gap-3 relative group hover:bg-[#191e0f] hover:border-[rgba(199,248,90,0.4)] transition-all duration-200">
              <img src={rvLogo} alt="RV Institute of Technology and Management logo" className="w-10 h-10 object-contain flex-shrink-0" />
              <div>
                <span className="text-[10px] text-[#c7f85a] tracking-widest uppercase block mb-0.5">[HOST_INSTITUTION]</span>
                <p className="font-bold text-[#f7f8ef] leading-snug text-sm">RV Institute of Technology and Management</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0 }}
          >
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <img src={rvLogo} alt="ECE Department logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[#aab1a2] block mb-1">[ORGANIZER_01]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-xs">Dept. of Electronics &amp; Communications Engineering</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <img src={rvLogo} alt="CSE AI/ML Department logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[#aab1a2] block mb-1">[ORGANIZER_02]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-xs">Dept. of CSE (AI/ML) Engineering</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <img src={startupLogo} alt="Startup Ignition Cell logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[#aab1a2] block mb-1">[ORGANIZER_03]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-xs">Startup Ignition Cell</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <TiltCard>
              <div className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-4 rounded-[8px] h-full flex flex-col justify-between relative group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <img src={gdgLogo} alt="GDG RVITM logo" className="w-10 h-10 object-contain flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[#aab1a2] block mb-1">[ORGANIZER_04]</span>
                    <p className="font-semibold text-[#f7f8ef] leading-snug text-xs">GDG RVITM</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
