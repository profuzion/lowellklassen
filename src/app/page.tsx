import type { Metadata } from "next";

import { AboutLowell } from "@/components/home/about";
import { Approach } from "@/components/home/approach";
import { ContactSection } from "@/components/home/contact";
import { FeaturedWork } from "@/components/home/featured-work";
import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { contact } from "@/content/home";

const description =
  "Hi, I’m Lowell Klassen. I help Christian entrepreneurs transform their business by solving invisibility and becoming the obvious choice.";

export const metadata: Metadata = {
  title: { absolute: "Lowell Klassen" },
  description,
  openGraph: {
    title: "Lowell Klassen",
    description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lowell Klassen",
    description,
  },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lowell Klassen",
  jobTitle: "Digital creator",
  email: contact.email,
  telephone: "+1-204-362-6171",
  url: "https://lowellklassen.com/",
  worksFor: {
    "@type": "Organization",
    name: "Profuzion Studio",
    url: contact.studioHref,
  },
};

export default function HomePage() {
  return (
    <div className="lk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <FeaturedWork />
        <Manifesto />
        <Approach />
        <AboutLowell />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
