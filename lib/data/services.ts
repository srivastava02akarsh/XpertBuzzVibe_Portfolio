export type Service = {
  slug: string;
  title: string;
  hook: string;
  description: string;
  deliverables: string[];
  index: string;
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    title: "360° Digital Marketing",
    hook: "Clicks that convert.",
    description:
      "Full-funnel digital campaigns across every platform that matters — strategy, multi-channel execution and relentless ROI optimization, all under one roof.",
    deliverables: [
      "Campaign strategy & planning",
      "Multi-channel execution",
      "YouTube & Instagram growth management",
      "ROI tracking & optimization",
    ],
    index: "01",
  },
  {
    slug: "meme-marketing",
    title: "Meme & Viral Marketing",
    hook: "Laugh your way to virality.",
    description:
      "Our signature weapon. We turn brands into internet culture with meme-driven campaigns that trend #1 — the same playbook that powered Scam 1992 and TVF's biggest series.",
    deliverables: [
      "Meme campaign strategy",
      "Premium meme & Bollywood page network",
      "Twitter / X seeding",
      "Trend-jacking & cultural moments",
    ],
    index: "02",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    hook: "Hype that hits different.",
    description:
      "From memefluencers to finance creators, we match brands with voices their audience actually trusts — identification, negotiation and end-to-end campaign coordination.",
    deliverables: [
      "Creator identification & vetting",
      "Partnership management",
      "Campaign coordination & briefs",
      "Performance reporting",
    ],
    index: "03",
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    hook: "No ghosting, just growth.",
    description:
      "Always-on content calendars, community management and analytics that compound. We grew client engagement by an average of 85% — and kept it growing.",
    deliverables: [
      "Content calendars & publishing",
      "Community management",
      "Platform growth optimization",
      "Monthly performance analytics",
    ],
    index: "04",
  },
  {
    slug: "video-production",
    title: "Video Production & Content",
    hook: "Stories built to be shared.",
    description:
      "Concept to final cut — professional video production, edits and platform-native content engineered for watch time and shareability.",
    deliverables: [
      "Concept development & scripting",
      "Professional production",
      "Post-production & edits",
      "Platform-native formats",
    ],
    index: "05",
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    hook: "Every rupee accountable.",
    description:
      "Paid media that pays for itself. Precision-targeted campaigns across Meta, Google and programmatic — 200K+ conversions delivered and counting.",
    deliverables: [
      "Paid social & search campaigns",
      "Audience & funnel architecture",
      "Creative testing at scale",
      "Conversion rate optimization",
    ],
    index: "06",
  },
  {
    slug: "branding",
    title: "Strategic & Visual Branding",
    hook: "Be unmistakable.",
    description:
      "Positioning, visual identity and brand guidelines that make you impossible to scroll past — and impossible to confuse with anyone else.",
    deliverables: [
      "Brand positioning & strategy",
      "Visual identity design",
      "Brand guidelines",
      "Launch & rollout support",
    ],
    index: "07",
  },
  {
    slug: "ugc-content",
    title: "UGC & Content Marketing",
    hook: "Real people, real impact.",
    description:
      "Words that work, visuals that wow. User-generated content programs and editorial engines that build trust no ad budget can buy.",
    deliverables: [
      "UGC creator programs",
      "Content strategy & production",
      "Copywriting & storytelling",
      "Distribution & amplification",
    ],
    index: "08",
  },
  {
    slug: "web-development",
    title: "Web Development",
    hook: "Your 24/7 best salesperson.",
    description:
      "High-converting, lightning-fast websites and landing pages designed to turn campaign traffic into pipeline.",
    deliverables: [
      "Marketing websites & landing pages",
      "Conversion-focused UX",
      "Performance & SEO foundations",
      "Analytics integration",
    ],
    index: "09",
  },
];
