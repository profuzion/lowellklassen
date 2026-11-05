import Image from "next/image";

import { Booklet } from "@/components/audit/booklet";
import { BuyButton } from "@/components/audit/buy-button";
import { CancelNotice } from "@/components/audit/cancel-notice";
import { StickyBuy } from "@/components/audit/sticky-buy";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { contact } from "@/content/home";

const tests = [
  {
    number: "01",
    title: "Foundation",
    body: "What you stand for, who you serve, and what you sell.",
    names: "Purpose and values, audience, messaging, offer clarity, strategy.",
  },
  {
    number: "02",
    title: "Identity",
    body: "How the brand looks on a truck, a uniform, and a phone.",
    names: "Logo, cohesion, brand usability.",
  },
  {
    number: "03",
    title: "Presence",
    body: "What people find, what they believe, and what they do next.",
    names: "Website, trust, proof, next step.",
  },
  {
    number: "04",
    title: "Experience",
    body: "How the brand holds up in the work, beside competitors, and at the size you want.",
    names: "Consistency, customer experience, competition, growth.",
  },
] as const;

const pages = [
  {
    src: "/audit/scorecard.png",
    alt: "Quick Scorecard page",
    caption: "Quick Scorecard",
    detail: "Sixteen provisional ratings, marked against what you can see today.",
  },
  {
    src: "/audit/test-01.png",
    alt: "Test 01: Purpose and Values",
    caption: "Test 01",
    detail: "Purpose and values, worked with your real materials.",
  },
  {
    src: "/audit/action-plan.png",
    alt: "30-Day Action Plan page",
    caption: "30-day plan",
    detail: "A change, an owner, a date, and a way to tell if it helped.",
  },
  {
    src: "/audit/worked-example.png",
    alt: "Worked example page",
    caption: "Worked example",
    detail: "A fictional steel shop, shown so the method is visible.",
  },
] as const;

const quickSteps = [
  "Fill in your Starting Snapshot.",
  "Answer the 16-question Quick Scorecard.",
  "Pick up to three focus tests and work them.",
  "Choose three priorities and fill in the 30-day plan.",
] as const;

const fullSteps = [
  "Complete the Starting Snapshot and the Quick Scorecard.",
  "Work all 16 tests, one part a week, using your real materials.",
  "Update the scorecard and read the results.",
  "Choose the priorities, build the 30-day plan, and write the one-page Brand Brief.",
] as const;

const outcomes = [
  {
    title: "A score for all 16 areas.",
    body: "Strong, Partial, Needs work, or Not checked yet. Each mark sits on what you saw.",
  },
  {
    title: "Three priorities.",
    body: "A points method weighs what customers notice against how hard the fix is.",
  },
  {
    title: "A 30-day plan.",
    body: "Each priority gets a specific change, an owner, a date, and a way to tell whether it helped.",
  },
  {
    title: "A one-page Brand Brief.",
    body: "Purpose, customer, offers, difference, and proof. Hand it to staff, a sign shop, a printer, or web help.",
  },
  {
    title: "A line on outside help.",
    body: "You can see what you will fix yourself, and where paying someone else is worth the money.",
  },
] as const;

const fit = [
  "You run an established business that does good work, and the brand has not kept up with it.",
  "Customers keep asking “do you do…?” or they cannot tell your products apart.",
  "You are about to pay for a new logo or a new website, and you want the real problem named first.",
  "You took the free Brand Clarity Assessment and want to go further on the low scores.",
] as const;

