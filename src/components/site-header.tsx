"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandButton } from "@/components/brand-button";
import { useCheckout } from "@/components/checkout-drawer";
import { site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const { openCheckout } = useCheckout();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-[var(--ayc-pad)] py-[18px] transition-all duration-500 ${
          stuck || open
            ? "border-b border-ayc-line bg-[rgba(22,22,22,0.82)] backdrop-blur-[14px]"
            : "border-b border-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display relative z-[60] text-[22px] leading-none text-ayc-paper md:text-[26px]"
        >
          {site.name}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className="relative z-[60] flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.22em] text-ayc-paper uppercase"
        >
          <span
            className={`block h-2 w-2 rounded-full bg-ayc-yellow ${
              open ? "scale-150" : "animate-pulse-dot"
            }`}
          />
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open ? (
        <nav
          id="site-menu"
          className="fixed inset-0 z-50 flex flex-col bg-black px-[var(--ayc-pad)] pt-28 pb-12"
        >
          <div className="flex flex-1 flex-col justify-between">
            <ul className="space-y-2 md:space-y-4">
              {site.nav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-sans text-[11px] font-semibold tracking-[0.2em] text-ayc-yellow">
                      0{index + 1}
                    </span>
                    <span className="font-display text-[clamp(36px,8vw,88px)] text-ayc-paper transition-colors group-hover:text-ayc-yellow">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-12 border-t border-ayc-line pt-8">
              <p className="mb-6 max-w-md font-sans text-sm text-ayc-muted">
                {site.footer.line}
              </p>
              <div className="flex flex-wrap gap-3">
                <BrandButton
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    openCheckout("workbook");
                  }}
                >
                  {site.header.cta}
                </BrandButton>
                <BrandButton
                  href="/#offers"
                  variant="ghost"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  {site.hero.secondaryCta}
                </BrandButton>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}
