import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables strictly on the server
dotenv.config({ path: ".env.local" });
dotenv.config();

// ── Validation Error ─────────────────────────────────────────────────────────
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// ── Server-Only Supabase Client ──────────────────────────────────────────────
function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing SUPABASE_URL server environment variable. Check .env.local."
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY server environment variable. Check .env.local."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// ── Rate Limiter ─────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REGISTRATIONS_PER_WINDOW = 5; // Max 5 submissions per 10 minutes per IP

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetAt) rateLimitMap.delete(ip);
    }
  }

  const entry = rateLimitMap.get(clientIp);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REGISTRATIONS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

// ── Origin / CORS Validation ─────────────────────────────────────────────────
function isOriginAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Non-cross-origin request (e.g., standard same-origin browser fetch or server-to-server)
    return true;
  }

  const host = request.headers.get("host");
  if (host && (origin === `http://${host}` || origin === `https://${host}`)) {
    return true;
  }

  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    process.env.APP_URL,
  ].filter(Boolean);

  return allowedOrigins.includes(origin);
}

// ── Validation Constants & Regexes ───────────────────────────────────────────
const MAX_REQUEST_SIZE = 10 * 1024 * 1024; // 10 MB max request payload
const MAX_RESUME_SIZE = 2 * 1024 * 1024; // 2 MB max per resume file
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const GITHUB_REGEX = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_.-]+)*\/?$/i;
const LINKEDIN_REGEX = /^https?:\/\/(www\.)?([a-z]{2,3}\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_%-]+\/?$/i;

interface ParticipantInput {
  id: number;
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  hasResume?: boolean;
}

