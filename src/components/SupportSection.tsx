import { useState } from "react";
import { motion } from "motion/react";
import { Phone, PhoneCall, Copy, Check, User, GraduationCap, ShieldAlert, MessageSquare } from "lucide-react";
import { ContactPerson } from "@/types";

export function SupportSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const contacts: ContactPerson[] = [
    {
      id: "fac-1",
      role: "Faculty",
      name: "Mr. Avinash N Rao",
      phone: "8147464724",
    },
    {
      id: "fac-2",
      role: "Faculty",
      name: "Dr. Vikash Kumar",
      phone: "7042341916",
    },
    {
      id: "stu-1",
      role: "Student",
      name: "Manish Gupta",
      phone: "9305650955",
    },
    {
      id: "stu-2",
      role: "Student",
      name: "Biswadeep Mandal",
      phone: "6294357358",
    },
  ];

  const handleCopy = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-b border-[rgba(247,248,239,0.13)] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[rgba(247,248,239,0.13)]">
          <div>
            <div className="text-[11px] font-mono text-[#aab1a2] tracking-widest uppercase mb-1">
              // COMM LINES //
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
              SUPPORT & CONTACT
            </h2>
          </div>
          <div className="font-mono text-xs text-[#c8cfbd]">
            [HELPDESK_OPERATIONAL]
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((contact, idx) => {
            const isFaculty = contact.role === "Faculty";
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="border border-[rgba(247,248,239,0.13)] bg-[#12140f] p-5 rounded-[8px] flex flex-col justify-between group hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.26)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#aab1a2] pb-2 mb-3 border-b border-[rgba(247,248,239,0.13)]">
                    <span className="flex items-center gap-1.5 text-[#c7f85a] font-bold">
                      {isFaculty ? <GraduationCap size={14} /> : <User size={14} />}
                      <span>[{contact.role.toUpperCase()}_LEAD]</span>
                    </span>
                    <span className="text-[#c8cfbd]">0{idx + 1}</span>
                  </div>

                  <h3 className="font-mono font-bold text-base text-[#f7f8ef] mb-2">
                    {contact.name}
                  </h3>

                  <div className="font-mono text-lg font-bold text-[#c8cfbd] tracking-wider mb-4">
                    +91 {contact.phone}
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(247,248,239,0.08)] flex items-center gap-2">
                  <a
                    href={`tel:+91${contact.phone}`}
                    className="flex-1 border border-[rgba(247,248,239,0.26)] bg-[#12140f] hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.45)] text-[#f7f8ef] py-2 px-3 font-mono text-xs text-center flex items-center justify-center gap-1.5 rounded-[6px] transition-colors"
                  >
                    <PhoneCall size={12} className="text-[#c7f85a]" />
                    <span>CALL</span>
                  </a>
                  <button
                    onClick={() => handleCopy(contact.id, contact.phone)}
                    className="border border-[rgba(247,248,239,0.26)] bg-[#12140f] hover:bg-[#181b14] hover:border-[rgba(247,248,239,0.45)] text-[#f7f8ef] p-2 rounded-[6px] transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedId === contact.id ? <Check size={14} className="text-[#c7f85a]" /> : <Copy size={14} />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Support Helpdesk Notice */}
        <div className="mt-8 p-4 border border-[rgba(247,248,239,0.13)] bg-[#12140f] rounded-[8px] flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#c8cfbd] gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#c7f85a] font-bold">&gt;</span>
            <span>FOR QUERIES ON REGISTRATIONS, HARDWARE REQUISITIONS, OR ACCOMMODATION: REACH OUT DIRECTLY.</span>
          </div>
          <span className="text-[#aab1a2] text-[10px]">[RESPONSE TIME: &lt; 2 HRS]</span>
        </div>

      </div>
    </section>
  );
}
