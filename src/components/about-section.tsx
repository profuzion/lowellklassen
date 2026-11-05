import { Kicker } from "@/components/kicker";
import { MediaFrame } from "@/components/media-frame";
import { site } from "@/content/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-ayc-line bg-[linear-gradient(180deg,rgba(56,56,56,0.34),transparent_60%)] py-[clamp(76px,9vw,150px)]"
    >
      <div className="ayc-wrap">
        <Kicker className="mb-[clamp(30px,3.6vw,58px)]">
          {`${site.about.number} / ${site.about.label}`}
        </Kicker>
        <div className="grid items-start gap-[clamp(30px,5vw,90px)] lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
          <MediaFrame
            src={site.about.portraitSrc}
            alt={site.about.portraitAlt}
            label="Portrait"
          />
          <div className="min-w-0">
            <h2 className="text-[clamp(42px,6vw,92px)] text-ayc-paper">
              {site.about.title}
            </h2>
            <div className="mt-6 max-w-[52ch] space-y-[17px]">
              {site.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-8 max-w-[52ch] space-y-5">
              {site.about.beliefs.map((belief) => (
                <li
                  key={belief.title}
                  className="border-l-2 border-ayc-yellow py-1 pl-5"
                >
                  <h3 className="font-sans text-base font-semibold tracking-[-0.01em] text-ayc-paper normal-case">
                    {belief.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-ayc-muted">
                    {belief.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
