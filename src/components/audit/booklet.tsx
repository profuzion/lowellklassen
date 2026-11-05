"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function Booklet() {
  const reduce = useReducedMotion();
  const [canTilt, setCanTilt] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -4]), {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-24, -8]), {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanTilt(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !stageRef.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const box = stageRef.current.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      className="audit-stage"
      ref={stageRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="audit-book"
        style={reduce || !canTilt ? undefined : { rotateX, rotateY }}
      >
        <span className="audit-sheet audit-sheet-3" aria-hidden="true" />
        <span className="audit-sheet audit-sheet-2" aria-hidden="true" />
        <span className="audit-sheet audit-sheet-1" aria-hidden="true" />
        <div className="audit-cover-wrap">
          <Image
            src="/audit/cover.png"
            alt="Cover of The Brand Clarity Audit, a self-guided workbook by Lowell D. Klassen."
            width={1020}
            height={1320}
            priority
            sizes="(max-width: 899px) 86vw, 440px"
            className="audit-cover"
          />
          <span className="audit-spine" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
}
