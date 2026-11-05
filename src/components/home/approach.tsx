"use client";

import Image from "next/image";
import { useState } from "react";

import { approach } from "@/content/home";

export function Approach() {
  const [active, setActive] = useState(0);
  const current = approach[active];

  return (
    <section className="lk-section" id="approach" aria-labelledby="approach-title">
      <div className="lk-grid lk-approach-head">
        <h2 id="approach-title" className="lk-display">
          <span>A clear idea.</span>
          <span>Carried all the way through.</span>
        </h2>
        <p>
          I do the naming, the identity, and the website as one job, so they
          do not drift apart.
        </p>
      </div>
      <div className="lk-grid lk-approach-layout">
        <div className="lk-rows">
          {approach.map((step, index) => (
            <button
              key={step.number}
              type="button"
              className="lk-row"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span className="lk-row-no">{step.number}</span>
              <span className="lk-row-title">{step.title}</span>
              <p>{step.body}</p>
            </button>
          ))}
        </div>
        <div
          className={
            "logo" in current && current.logo
              ? "lk-approach-visual is-logo"
              : "lk-approach-visual"
          }
        >
          <div className="lk-approach-frame">
            {"logo" in current && current.logo ? (
              <img src={current.image} alt={current.alt} />
            ) : (
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 899px) 100vw, 36vw"
                style={{ objectPosition: current.position }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
