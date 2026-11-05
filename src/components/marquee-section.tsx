import { site } from "@/content/site";

export function MarqueeSection() {
  const items = site.marquee.flatMap((text) => [text, "✦"]);

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-ayc-line bg-ayc-ink-2 py-[15px]"
    >
      <div className="animate-marquee inline-flex whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`font-display px-[26px] text-[clamp(20px,2vw,30px)] tracking-[0.01em] uppercase ${
              index % 2 === 1 ? "text-ayc-yellow" : "text-ayc-paper/90"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
