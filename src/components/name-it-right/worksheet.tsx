"use client";

import { useEffect, useState, type FormEvent } from "react";

const steps = [
  ["01", "Start with the burden, not the business", "Four questions that get to what the business is actually for."],
  ["02", "Write down 30 words", "Raw material from five buckets, including what keeps coming back while you pray about it."],
  ["03", "Pick your route", "The five kinds of business names, and the two that fit you best."],
  ["04", "Write 50 names", "Fifty, not ten, because the good ones usually show up around number thirty-five."],
  ["05", "Run the six screens", "Say it out loud, the phone test, Google, domains, the business registry, and the ten-year test."],
  ["06", "Cut to three and test them the right way", "The questions to ask real customers, instead of \"do you like it?\""],
  ["07", "Commit", "Pick one, say it out loud, and register it this week."],
] as const;

const who = [
  "You're starting a business and haven't settled on a name yet.",
  "You named the business after the first thing you made, and now you sell five things.",
  "You're launching a new product line and need names that fit together.",
  "You've got three names you like and no way to choose between them.",
];

const faqs = [
  ["Is it really free?", "Yes. You get the full 12-page worksheet by email. There's nothing to buy."],
  ["What happens after I sign up?", "The worksheet lands in your inbox right away. Over the next couple of weeks I'll send you one naming tip and an invitation to a free 15-minute call, in case you get stuck. You can unsubscribe anytime."],
  ["I already have a name. Is this still useful?", "Yes, if you're renaming, adding a product line, or not sure your current name will still fit in ten years. Step 5's six screens are a good test for any name."],
  ["Do I have to print it?", "You don't have to, but I'd recommend it. Something happens on paper that doesn't happen in a notes app."],
] as const;

const ticker = ["7 steps", "50 names", "6 screens", "1 name you can stand behind", "Pray first", "Then plan"];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function focusForm() {
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "center" });
  const first = document.getElementById("first_name") as HTMLInputElement | null;
  const email = document.getElementById("email") as HTMLInputElement | null;
  const target = first?.value.trim() ? email : first;
  window.setTimeout(() => target?.focus({ preventScroll: true }), 450);
}

