"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { BuyButton } from "@/components/audit/buy-button";
import { contact } from "@/content/home";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/selected-work", label: "Studies" },
  { href: "/#approach", label: "Approach" },
  { href: "/#about", label: "About" },
];

const resources = [
  { href: "/name-it-right", label: "Name It Right" },
  { href: "/brand-clarity-audit", label: "Brand Clarity Audit" },
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ mode = "studio" }: { mode?: "studio" | "audit" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const panelId = useId();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (mode !== "audit") return;
    const target = document.getElementById("buy");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBuy(!entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!resourcesOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!resourcesRef.current?.contains(event.target as Node)) setResourcesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResourcesOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = [
        buttonRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    } else if (wasOpen.current) {
      buttonRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const resourceCurrent = resources.some((link) => isCurrent(pathname, link.href));

  return (
    <header className={stuck || open ? "lk-header is-stuck" : "lk-header"}>
      <a className="lk-wordmark" href="/#top">
        <img src="/brand/lowell-profile.webp" alt="Lowell D. Klassen" />
      </a>
      <nav className="lk-nav" aria-label="Primary">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}
        <div
          className={resourcesOpen ? "lk-resources is-open" : "lk-resources"}
          ref={resourcesRef}
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
              setResourcesOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
              setResourcesOpen(false);
            }
          }}
        >
          <button
            type="button"
            className="lk-resources-button"
            aria-expanded={resourcesOpen}
            aria-controls="resources-menu"
            data-current={resourceCurrent ? "page" : undefined}
            onClick={(event) => {
              const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
              if (fine && event.detail > 0) {
                setResourcesOpen(true);
                return;
              }
              setResourcesOpen((value) => !value);
            }}
          >
            Resources
            <svg className="lk-resources-caret" viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M2.2 4.3 6 8.1 9.8 4.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {resourcesOpen ? (
            <div className="lk-resources-menu" id="resources-menu" role="group" aria-label="Resources">
              {resources.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  onClick={() => setResourcesOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </nav>
      <p className="lk-since">Since 1999</p>
      {mode === "audit" ? (
        <div className={showBuy ? "audit-header-buy" : "audit-header-buy is-gated"}>
          <BuyButton className="lk-header-cta">Get the Audit</BuyButton>
        </div>
      ) : (
        <a className="lk-button lk-header-cta" href={contact.booking}>
          Book a call
        </a>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="lk-menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="lk-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="lk-panel-resources">
              <p className="lk-panel-label">Resources</p>
              {resources.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          {mode === "audit" ? (
            <BuyButton>Get the Audit for $27</BuyButton>
          ) : (
            <a
              className="lk-button"
              href={contact.booking}
              onClick={() => setOpen(false)}
            >
              Book a call
            </a>
          )}
        </div>
      ) : null}
    </header>
  );
}
