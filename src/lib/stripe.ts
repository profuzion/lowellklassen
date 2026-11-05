import Stripe from "stripe";

import type { Product } from "@/content/site";

export function getStripePriceId(product: Product) {
  return process.env[product.stripePriceEnv]?.trim() ?? "";
}

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) return "";
  return url.replace(/\/$/, "");
}

export function isStripeConfigured(product: Product) {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() &&
      getSiteUrl() &&
      getStripePriceId(product),
  );
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(key);
}
