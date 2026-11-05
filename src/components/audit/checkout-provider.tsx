"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type CheckoutContextValue = {
  busy: boolean;
  error: string;
  activeId: string | null;
  buy: (id: string) => Promise<void>;
};

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const reset = () => setBusy(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  useEffect(() => {
    if (!clientSecret) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setClientSecret(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [clientSecret]);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      busy,
      error,
      activeId,
      buy: async (id: string) => {
        if (clientSecret) return;
        setActiveId(id);
        setError("");
        setBusy(true);
        try {
          if (!stripePromise) {
            throw new Error(
              "Checkout isn’t connected yet. Add the Stripe publishable key and reload.",
            );
          }
          const params = new URLSearchParams(window.location.search);
          const source = (params.get("src") || params.get("utm_source") || "").slice(0, 60);
          const response = await fetch("/api/audit/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source }),
          });
          const data = (await response.json()) as { clientSecret?: string; error?: string };
          if (response.ok && data.clientSecret) {
            setClientSecret(data.clientSecret);
            setBusy(false);
            return;
          }
          throw new Error(data.error || "Checkout didn’t open.");
        } catch (caught) {
          setBusy(false);
          const message = caught instanceof Error ? caught.message : "Checkout didn’t open.";
          setError(message);
        }
      },
    }),
    [activeId, busy, clientSecret, error],
  );

  return (
    <CheckoutContext value={value}>
      {children}
      {clientSecret && stripePromise ? (
        <div className="audit-pay" role="presentation" onMouseDown={() => setClientSecret(null)}>
          <div
            className="audit-pay-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Pay for The Brand Clarity Audit"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="audit-pay-bar">
              <p>The Brand Clarity Audit</p>
              <button type="button" onClick={() => setClientSecret(null)}>
                Close
              </button>
            </div>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      ) : null}
    </CheckoutContext>
  );
}

export function useCheckout() {
  const value = useContext(CheckoutContext);
  if (!value) {
    throw new Error("Buy buttons must sit inside the audit checkout provider.");
  }
  return value;
}
