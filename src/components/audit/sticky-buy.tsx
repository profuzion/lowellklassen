"use client";

import { useEffect, useState } from "react";

import { BuyButton } from "@/components/audit/buy-button";

export function StickyBuy() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const buy = document.getElementById("buy");
    const price = document.getElementById("price");
    const final = document.getElementById("final");
    if (!buy || !price || !final) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const heroGone = !visible.has("buy");
        const nearClose = visible.has("price") || visible.has("final");
        setOn(heroGone && !nearClose);
      },
      { threshold: 0.2 },
    );

    observer.observe(buy);
    observer.observe(price);
    observer.observe(final);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={on ? "audit-stick is-on" : "audit-stick"}>
      <p>
        <strong>The Audit</strong>
        <span>$27 CAD</span>
      </p>
      <BuyButton>Get it</BuyButton>
    </div>
  );
}
