import { BrandButton } from "@/components/brand-button";
import { Kicker } from "@/components/kicker";
import { MediaFrame } from "@/components/media-frame";
import { site } from "@/content/site";

export function HeroSection() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-[150px] pb-[70px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-25%] left-1/2 h-[95vh] w-[130vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255,200,44,0.16), rgba(255,200,44,0.05) 38%, transparent 68%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[var(--ayc-pad)] top-24 h-px bg-ayc-line"
      />
      <div className="ayc-wrap relative z-[2]">
        <h1 className="max-w-[11em] text-[clamp(44px,6.4vw,92px)] text-ayc-paper">
          {site.hero.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block text-ayc-yellow">{site.hero.emphasis}</span>
        </h1>

        <div className="mt-[clamp(28px,4vw,64px)] grid items-end gap-[clamp(28px,4vw,80px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.8fr)]">
          <div>
            <Kicker className="mb-3.5">{site.hero.eyebrow}</Kicker>
            <p className="max-w-xl text-[clamp(17px,1.45vw,23px)] leading-[1.5] tracking-[-0.012em] text-[#E8E6E1]">
              {site.hero.subheadline}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BrandButton href={site.hero.primaryHref} size="lg">
                {site.hero.primaryCta}
              </BrandButton>
              <BrandButton href={site.hero.secondaryHref} variant="ghost" size="lg">
                {site.hero.secondaryCta}
              </BrandButton>
            </div>
          </div>
          <MediaFrame
            src={site.hero.imageSrc}
            alt={site.hero.imageAlt}
            label="Portrait"
            priority
          />
        </div>
      </div>
      <div className="absolute bottom-7 left-[var(--ayc-pad)] z-[3] flex items-center gap-3 font-sans text-[10.5px] font-medium tracking-[0.24em] text-[#6E6E6E] uppercase">
        <span className="animate-cue block h-px w-[34px] bg-gradient-to-r from-ayc-yellow to-transparent" />
        {site.hero.scrollLabel}
      </div>
    </header>
  );
}
