import { NextResponse } from "next/server";

import {
  auditDownloadUrl,
  auditSiteUrl,
  clientIp,
  getPaidAuditSession,
  isSessionId,
  rateLimited,
} from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (rateLimited(clientIp(request), "audit-session", 30)) {
    return NextResponse.json({ error: "Too many tries." }, { status: 429 });
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!isSessionId(sessionId)) {
    return NextResponse.json(
      { error: "I couldn’t find a completed purchase for this link." },
      { status: 404 },
    );
  }

  try {
    const session = await getPaidAuditSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "I couldn’t find a completed purchase for this link." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      email: session.email,
      first_name: session.firstName,
      download_url: auditDownloadUrl(auditSiteUrl(request), sessionId),
    });
  } catch (error) {
    console.error("Session lookup failed:", error);
    const missing =
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      (error as { type?: string }).type === "StripeInvalidRequestError";
    if (missing) {
      return NextResponse.json(
        { error: "I couldn’t find a completed purchase for this link." },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "I couldn’t check your purchase. Refresh in a moment." },
      { status: 502 },
    );
  }
}
