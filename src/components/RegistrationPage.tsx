import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { PAYMENT_URL } from "../constants";
import { ArrowLeft, Plus, Trash2, Upload, User, Terminal, ExternalLink } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Participant {
  id: number;
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  resume: File | null;
}

interface FieldErrors {
  teamName?: string;
  collegeName?: string;
  participants: {
    [id: number]: Partial<Record<keyof Omit<Participant, "id" | "resume">, string>>;
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let nextId = 3;
function createParticipant(): Participant {
  return { id: nextId++, name: "", phone: "", email: "", github: "", linkedin: "", resume: null };
}

// ─── Input component ─────────────────────────────────────────────────────────

function TerminalInput({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  error,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-[11px] text-[#aab1a2] tracking-widest uppercase">
        {label}
        {required && <span className="text-[#ff6f4e] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`bg-[#181b14] border ${error
            ? "border-[#ff6f4e] focus:border-[#ff6f4e]"
            : "border-[rgba(247,248,239,0.18)] focus:border-[#c7f85a]"
          } rounded-[6px] px-3 py-2.5 font-mono text-xs text-[#f7f8ef] placeholder:text-[#4a5040] outline-none transition-colors duration-150 w-full`}
      />
      {error && (
        <span className="font-mono text-[10px] text-[#ff6f4e]">&gt; {error}</span>
      )}
    </div>
  );
}

// ─── Participant block ────────────────────────────────────────────────────────

function ParticipantBlock({
  index,
  participant,
  canRemove,
  errors,
  onChange,
  onRemove,
  onResumeChange,
  onPhoneBlur,
}: {
  index: number;
  participant: Participant;
  canRemove: boolean;
  errors: Partial<Record<keyof Omit<Participant, "id" | "resume">, string>>;
  onChange: (field: keyof Omit<Participant, "id" | "resume">, value: string) => void;
  onRemove: () => void;
  onResumeChange: (file: File | null) => void;
  onPhoneBlur: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="relative border border-[rgba(247,248,239,0.18)] bg-[#12140f] rounded-[8px] p-5 sm:p-6 space-y-4"
    >
      {/* Block header */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(247,248,239,0.10)]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c8cfbd]">
          <User size={13} className="text-[#c7f85a]" />
          <span className="text-[#aab1a2]">[PARTICIPANT_{String(index + 1).padStart(2, "0")}]</span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 font-mono text-[10px] text-[#aab1a2] hover:text-[#ff6f4e] border border-[rgba(247,248,239,0.13)] hover:border-[rgba(255,111,78,0.4)] px-2 py-1 rounded-[5px] transition-all duration-150 cursor-pointer"
            aria-label="Remove participant"
          >
            <Trash2 size={11} />
            <span>REMOVE</span>
          </button>
        )}
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TerminalInput
          label="Full Name"
          value={participant.name}
          onChange={(v) => onChange("name", v)}
          placeholder="e.g. Riya Mehta"
          error={errors.name}
          required
        />
        <TerminalInput
          label="Phone"
          value={participant.phone}
          onChange={(v) => {
            // Strip non-digits and cap at 10
            const digits = v.replace(/\D/g, "").slice(0, 10);
            onChange("phone", digits);
          }}
          onBlur={onPhoneBlur}
          type="tel"
          placeholder="e.g. +91 98765 43210"
          error={errors.phone}
          required
        />
        <TerminalInput
          label="Email"
          value={participant.email}
          onChange={(v) => onChange("email", v)}
          type="email"
          placeholder="e.g. riya@college.edu"
          error={errors.email}
          required
        />
        <TerminalInput
          label="GitHub"
          value={participant.github}
          onChange={(v) => onChange("github", v)}
          placeholder="e.g. github.com/riyamehta"
          error={errors.github}
          required
        />
        <div className="sm:col-span-2">
          <TerminalInput
            label="LinkedIn"
            value={participant.linkedin}
            onChange={(v) => onChange("linkedin", v)}
            placeholder="e.g. linkedin.com/in/riyamehta"
            error={errors.linkedin}
            required
          />
        </div>
      </div>

      {/* Resume upload */}
      <div className="flex flex-col gap-1 pt-1">
        <label className="font-mono text-[11px] text-[#aab1a2] tracking-widest uppercase flex items-center gap-1.5">
          <Upload size={11} className="text-[#aab1a2]" />
          Resume
          <span className="text-[#6b7566] normal-case">(optional · PDF · max 2 MB)</span>
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => onResumeChange(e.target.files?.[0] ?? null)}
          className="bg-[#181b14] border border-[rgba(247,248,239,0.18)] rounded-[6px] px-3 py-2 font-mono text-xs text-[#c8cfbd] outline-none transition-colors duration-150 w-full file:mr-3 file:py-1 file:px-3 file:rounded-[4px] file:border file:border-[rgba(247,248,239,0.26)] file:bg-[#12140f] file:text-[#f7f8ef] file:font-mono file:text-[11px] file:cursor-pointer hover:border-[rgba(247,248,239,0.35)] cursor-pointer"
        />
        {participant.resume && (
          <span className="font-mono text-[10px] text-[#c7f85a]">
            &gt; ATTACHED: {participant.resume.name}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function RegistrationPage() {
  const [teamName, setTeamName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "", phone: "", email: "", github: "", linkedin: "", resume: null },
    { id: 2, name: "", phone: "", email: "", github: "", linkedin: "", resume: null },
  ]);
  const [errors, setErrors] = useState<FieldErrors>({ participants: {} });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Scroll to top on mount so the page always lands at the navbar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ── Participant helpers ──

  const updateParticipant = (
    id: number,
    field: keyof Omit<Participant, "id" | "resume">,
    value: string
  ) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    // Clear that specific error on change
    setErrors((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        [id]: { ...prev.participants[id], [field]: undefined },
      },
    }));
  };

