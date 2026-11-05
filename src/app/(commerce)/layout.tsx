import type { ReactNode } from "react";

import { CheckoutProvider } from "@/components/checkout-drawer";
import { Footer } from "@/components/footer";
import { ProgressLine } from "@/components/progress-line";
import { SiteHeader } from "@/components/site-header";

export default function CommerceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="commerce">
      <CheckoutProvider>
        <ProgressLine />
        <SiteHeader />
        {children}
        <Footer />
      </CheckoutProvider>
    </div>
  );
}
