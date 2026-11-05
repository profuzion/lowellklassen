import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import { Readable } from "node:stream";

import { NextResponse } from "next/server";

import {
  AUDIT_FILE_NAME,
  auditPdfLocation,
  clientIp,
  getPaidAuditSession,
  isSessionId,
  rateLimited,
} from "@/lib/audit";

export const dynamic = "force-dynamic";

const invalid =
  "This download link isn’t valid. Check your purchase email, or reply to it and I’ll sort it out.";
const failed =
  "Something went wrong with the download. Reply to your purchase email and I’ll send the file directly.";

export async function GET(request: Request) {
  if (rateLimited(clientIp(request), "audit-download", 20)) {
    return new NextResponse(
      "Too many downloads from this connection. Try again in a few minutes.",
      { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!isSessionId(sessionId)) {
    return new NextResponse(invalid, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  try {
    const session = await getPaidAuditSession(sessionId);
    if (!session) {
      return new NextResponse(invalid, {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
      });
    }

    const headers = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${AUDIT_FILE_NAME}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    };

    const { url, filePath } = auditPdfLocation();
    if (url) {
      const file = await fetch(url);
      if (!file.ok || !file.body) throw new Error(`PDF fetch returned ${file.status}`);
      return new NextResponse(file.body, { headers });
    }

    await access(filePath);
    const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error("Download failed:", error);
    const missing =
      typeof error === "object" &&
      error !== null &&
      "type" in error &&
      (error as { type?: string }).type === "StripeInvalidRequestError";
    if (missing) {
      return new NextResponse(invalid, {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
      });
    }
    return new NextResponse(failed, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
