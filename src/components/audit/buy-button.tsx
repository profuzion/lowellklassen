"use client";

import { useId } from "react";

import { useCheckout } from "@/components/audit/checkout-provider";

export function BuyButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reactId = useId();
  const statusId = `audit-status-${reactId}`;
  const { busy, error, activeId, buy } = useCheckout();
  const message = activeId === reactId ? error : "";

  return (
    <div className="audit-buy-wrap">
      <button
        type="button"
        className={`lk-button audit-buy ${className} ${busy ? "is-loading" : ""}`.trim()}
        onClick={() => void buy(reactId)}
        disabled={busy}
        aria-busy={busy}
        aria-describedby={message ? statusId : undefined}
      >
        <span className="audit-buy-label">{children}</span>
        <span className="audit-spinner" aria-hidden="true" />
      </button>
      <p className="audit-status" id={statusId} role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