export function SalesPage() {
  return (
    <>
      <SiteHeader mode="audit" />
      <CancelNotice />
      <main id="main" className="audit-main audit-sales">
        <section className="audit-hero" aria-labelledby="audit-title">
          <div className="lk-grid audit-hero-grid">
            <div className="audit-hero-copy">
              <h1 id="audit-title" className="lk-display">
                <span>See your</span>
                <span>brand</span>
                <span className="lk-hl">
                  clearly.
                  <img className="lk-swoosh" src="/brand/brush-swoosh.svg" alt="" />
                </span>
              </h1>
              <p className="audit-name">The Brand Clarity Audit</p>
              <p className="audit-lede">
                Sixteen tests for the brand, the offers, and the names. You leave
                with three priorities and a plan for the next 30 days. Do this
                before you pay for another logo or another website.
              </p>
              <div className="audit-hero-buy" id="buy">
                <BuyButton>Get the Audit for $27</BuyButton>
                <p className="audit-fine">
                  $27 CAD. The fillable PDF is yours the moment you pay. Email me
                  within 14 days for a refund.
                </p>
                <p className="audit-proof">
                  More than 100 brands since 1999. I start every one this way.
                </p>
              </div>
            </div>
            <Booklet />
          </div>
          <div className="lk-grid">
            <ul className="audit-line">
              <li>16 tests</li>
              <li>Two ways through</li>
              <li>Three priorities</li>
              <li>One 30-day plan</li>
            </ul>
          </div>
        </section>

        <section className="audit-band" aria-labelledby="pattern-title">
          <div className="lk-grid audit-split">
            <h2 id="pattern-title" className="lk-display">
              The brand stayed behind.
            </h2>
            <div className="audit-prose">
              <p>
                You added products. You took on bigger customers. The team grew.
                The name, the logo, and the way you describe what you sell still
                belong to the business you ran years ago. A customer asks “do you
                do…?” or calls someone whose offer they can picture.
              </p>
              <p>
                The usual answer is a new logo, a new website, or more ads. The
                same question comes back. The decisions under the design are the
                old ones: who the business is for, what it sells, what that offer
                is called, and why a customer should pick it.
              </p>
              <p className="audit-pull">
                Your brand was built for an earlier version of the business.
              </p>
            </div>
          </div>
        </section>

        <section className="audit-section" aria-labelledby="inside-title">
          <div className="lk-grid audit-split audit-split-intro">
            <div>
              <h2 id="inside-title" className="lk-display">
                Sixteen tests. Inside out.
              </h2>
              <div className="audit-mid-buy">
                <BuyButton>Get the Audit for $27</BuyButton>
              </div>
            </div>
            <p className="audit-lede audit-lede-tight">
              These are the checks I run before I design anything. You work them
              with a pen and the things you already have: a business card, a
              recent quote, the website on your phone, photos of the trucks and
              the signs.
            </p>
          </div>
          <div className="lk-grid">
            <ol className="audit-index">
              {tests.map((test) => (
                <li key={test.number}>
                  <span className="audit-no">{test.number}</span>
                  <div>
                    <h3>{test.title}</h3>
                    <p>{test.body}</p>
                  </div>
                  <p className="audit-names">{test.names}</p>
                </li>
              ))}
            </ol>
            <p className="audit-aside">
              The website is one test of sixteen, beside trust, proof, and the
              next step.
            </p>
          </div>
        </section>

        <section className="audit-desk" aria-labelledby="desk-title">
          <div className="lk-grid audit-desk-head">
            <h2 id="desk-title" className="lk-display">
              Look inside.
            </h2>
            <p>
              Pages from the workbook. The scorecard, the first test, the plan,
              and the example you can follow.
            </p>
          </div>
          <div className="audit-spread" tabIndex={0} aria-label="Workbook pages">
            {pages.map((page) => (
              <figure className="audit-page" key={page.src}>
                <Image
                  src={page.src}
                  alt={page.alt}
                  width={1020}
                  height={1320}
                  sizes="(max-width: 899px) 78vw, 280px"
                />
                <figcaption>
                  <strong>{page.caption}</strong>
                  <span>{page.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="audit-section" aria-labelledby="routes-title">
          <div className="lk-grid">
            <h2 id="routes-title" className="lk-display audit-routes-title">
              Two ways through.
            </h2>
            <div className="audit-routes">
              <article className="audit-route audit-route-quick">
                <p className="audit-hours">
                  1.5 <span>hours</span>
                </p>
                <h3>Quick Start</h3>
                <p className="audit-when">About one sitting. Time is an estimate.</p>
                <ol>
                  {quickSteps.map((step, index) => (
                    <li key={step}>
                      <span>0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
              <article className="audit-route">
                <p className="audit-hours audit-hours-quiet">
                  9–12 <span>hours</span>
                </p>
                <h3>Full Audit</h3>
                <p className="audit-when">
                  Spread over 2 to 4 weeks. Time is an estimate.
                </p>
                <ol>
                  {fullSteps.map((step, index) => (
                    <li key={step}>
                      <span>0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            </div>
            <p className="audit-aside">
              Start with the Quick Start. That pass still counts when you come
              back for the Full Audit.
            </p>
          </div>
        </section>

        <section className="audit-band" aria-labelledby="outcome-title">
          <div className="lk-grid audit-split">
            <h2 id="outcome-title" className="lk-display">
              You leave with a record.
            </h2>
            <ul className="audit-outcomes">
              {outcomes.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lk-grid">
            <p className="audit-aside audit-aside-band">
              A strong score tells you where to keep your money. Some businesses
              should leave the logo alone.
            </p>
          </div>
        </section>

        <section className="audit-section" aria-labelledby="example-title">
          <div className="lk-grid audit-split">
            <h2 id="example-title" className="lk-display">
              The logo could wait.
            </h2>
            <div className="audit-prose">
              <p>
                The workbook follows an 18-person steel fabrication business.
                Twenty-two years in. Mostly referral and repeat farm work. They
                want commercial customers. The business is fictional. I wrote it
                to show the method.
              </p>
              <p>
                Four of the last five inquiries opened with “do you do…?” The
                quote form still landed in a retired estimator’s inbox. A
                contractor they wanted asked for commercial references nobody had
                written down.
              </p>
              <p>
                The 30-day plan was concrete. Fix the form within three days.
                Write two offer descriptions. Build a two-page capability
                statement. The mark stayed as it was.
              </p>
            </div>
          </div>
        </section>

        <section className="audit-band" aria-labelledby="fit-title">
          <div className="lk-grid">
            <h2 id="fit-title" className="lk-display">
              This fits if
            </h2>
            <ul className="audit-fit">
              {fit.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="lk-grid audit-self">
            <h3 className="lk-display">You do the audit.</h3>
            <div className="audit-prose">
              <p>
                You score the brand. You write the plan. I don’t review the
                pages, and I don’t send back a finished audit.
              </p>
              <p>
                When you want a second set of eyes, book a free 15-minute call
                and bring the scorecard. The call is separate.
              </p>
              <p>
                <a className="lk-textlink" href={contact.booking}>
                  Book a free 15-minute call
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="audit-section audit-about" aria-labelledby="about-title">
          <div className="lk-grid audit-about-grid">
            <figure className="audit-portrait">
              <Image
                src="/lowell-klassen.webp"
                alt="Lowell Klassen, photographed for Profuzion Studio."
                width={1357}
                height={1839}
                sizes="(max-width: 899px) 70vw, 380px"
              />
            </figure>
            <div>
              <h2 id="about-title" className="lk-display">
                Lowell Klassen
              </h2>
              <p className="audit-role">Brand Architect, Profuzion Studio. Since 1999.</p>
              <div className="audit-prose">
                <p>
                  I help Christian entrepreneurs solve invisibility and become
                  the obvious choice.
                </p>
                <p>
                  I’ve built more than 100 brands. Every project starts with the
                  products, the people, and the plan. Design comes after that.
                  This workbook is that first step, written so you can take it
                  yourself.
                </p>
                <p>
                  My faith is why I care whether good work gets presented
                  clearly. You can use the workbook either way.
                </p>
              </div>
              <figure className="audit-quote">
                <blockquote>
                  <p>
                    “Working with Profuzion Studio was a turning point for our
                    business. They didn’t just give us a new logo or website.
                    They built a brand from the ground up that truly reflects who
                    we are and where we’re headed. From developing the Brovek
                    name to designing a visual identity that communicates trust
                    and durability, every step was intentional and strategic.”
                  </p>
                </blockquote>
                <figcaption>Josiah Waldner, CEO &amp; Owner, Brovek</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="audit-section" aria-labelledby="price-title">
          <div className="lk-grid audit-price">
            <div className="audit-amount-block">
              <h2 id="price-title" className="lk-display audit-amount">
                <span className="sr-only">Price </span>$27
              </h2>
              <p className="audit-cad">CAD, once</p>
            </div>
            <div>
              <p className="audit-price-lead">
                You know the first three fixes before you commission the next
                design.
              </p>
              <ul className="audit-includes">
                <li>32-page workbook. Fill it on screen, or print it.</li>
                <li>16 tests with examples and checklists.</li>
                <li>Quick Scorecard, priority method, and 30-day plan.</li>
                <li>Brand Brief and action-plan pages you can reuse.</li>
              </ul>
              <div id="price">
                <BuyButton>Get the Audit for $27</BuyButton>
              </div>
              <p className="audit-fine">
                Secure checkout with Stripe. The download is on the next page,
                and a copy arrives by email. Paying from outside Canada? Your
                card converts it at checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="audit-band" aria-labelledby="faq-title">
          <div className="lk-grid audit-split">
            <h2 id="faq-title" className="lk-display">
              Before you buy.
            </h2>
            <div className="audit-faqs">
              <details className="audit-faq" open>
                <summary>
                  How do I get it?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  Right after checkout you land on a page with your download
                  button. The same link comes to your inbox. It’s a fillable
                  PDF. Fill it on screen or print it.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  Do I need the free Assessment first?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  The Audit stands on its own. If you already took the{" "}
                  <a
                    href="https://profuzionstudio.com/brand-clarity/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Brand Clarity Assessment
                  </a>
                  , use the Audit to go further on the low scores.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  How long does it take?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  The Quick Start takes about 1½ to 2 hours in one sitting. The
                  Full Audit takes about 9 to 12 hours, spread over 2 to 4 weeks.
                  Times are estimates. A few tests need five minutes of someone
                  else’s time.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  Do you review my answers?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  You work the pages yourself. I don’t review your answers or
                  return a finished audit. When you’re done, you can book a free
                  15-minute call and bring the scorecard and the plan. The call
                  is separate.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  Is it in Canadian dollars?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  Yes. $27 CAD. If you pay from another country, your card
                  converts it at checkout.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  Is my business the wrong size?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  It’s written for an established business: you’ve been at it a
                  while, you have real customers, and the work has grown. If
                  you’re still choosing a name, start with the free{" "}
                  <a href="/name-it-right">Brand Name Worksheet</a>.
                </p>
              </details>
              <details className="audit-faq">
                <summary>
                  What if I want my money back?
                  <i aria-hidden="true" />
                </summary>
                <p>
                  Email me at{" "}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a> within
                  14 days and I’ll refund you.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="audit-final" aria-labelledby="final-title">
          <div className="lk-grid">
            <h2 id="final-title" className="lk-display">
              <span>Build on</span>
              <span className="lk-hl">
                the rock.
                <img className="lk-swoosh" src="/brand/brush-swoosh.svg" alt="" />
              </span>
            </h2>
            <p className="audit-scripture">
              “Anyone who listens to my teaching and follows it is wise, like a
              person who builds a house on solid rock.”{" "}
              <cite>Matthew 7:24 (NLT)</cite>
            </p>
            <p className="audit-lede">
              Get the Audit. Give it an evening. Leave with three priorities and
              a plan for the next 30 days.
            </p>
            <div id="final">
              <BuyButton>Get the Audit for $27</BuyButton>
            </div>
          </div>
        </section>
      </main>
      <StickyBuy />
      <SiteFooter />
    </>
  );
}
