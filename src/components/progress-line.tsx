"use client";

import { useEffect, useState } from "react";

export function ProgressLine() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScale(height > 0 ? window.scrollY / height : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[120] h-0.5 w-full origin-left bg-ayc-yellow"
      style={{ transform: `scaleX(${scale})` }}
    />
  );
}
