import type { Metadata } from "next";

import "./globals.css";
import "./studio.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lowell Klassen",
    template: "%s · Lowell Klassen",
  },
  description:
    "Hi, I’m Lowell Klassen. I help Christian entrepreneurs transform their business by solving invisibility and becoming the obvious choice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[110] focus:bg-[#ffc82c] focus:px-3 focus:py-2 focus:text-[#171717]"
        >
          Skip to content
        </a>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
