import { Check } from "lucide-react";

import { OpenCheckoutButton } from "@/components/checkout-drawer";
import { Kicker } from "@/components/kicker";
import { site } from "@/content/site";

export function OffersSection() {
  return (
    <section
      id="offers"
      className="scroll-mt-24 border-t border-ayc-line bg-ayc-ink-2 py-[clamp(76px,9vw,150px)]"
    >
      <div className="ayc-wrap">
        <div className="mb-[clamp(30px,3.6vw,58px)]">
          <Kicker>{`${site.offers.number} / ${site.offers.label}`}</Kicker>
          <h2 className="mt-2 text-[clamp(42px,6.6vw,104px)] text-ayc-paper">
            {site.offers.title}
          </h2>
          <p className="mt-4 max-w-[52ch]">{site.offers.intro}</p>
        </div>
        <div className="grid gap-px border border-ayc-line bg-ayc-line lg:grid-cols-2">
          {site.offers.products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-5 bg-ayc-ink-2 p-[clamp(26px,2.9vw,42px)]"
            >
              <div>
                <span className="inline-flex rounded-full border border-[rgba(255,200,44,0.32)] px-3 py-1.5 font-sans text-[10.5px] font-semibold tracking-[0.15em] text-ayc-yellow uppercase">
                  {product.eyebrow}
                </span>
                <h3 className="mt-4 text-[clamp(28px,3vw,46px)] text-ayc-paper">
                  {product.name}
                </h3>
                <p className="mt-3 max-w-[48ch] text-sm leading-6 text-[#9A9A9A]">
                  {product.summary}
                </p>
              </div>
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="font-sans text-[11px] font-semibold tracking-[0.14em] text-ayc-paper uppercase">
                    Best for
                  </dt>
                  <dd className="mt-1 text-pretty text-ayc-gray">{product.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-semibold tracking-[0.14em] text-ayc-paper uppercase">
                    Format
                  </dt>
                  <dd className="mt-1 text-ayc-gray">{product.format}</dd>
                </div>
              </dl>
              <ul className="grid gap-2">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-ayc-yellow" aria-hidden />
                    <span className="text-pretty text-ayc-paper">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-ayc-line pt-5">
                <p className="font-sans text-[11px] font-semibold tracking-[0.14em] text-ayc-muted uppercase">
                  Price
                </p>
                <p className="mt-1 font-sans text-lg text-ayc-paper normal-case">
                  {product.priceLabel}
                </p>
                <OpenCheckoutButton productId={product.id} className="mt-5 rounded-full px-6">
                  {product.cta}
                </OpenCheckoutButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
