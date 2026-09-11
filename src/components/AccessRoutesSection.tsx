import { motion } from "motion/react";

const GOOGLE_MAPS_URL =
  "https://www.google.com/search?sca_esv=b8c7a0b4c4f85b93&cs=1&output=search&kgmid=/g/11f12_y8fl&q=RV+INSTITUTE+OF+TECHNOLOGY+AND+MANAGEMENT+%C2%AE&shem=dlvs1,epsd1,ltae,rimspwouoe&shndl=30&source=sh/x/loc/uni/m1/1&kgs=5171ca07e4796730&utm_source=dlvs1,epsd1,ltae,rimspwouoe,sh/x/loc/uni/m1/1";

const ROUTES = [
  {
    id: "ROUTE_01",
    tag: "[RAIL]",
    mode: "RAILWAY",
    destination: "Kengeri Railway Station",
    detail: "15-16 km from campus - Auto/cab available",
  },
  {
    id: "ROUTE_02",
    tag: "[BUS]",
    mode: "BUS STOP",
    destination: "Royal Layout Bus Stops",
    detail: "6 min walk - BMTC stops near campus",
  },
  {
    id: "ROUTE_03",
    tag: "[AIR]",
    mode: "AIRPORT",
    destination: "Kempegowda Intl. (BLR)",
    detail: "~40-45 km to J.P. Nagar - Shuttles & cabs available",
  },
  {
    id: "ROUTE_04",
    tag: "[METRO]",
    mode: "METRO",
    destination: "Konanakunte Cross Metro",
    detail: "3 km - 10 min from campus",
  },
] as const;

export function AccessRoutesSection() {
  return (
    <section
      id="access-routes"
      className="py-12 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              {"// VENUE NAVIGATION //"}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#f7f8ef] tracking-tight uppercase mt-1">
              ACCESS ROUTES
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [RVITM_JP_NAGAR_8TH_PHASE]
          </div>
        </div>

        {/* Route Log */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] rounded-[8px] overflow-hidden"
        >
          {/* Terminal chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(247,248,239,0.08)] bg-[#181b14]">
            <span className="font-mono text-[10px] text-[#aab1a2]">
              {"// ACCESS_ROUTES //"}
            </span>
            <span className="ml-auto font-mono text-[10px] text-[#c7f85a]">
              4 entries
            </span>
          </div>

          {/* Route entries */}
          <div className="divide-y divide-[rgba(247,248,239,0.07)]">
            {ROUTES.map((route, idx) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
                className="group px-4 sm:px-6 py-4 hover:bg-[#181b14] transition-colors duration-150"
              >
                {/* Primary route line */}
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-xs sm:text-sm leading-snug">
                  <span className="text-[#c7f85a] font-bold shrink-0">
                    [{route.id}]
                  </span>
                  <span className="text-[#f7f8ef] font-bold tracking-wider shrink-0 min-w-[72px]">
                    {route.mode}
                  </span>
                  <span
                    className="text-[#c7f85a] font-mono tracking-[-0.08em] select-none shrink-0 hidden min-[380px]:inline"
                    aria-hidden="true"
                  >
                    {"-------------------->"}
                  </span>
                  <span
                    className="text-[#c7f85a] font-mono select-none shrink-0 min-[380px]:hidden"
                    aria-hidden="true"
                  >
                    {">"}
                  </span>
                  <span className="text-[#f7f8ef] font-semibold">
                    {route.destination}
                  </span>
                  <span className="text-[#aab1a2] text-[10px] font-mono ml-auto pl-2 shrink-0 hidden sm:inline">
                    {route.tag}
                  </span>
                </div>

                {/* Detail sub-line */}
                <div className="mt-1.5 font-mono text-[11px] text-[#aab1a2] flex items-start gap-1.5">
                  <span className="text-[#c8cfbd] shrink-0 select-none">{"\u2514\u2500"}</span>
                  <span>{route.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NAVIGATE_TO — prominent destination block */}
          <div className="border-t border-[rgba(247,248,239,0.13)] bg-[#12140f]">
            {/* Prompt label */}
            <div className="px-4 sm:px-6 pt-5 pb-3 border-b border-[rgba(247,248,239,0.08)]">
              <span className="font-mono text-xs text-[#c7f85a] font-bold tracking-wider">
                &gt; NAVIGATE_TO:
              </span>
            </div>

            {/* Venue name + address + CTA */}
            <div className="px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div className="space-y-1">
                <div className="font-mono font-black text-xl sm:text-2xl text-[#f7f8ef] tracking-tight leading-tight">
                  RVITM Campus
                </div>
                <div className="font-mono text-sm text-[#c8cfbd]">
                  JP Nagar 8th Phase, Bengaluru
                </div>
                <div className="font-mono text-[11px] text-[#aab1a2] pt-1">
                  RV Institute of Technology and Management
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto shrink-0 border border-[rgba(247,248,239,0.26)] bg-[#181b14] hover:bg-[#c7f85a] hover:border-[#c7f85a] hover:text-[#10120f] text-[#c7f85a] font-mono font-bold text-xs sm:text-sm px-5 py-3 rounded-[6px] transition-all duration-150 tracking-wider"
              >
                [ GET_DIRECTIONS → ]
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
