import path from "node:path";

import type Stripe from "stripe";

import { getSiteUrl, getStripe } from "@/lib/stripe";

export const AUDIT_PRODUCT = "brand-clarity-audit";
export const AUDIT_FILE_NAME = "The-Brand-Clarity-Audit.pdf";

const SESSION_RE = /^cs_(test|live)_[A-Za-z0-9]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();
const paidCache = new Map<
  string,
  { at: number; email: string; firstName: string; kit: boolean }
>();

export function getAuditPriceId() {
  return (
    process.env.STRIPE_PRICE_AUDIT?.trim() ||
    process.env.STRIPE_AUDIT_PRICE_ID?.trim() ||
    ""
  );
}

export function isAuditCheckoutConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim() && getAuditPriceId());
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export function rateLimited(ip: string, bucket: string, max: number) {
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}

export function auditSiteUrl(request?: Request) {
  const fromEnv =
    getSiteUrl() || (process.env.SITE_URL?.trim() ?? "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (request) return new URL(request.url).origin;
  return "http://localhost:3000";
}

export function auditDownloadUrl(site: string, sessionId: string) {
  return `${site}/api/audit/download?session_id=${encodeURIComponent(sessionId)}`;
}

export function isSessionId(value: string | null): value is string {
  return Boolean(value && SESSION_RE.test(value));
}

export function auditPdfLocation() {
  const url = process.env.AUDIT_PDF_URL?.trim() ?? "";
  const configured = process.env.AUDIT_PDF_PATH?.trim();
  const filePath = configured
    ? path.resolve(configured)
    : path.join(process.cwd(), "private", "Brand-Clarity-Audit.pdf");
  return { url, filePath };
}

export async function createAuditCheckoutSession({
  request,
  source = "",
  customerEmail,
  customerName,
  embedded = false,
}: {
  request: Request;
  source?: string;
  customerEmail?: string;
  customerName?: string;
  embedded?: boolean;
}) {
  const stripe = getStripe();
  const site = auditSiteUrl(request);
  const taxOn = process.env.STRIPE_TAX === "on";
  const cleanSource = source.slice(0, 60);
  const metadata: Stripe.MetadataParam = {
    product: AUDIT_PRODUCT,
    source: cleanSource,
  };
  if (customerName) metadata.customer_name = customerName.slice(0, 200);
  const returnUrl = `${site}/brand-clarity-audit/thank-you?session_id={CHECKOUT_SESSION_ID}`;

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: getAuditPriceId(), quantity: 1 }],
    customer_creation: "always",
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    billing_address_collection: taxOn ? "required" : "auto",
    automatic_tax: { enabled: taxOn },
    allow_promotion_codes: true,
    payment_intent_data: { metadata: { product: AUDIT_PRODUCT } },
    metadata,
    ...(embedded
      ? {
          ui_mode: "embedded_page" as const,
          return_url: returnUrl,
          branding_settings: {
            display_name: "Lowell Klassen",
            background_color: "#161616",
            button_color: "#ffc82c",
            border_style: "rectangular",
            font_family: "inter",
          },
        }
      : {
          success_url: returnUrl,
          cancel_url: `${site}/brand-clarity-audit?checkout=cancelled`,
        }),
  });
}

export async function getPaidAuditSession(sessionId: string) {
  const cached = paidCache.get(sessionId);
  if (cached && cached.kit && Date.now() - cached.at < WINDOW_MS) return cached;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.metadata?.product !== AUDIT_PRODUCT) return null;
  if (session.payment_status !== "paid") return null;

  let kit = cached?.kit ?? false;
  if (!kit) {
    try {
      await tagAuditBuyer(session);
      kit = true;
    } catch (error) {
      console.error("Kit capture failed for", session.id, error);
    }
  }

  const name = session.customer_details?.name?.trim() ?? "";
  const record = {
    at: Date.now(),
    email: session.customer_details?.email ?? "",
    firstName: name.split(/\s+/)[0] ?? "",
    kit,
  };
  paidCache.set(sessionId, record);
  return record;
}

export async function tagAuditBuyer(session: Stripe.Checkout.Session) {
  const apiKey = process.env.KIT_API_KEY?.trim();
  const tagId = process.env.KIT_AUDIT_TAG_ID?.trim();
  const email = session.customer_details?.email;
  if (!apiKey || !email) {
    console.warn("Skipping Kit capture (missing KIT_API_KEY or buyer email) for", session.id);
    return;
  }

  const firstName = session.customer_details?.name?.trim().split(/\s+/)[0] || undefined;
  const url = tagId
    ? `https://api.convertkit.com/v3/tags/${tagId}/subscribe`
    : "https://api.convertkit.com/v3/subscribers";
  const body: {
    api_key: string;
    email: string;
    first_name?: string;
    fields?: { audit_download_url: string };
  } = { api_key: apiKey, email, first_name: firstName };
  if (tagId) {
    body.fields = { audit_download_url: auditDownloadUrl(auditSiteUrl(), session.id) };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Kit ${response.status}: ${await response.text()}`);
  }
}
