/**
 * Case-study brand identity. Cards render a typographic "brand plate" from
 * these colors/marks by default; drop real client assets into
 * public/brands/<slug>/ (logo.svg|png, key-art.jpg|png|webp) and they are
 * picked up automatically — see public/brands/README.md.
 */
export type CaseStudyBrand = {
  mark: string; // client wordmark rendered as styled text
  showTitle: string; // the project/show name — the visual hero of the card
  tag: string; // one-line campaign flavor
  from: string; // brand background gradient start
  to: string; // brand background gradient end
  accent: string; // brand accent for the show title and chips
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: "Entertainment & OTT" | "Music" | "Health & Wellness";
  headlineMetric: { value: string; label: string };
  summary: string;
  challenge: string;
  strategy: string;
  results: string[];
  services: string[];
  brand: CaseStudyBrand;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "scam-1992",
    client: "SonyLIV · Scam 1992",
    title: "4,000+ Deliverables. 10 Days. One Cultural Phenomenon.",
    category: "Entertainment & OTT",
    headlineMetric: { value: "4,000+", label: "Deliverables in 10 days" },
    summary:
      "The campaign sprint behind one of India's most-loved shows ever.",
    challenge:
      "Translate a brilliant but slow-burn finance drama into mass-market hype — fast enough to matter in launch week.",
    strategy:
      "A 10-day blitz across 4,000+ deliverables: memes, edits, creator collabs and seeded conversations engineered to make 'Risk hai toh ishq hai' inescapable.",
    results: [
      "4,000+ deliverables shipped in 10 days",
      "100% positive internet sentiment captured for the show",
      "Became one of India's highest-rated series of all time",
    ],
    services: ["Meme Marketing", "Twitter Seeding", "Content Creation"],
    brand: {
      mark: "SonyLIV",
      showTitle: "SCAM 1992",
      tag: "Risk hai toh ishq hai.",
      from: "#1c1204",
      to: "#3a2606",
      accent: "#f5b942",
    },
  },
  {
    slug: "scam-2003",
    client: "SonyLIV · Scam 2003",
    title: "Finance Influencers Meet Meme Culture",
    category: "Entertainment & OTT",
    headlineMetric: { value: "#1", label: "Trending OTT content" },
    summary:
      "A meme-driven sequel campaign with finance creators at its core.",
    challenge:
      "Follow up a legendary predecessor without riding on nostalgia alone.",
    strategy:
      "We recruited finance influencers and meme pages into a coordinated narrative — explainers, satire and trend-jacks that made the stamp-paper scam a national conversation.",
    results: [
      "100% of promised results delivered",
      "#1 trending OTT content across social media",
      "Finance-creator collabs drove a new audience segment",
    ],
    services: ["Influencer Marketing", "Meme Marketing"],
    brand: {
      mark: "SonyLIV",
      showTitle: "SCAM 2003",
      tag: "The stamp-paper story.",
      from: "#04211b",
      to: "#0a3a2d",
      accent: "#34d9a8",
    },
  },
  {
    slug: "tvf-yeh-meri-family",
    client: "TVF",
    title: "Turning Nostalgia into Binge Behavior",
    category: "Entertainment & OTT",
    headlineMetric: { value: "100%", label: "Promised results delivered" },
    summary:
      "Meme-driven collaboration that made a web series the internet's comfort watch.",
    challenge:
      "Reignite attention for a beloved TVF series in a crowded streaming calendar.",
    strategy:
      "Entertainment influencers and meme collaborations built around 90s-kid nostalgia — every post engineered to end with 'time to rewatch'.",
    results: [
      "Top-trending entertainment topic during the campaign",
      "Measurable lift in watch hours and binge sessions",
      "100% of promised results delivered",
    ],
    services: ["Meme Marketing", "Influencer Marketing"],
    brand: {
      mark: "TVF",
      showTitle: "YEH MERI FAMILY",
      tag: "The comfort rewatch.",
      from: "#2a0e06",
      to: "#47150a",
      accent: "#ff7a3d",
    },
  },
  {
    slug: "tvf-amber-girls-school",
    client: "TVF · Amber Girls School",
    title: "Launching a New Series into the Trend Charts",
    category: "Entertainment & OTT",
    headlineMetric: { value: "100%", label: "Targets achieved" },
    summary:
      "Influencer partnerships and meme energy for a brand-new IP.",
    challenge:
      "No existing fanbase, no nostalgia to lean on — build hype for a new show from zero.",
    strategy:
      "Meme-driven storytelling introduced the characters before launch; influencer partnerships turned first-episode reactions into shareable moments.",
    results: [
      "100% of promised results delivered",
      "Sustained trending conversations through launch window",
      "Strong day-one viewership for a debut IP",
    ],
    services: ["Influencer Marketing", "Meme Marketing"],
    brand: {
      mark: "TVF",
      showTitle: "AMBER GIRLS SCHOOL",
      tag: "A debut IP, launched loud.",
      from: "#270a1a",
      to: "#3e0f2a",
      accent: "#ff5da2",
    },
  },
  {
    slug: "bold-care",
    client: "Bold Care",
    title: "Making Men's Health Impossible to Ignore",
    category: "Health & Wellness",
    headlineMetric: { value: "100%", label: "Awareness goals achieved" },
    summary:
      "Humor-led influencer marketing for a category nobody talks about.",
    challenge:
      "Men's sexual health is a conversation most audiences scroll past. Bold Care needed awareness without awkwardness.",
    strategy:
      "We weaponized humor — comedians and meme pages delivered the message with a laugh, making the taboo shareable and the brand likable.",
    results: [
      "100% of awareness goals achieved",
      "Viral trends drove millions of organic impressions",
      "Category conversation shifted from taboo to talkable",
    ],
    services: ["Influencer Marketing", "Meme Marketing", "UGC"],
    brand: {
      mark: "BOLD CARE",
      showTitle: "BOLD CARE",
      tag: "Wellness, minus the taboo.",
      from: "#091026",
      to: "#101d44",
      accent: "#5b8cff",
    },
  },
  {
    slug: "music-album-launch",
    client: "Music Label",
    title: "Engineering a Chart-Topping Album Launch",
    category: "Music",
    headlineMetric: { value: "Millions", label: "Organic interactions" },
    summary:
      "Trend-aligned campaign that pushed an album to the top of streaming charts.",
    challenge:
      "Break a new album through playlist noise and algorithm walls.",
    strategy:
      "We aligned the album's themes with live trending topics, seeded hooks through music recommendation pages and edit communities, and let fans carry the chorus.",
    results: [
      "100% of engagement targets met",
      "Millions of organic interactions",
      "Album trended across streaming platforms",
    ],
    services: ["Meme Marketing", "Content Marketing", "Twitter Seeding"],
    brand: {
      mark: "INDIE LABEL",
      showTitle: "THE ALBUM DROP",
      tag: "Charts, not luck.",
      from: "#190a2c",
      to: "#2a1048",
      accent: "#b87bff",
    },
  },
  {
    slug: "amazon-minitv",
    client: "Amazon MiniTV",
    title: "Multi-Platform Hype for Free-to-Watch Originals",
    category: "Entertainment & OTT",
    headlineMetric: { value: "#1", label: "Trending discussions" },
    summary:
      "Memefluencer campaigns that lifted OTT rankings across launches.",
    challenge:
      "Drive installs and watch time for a free OTT platform competing against paid giants.",
    strategy:
      "Multi-platform campaigns with memefluencers turned every show drop into a trending discussion — repeatable, measurable, compounding.",
    results: [
      "100% of promised results delivered",
      "#1 trending discussions during launches",
      "Measurable lift in OTT platform rankings",
    ],
    services: ["Influencer Marketing", "Meme Marketing", "Video Production"],
    brand: {
      mark: "amazon miniTV",
      showTitle: "MINITV ORIGINALS",
      tag: "Free-to-watch, impossible to miss.",
      from: "#04141d",
      to: "#082636",
      accent: "#22e4ff",
    },
  },
];
