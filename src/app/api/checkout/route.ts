import { NextResponse } from "next/server";

import { checkoutRequestSchema } from "@/lib/checkout-schema";
import { createAuditCheckoutSession, isAuditCheckoutConfigured } from "@/lib/audit";
import { getProduct } from "@/lib/products";
import { getSiteUrl, getStripe, getStripePriceId, isStripeConfigured } from "@/lib/stripe";
import { site } from "@/content/site";

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = checkoutRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { status: "invalid", message: "Check the form and try again." },
      { status: 400 },
    );
  }

  const product = getProduct(parsed.data.product);
  const auditReady = product.id === "audit" && isAuditCheckoutConfigured();

  if (product.id === "audit" ? !auditReady : !isStripeConfigured(product)) {
    return NextResponse.json(
      {
        status: "pending",
        message: site.checkout.pendingBody,
      },
      { status: 503 },
    );
  }

  try {
    const siteUrl = getSiteUrl();
    const session =
      product.id === "audit"
        ? await createAuditCheckoutSession({
            request,
            customerEmail: parsed.data.email,
            customerName: parsed.data.name,
          })
        : await getStripe().checkout.sessions.create({
            mode: "payment",
            line_items: [{ price: getStripePriceId(product), quantity: 1 }],
            customer_email: parsed.data.email,
            success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/cancel`,
            metadata: {
              product: product.id,
              customer_name: parsed.data.name,
            },
          });

    if (!session.url) {
      return NextResponse.json(
        { status: "pending", message: site.checkout.pendingBody },
        { status: 503 },
      );
    }

    return NextResponse.json({ status: "ok", url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Checkout could not start. Try again in a moment.",
      },
      { status: 502 },
    );
  }
}
