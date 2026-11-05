import type { Metadata } from "next";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { NameItRight } from "@/components/name-it-right/worksheet";

import "./worksheet.css";

const description =
  "A free 7-step worksheet for naming the business God put on your heart. Go from a blank page to one name you can stand behind in about 45 minutes.";

export const metadata: Metadata = {
  title: "Name It Right",
  description,
  openGraph: {
    title: "Name It Right: the free Brand Name Worksheet",
    description: "Seven steps. Forty-five minutes. One name you can stand behind.",
    type: "website",
    url: "/name-it-right",
  },
};

export default function NameItRightPage() {
  return (
    <div className="lk">
      <SiteHeader />
      <NameItRight />
      <SiteFooter />
    </div>
  );
}
