import { CheckoutProvider } from "@/components/audit/checkout-provider";

import "./audit.css";

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lk audit">
      <CheckoutProvider>{children}</CheckoutProvider>
    </div>
  );
}
