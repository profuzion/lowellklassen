import type { Metadata } from "next";

import { SalesPage } from "@/components/audit/sales-page";

const description =
  "A $27 CAD self-guided workbook. Sixteen tests show where the brand fell behind the business, then turn that into three priorities and a 30-day plan.";

export const metadata: Metadata = {
  title: { absolute: "The Brand Clarity Audit · Lowell Klassen" },
  description,
  alternates: { canonical: "/brand-clarity-audit" },
  openGraph: {
    title: "The Brand Clarity Audit: see your brand clearly, then fix what matters first",
    description:
      "16 tests. Three priorities. One 30-day plan. $27 CAD.",
    type: "website",
    url: "/brand-clarity-audit",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Brand Clarity Audit",
    description,
  },
};

const product = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Brand Clarity Audit",
  description:
    "A 32-page self-guided workbook with 16 brand tests, a scorecard, a priority method, and a 30-day action plan for owners of established businesses.",
  brand: { "@type": "Brand", name: "Lowell D. Klassen" },
  image: "/audit/cover.png",
  offers: {
    "@type": "Offer",
    price: "27.00",
    priceCurrency: "CAD",
    availability: "https://schema.org/InStock",
    url: "/brand-clarity-audit",
  },
};

export default function BrandClarityAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <SalesPage />
    </>
  );
}
