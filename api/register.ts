import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase server environment variables (SUPABASE_URL or SUPABASE_ANON_KEY). Check .env.local."
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

interface ParticipantData {
  id: number;
  name: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  hasResume?: boolean;
}

export async function handleRegisterRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await request.formData();

    const teamName = formData.get("teamName")?.toString().trim();
    const collegeName = formData.get("collegeName")?.toString().trim();
    const participantsRaw = formData.get("participants")?.toString();

    if (!teamName || !collegeName || !participantsRaw) {
      return new Response(
        JSON.stringify({ error: "Missing required registration fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    let participants: ParticipantData[];
    try {
      participants = JSON.parse(participantsRaw);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid participants payload" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(participants) || participants.length < 2 || participants.length > 4) {
      return new Response(
        JSON.stringify({ error: "Teams must consist of 2 to 4 members" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate fields
    for (const p of participants) {
      if (!p.name?.trim()) throw new Error("All participant names are required");
      if (!/^\d{10}$/.test(p.phone?.trim() || "")) {
        throw new Error(`Invalid phone number for participant ${p.name || ""}`);
      }
      if (!p.email?.trim() || !/\S+@\S+\.\S+/.test(p.email.trim())) {
        throw new Error(`Invalid email address for participant ${p.name || ""}`);
      }
      if (!p.github?.trim()) throw new Error(`GitHub profile is required for ${p.name}`);
      if (!p.linkedin?.trim()) throw new Error(`LinkedIn profile is required for ${p.name}`);
    }

    const supabase = getSupabaseAdmin();
    const teamId = crypto.randomUUID();

    // 1. Insert team
    const { error: teamError } = await supabase
      .from("teams")
      .insert({ id: teamId, team_name: teamName, college_name: collegeName });

    if (teamError) {
      throw new Error(`Team creation failed: ${teamError.message}`);
    }

    // 2. Insert participants and handle resumes
    for (const p of participants) {
      let resumeUrl: string | null = null;
      const resumeFile = formData.get(`resume_${p.id}`);

      if (resumeFile && typeof resumeFile !== "string" && resumeFile.size > 0) {
        const fileExt = resumeFile.name.split(".").pop() || "pdf";
        const sanitizedName = p.name.replace(/\s+/g, "_");
        const filePath = `${teamId}/${sanitizedName}_${Date.now()}.${fileExt}`;

        const buffer = Buffer.from(await resumeFile.arrayBuffer());

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, buffer, {
            contentType: resumeFile.type || "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Resume upload failed for ${p.name}: ${uploadError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from("resumes")
          .getPublicUrl(filePath);

        resumeUrl = publicUrlData.publicUrl;
      }

      const { error: participantError } = await supabase.from("participants").insert({
        team_id: teamId,
        name: p.name.trim(),
        phone: p.phone.trim(),
        email: p.email.trim(),
        github: p.github.trim(),
        linkedin: p.linkedin.trim(),
        resume_url: resumeUrl,
      });

      if (participantError) {
        throw new Error(`Participant registration failed for ${p.name}: ${participantError.message}`);
      }
    }

    return new Response(JSON.stringify({ success: true, teamId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// For Web standard runtimes (Vercel Edge / Node fetch)
export async function POST(request: Request) {
  return handleRegisterRequest(request);
}

// For Node / Express / Connect / Vercel Serverless Function
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
        req.method !== "GET" && req.method !== "HEAD"
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
    res.end(JSON.stringify({ error: error?.message || "Internal server error" }));
  }
}
