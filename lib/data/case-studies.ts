import type { StaticImageData } from "next/image";

import posterYmf from "@/public/images/work-yeh-meri-family.webp";
import posterSisterhood from "@/public/images/work-sisterhood.webp";
import posterAmber from "@/public/images/work-amber-girls-school.webp";
import posterJamna from "@/public/images/work-jamna-paar.webp";
import posterGutar from "@/public/images/work-gutar-gu.webp";
import posterHighway from "@/public/images/work-highway-love.webp";
import posterBadtameez from "@/public/images/work-badtameez-dil.webp";
import posterHalfCa from "@/public/images/work-half-ca.webp";
import posterLucky from "@/public/images/work-lucky-guy.webp";

/**
 * Case-study identity. Each card is a vertical show poster (the campaign's hero
 * visual) badged with its view count; the brand colors drive the accent and the
 * gradient backdrop on the detail page.
 */
export type CaseStudyBrand = {
  mark: string; // platform / brand chip (e.g. "amazon miniTV")
  showTitle: string; // the show name, used on the detail page
  tag: string; // one-line campaign flavor
  from: string; // detail-page gradient start
  to: string; // detail-page gradient end
  accent: string; // brand accent for titles + chips
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  poster: StaticImageData; // the show poster — the card's full-bleed visual
  posterAlt: string;
  views: string; // headline view count, e.g. "170M+"
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
    slug: "yeh-meri-family",
    client: "TVF · Amazon miniTV",
    title: "1.22 Billion Views of Pure Nostalgia",
    category: "Entertainment & OTT",
    poster: posterYmf,
    posterAlt: "Yeh Meri Family show poster",
    views: "1.22B+",
    headlineMetric: { value: "1.22B+", label: "Views delivered" },
    summary:
      "We turned a 90s-kid memory into the internet's most-rewatched family saga.",
    challenge:
      "A gentle, slice-of-life series doesn't trend on its own. It needed an engine loud enough to cut through launch-week noise without ever losing its warmth.",
    strategy:
      "We mined the show's nostalgia for shareable hooks — summer-holiday memes, sibling-rivalry reels, and creator collabs that made every viewer want to tag their own family. The content did the inviting; the audience did the spreading.",
    results: [
      "1.22B+ views across the campaign",
      "Top-trending entertainment conversation through the launch window",
      "Nostalgia hooks turned passive scrollers into active sharers",
    ],
    services: ["Meme Marketing", "Influencer Seeding", "Reels & Shorts"],
    brand: {
      mark: "TVF",
      showTitle: "YEH MERI FAMILY",
      tag: "The comfort rewatch.",
      from: "#2a1606",
      to: "#45260a",
      accent: "#ffb24d",
    },
  },
  {
    slug: "sisterhood",
    client: "Amazon miniTV",
    title: "A Billion Views for the Group-Chat Generation",
    category: "Entertainment & OTT",
    poster: posterSisterhood,
    posterAlt: "Sisterhood show poster",
    views: "1.09B+",
    headlineMetric: { value: "1.09B+", label: "Views delivered" },
    summary:
      "Launching a brand-new ensemble and making it feel like everyone was already watching.",
    challenge:
      "A debut ensemble with no built-in fandom had to feel like the show your whole friend group was already obsessed with — from day one.",
    strategy:
      "We built the campaign around friendship moments people recognise: 'tag your girl gang' reels, character-personality memes, and influencer duos who turned the show into a conversation about their own squads.",
    results: [
      "1.09B+ views generated",
      "Debut IP trended with no nostalgia to lean on",
      "Friendship-themed hooks drove mass organic sharing",
    ],
    services: ["Influencer Marketing", "Meme Marketing", "UGC"],
    brand: {
      mark: "amazon miniTV",
      showTitle: "SISTERHOOD",
      tag: "Your group chat, on screen.",
      from: "#2a0a1f",
      to: "#431234",
      accent: "#ff6fb5",
    },
  },
  {
    slug: "amber-girls-school",
    client: "TVF",
    title: "711M Views for a Debut with Zero Fanbase",
    category: "Entertainment & OTT",
    poster: posterAmber,
    posterAlt: "Amber Girls School show poster",
    views: "711M+",
    headlineMetric: { value: "711M+", label: "Views delivered" },
    summary:
      "Introducing a new school-drama IP and making first-episode reactions impossible to scroll past.",
    challenge:
      "No nostalgia, no existing audience. We had to introduce a fresh school-drama and make its premiere feel like an event everyone was reacting to.",
    strategy:
      "We seeded the characters before launch through meme storytelling, then turned the premiere into a reaction moment with student-life creators and relatable classroom humour.",
    results: [
      "711M+ views across the launch",
      "Sustained trending conversation through the premiere window",
      "Strong day-one viewership for a brand-new IP",
    ],
    services: ["Meme Marketing", "Influencer Seeding", "Content Creation"],
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
    slug: "jamna-paar",
    client: "Amazon miniTV",
    title: "602M Views, One Side of the River at a Time",
    category: "Entertainment & OTT",
    poster: posterJamna,
    posterAlt: "Jamna Paar show poster",
    views: "602M+",
    headlineMetric: { value: "602M+", label: "Views delivered" },
    summary:
      "Giving a fresh urban-youth story a personality loud enough to trend.",
    challenge:
      "Cutting through a crowded slate meant giving a new urban-youth comedy a distinct identity people actually wanted to repeat.",
    strategy:
      "We leaned into the show's local flavour — neighbourhood humour, 'us vs them' memes, and city-creator collabs that turned the title into a running joke audiences wanted in on.",
    results: [
      "602M+ views delivered",
      "Local-flavour hooks drove regional virality",
      "Climbed platform trending charts during the run",
    ],
    services: ["Meme Marketing", "Influencer Marketing", "Reels & Shorts"],
    brand: {
      mark: "amazon miniTV",
      showTitle: "JAMNA PAAR",
      tag: "Two banks, one feed.",
      from: "#241006",
      to: "#3d1c08",
      accent: "#ff8a3d",
    },
  },
  {
    slug: "gutar-gu",
    client: "Amazon · MX Player",
    title: "220M Views of First-Love Butterflies",
    category: "Entertainment & OTT",
    poster: posterGutar,
    posterAlt: "Gutar Gu show poster",
    views: "220M+",
    headlineMetric: { value: "220M+", label: "Views delivered" },
    summary:
      "Reach for a tender teen-romance that felt like a crush, not a campaign.",
    challenge:
      "A tender teen-romance needed reach without losing its innocence — hype that felt like first-love butterflies, not a marketing push.",
    strategy:
      "We turned the show's first-love nostalgia into shareable moments — 'phone pe baat' memes, throwback-romance reels, and creators recreating their own teenage love stories.",
    results: [
      "220M+ views across the new-season push",
      "Romance-nostalgia hooks drove high save-and-share rates",
      "Trended through the launch window",
    ],
    services: ["Meme Marketing", "Influencer Seeding", "UGC"],
    brand: {
      mark: "amazon · MX Player",
      showTitle: "GUTAR GU",
      tag: "First love, fully online.",
      from: "#2a2306",
      to: "#45390a",
      accent: "#ffd23d",
    },
  },
  {
    slug: "highway-love",
    client: "Amazon · MX Player",
    title: "200M Views on the Open Road",
    category: "Entertainment & OTT",
    poster: posterHighway,
    posterAlt: "Highway Love show poster",
    views: "200M+",
    headlineMetric: { value: "200M+", label: "Views delivered" },
    summary:
      "Making a road-trip romance feel like appointment viewing.",
    challenge:
      "Launching a new season of a road-trip romance meant turning wanderlust into something audiences scheduled their week around.",
    strategy:
      "We packaged the show as a mood — travel-couple reels, 'who's driving' relationship memes, and creator road-trip content that carried the brand into every feed.",
    results: [
      "200M+ views delivered",
      "Travel-and-romance angle widened the audience",
      "Strong new-season open",
    ],
    services: ["Influencer Marketing", "Meme Marketing", "Reels & Shorts"],
    brand: {
      mark: "amazon · MX Player",
      showTitle: "HIGHWAY LOVE",
      tag: "Romance with a roadmap.",
      from: "#0a1a2e",
      to: "#143656",
      accent: "#f5c542",
    },
  },
  {
    slug: "badtameez-dil",
    client: "Amazon miniTV",
    title: "170M Views of Beautiful Chaos",
    category: "Entertainment & OTT",
    poster: posterBadtameez,
    posterAlt: "Badtameez Dil show poster",
    views: "170M+",
    headlineMetric: { value: "170M+", label: "Views delivered" },
    summary:
      "Making a free-to-watch original impossible to ignore against paid giants.",
    challenge:
      "A free-to-watch original had to out-shout paid-platform giants and still feel like the most talked-about show of the week.",
    strategy:
      "We turned the show's rebellious energy into a meme language of its own and let memefluencers run with it, pushing every drop into a trending discussion.",
    results: [
      "170M+ views across the campaign",
      "Top trending discussion during launch",
      "Drove installs and watch-time for a free OTT title",
    ],
    services: ["Meme Marketing", "Influencer Marketing", "Video Production"],
    brand: {
      mark: "amazon miniTV",
      showTitle: "BADTAMEEZ DIL",
      tag: "Beautifully out of control.",
      from: "#06231f",
      to: "#0a3a33",
      accent: "#2fd9c0",
    },
  },
  {
    slug: "half-ca",
    client: "TVF · Amazon miniTV",
    title: "150M Views: Accounts, Ambitions aur Attempts",
    category: "Entertainment & OTT",
    poster: posterHalfCa,
    posterAlt: "Half CA show poster",
    views: "150M+",
    headlineMetric: { value: "150M+", label: "Views delivered" },
    summary:
      "Turning the grind of a CA aspirant's life into a story the internet roots for.",
    challenge:
      "The daily grind of a CA aspirant isn't an obvious mass subject. We had to make the whole internet feel the stakes — and root for the underdog.",
    strategy:
      "We spoke straight to the student struggle: exam-stress memes, 'attempt' humour, and education-creator collabs that made aspirants feel seen and everyone else feel invested.",
    results: [
      "150M+ views generated",
      "Student-struggle hooks built a loyal aspirant audience",
      "Trended within the exam-prep community and beyond",
    ],
    services: ["Meme Marketing", "Influencer Seeding", "Content Marketing"],
    brand: {
      mark: "TVF",
      showTitle: "HALF CA",
      tag: "Accounts, ambitions, attempts.",
      from: "#04211b",
      to: "#0a3a2d",
      accent: "#34d9a8",
    },
  },
  {
    slug: "lucky-guy",
    client: "Amazon miniTV",
    title: "120M Views of Underdog Energy",
    category: "Entertainment & OTT",
    poster: posterLucky,
    posterAlt: "Lucky Guy show poster",
    views: "120M+",
    headlineMetric: { value: "120M+", label: "Views delivered" },
    summary:
      "Giving a small-town underdog comedy a launch as big as its heart.",
    challenge:
      "A small-town underdog comedy needed a launch big enough to match its charm — without a marquee name to lean on.",
    strategy:
      "We built around the everyman hero — 'main character' memes, small-town humour reels, and creators playing up the lovable-loser charm until the title became a vibe.",
    results: [
      "120M+ views delivered",
      "Underdog framing drove relatability and shares",
      "Trended through the launch window",
    ],
    services: ["Meme Marketing", "Influencer Marketing", "UGC"],
    brand: {
      mark: "amazon miniTV",
      showTitle: "LUCKY GUY",
      tag: "The underdog, everyone's hero.",
      from: "#0a1430",
      to: "#11224a",
      accent: "#7cc4ff",
    },
  },
];
