import type { Metadata } from "next";

import { BrandButton } from "@/components/brand-button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.cancel.title,
};

export default function CancelPage() {
  return (
    <main id="main" className="ayc-wrap max-w-3xl pt-36 pb-24">
      <h1 className="text-3xl text-foreground sm:text-4xl">
        {site.cancel.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-pretty text-muted-foreground">
        {site.cancel.body}
      </p>
      <BrandButton href="/checkout" size="lg" className="mt-8">
        {site.cancel.cta}
      </BrandButton>
    </main>
  );
}
