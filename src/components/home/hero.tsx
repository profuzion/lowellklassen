import Image from "next/image";

import { contact } from "@/content/home";

export function Hero() {
  return (
    <section className="lk-hero" id="top" aria-labelledby="hero-title">
      <div className="lk-grid">
        <div className="lk-hero-title">
          <h1 id="hero-title" className="lk-display">
            <span>Branding &</span>
            <span>website design</span>
            <span className="lk-hl">
              redefined.
              <img
                className="lk-swoosh"
                src="/brand/brush-swoosh.svg"
                alt=""
              />
            </span>
          </h1>
        </div>
        <div className="lk-hero-art">
          <Image
            src="/lowell-klassen.webp"
            alt="Lowell Klassen, in a light blue shirt, photographed for Profuzion Studio."
            width={1357}
            height={1839}
            priority
            sizes="(max-width: 899px) 264px, 352px"
            className="lk-hero-media"
          />
        </div>
        <div className="lk-hero-copy">
          <p className="lk-hello">Hi, I’m Lowell Klassen.</p>
          <p className="lk-offer">
            I help <strong>Christian Entrepreneurs</strong>{" "}
            <em>transform their business</em> by solving{" "}
            <span className="lk-word">invisibility</span> and becoming the
            obvious choice.
          </p>
          <div className="lk-actions">
            <a className="lk-button" href={contact.booking}>
              Book a call with Lowell
            </a>
            <a className="lk-textlink" href="/selected-work">
              Explore the case studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
