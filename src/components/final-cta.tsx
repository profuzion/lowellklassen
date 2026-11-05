import { BrandButton } from "@/components/brand-button";
import { Kicker } from "@/components/kicker";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ayc-line bg-[linear-gradient(180deg,transparent,rgba(255,200,44,0.07))] py-[clamp(96px,12vw,180px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,200,44,0.18)_0%,transparent_68%)]"
      />
      <div className="ayc-wrap relative">
        <Kicker>Start here</Kicker>
        <h2 className="mt-3 max-w-[12ch] text-[clamp(48px,7vw,104px)] text-ayc-paper">
          {site.header.cta}
        </h2>
        <p className="mt-5 max-w-xl text-[clamp(16px,1.2vw,20px)] text-[#E8E6E1]">
          {site.offers.products[0].summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandButton href={site.hero.primaryHref} size="lg">
            {site.hero.primaryCta}
          </BrandButton>
          <BrandButton href={site.hero.secondaryHref} variant="ghost" size="lg">
            {site.hero.secondaryCta}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
