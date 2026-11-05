import { NextResponse } from "next/server";

import type Stripe from "stripe";

import { AUDIT_PRODUCT, tagAuditBuyer } from "@/lib/audit";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const signature = request.headers.get("stripe-signature");
  if (!secret || !process.env.STRIPE_SECRET_KEY?.trim()) {
    return new NextResponse("Stripe isn’t configured.", { status: 500 });
  }
  if (!signature) return new NextResponse("Bad signature", { status: 400 });

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error("Webhook signature check failed:", error);
    return new NextResponse("Bad signature", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    if (
      session.metadata?.product === AUDIT_PRODUCT &&
      session.payment_status === "paid"
    ) {
      try {
        await tagAuditBuyer(session);
      } catch (error) {
        console.error("Kit tagging failed for", session.id, error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
