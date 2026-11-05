export const contact = {
  email: "lowell@profuzionstudio.com",
  phoneDisplay: "204.362.6171",
  phoneHref: "tel:+12043626171",
  studio: "Profuzion Studio",
  studioHref: "https://profuzionstudio.com/",
  booking: "https://calendly.com/profuzionstudio",
  facebook: "https://www.facebook.com/profuzionstudio",
} as const;

export const projects = [
  {
    slug: "alumareel",
    name: "AlumaReel",
    disciplines: ["Identity", "Website", "3D configurator"],
    summary:
      "The site lets a welder assemble a compatible rig in 3D and send that setup for an estimate. I shaped the configurator and the identity with Profuzion Studio.",
    detail: [
      "AlumaReel builds reels, skids, and rig equipment for mobile welding. The brief was a site where a customer could put compatible products together, see the rig, and send it for an estimate.",
      "The configurator accounts for how the parts fit. The same identity runs from the website onto the brochure and the rest of the company material.",
    ],
    credit: "With Profuzion Studio",
    href: "https://alumareel.ca/",
    hrefLabel: "Visit alumareel.ca",
    image: "/work/alumareel-config.webp",
    imageAlt:
      "A 3D view of a pickup carrying an AlumaReel welding rig, with gas cylinders, reels, and a phone beside the truck.",
    width: 1630,
    height: 800,
    frame: "wide" as const,
  },
  {
    slug: "brovek",
    name: "Brovek",
    disciplines: ["Naming", "Identity", "Website"],
    summary:
      "The name, the product line, and the identity were built together. Starta, Stride, Matrix, Titan, and Forge now read as one family of transportable fuel tanks.",
    detail: [
      "Brovek came to market with transportable, double-walled fuel tanks for construction, agriculture, and mining. Naming the line took as much of the work as the mark, because every later piece had to fit the names.",
      "The identity, the brochure, and the site at brovek.com carry the same system.",
    ],
    credit: "With Profuzion Studio",
    href: "https://brovek.com/",
    hrefLabel: "Visit brovek.com",
    image: "/work/brovek-lineup.webp",
    imageAlt:
      "Five Brovek fuel tanks in a row, labeled Starta 60, Forge 90, Stride 180, Matrix 270, and Titan 480, with orange and grey stripes.",
    width: 960,
    height: 768,
    frame: "portrait" as const,
    secondary: {
      src: "/work/brovek-brochure.webp",
      alt: "Brovek brochure cover with the tank lineup and the line Fueling grit, powering progress.",
      width: 612,
      height: 792,
    },
  },
  {
    slug: "skylight",
    name: "Skylight Ventures",
    disciplines: ["Identity", "Website", "Job-site materials"],
    summary:
      "After years of word-of-mouth building, the company had no logo and no website. The mark reads as an S, a house, a skylight, and a set of trusses.",
    detail: [
      "Skylight Ventures is a family-owned contracting firm in Peace River, Alberta, founded in 2006 by Peter Unrau. The company builds homes, shops, and commercial renovations. When the work came to Profuzion, there was no visual identity and no site.",
      "The geometric mark is built so it still reads at the size of a favicon and at the size of a trailer wrap. The identity also covers the website, cards, workwear, and hard hats. The site is skylightventures.ca.",
    ],
    credit: "With Profuzion Studio",
    href: "https://skylightventures.ca/",
    hrefLabel: "Visit skylightventures.ca",
    image: "/work/skylight-herrit.webp",
    imageAlt:
      "A red house with a steep gable roof and a dark front door, the kind of residential work Skylight Ventures builds.",
    width: 1600,
    height: 1200,
    frame: "split" as const,
    mark: "/work/skylight-logo.svg",
    markAlt: "Skylight Ventures wordmark and geometric S mark",
  },
] as const;

export type Project = (typeof projects)[number];

export const approach = [
  {
    number: "01",
    title: "Find the real difference",
    body: "Name what the business is worth to a customer, who that customer is, and what has to be said out loud.",
    image: "/work/brovek-lineup.webp",
    alt: "A close view of the Brovek tank family, each model named and marked with the same stripe.",
    width: 960,
    height: 768,
    position: "18% 60%",
  },
  {
    number: "02",
    title: "Give it a distinct identity",
    body: "Put that into a name, a mark, and a way of talking that still reads on a truck and on a phone.",
    image: "/work/skylight-logo.svg",
    alt: "The Skylight Ventures mark, a geometric S that also reads as a house and a set of trusses.",
    width: 568,
    height: 139,
    position: "center",
    logo: true,
  },
  {
    number: "03",
    title: "Build the experience",
    body: "Build the website so the same story holds, and the next step is plain.",
    image: "/work/alumareel-config.webp",
    alt: "The AlumaReel configurator view, with the welding rig assembled on the truck and a phone alongside it.",
    width: 1630,
    height: 800,
    position: "72% 50%",
  },
] as const;
