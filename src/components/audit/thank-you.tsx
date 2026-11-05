"use client";

import { useEffect, useState } from "react";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { contact } from "@/content/home";

type State = "loading" | "paid" | "error";

const starts = [
  "Pick your route. Most people start with the Quick Start on page 3. It takes about 1½ to 2 hours. That time is an estimate.",
  "Gather the real materials. A business card, a recent quote, the website on your phone, photos of the trucks and the signs. The list is on page 4.",
  "Mark what you found. “Not checked” is allowed. It means the information is missing.",
  "Write the plan. Pages 28 and 29 turn the findings into three priorities and a 30-day plan.",
] as const;

export function ThankYou() {
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("session_id");
    if (!id) {
      setMessage("This page needs the link Stripe sends after payment.");
      setState("error");
      return;
    }

    let cancelled = false;
    let tries = 0;
    let timer = 0;

    const check = () => {
      fetch(`/api/audit/session?session_id=${encodeURIComponent(id)}`)
        .then(async (response) => {
          const data = (await response.json()) as {
            error?: string;
            email?: string;
            first_name?: string;
            download_url?: string;
          };
          if (!response.ok) throw new Error(data.error || "");
          return data;
        })
        .then((data) => {
          if (cancelled) return;
          setEmail(data.email || "");
          setFirstName(data.first_name || "");
          setDownloadUrl(data.download_url || "");
          setState("paid");
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          tries += 1;
          if (tries < 4) {
            timer = window.setTimeout(check, 2500);
            return;
          }
          setMessage(
            error instanceof Error && error.message
              ? error.message
              : "If you just paid, wait a few seconds and refresh this page.",
          );
          setState("error");
        });
    };

    check();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main" className="audit-main audit-thanks">
        {state === "loading" ? (
          <section className="lk-grid audit-thanks-block" aria-live="polite">
            <p className="audit-name">One moment</p>
            <h1 className="lk-display">Getting your Audit.</h1>
            <p className="audit-lede">Checking the payment with Stripe.</p>
          </section>
        ) : null}

        {state === "paid" ? (
          <section className="lk-grid audit-thanks-block">
            <svg className="audit-check" viewBox="0 0 58 58" aria-hidden="true">
              <circle cx="29" cy="29" r="26" />
              <path d="M17 30 l8 8 l16 -18" />
            </svg>
            <p className="audit-name">
              Thank you{firstName ? `, ${firstName}` : ""}
            </p>
            <h1 className="lk-display">Your Audit is ready.</h1>
            <p className="audit-thanks-download">
              <a className="lk-button audit-buy" href={downloadUrl} download>
                Download the Brand Clarity Audit
              </a>
            </p>
            <p className="audit-fine">
              A copy of this link is on its way to{" "}
              <strong>{email || "your inbox"}</strong>. Keep it. The workbook is
              for use inside your own business.
            </p>
            <h2 className="lk-display audit-thanks-next">Where to start.</h2>
            <ol className="audit-start">
              {starts.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="audit-thanks-call">
              <h2 className="lk-display">Bring the scorecard.</h2>
              <p>
                When you finish, book a free 15-minute call. We’ll look at what
                you found, what to do first, and whether working together makes
                sense.
              </p>
              <a className="lk-textlink" href={contact.booking}>
                Book a free 15-minute call
              </a>
            </div>
          </section>
        ) : null}

        {state === "error" ? (
          <section className="lk-grid audit-thanks-block" role="alert">
            <p className="audit-name">The purchase didn’t come through</p>
            <h1 className="lk-display">I couldn’t confirm the payment.</h1>
            <p className="audit-lede">{message}</p>
            <p className="audit-fine">
              Check the Stripe receipt, or email me at{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> with the
              address you paid with. I’ll send the workbook directly.
            </p>
            <p>
              <a className="lk-textlink" href="/brand-clarity-audit">
                Back to the Audit
              </a>
            </p>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