// ── Core API Handler ─────────────────────────────────────────────────────────
export async function handleRegisterRequest(request: Request): Promise<Response> {
  // 1. Handle CORS Preflight
  if (request.method === "OPTIONS") {
    const origin = request.headers.get("origin") || "";
    const allowed = isOriginAllowed(request);
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowed ? origin : "null",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Validate Origin
  if (!isOriginAllowed(request)) {
    return new Response(JSON.stringify({ error: "Forbidden cross-origin request" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3. Request Size Guard
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_REQUEST_SIZE) {
    return new Response(
      JSON.stringify({ error: "Request payload exceeds 10MB limit" }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  // 4. Rate Limiter Guard
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({
        error: "Too many registration attempts from this network. Please wait a few minutes before trying again.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // State tracked for compensating rollback if failure occurs mid-registration
  const uploadedFilePaths: string[] = [];
  let createdTeamId: string | null = null;
  const supabase = getSupabaseAdmin();

  try {
    // 5. Parse FormData
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      throw new ValidationError("Malformed or invalid multipart form submission");
    }

    const teamNameRaw = formData.get("teamName");
    const collegeNameRaw = formData.get("collegeName");
    const participantsRaw = formData.get("participants");

    if (
      typeof teamNameRaw !== "string" ||
      typeof collegeNameRaw !== "string" ||
      typeof participantsRaw !== "string"
    ) {
      throw new ValidationError("Missing required registration fields");
    }

    const teamName = teamNameRaw.trim();
    const collegeName = collegeNameRaw.trim();

    if (!teamName || teamName.length > 80) {
      throw new ValidationError("Team name is required and cannot exceed 80 characters");
    }

    if (!collegeName || collegeName.length > 120) {
      throw new ValidationError("College name is required and cannot exceed 120 characters");
    }

    // 6. Parse and Validate Participants JSON
    let participants: ParticipantInput[];
    try {
      participants = JSON.parse(participantsRaw);
    } catch {
      throw new ValidationError("Invalid participants JSON payload");
    }

    if (!Array.isArray(participants) || participants.length < 2 || participants.length > 4) {
      throw new ValidationError("Teams must consist of 2 to 4 members");
    }

    // Strict schema check on all participant fields
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      const memberLabel = `Participant #${i + 1}`;

      if (!p || typeof p !== "object") {
        throw new ValidationError(`Malformed data structure for ${memberLabel}`);
      }

      if (typeof p.name !== "string" || !p.name.trim() || p.name.trim().length > 60) {
        throw new ValidationError(`A valid full name (max 60 chars) is required for ${memberLabel}`);
      }

      if (typeof p.phone !== "string") {
        throw new ValidationError(`Phone number is required for ${p.name}`);
      }
      const cleanPhone = p.phone.trim().replace(/\D/g, "");
      if (!PHONE_REGEX.test(cleanPhone)) {
        throw new ValidationError(`Please enter a valid 10-digit phone number for ${p.name}`);
      }

      if (
        typeof p.email !== "string" ||
        !EMAIL_REGEX.test(p.email.trim()) ||
        p.email.trim().length > 100
      ) {
        throw new ValidationError(`A valid email address is required for ${p.name}`);
      }

      if (
        typeof p.github !== "string" ||
        !GITHUB_REGEX.test(p.github.trim()) ||
        p.github.trim().length > 150
      ) {
        throw new ValidationError(
          `Please provide a valid GitHub profile URL (e.g. https://github.com/username) for ${p.name}`
        );
      }

      if (
        typeof p.linkedin !== "string" ||
        !LINKEDIN_REGEX.test(p.linkedin.trim()) ||
        p.linkedin.trim().length > 150
      ) {
        throw new ValidationError(
          `Please provide a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username) for ${p.name}`
        );
      }
    }

    const teamId = crypto.randomUUID();

    // 7. Process and Upload Resumes (Validating magic bytes and size)
    const participantRows = [];

    for (const p of participants) {
      let resumeUrl: string | null = null;
      const resumeEntry = formData.get(`resume_${p.id}`);

      if (resumeEntry && typeof resumeEntry !== "string" && resumeEntry.size > 0) {
        // Enforce max size before reading into memory
        if (resumeEntry.size > MAX_RESUME_SIZE) {
          throw new ValidationError(`Resume file for ${p.name} exceeds the 2MB size limit`);
        }

        // File extension validation
        const fileName = resumeEntry.name || "";
        const fileExt = fileName.split(".").pop()?.toLowerCase();
        if (fileExt !== "pdf") {
          throw new ValidationError(`Resume for ${p.name} must be a file with a .pdf extension`);
        }

        // MIME type validation
        const mimeType = (resumeEntry.type || "").toLowerCase();
        if (mimeType && mimeType !== "application/pdf" && mimeType !== "application/x-pdf") {
          throw new ValidationError(`Resume for ${p.name} has an invalid MIME type (${mimeType})`);
        }

        // Buffer file and verify magic bytes (%PDF-)
        const buffer = Buffer.from(await resumeEntry.arrayBuffer());
        if (buffer.length < 5 || buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
          throw new ValidationError(
            `Resume for ${p.name} is corrupted or not an authentic PDF document (invalid magic header)`
          );
        }

        // Path sanitization
        const safeName = p.name.trim().replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
        const filePath = `${teamId}/${safeName}_${Date.now()}.pdf`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, buffer, {
            contentType: "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          console.error(`[STORAGE_ERROR] Resume upload failed for ${p.name}:`, uploadError);
          throw new Error(`Resume storage failed for ${p.name}`);
        }

        uploadedFilePaths.push(filePath);

        const { data: publicUrlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(filePath);

        resumeUrl = publicUrlData.publicUrl;
      }

      const cleanPhone = p.phone.trim().replace(/\D/g, "");

      participantRows.push({
        team_id: teamId,
        name: p.name.trim(),
        phone: cleanPhone,
        email: p.email.trim(),
        github: p.github.trim(),
        linkedin: p.linkedin.trim(),
        resume_url: resumeUrl,
      });
    }

    // 8. Insert Team Record
    const { error: teamError } = await supabase
      .from("teams")
      .insert({ id: teamId, team_name: teamName, college_name: collegeName });

    if (teamError) {
      console.error("[DB_ERROR] Team insert failed:", teamError);
      throw new Error("Failed to record team");
    }

    createdTeamId = teamId;

    // 9. Batch Insert Participants (Atomic multi-row insert)
    const { error: participantsError } = await supabase
      .from("participants")
      .insert(participantRows);

    if (participantsError) {
      console.error("[DB_ERROR] Participants batch insert failed:", participantsError);
      throw new Error("Failed to record team participants");
    }

    // Success response: returns only application data, NEVER any secret key
    return new Response(JSON.stringify({ success: true, teamId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    // 10. Compensating Rollback (Prevent partial registrations)
    if (createdTeamId) {
      try {
        await supabase.from("participants").delete().eq("team_id", createdTeamId);
        await supabase.from("teams").delete().eq("id", createdTeamId);
      } catch (rollbackDbErr) {
        console.error("[ROLLBACK_DB_FAILED]", rollbackDbErr);
      }
    }

    if (uploadedFilePaths.length > 0) {
      try {
        await supabase.storage.from("resumes").remove(uploadedFilePaths);
      } catch (rollbackStorageErr) {
        console.error("[ROLLBACK_STORAGE_FAILED]", rollbackStorageErr);
      }
    }

    // 11. Proper HTTP Status Code & Sanitized Error Masking
    if (err instanceof ValidationError) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.error("[REGISTER_INTERNAL_ERROR]", err);
    return new Response(
      JSON.stringify({
        error: "Registration could not be completed. Please try again or contact support.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ── Web Standard Export (Vercel Edge / Modern Web Fetch) ──────────────────────
export async function POST(request: Request) {
  return handleRegisterRequest(request);
}

export async function OPTIONS(request: Request) {
  return handleRegisterRequest(request);
}

// ── Node / Express / Connect / Vercel Serverless Function Adapter ─────────────
export default async function handler(req: any, res: any) {
  if (typeof Request !== "undefined" && req instanceof Request) {
    return handleRegisterRequest(req);
  }

  try {
    const { Readable } = await import("stream");
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const webReq = new Request(`${protocol}://${host}${req.url}`, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body:
        req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS"
          ? (Readable.toWeb(req) as any)
          : undefined,
      duplex: "half",
    } as any);

    const webRes = await handleRegisterRequest(webReq);
    res.statusCode = webRes.status;
    webRes.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });
    const body = await webRes.text();
    res.end(body);
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "An unexpected internal error occurred. Please try again later.",
      })
    );
  }
}
