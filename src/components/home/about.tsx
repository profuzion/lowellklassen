import Image from "next/image";

export function AboutLowell() {
  return (
    <section className="lk-section lk-about" id="about" aria-labelledby="about-title">
      <div className="lk-grid">
        <div className="lk-about-copy">
          <h2 id="about-title">A direct line to the person doing the work.</h2>
          <p>
            I’m Lowell Klassen, a digital creator and the founder of Profuzion
            Studio.
          </p>
          <p>
            For nearly three decades I have named businesses, built the
            identity, and made the websites that explain the work.
          </p>
          <p>
            I stay on the job from the first questions through the finished
            site.
          </p>
          <p>When we work together, you work directly with me.</p>
        </div>
        <div className="lk-portrait">
          <Image
            src="/lowell-klassen.webp"
            alt="Lowell Klassen, in a light blue shirt."
            width={1357}
            height={1839}
            sizes="(max-width: 899px) 100vw, 38vw"
            className="lk-portrait-media"
          />
        </div>
      </div>
    </section>
  );
}
