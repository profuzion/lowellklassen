import type { Metadata } from "next";

import { ThankYou } from "@/components/audit/thank-you";

export const metadata: Metadata = {
  title: "Your Audit",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
