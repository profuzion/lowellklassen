import type { Metadata } from "next";

import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { SelectedWorkExperience } from "@/components/selected-work/experience";
import { studies } from "@/content/selected-work";

import "./selected-work.css";

const description =
  "Case studies from Profuzion Studio: AlumaReel, Brovek, Skylight Ventures, and FrameBuilt, plus the wider client roster.";

export const metadata: Metadata = {
  title: "Case Studies",
  description,
  openGraph: {
    title: "Case Studies · Lowell Klassen",
    description,
    type: "website",
    url: "/selected-work",
  },
};

const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Profuzion Studio case studies",
  itemListElement: studies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: study.name,
    ...("href" in study ? { url: study.href } : {}),
  })),
};

export default function SelectedWorkPage() {
  return (
    <div className="lk sw">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <SiteHeader />
      <main id="main">
        <SelectedWorkExperience />
      </main>
      <SiteFooter />
    </div>
  );
}
