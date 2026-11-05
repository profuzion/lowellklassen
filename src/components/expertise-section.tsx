import { Kicker } from "@/components/kicker";
import { site } from "@/content/site";

export function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="scroll-mt-24 border-t border-ayc-line py-[clamp(76px,9vw,150px)]"
    >
      <div className="ayc-wrap">
        <div className="mb-[clamp(30px,3.6vw,58px)]">
          <Kicker>
            {`${site.expertise.number} / ${site.expertise.label}`}
          </Kicker>
          <h2 className="mt-2 text-[clamp(42px,6.6vw,104px)] text-ayc-paper">
            {site.expertise.title}
          </h2>
          <p className="mt-4 max-w-[52ch]">{site.expertise.intro}</p>
        </div>
        <div className="divide-y divide-ayc-line">
          {site.expertise.items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <article
                key={item.title}
                className="group grid gap-4 py-[clamp(26px,3.4vw,48px)] md:grid-cols-[clamp(90px,11vw,160px)_1fr] md:gap-[clamp(18px,3vw,54px)]"
              >
                <div className="font-display text-[clamp(56px,8vw,120px)] leading-[0.8] text-stroke-gray transition-colors duration-500 group-hover:text-ayc-yellow group-hover:[-webkit-text-stroke:0]">
                  {number}
                </div>
                <div>
                  <h3 className="mb-2.5 text-[clamp(24px,2.9vw,46px)] leading-[0.94] text-ayc-paper">
                    {item.title}
                  </h3>
                  <p className="max-w-[46ch] text-[#A9A9A9]">{item.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
