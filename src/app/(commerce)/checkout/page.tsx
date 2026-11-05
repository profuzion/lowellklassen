import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CheckoutForm } from "@/components/checkout-form";
import { ProductSwitcher } from "@/components/product-switcher";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { getProduct } from "@/lib/products";
import { isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Checkout",
  description: site.checkout.paymentNote,
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const params = await searchParams;
  const product = getProduct(params.product);

  return (
    <main id="main" className="ayc-wrap pt-32 pb-16 sm:pt-36">
      <h1 className="text-3xl text-foreground sm:text-4xl">
        {site.checkout.title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-pretty text-muted-foreground">
        {site.checkout.paymentNote}
      </p>

      <div className="mt-8">
        <ProductSwitcher current={product.id} />
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <article className="rounded-lg border border-border p-5 sm:p-6">
          <Badge variant="outline" className="rounded-md">
            {product.eyebrow}
          </Badge>
          <h2 className="mt-3 text-2xl text-foreground">{product.name}</h2>
          <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
            {product.summary}
          </p>
          <dl className="mt-5 grid gap-3 text-sm">
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Best for
              </dt>
              <dd className="mt-1 text-pretty text-foreground">
                {product.bestFor}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Format
              </dt>
              <dd className="mt-1 text-foreground">{product.format}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Price
              </dt>
              <dd className="mt-1 text-lg text-foreground">
                {product.priceLabel}
              </dd>
            </div>
          </dl>
          <ul className="mt-5 grid gap-2">
            {product.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-pretty text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <CheckoutForm
          productId={product.id}
          integrationPending={!isStripeConfigured(product)}
        />
      </div>
    </main>
  );
}
