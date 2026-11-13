"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

type CheckoutContextValue = {
  busy: boolean;
  error: string;
  activeId: string | null;
  clientSecret: string | null;
  close: () => void;
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

  const close = useCallback(() => {
    setClientSecret(null);
    setBusy(false);
  }, []);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      busy,
      error,
      activeId,
      clientSecret,
      close,
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
    [activeId, busy, clientSecret, close, error],
  );

  return <CheckoutContext value={value}>{children}</CheckoutContext>;
}

export function AuditCheckout() {
  const { clientSecret, close } = useCheckout();
  const panelRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () => (clientSecret ? { clientSecret } : null),
    [clientSecret],
  );

  useEffect(() => {
    if (!options) return;
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [options]);

  if (!options || !stripePromise) return null;

  return (
    <div className="audit-checkout" ref={panelRef}>
      <div className="audit-pay-bar">
        <p>The Brand Clarity Audit</p>
        <button type="button" onClick={close}>
          Close
        </button>
      </div>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export function useCheckout() {
  const value = useContext(CheckoutContext);
  if (!value) {
    throw new Error("Buy buttons must sit inside the audit checkout provider.");
  }
  return value;
}
