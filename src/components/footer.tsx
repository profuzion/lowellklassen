import Link from "next/link";

import { BrandButton } from "@/components/brand-button";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ayc-line bg-ayc-ink py-[clamp(52px,7vw,88px)]">
      <div className="ayc-wrap">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(2,minmax(0,0.5fr))] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" className="font-display text-[28px] leading-none text-ayc-paper">
              {site.name}
            </Link>
            <p className="mt-5 text-[13.5px] leading-[1.6] text-[#7A7A7A]">
              {site.footer.line}
            </p>
            <div className="mt-8">
              <BrandButton href={site.hero.primaryHref} variant="editorial">
                {site.header.cta}
              </BrandButton>
            </div>
          </div>
          <div>
            <b className="mb-3 block font-sans text-[11px] font-semibold tracking-[0.17em] text-ayc-paper uppercase">
              On this site
            </b>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mb-2 block text-[14px] text-[#8E8E8E] transition-colors hover:text-ayc-yellow"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <b className="mb-3 block font-sans text-[11px] font-semibold tracking-[0.17em] text-ayc-paper uppercase">
              Contact
            </b>
            <p className="mb-2 text-[14px] text-[#8E8E8E]">
              {site.footer.email ? (
                <a href={`mailto:${site.footer.email}`} className="hover:text-ayc-yellow">
                  {site.footer.email}
                </a>
              ) : (
                <span>{site.footer.emailLabel} coming soon</span>
              )}
            </p>
            <ul className="mt-4 space-y-2">
              {site.footer.social.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[14px] text-[#8E8E8E] transition-colors hover:text-ayc-yellow"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-[14px] text-[#6E6E6E]">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ayc-line pt-6 font-sans text-[12.5px] text-[#6E6E6E]">
          <span>
            © {year} {site.name}
          </span>
          <span>{site.footer.line}</span>
        </div>
      </div>
    </footer>
  );
}
