"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { contact } from "@/content/home";
import { pageIntro, roster, studies } from "@/content/selected-work";

type Study = (typeof studies)[number];
type Slug = Study["slug"];

function isSlug(value: string): value is Slug {
  return studies.some((study) => study.slug === value);
}

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TimberMark() {
  return (
    <svg className="sw-timber" viewBox="0 0 320 420" fill="none" aria-hidden="true">
      <path d="M28 392H292" />
      <path d="M64 392V168" />
      <path d="M256 392V168" />
      <path d="M118 392V236" />
      <path d="M202 392V236" />
      <path d="M64 236H256" />
      <path d="M64 168H256" />
      <path d="M64 168 160 48 256 168" />
      <path d="M160 48V168" />
      <path d="M64 168 118 236" />
      <path d="M256 168 202 236" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 12.5 12.5 3.5M7 3.5h5.5V9" />
    </svg>
  );
}

function MagneticTitle() {
  const rootRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const letters = [...root.querySelectorAll<HTMLElement>("[data-letter]")];
    let frame = 0;
    let px = 0;
    let py = 0;
    let inside = false;

    const render = () => {
      frame = 0;
      for (const letter of letters) {
        if (!inside) {
          letter.style.transform = "";
          continue;
        }
        const box = letter.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.max(0, 1 - dist / 260);
        const tx = (dx / dist) * pull * 12;
        const ty = (dy / dist) * pull * 8;
        const rot = (dx / dist) * pull * 7;
        letter.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
      }
    };

    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      inside = false;
      if (!frame) frame = requestAnimationFrame(render);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <h1 id="sw-title" ref={rootRef} className="sw-title" aria-label="Case studies.">
      {pageIntro.lines.map((line) => (
        <span className="sw-title-line" key={line}>
          {[...line].map((char, index) => (
            <span data-letter="" key={`${line}-${index}`}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function WorkLamp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let x = window.innerWidth * 0.62;
    let y = window.innerHeight * 0.38;

    const paint = () => {
      frame = 0;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      node.classList.add("is-on");
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="sw-lamp" aria-hidden="true" />;
}

function OpenDisc() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    let hot = false;

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      node.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      node.style.opacity = hot ? "1" : "0";
      if (Math.hypot(tx - cx, ty - cy) > 0.4) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      hot = Boolean(
        (event.target as Element | null)?.closest?.(".sw-chapter"),
      );
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="sw-cursor-disc" aria-hidden="true">
      Open
    </div>
  );
}

function Filament({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0.05, 1]);
  return (
    <div className="sw-filament" aria-hidden="true">
      <motion.span style={{ scaleY }} />
    </div>
  );
}

function Chapter({
  study,
  last,
  onOpen,
}: {
  study: Study;
  last: boolean;
  onOpen: (slug: Slug, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.94]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, last ? 0 : 0.55]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);

  useEffect(() => {
    const shell = shellRef.current;
    const shot = shotRef.current;
    const pin = ref.current;
    if (!shell || !pin) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px)");
    if (!fine.matches || reduce.matches || !desktop.matches) return;

    const onMove = (event: PointerEvent) => {
      const box = shell.getBoundingClientRect();
      const over =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
      if (!over) {
        shell.style.transform = "";
        if (shot) shot.style.transform = "";
        return;
      }
      const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
      const dy = (event.clientY - (box.top + box.height / 2)) / box.height;
      shell.style.transform = `rotateX(${(-dy * 6).toFixed(2)}deg) rotateY(${(dx * 7).toFixed(2)}deg)`;
      if (shot) {
        shot.style.transform = `scale(1.08) translate3d(${(-dx * 18).toFixed(1)}px, ${(-dy * 14).toFixed(1)}px, 0)`;
      }
    };

    const onLeave = () => {
      shell.style.transform = "";
      if (shot) shot.style.transform = "";
    };

    pin.addEventListener("pointermove", onMove);
    pin.addEventListener("pointerleave", onLeave);
    return () => {
      pin.removeEventListener("pointermove", onMove);
      pin.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={ref}
      className={last ? "sw-chapter is-last" : "sw-chapter"}
      id={study.slug}
    >
      <motion.div className="sw-pin" style={{ scale }}>
        <motion.p
          className={study.plate === "timber" ? "sw-ghost is-timber" : "sw-ghost"}
          aria-hidden="true"
          style={{
            y: ghostY,
            ...(study.plate === "photo" && "image" in study && study.image
              ? { backgroundImage: `url(${study.image.src})` }
              : {}),
          }}
        >
          {study.name}
        </motion.p>
        <div className="sw-pin-grid">
          <p className="sw-idx">{study.index}</p>
          <h2 className="sw-name">{study.name}</h2>
          <p className="sw-meta">
            {study.place}
            <span>{study.yearNote}</span>
          </p>
          <p className="sw-summary">{study.summary}</p>
          <ul className="sw-tags">
            {study.disciplines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            className="sw-open"
            aria-label={`Open the ${study.name} case study`}
            onClick={(event) => onOpen(study.slug, event)}
          >
            <span aria-hidden="true">Open the study</span>
            <span className="sw-go" aria-hidden="true">
              <ArrowIcon />
            </span>
          </button>
          <div className="sw-bezel">
            <div className="sw-bezel-shell" ref={shellRef}>
              <div className="sw-bezel-core">
                {"image" in study && study.image ? (
                  <div className="sw-shot-move" ref={shotRef}>
                    <Image
                      src={study.image.src}
                      alt={study.image.alt}
                      fill
                      priority={study.index === "01"}
                      sizes="(max-width: 899px) 100vw, 42vw"
                      className="sw-shot"
                    />
                  </div>
                ) : (
                  <TimberMark />
                )}
                {"mark" in study && study.mark ? (
                  <img className="sw-frame-mark" src={study.mark.src} alt="" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <motion.div className="sw-veil" style={{ opacity: veil }} aria-hidden="true" />
      </motion.div>
    </article>
  );
}

function StudyOverlay({
  study,
  origin,
  iris,
  closing,
  onClose,
  onStep,
}: {
  study: Study;
  origin: { x: string; y: string };
  iris: boolean;
  closing: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [entrance] = useState(iris ? "iris" : "fade");
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const rule = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  useEffect(() => {
    const root = scrollRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(event.key === "ArrowRight" ? 1 : -1);
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const nodes = [
        ...root.querySelectorAll<HTMLElement>("a[href], button"),
      ];
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
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: 0, behavior: prefersReduce() ? "auto" : "smooth" });
  }, [study.slug]);

  const titleId = `study-title-${study.slug}`;

  return (
    <div
      ref={scrollRef}
      className={`sw-study is-${entrance}${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{ ["--ox" as string]: origin.x, ["--oy" as string]: origin.y }}
    >
      <div className="sw-rule" aria-hidden="true">
        <motion.span style={{ scaleY: rule }} />
      </div>
      <div className="sw-study-bar">
        <p className="sw-study-index">
          {study.index}
          <span>
            {" / "}
            {String(studies.length).padStart(2, "0")}
          </span>
        </p>
        <p className="sw-keyhint">Arrow keys move between studies</p>
        <button ref={closeRef} type="button" className="sw-close" onClick={onClose}>
          Close
          <span className="sw-x" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>
      <article key={study.slug} className="sw-study-body">
        <div className="sw-study-grid">
          <div className="sw-study-sticky">
            <p className="sw-study-kicker">{study.client}</p>
            <h2 id={titleId} className="sw-study-name">
              {study.name}
            </h2>
            <p className="sw-study-place">{study.place}</p>
            <ul className="sw-study-tags">
              {study.disciplines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {"href" in study && study.href ? (
              <a
                className="sw-visit"
                href={study.href}
                target="_blank"
                rel="noreferrer"
              >
                {study.hrefLabel}
                <span className="sw-go" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            ) : null}
          </div>
          <div className="sw-study-main">
            <ol className="sw-beats">
              {study.beats.map((beat) => (
                <li className="sw-beat" key={beat.label}>
                  <p>{beat.label}</p>
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                </li>
              ))}
            </ol>
            {"image" in study && study.image ? (
              <figure className="sw-figure">
                <div className="sw-figure-frame">
                  <Image
                    src={study.image.src}
                    alt={study.image.alt}
                    width={study.image.width}
                    height={study.image.height}
                    sizes="(max-width: 899px) 100vw, 58vw"
                  />
                </div>
              </figure>
            ) : (
              <div className="sw-figure-frame sw-figure-timber">
                <TimberMark />
              </div>
            )}
            {"secondary" in study && study.secondary ? (
              <figure className="sw-figure sw-figure-secondary">
                <div className="sw-figure-frame">
                  <Image
                    src={study.secondary.src}
                    alt={study.secondary.alt}
                    width={study.secondary.width}
                    height={study.secondary.height}
                    sizes="(max-width: 899px) 70vw, 28vw"
                  />
                </div>
              </figure>
            ) : null}
            {"mark" in study && study.mark ? (
              <div className="sw-markstrip">
                <img src={study.mark.src} alt={study.mark.alt} />
              </div>
            ) : null}
            {"quote" in study && study.quote ? (
              <figure className="sw-quote">
                <blockquote>{study.quote.text}</blockquote>
                <figcaption>{study.quote.attribution}</figcaption>
              </figure>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

export function SelectedWorkExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const pushed = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const closingRef = useRef(false);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });
  const [live, setLive] = useState(false);
  const [active, setActive] = useState<Slug | null>(null);
  const [origin, setOrigin] = useState({ x: "50vw", y: "40vh" });
  const [iris, setIris] = useState(false);
  const [closing, setClosing] = useState(false);

  const finishClose = useCallback(() => {
    const restore = pushed.current;
    pushed.current = false;
    closingRef.current = false;
    if (restore) {
      window.history.back();
      return;
    }
    setClosing(false);
    setActive(null);
    const next = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", next);
  }, []);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    if (prefersReduce()) {
      finishClose();
      return;
    }
    closingRef.current = true;
    setClosing(true);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      finishClose();
    }, 260);
  }, [finishClose]);

  const openStudy = useCallback(
    (slug: Slug, event: MouseEvent<HTMLButtonElement>) => {
      openerRef.current = event.currentTarget;
      setOrigin({ x: `${event.clientX}px`, y: `${event.clientY}px` });
      setIris(!prefersReduce());
      setClosing(false);
      setActive(slug);
      if (window.location.hash !== `#${slug}`) {
        window.history.pushState({ study: slug }, "", `#${slug}`);
        pushed.current = true;
      }
    },
    [],
  );

  const activeRef = useRef<Slug | null>(null);
  activeRef.current = active;

  const step = useCallback((dir: 1 | -1) => {
    const current = activeRef.current;
    if (!current) return;
    const index = studies.findIndex((study) => study.slug === current);
    const next = studies[(index + dir + studies.length) % studies.length];
    setIris(false);
    setActive(next.slug);
    window.history.replaceState({ study: next.slug }, "", `#${next.slug}`);
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const apply = () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      closingRef.current = false;
      setClosing(false);
      const slug = window.location.hash.replace(/^#/, "");
      if (isSlug(slug)) {
        setIris(false);
        setActive(slug);
        return;
      }
      setActive(null);
    };

    apply();
    window.addEventListener("popstate", apply);
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("popstate", apply);
      window.removeEventListener("hashchange", apply);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const wasOpen = useRef(false);

  useEffect(() => {
    if (active) {
      wasOpen.current = true;
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    openerRef.current?.focus();
  }, [active]);

  const study = studies.find((item) => item.slug === active);

  return (
    <div
      ref={rootRef}
      className="sw-root"
      data-open={study ? "true" : "false"}
    >
      {live && !study ? (
        <>
          <WorkLamp />
          <OpenDisc />
        </>
      ) : null}
      <Filament progress={scrollYProgress} />
      <header className="sw-hero">
        <p className="sw-kicker">{pageIntro.kicker}</p>
        <div className="sw-hero-foot">
          <MagneticTitle />
          <p className="sw-script">{pageIntro.script}</p>
          <p className="sw-lede">{pageIntro.lede}</p>
          <p className="sw-hint">
            <span />
            Scroll the floor
          </p>
        </div>
      </header>
      <div className="sw-stack">
        {studies.map((item, index) => (
          <Chapter
            key={item.slug}
            study={item}
            last={index === studies.length - 1}
            onOpen={openStudy}
          />
        ))}
      </div>
      <section className="sw-roster" aria-labelledby="roster-title">
        <p className="sw-kicker">Also in the studio</p>
        <h2 id="roster-title">The wider roster</h2>
        <p className="sw-roster-note">
          The four studies above are the ones written out. This is the rest of
          the roster, indexed from the studio site.
        </p>
        <ul>
          {roster.map((entry) => (
            <li key={entry.name}>
              <h3>{entry.name}</h3>
              <p>{entry.scope}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="sw-closeout" aria-labelledby="closeout-title">
        <h2 id="closeout-title">The next one starts with a conversation.</h2>
        <a className="sw-book" href={contact.booking}>
          Book a call with Lowell
          <span className="sw-go" aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
        <p className="sw-since">Since 1999</p>
      </section>
      {study ? (
        <StudyOverlay
          study={study}
          origin={origin}
          iris={iris}
          closing={closing}
          onClose={requestClose}
          onStep={step}
        />
      ) : null}
    </div>
  );
}
