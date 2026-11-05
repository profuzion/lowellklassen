import { NextResponse } from "next/server";

import {
  clientIp,
  createAuditCheckoutSession,
  isAuditCheckoutConfigured,
  rateLimited,
} from "@/lib/audit";
import { contact } from "@/content/home";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (rateLimited(clientIp(request), "audit-checkout", 10)) {
    return NextResponse.json(
      { error: "Too many tries from this connection." },
      { status: 429 },
    );
  }

  if (!isAuditCheckoutConfigured()) {
    return NextResponse.json(
      {
        error: `Checkout isn’t connected yet. Email ${contact.email} and I’ll send a payment link.`,
      },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as { source?: unknown } | null;
  const source = typeof body?.source === "string" ? body.source : "";

  try {
    const session = await createAuditCheckoutSession({ request, source, embedded: true });
    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Checkout didn’t open." },
        { status: 502 },
      );
    }
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Stripe checkout failed:", error);
    return NextResponse.json(
      { error: "I couldn’t open checkout. Please try again in a minute." },
      { status: 502 },
    );
  }
}
