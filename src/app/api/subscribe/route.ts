import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { first_name?: string; email?: string; website?: string }
    | null;
  const firstName = body?.first_name?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const website = body?.website ?? "";

  if (website) return NextResponse.json({ ok: true });
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many tries from this connection." },
      { status: 429 },
    );
  }
  if (!firstName || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please add your first name and a valid email." },
      { status: 400 },
    );
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  const tagId = process.env.KIT_TAG_ID;
  if (!apiKey || !formId) {
    console.error("KIT_API_KEY or KIT_FORM_ID is missing");
    return NextResponse.json(
      { error: "Sign-ups aren't connected yet." },
      { status: 500 },
    );
  }

  const payload: {
    api_key: string;
    email: string;
    first_name: string;
    tags?: number[];
  } = { api_key: apiKey, email, first_name: firstName };
  if (tagId) payload.tags = [Number(tagId)];

  try {
    const kit = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      },
    );
    if (!kit.ok) {
      console.error("Kit error", kit.status);
      return NextResponse.json(
        { error: "I couldn't add you to the list." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Kit request failed", error);
    return NextResponse.json(
      { error: "I couldn't reach the email service." },
      { status: 502 },
    );
  }
}
