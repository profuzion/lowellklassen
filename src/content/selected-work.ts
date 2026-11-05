export type StudyBeat = {
  label: string;
  title: string;
  body: string;
};

export type StudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Study = {
  slug: string;
  index: string;
  name: string;
  client: string;
  place: string;
  yearNote: string;
  disciplines: readonly string[];
  summary: string;
  beats: readonly StudyBeat[];
  quote?: {
    text: string;
    attribution: string;
  };
  href?: string;
  hrefLabel?: string;
  image?: StudyImage;
  secondary?: StudyImage;
  mark?: {
    src: string;
    alt: string;
  };
  plate: "photo" | "timber";
};

export type RosterEntry = {
  name: string;
  scope: string;
};

export const pageIntro = {
  kicker: "Profuzion Studio",
  lines: ["Case", "studies."],
  script: "from the studio floor",
  lede: "Four brands written out in full, then the wider roster. Naming, identity, and the sites that carry the work.",
} as const;

export const studies = [
  {
    slug: "alumareel",
    index: "01",
    name: "AlumaReel",
    client: "Joseph Hofer",
    place: "Swan Lake, Manitoba",
    yearNote: "Identity, two storefronts, one configurator",
    disciplines: [
      "Identity",
      "Ecommerce",
      "3D configurator",
      "Canada & U.S. sites",
    ],
    summary:
      "A welder builds a compatible rig on the back of a truck, then sends it for an estimate. The same identity runs from the screen onto the brochure.",
    beats: [
      {
        label: "Situation",
        title: "The models were built for the shop, not the browser.",
        body: "AlumaReel makes mobile welding equipment for commercial and industrial work across Canada and the United States. Joseph Hofer needed more than a refresh. Dealers in Canada take estimates. The U.S. site sells direct. The manufacturing models were too heavy for the web, and the existing mark was not holding the product in a crowded trade.",
      },
      {
        label: "The move",
        title: "Two markets. One logic for what fits.",
        body: "alumareel.ca serves the Canadian dealer network with estimates. alumareel.com sells to the U.S., with CAD and USD handled between them. The configurator lets a welder place parts on a pickup bed. Incompatible pieces switch off as the setup grows, following truck length, welder type, and what is already on the rig. The identity was rebuilt so the website, the brochure, and the rest of the company material use the same system.",
      },
      {
        label: "What held",
        title: "The rig on the screen is the rig they price.",
        body: "After launch, estimates increased in Canada and ecommerce sales increased in the United States. Dealers have since opened in Germany, New Zealand, and Australia. The useful part is quieter: a customer can see a legal setup before anyone writes the quote.",
      },
    ],
    quote: {
      text: "Profuzion Studio not only exceeded what we were hoping to experience with our new interactive website, but also created a complementing brand identity for us on our website that fits our logo and our business perfectly.",
      attribution: "Joseph Hofer, CEO, AlumaReel North America",
    },
    href: "https://alumareel.ca/",
    hrefLabel: "Visit alumareel.ca",
    image: {
      src: "/work/alumareel-config.webp",
      alt: "A 3D view of a pickup carrying an AlumaReel welding rig, with gas cylinders, reels, and a phone beside the truck.",
      width: 1630,
      height: 800,
    },
    plate: "photo",
  },
  {
    slug: "brovek",
    index: "02",
    name: "Brovek",
    client: "Josiah Waldner, Intec Steelworx",
    place: "Teulon, Manitoba",
    yearNote: "Name, line, and site",
    disciplines: ["Naming", "Product names", "Identity", "Website", "Brochure"],
    summary:
      "Starta, Stride, Matrix, Titan, and Forge read as one family of transportable fuel tanks. The name had to survive a jobsite.",
    beats: [
      {
        label: "Situation",
        title: "A product line with no parent brand.",
        body: "After AlumaReel, Josiah Waldner of Intec Steelworx asked for the same depth on a new line of jobsite equipment. The tanks are transportable and double-walled, for construction, agriculture, and mining. The work had to name the company, name the models, and give buyers a site that respects how they actually shop.",
      },
      {
        label: "The move",
        title: "A name you can shout across a yard.",
        body: "Brovek is built to be said quickly. The V in the wordmark doubles as a check: the right tool, already decided. A light green carries the mark. The hex pattern follows how the tanks are made, from the 3D model to the cut to the weld. Starta, Stride, Matrix, Titan, and Forge each take a size and a temperament. brovek.com is laid out for people who hunt specs. Full 3D on every model is the next layer, already planned into the site.",
      },
      {
        label: "What held",
        title: "The brand showed up where the buying happens.",
        body: "The launch put Brovek in front of the trades it serves, with the people who use the tanks and the people who approve the purchase. The name, the stripe, and the model names now travel together, from the brochure to the product line.",
      },
    ],
    quote: {
      text: "From developing the Brovek name to designing a visual identity that communicates trust and durability, every step was intentional and strategic.",
      attribution: "Josiah Waldner, Intec Steelworx",
    },
    href: "https://brovek.com/",
    hrefLabel: "Visit brovek.com",
    image: {
      src: "/work/brovek-lineup.webp",
      alt: "Five Brovek fuel tanks in a row: Starta 60, Forge 90, Stride 180, Matrix 270, and Titan 480.",
      width: 960,
      height: 768,
    },
    secondary: {
      src: "/work/brovek-brochure.webp",
      alt: "Brovek brochure cover with the tank lineup and the line Fueling grit, powering progress.",
      width: 612,
      height: 792,
    },
    plate: "photo",
  },
  {
    slug: "skylight",
    index: "03",
    name: "Skylight Ventures",
    client: "Peter Unrau",
    place: "Peace River, Alberta",
    yearNote: "First identity, first website",
    disciplines: ["Identity", "Website", "Workwear", "Job-site graphics"],
    summary:
      "Nearly twenty years of building, and nothing to point at. The mark reads as an S, a house, a skylight, and a set of trusses.",
    beats: [
      {
        label: "Situation",
        title: "Twenty years of jobs, and nothing a new client could find.",
        body: "Skylight Ventures is a family contracting firm Peter Unrau started in 2006. Homes, shops, commercial renovations, and Peter on the work. When the project came in, there was no logo, no site, and no system a new client could find before the first call.",
      },
      {
        label: "The move",
        title: "One mark, from a favicon to a trailer.",
        body: "The geometric S is also a house, a skylight, and the trusses under a roof. It had to survive at the size of a browser icon and at the size of a wrap. The palette is a burnt orange with a deep slate. From there the identity went onto the website, cards, workwear, hard hats, and trailer graphics, so the job site advertises the company while the crew is on it.",
      },
      {
        label: "What held",
        title: "The trucks and the site use the same mark.",
        body: "skylightventures.ca is the public record. The trucks and the clothing carry the same geometry. The firm can take on the next contract without starting the identity over.",
      },
    ],
    href: "https://skylightventures.ca/",
    hrefLabel: "Visit skylightventures.ca",
    image: {
      src: "/work/skylight-herrit.webp",
      alt: "A red house with a steep gable roof and a dark front door, the kind of residential work Skylight Ventures builds.",
      width: 1600,
      height: 1200,
    },
    mark: {
      src: "/work/skylight-logo.svg",
      alt: "Skylight Ventures wordmark and geometric S",
    },
    plate: "photo",
  },
  {
    slug: "framebuilt",
    index: "04",
    name: "FrameBuilt",
    client: "Justin Warkentin",
    place: "Timber frame & engineered wood",
    yearNote: "Name, mark, and site presence",
    disciplines: ["Naming", "Identity", "Signage", "Merchandise"],
    summary:
      "A specialist in timber frame and engineered wood, named and marked so it would not be read as a commodity framing crew.",
    beats: [
      {
        label: "Situation",
        title: "Easy to mistake for ordinary framing.",
        body: "FrameBuilt builds with timber frame and engineered wood, for homes and commercial work, including hybrid structures for architects, developers, and owners. In a market full of stick framing and steel, the company was at risk of being priced and hired like a general crew.",
      },
      {
        label: "The move",
        title: "Name the specialty, then put it on the work.",
        body: "The engagement covered the brand name, the identity, signage, merchandise, and the concept that holds them together. The aim was a presence that reads as engineered timber: precise, visible structure, not a hard-hat clip-art mark. The identity has to work on a sign and on a shirt before it ever works on a slide.",
      },
      {
        label: "What held",
        title: "The timber work is recognizable before the bid.",
        body: "The public record of the project is the positioning and the system around it. Justin’s note on the studio site is brief and plain: professional, easy to deal with, and a recommendation. The brand’s job is the longer one: to make the timber work recognizable before the bid.",
      },
    ],
    plate: "timber",
  },
] as const satisfies readonly Study[];

export const roster = [
  {
    name: "Natures Knoll",
    scope: "Identity, strategy, website, voice, signage, merchandise",
  },
  {
    name: "Avion",
    scope: "Identity, strategy, website, voice, brochure, merchandise",
  },
  {
    name: "Nexus Smartphone",
    scope: "Website, identity, strategy, voice, and messaging",
  },
  {
    name: "Revival Builders",
    scope: "Identity and brand collateral",
  },
  {
    name: "WoodCo Builders",
    scope: "Listed with the builder brands",
  },
] as const satisfies readonly RosterEntry[];
