export type ProductId = "workbook" | "audit";

export type ExpertiseIcon =
  | "strategy"
  | "messaging"
  | "offer"
  | "visual"
  | "presence"
  | "assets";

export type BeliefIcon = "clarity" | "system" | "decision";

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Product = {
  id: ProductId;
  name: string;
  eyebrow: string;
  summary: string;
  bestFor: string;
  format: string;
  includes: string[];
  priceLabel: string;
  cta: string;
  stripePriceEnv: "STRIPE_PRICE_WORKBOOK" | "STRIPE_PRICE_AUDIT";
};

export const site = {
  name: "Brand Master Lowell",
  description:
    "Brand Master Lowell helps business owners turn a scattered identity into a clear brand system: positioning, messaging, offers, and visual direction.",
  header: {
    cta: "Start With the Workbook",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Checkout", href: "/checkout" },
  ] satisfies NavItem[],
  marquee: [
    "Brand strategy",
    "Messaging",
    "Offer clarity",
    "Visual direction",
    "Social presence",
    "Brand systems",
  ],
  hero: {
    eyebrow: "Brand strategy for real offers",
    headline:
      "Turn your business into a brand people recognize, trust, and buy from.",
    lines: ["Turn your business", "into a brand people", "recognize, trust,"],
    emphasis: "and buy from.",
    subheadline:
      "Brand Master Lowell helps you clarify the message, sharpen the positioning, and turn a scattered business identity into a brand system people can recognize and trust.",
    primaryCta: "Start With the Workbook",
    primaryHref: "/checkout?product=workbook",
    secondaryCta: "View Brand Audit",
    secondaryHref: "/#offers",
    imageSrc: "/lowell-klassen.webp",
    imageAlt: "Lowell",
    scrollLabel: "Scroll",
  },
  about: {
    number: "01",
    label: "About",
    title: "About Lowell",
    paragraphs: [
      "I am the brand strategist and creator behind Brand Master Lowell. I work with owners who already have a real offer, and a public presence that still feels scattered, unclear, or hard to trust.",
      "The work is practical. We decide what the brand is, say it the same way in the places people actually look, and leave you with a system you can keep using: positioning, messaging, the offer, visual direction, and the pages and posts that carry them.",
    ],
    portraitSrc: "/lowell-klassen.webp",
    portraitAlt: "Lowell",
    beliefs: [
      {
        icon: "clarity" as const,
        title: "Clarity creates trust",
        detail:
          "People trust what they can understand. A clear offer beats a busy one.",
      },
      {
        icon: "system" as const,
        title: "A brand is a complete system",
        detail:
          "Message, offer, visuals, and the places you show up have to agree.",
      },
      {
        icon: "decision" as const,
        title: "Good design should help people decide",
        detail:
          "Design earns its place when it makes the next step obvious.",
      },
    ],
  },
  expertise: {
    number: "02",
    label: "Expertise",
    title: "Expertise",
    intro:
      "The work sits between strategy and the assets people actually see. Each piece is there to make the brand easier to understand and easier to buy.",
    items: [
      {
        icon: "strategy" as const,
        title: "Brand strategy",
        detail:
          "Decide what the brand stands for, who it is for, and what it refuses to be.",
      },
      {
        icon: "messaging" as const,
        title: "Messaging and positioning",
        detail:
          "Write the lines that explain the offer without making people work for it.",
      },
      {
        icon: "offer" as const,
        title: "Offer clarity",
        detail:
          "Name what is being sold, who it helps, and why it is the right next step.",
      },
      {
        icon: "visual" as const,
        title: "Visual brand direction",
        detail:
          "Set a look that supports the message and stays consistent across uses.",
      },
      {
        icon: "presence" as const,
        title: "Website and social presence alignment",
        detail:
          "Make the site and social profiles tell the same story as the offer.",
      },
      {
        icon: "assets" as const,
        title: "Sales assets and brand systems",
        detail:
          "Turn the decisions into pages, posts, and sales materials you can reuse.",
      },
    ],
  },
  offers: {
    number: "03",
    label: "Offers",
    title: "Offers",
    intro:
      "Two ways to start. One is a self-guided workbook. The other is the Brand Clarity Audit: sixteen tests, a scorecard, and a 30-day plan, for $27 CAD.",
    products: [
      {
        id: "workbook",
        name: "Brand Clarity Workbook",
        eyebrow: "Self-guided",
        summary:
          "A digital workbook for owners who want to diagnose what is unclear in the brand. You work through it yourself. The findings come from your own assessment.",
        bestFor:
          "Owners who want to sort the brand themselves before buying done-for-you work.",
        format: "Digital workbook. Self-guided.",
        includes: [
          "Identify weak spots",
          "Clarify positioning",
          "Organize messaging",
          "Choose action priorities",
          "Create a simple 30-day brand action plan",
        ],
        // TODO: Replace with the real workbook price before launch.
        priceLabel: "Price to be confirmed",
        cta: "Start With the Workbook",
        stripePriceEnv: "STRIPE_PRICE_WORKBOOK",
      },
      {
        id: "audit",
        name: "The Brand Clarity Audit",
        eyebrow: "Self-guided workbook",
        summary:
          "A 32-page workbook. Sixteen tests, a scorecard, three priorities, and a 30-day plan. You do the work. $27 CAD.",
        bestFor:
          "Owners of established businesses who want to see where the brand fell behind before they pay for a new logo or website.",
        format: "Fillable PDF. Self-guided. 32 pages.",
        includes: [
          "16 tests across foundation, identity, presence, and experience",
          "Quick Start or the Full Audit",
          "Scorecard and priority method",
          "30-day action plan and one-page Brand Brief",
        ],
        priceLabel: "$27 CAD",
        cta: "Get the Audit",
        stripePriceEnv: "STRIPE_PRICE_AUDIT",
      },
    ] satisfies Product[],
  },
  checkout: {
    title: "Checkout",
    continueLabel: "Continue to checkout",
    paymentNote:
      "Payment is completed on Stripe. Card details are never entered on this site.",
    termsLabel:
      "I understand this is a digital purchase and I want to continue to secure checkout.",
    pendingTitle: "Checkout integration pending",
    pendingBody:
      "Stripe is not connected in this environment yet. You can review the offer. Payment will open once the checkout keys are in place.",
    submitLabel: "Continue to secure checkout",
    submittingLabel: "Starting checkout…",
  },
  footer: {
    line: "From a working business to a brand people can recognize, trust, and buy from.",
    // TODO: Add the public contact email.
    email: "",
    emailLabel: "Email",
    // TODO: Add the real profile URLs.
    social: [
      { label: "Instagram", href: "" },
      { label: "TikTok", href: "" },
      { label: "YouTube", href: "" },
      { label: "LinkedIn", href: "" },
    ] satisfies SocialLink[],
  },
  success: {
    title: "Checkout complete",
    body: "Stripe sent you back here after checkout. Your receipt arrives by email from Stripe.",
    cta: "Back to offers",
  },
  cancel: {
    title: "Checkout canceled",
    body: "No payment was taken. You can return to the offers when you are ready.",
    cta: "Back to offers",
  },
} as const;

export type Site = typeof site;