  const updateResume = (id: number, file: File | null) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, resume: file } : p))
    );
  };

  const addParticipant = () => {
    if (participants.length >= 4) return;
    setParticipants((prev) => [...prev, createParticipant()]);
  };

  const removeParticipant = (id: number) => {
    if (participants.length <= 2) return;
    setParticipants((prev) => prev.filter((p) => p.id !== id));
    setErrors((prev) => {
      const next = { ...prev.participants };
      delete next[id];
      return { ...prev, participants: next };
    });
  };

  // ── Per-field blur validation for phone ──

  const validatePhone = (id: number, phone: string) => {
    const msg = !/^\d{10}$/.test(phone)
      ? phone.trim() === "" ? "Required" : "Please enter a valid 10-digit phone number"
      : undefined;
    setErrors((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        [id]: { ...prev.participants[id], phone: msg },
      },
    }));
  };

  // ── Validation ──

  const validate = (): boolean => {
    const newErrors: FieldErrors = { participants: {} };
    let valid = true;

    if (!teamName.trim()) {
      newErrors.teamName = "Team name is required";
      valid = false;
    }
    if (!collegeName.trim()) {
      newErrors.collegeName = "College name is required";
      valid = false;
    }

    participants.forEach((p) => {
      const pErrors: Partial<Record<keyof Omit<Participant, "id" | "resume">, string>> = {};
      if (!p.name.trim()) { pErrors.name = "Required"; valid = false; }
      if (!/^\d{10}$/.test(p.phone)) {
        pErrors.phone = p.phone.trim() === "" ? "Required" : "Please enter a valid 10-digit phone number";
        valid = false;
      }
      if (!p.email.trim()) { pErrors.email = "Required"; valid = false; }
      else if (!/\S+@\S+\.\S+/.test(p.email)) {
        pErrors.email = "Invalid email"; valid = false;
      }
      if (!p.github.trim()) { pErrors.github = "Required"; valid = false; }
      if (!p.linkedin.trim()) { pErrors.linkedin = "Required"; valid = false; }
      if (Object.keys(pErrors).length) newErrors.participants[p.id] = pErrors;
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Insert the team
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert({ team_name: teamName, college_name: collegeName })
        .select()
        .single();

      if (teamError) throw new Error(`Team creation failed: ${teamError.message}`);

      const teamId = teamData.id;

      // 2. Insert each participant, uploading resume first if present
      for (const p of participants) {
        let resumeUrl: string | null = null;

        if (p.resume) {
          const fileExt = p.resume.name.split(".").pop();
          const filePath = `${teamId}/${p.name.replace(/\s+/g, "_")}_${Date.now()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(filePath, p.resume);

          if (uploadError) throw new Error(`Resume upload failed for ${p.name}: ${uploadError.message}`);

          const { data: publicUrlData } = supabase.storage
            .from("resumes")
            .getPublicUrl(filePath);

          resumeUrl = publicUrlData.publicUrl;
        }

        const { error: participantError } = await supabase.from("participants").insert({
          team_id: teamId,
          name: p.name,
          phone: p.phone,
          email: p.email,
          github: p.github,
          linkedin: p.linkedin,
          resume_url: resumeUrl,
        });

        if (participantError) throw new Error(`Participant insert failed for ${p.name}: ${participantError.message}`);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ──

  return (
    <div className="relative z-20 min-h-screen pt-20 pb-20 px-4 sm:px-6 font-mono">
      <div className="max-w-3xl mx-auto">

        {/* Back nav */}
        <div className="mb-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 font-mono text-[#c7f85a] border border-[rgba(199,248,90,0.35)] bg-[#12140f]/80 hover:bg-[#141a0d] hover:border-[rgba(199,248,90,0.65)] hover:shadow-[0_0_12px_rgba(199,248,90,0.12)] px-4 py-2.5 rounded-[6px] transition-all duration-200 text-[15px] tracking-wide"
          >
            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1 flex-shrink-0" />
            <span>RETURN TO MAIN TERMINAL</span>
          </Link>
        </div>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 pb-6 border-b border-[rgba(247,248,239,0.13)]"
        >
          <div className="text-[11px] text-[#aab1a2] tracking-widest uppercase mb-2">
            // AUTHENTICATION &amp; ACCESS //
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-[#f7f8ef] tracking-tight uppercase">
            TEAM REGISTRATION
          </h1>
          <p className="text-xs text-[#c8cfbd] mt-2 leading-relaxed">
            Complete all required fields (<span className="text-[#ff6f4e]">*</span>) for each participant.
            Teams must have <span className="text-[#c7f85a] font-bold">2–4 members</span>.
          </p>
        </motion.div>

        {/* Payment confirmation state */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="border border-[#c7f85a] bg-[#12140f] rounded-[8px] p-8 space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center">
              <Terminal size={32} className="text-[#c7f85a]" />
              <div className="text-[#c7f85a] font-bold text-lg tracking-wider">
                [ REGISTRATION_SAVED ]
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[rgba(247,248,239,0.13)]" />

            {/* Body */}
            <div className="space-y-2 text-center">
              <p className="text-xs text-[#c8cfbd] leading-relaxed">
                Your registration has been recorded. Complete the payment
                to finalize your spot.
              </p>
              <p className="font-mono text-[10px] text-[#4a5040]">
                // You will be redirected to an external portal — your data is
                already saved //
              </p>
            </div>

            {/* Payment CTA */}
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-4 text-sm tracking-wider flex items-center justify-center gap-2"
            >
              <span>PROCEED TO PAYMENT</span>
              <ExternalLink size={15} />
            </a>

            {/* Reassurance note */}
            <p className="font-mono text-[10px] text-[#4a5040] text-center">
              // Opens in a new tab — return here if you need to click again //
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* Team info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="border border-[rgba(247,248,239,0.18)] bg-[#12140f] rounded-[8px] p-5 sm:p-6 space-y-4"
            >
              <div className="text-[11px] text-[#aab1a2] tracking-widest uppercase pb-3 border-b border-[rgba(247,248,239,0.10)]">
                [TEAM_INFO]
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TerminalInput
                  label="Team Name"
                  value={teamName}
                  onChange={(v) => {
                    setTeamName(v);
                    setErrors((prev) => ({ ...prev, teamName: undefined }));
                  }}
                  placeholder="e.g. Team Nexus"
                  error={errors.teamName}
                  required
                />
                <TerminalInput
                  label="College Name"
                  value={collegeName}
                  onChange={(v) => {
                    setCollegeName(v);
                    setErrors((prev) => ({ ...prev, collegeName: undefined }));
                  }}
                  placeholder="e.g. RVITM, Bengaluru"
                  error={errors.collegeName}
                  required
                />
              </div>
            </motion.div>

            {/* Participant blocks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="text-[11px] text-[#aab1a2] tracking-widest uppercase">
                [PARTICIPANT_ROSTER] — {participants.length} / 4
              </div>

              {participants.map((p, idx) => (
                <ParticipantBlock
                  key={p.id}
                  index={idx}
                  participant={p}
                  canRemove={participants.length > 2}
                  errors={errors.participants[p.id] ?? {}}
                  onChange={(field, value) => updateParticipant(p.id, field, value)}
                  onRemove={() => removeParticipant(p.id)}
                  onResumeChange={(file) => updateResume(p.id, file)}
                  onPhoneBlur={() => validatePhone(p.id, p.phone)}
                />
              ))}

              {/* Add member button */}
              {participants.length < 4 && (
                <button
                  type="button"
                  onClick={addParticipant}
                  className="w-full border border-dashed border-[rgba(247,248,239,0.26)] hover:border-[#c7f85a] bg-[#12140f] hover:bg-[#181b14] rounded-[8px] py-4 flex items-center justify-center gap-2 font-mono text-xs text-[#aab1a2] hover:text-[#c7f85a] transition-all duration-200 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>+ ADD MEMBER ({participants.length}/4)</span>
                </button>
              )}
            </motion.div>

            {/* Submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="pt-2 border-t border-[rgba(247,248,239,0.13)]"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "[SUBMITTING...]" : "[SUBMIT REGISTRATION]"}</span>
              </button>
              {submitError && (
                <p className="font-mono text-[11px] text-[#ff6f4e] mt-3 text-center">
                  &gt; ERROR: {submitError}
                </p>
              )}
              <p className="font-mono text-[10px] text-[#4a5040] mt-3 text-center">
  // All fields marked with <span className="text-[#ff6f4e]">*</span> are required before submission //
              </p>
            </motion.div>

          </form>
        )}

      </div>
    </div>
  );
}