export function NameItRight() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepsEl = document.getElementById("steps");
    const finalEl = document.getElementById("final");
    const revealEls = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    let reveal: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("revealed");
            entry.target.classList.remove("pre-reveal");
            reveal?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("pre-reveal");
          reveal?.observe(el);
        }
      });
    }

    let ticking = false;
    const paintSteps = () => {
      if (!stepsEl) return;
      const rect = stepsEl.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      const fill = Math.min(1, Math.max(0, (mid - rect.top) / rect.height));
      stepsEl.style.setProperty("--fill", fill.toFixed(3));
      stepsEl.querySelectorAll(".step").forEach((item) => {
        const dot = item.querySelector(".step-dot");
        if (!dot) return;
        const box = dot.getBoundingClientRect();
        item.classList.toggle("is-active", box.top + box.height / 2 < mid);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        paintSteps();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    paintSteps();

    let finalWatch: IntersectionObserver | undefined;
    if (finalEl && "IntersectionObserver" in window) {
      finalWatch = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            finalEl.classList.add("in-view");
            finalWatch?.disconnect();
          }
        },
        { threshold: 0.35 },
      );
      finalWatch.observe(finalEl);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      reveal?.disconnect();
      finalWatch?.disconnect();
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: { firstName?: string; email?: string } = {};
    if (!firstName.trim()) {
      nextErrors.firstName = "Add your first name so I know who I'm writing to.";
    }
    if (!emailRe.test(email.trim())) {
      nextErrors.email = "That email doesn't look right. Check for a typo.";
    }
    setErrors(nextErrors);
    setStatus("");
    if (nextErrors.firstName || nextErrors.email) {
      document.getElementById(nextErrors.firstName ? "first_name" : "email")?.focus();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          website,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Something went wrong on my end.");
      setSentTo(email.trim());
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong on my end.";
      setStatus(`${message} Please try again in a moment.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="nir" id="main">
      <section className="hero" id="hero" aria-labelledby="worksheet-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow load load-1">
              Free worksheet <span className="sep" /> 12 pages <span className="sep" /> Printable
            </span>
            <h1 className="display h1 hero-title load load-2" id="worksheet-title">
              Name it <span className="hl">right.</span>
              <img className="title-swoosh" src="/brand/brush-swoosh.svg" alt="" />
            </h1>
            <p className="lede load load-3">
              A free 7-step worksheet for naming the business God put on your heart. Go from a blank page to one name you can stand behind in about 45 minutes.
            </p>
            <div className={`signup load load-4${sentTo ? " is-done" : ""}`} id="signup">
              <form className="signup-form" noValidate onSubmit={onSubmit}>
                <div className="signup-row">
                  <div className={`field${errors.firstName ? " has-error" : ""}`}>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      placeholder=" "
                      required
                      aria-invalid={errors.firstName ? true : undefined}
                      aria-describedby="first_name-err"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="first_name">First name</label>
                    <span className="field-error" id="first_name-err" role="alert">
                      {errors.firstName}
                    </span>
                  </div>
                  <div className={`field${errors.email ? " has-error" : ""}`}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder=" "
                      required
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby="email-err"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="field-error" id="email-err" role="alert">
                      {errors.email}
                    </span>
                  </div>
                </div>
                <input
                  className="hp"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
                <button className={`btn btn-primary${loading ? " is-loading" : ""}`} type="submit">
                  <span className="label">Send me the worksheet</span>
                  <span className="arrow" aria-hidden="true">→</span>
                  <span className="spinner" aria-hidden="true" />
                </button>
                <p className="form-status" role="status" aria-live="polite">
                  {status}
                </p>
                <p className="consent">
                  You'll get the worksheet plus occasional emails from Lowell. Unsubscribe anytime.
                </p>
                <div className="proof-row">
                  <span className="proof-star" aria-hidden="true">✦</span>
                  <p>
                    <strong>100s of brands</strong> named and built since 1999.
                  </p>
                </div>
              </form>
              <div className="signup-success" tabIndex={-1}>
                <svg className="check" viewBox="0 0 58 58" aria-hidden="true">
                  <circle cx="29" cy="29" r="26" />
                  <path d="M17 30 l8 8 l16 -18" />
                </svg>
                <h2 className="display h3">
                  Check your <span className="hl">inbox.</span>
                </h2>
                <p>
                  Your Brand Name Worksheet is on its way to <strong>{sentTo || "your inbox"}</strong>. If it's not there in a few minutes, check your spam or promotions folder. Print it out, grab a pen, and give yourself about 45 minutes.
                </p>
                <div className="next">
                  <p>Stuck already, or naming a whole product line? Let's talk it through.</p>
                  <a className="btn btn-ghost btn-sm" href="https://cal.com/profuzion/15min" target="_blank" rel="noopener noreferrer">
                    Book a free 15-minute call <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="booklet-stage load load-5" aria-hidden="true">
            <div className="booklet" id="booklet">
              <div className="booklet-pages" />
              <div className="booklet-cover">
                <div className="booklet-spine" />
                <span className="booklet-kicker">The Brand Name Worksheet</span>
                <div className="booklet-title">
                  Name it
                  <br />
                  <span>right.</span>
                </div>
                <img className="booklet-swoosh" src="/brand/brush-swoosh.svg" alt="" />
                <p className="booklet-sub">A 7-step worksheet for naming the business God put on your heart.</p>
                <div className="booklet-foot">
                  <img src="/brand/lowell-profile.webp" alt="" />
                  <span>12 pages</span>
                </div>
              </div>
              <span className="booklet-tag">Free</span>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-label="7 steps, 50 names, 6 screens, 1 name you can stand behind">
        <div className="ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy}>
              {ticker.map((item) => (
                <span key={`${copy}-${item}`} style={{ display: "contents" }}>
                  <span className="ticker-item">{item}</span>
                  <span className="ticker-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section alt" aria-labelledby="pattern-h">
        <div className="container two-col">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="num">01</span>
              <span className="sep" />
              The pattern
            </span>
            <h2 className="display h2 h2-long" id="pattern-h">
              You spend two years praying about it, and then you finally name it, without thinking of the <span className="hl">lasting impact.</span>
            </h2>
          </div>
          <div className="stack" data-reveal>
            <p className="lede">
              I've been naming and branding businesses for 27 years, and there's a pattern I see over and over. Someone spends two years praying about whether to start the business, and then about twenty minutes naming it.
            </p>
            <p>
              They pick something on a Tuesday night because the domain was available, and then they live with that name for the next twenty years, on the truck, on the invoices, on the sign and in every introduction they ever make.
            </p>
            <blockquote className="quote">
              <p>The name isn't the business. But it's the first thing a customer meets, and it's one of the most expensive things to change later.</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-h">
        <div className="container two-col">
          <div className="section-head sticky-head" data-reveal>
            <span className="eyebrow">
              <span className="num">02</span>
              <span className="sep" />
              What's inside
            </span>
            <h2 className="display h2" id="steps-h">
              Seven steps. <span className="hl"><span className="nowrap">Forty-five</span> minutes.</span>
            </h2>
            <p className="lede">The same process I use with my own customers, set out so you can work it at the kitchen table with a pen.</p>
            <div>
              <button className="btn btn-primary" type="button" onClick={focusForm}>
                Send me the worksheet <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <ol className="steps" id="steps">
            {steps.map(([number, title, body]) => (
              <li className="step" key={number}>
                <span className="step-dot">{number}</span>
                <div className="step-card">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section alt" aria-labelledby="who-h">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="num">03</span>
              <span className="sep" />
              Who it's for
            </span>
            <h2 className="display h2" id="who-h">
              Is this <span className="hl">you?</span>
            </h2>
          </div>
          <ul className="who">
            {who.map((item) => (
              <li key={item} data-reveal>
                <span className="tick" aria-hidden="true">
                  <svg viewBox="0 0 12 12">
                    <path d="M2 6.5l2.5 2.5L10 3.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="faith" data-reveal>
            <div className="faith-grid">
              <h3 className="display h3">
                A Scripture-based <span className="hl">name?</span>
              </h3>
              <p className="lede">
                A lot of Christian owners reach straight for Scripture, and that's a real and good route. But the field is crowded, and a name that announces your faith will draw some customers in and turn some away. The worksheet has a full page on how to decide on purpose, and on a quieter option: letting the meaning be scriptural and the word be ordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="about-h">
        <div className="container two-col">
          <div className="stack" data-reveal>
            <span className="eyebrow">
              <span className="num">04</span>
              <span className="sep" />
              Who I am
            </span>
            <h2 className="sr-only" id="about-h">
              Lowell D. Klassen
            </h2>
            <img className="about-sig" src="/brand/lowell-profile.webp" alt="Lowell D. Klassen" />
            <div className="about-facts">
              <span className="chip">Brand Architect</span>
              <span className="chip">Since 1999</span>
              <span className="chip">100+ brands</span>
            </div>
          </div>
          <div className="stack" data-reveal>
            <p className="lede">
              I'm a Brand Architect at Profuzion Studio. I've been naming and building brands since 1999, mostly for trades, ag and industrial businesses across the prairies.
            </p>
            <p>
              When I helped Brovek name their tank line, the names took longer than the logo, because everything else had to fit around them. Naming is where a lot of my projects start, and I think it's one of the most important decisions you'll make.
            </p>
            <div className="names" aria-label="The Brovek tank line names">
              {["Starta", "Stride", "Matrix", "Titan", "Forge"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <blockquote className="quote">
              <p>
                "Working with Profuzion Studio was a turning point for our business. They didn't just give us a new logo or website. They built a brand from the ground up that truly reflects who we are and where we're headed. From developing the Brovek name to designing a visual identity that communicates trust and durability, every step was intentional and strategic."
              </p>
              <cite>Josiah Waldner · CEO & Owner, Brovek</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section alt" aria-labelledby="faq-h">
        <div className="container two-col">
          <div className="section-head" data-reveal>
            <span className="eyebrow">
              <span className="num">05</span>
              <span className="sep" />
              Questions
            </span>
            <h2 className="display h2" id="faq-h">
              Before you <span className="hl">start.</span>
            </h2>
          </div>
          <div className="faq" data-reveal>
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              const panelId = `faq-${index + 1}`;
              return (
                <div className={`faq-item${open ? " is-open" : ""}`} key={question}>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    id={`${panelId}-q`}
                    onClick={() => setOpenFaq(open ? -1 : index)}
                  >
                    {question} <span className="faq-icon" aria-hidden="true" />
                  </button>
                  <div className="faq-a" id={panelId} role="region" aria-labelledby={`${panelId}-q`}>
                    <div>
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final" id="final" aria-labelledby="final-h">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Name it this week
          </span>
          <div data-reveal>
            <h2 className="display h1" id="final-h">
              Pray over it.
              <br />
              <span className="hl">Then plan it.</span>
            </h2>
            <img className="final-swoosh" src="/brand/brush-swoosh.svg" alt="" />
          </div>
          <p className="lede" data-reveal>
            Get the free worksheet and give your business a name you'll still be proud of in twenty years.
          </p>
          <div data-reveal>
            <button className="btn btn-primary" type="button" onClick={focusForm}>
              Send me the worksheet <span className="arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
