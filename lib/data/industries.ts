import type { StaticImageData } from "next/image";
import imgOtt from "@/public/images/ind-ott.webp";
import imgMusic from "@/public/images/ind-music.webp";
import imgEdtech from "@/public/images/ind-edtech.webp";
import imgEcom from "@/public/images/ind-ecom.webp";
import imgTech from "@/public/images/ind-tech.webp";
import imgHealth from "@/public/images/ind-health.webp";
import imgFintech from "@/public/images/ind-fintech.webp";
import imgGaming from "@/public/images/ind-gaming.webp";
import imgFood from "@/public/images/ind-food.webp";

export type Industry = {
  title: string;
  description: string;
  clients: string[];
  icon: string;
  image: StaticImageData;
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    title: "Entertainment & OTT",
    description:
      "Launch campaigns that make shows trend #1 — from TVF originals to SonyLIV blockbusters and primetime OTT premieres.",
    clients: ["TVF", "Sony LIV", "Amazon MiniTV", "MX Player"],
    icon: "🎬",
    image: imgOtt,
    imageAlt: "Rows of red cinema seats in a dark theatre",
  },
  {
    title: "Music & Streaming",
    description:
      "Album launches, artist campaigns and fan communities engineered for the charts.",
    clients: ["Sikh Music", "Music labels", "Streaming platforms"],
    icon: "🎵",
    image: imgMusic,
    imageAlt: "Concert crowd with raised hands under stage lights",
  },
  {
    title: "EdTech & Education",
    description:
      "Enrollment-driving campaigns for India's biggest coaching and learning brands.",
    clients: ["Vedantu", "Motion Education", "Mentors Eduserv", "Nexttoppers"],
    icon: "🎓",
    image: imgEdtech,
    imageAlt: "Students collaborating over laptops in a study session",
  },
  {
    title: "E-commerce",
    description:
      "Conversion-focused campaigns across marketplaces and D2C storefronts.",
    clients: ["Amazon Prime", "D2C storefronts"],
    icon: "🛒",
    image: imgEcom,
    imageAlt: "Shopper paying online with a card and laptop",
  },
  {
    title: "Tech & Electronics",
    description:
      "Launch hype and community buzz for the devices everyone's comparing.",
    clients: ["Samsung", "Realme"],
    icon: "📱",
    image: imgTech,
    imageAlt: "Macro shot of a glowing circuit board",
  },
  {
    title: "Health & Wellness",
    description:
      "Humor-led, stigma-breaking campaigns that make hard categories talkable.",
    clients: ["Bold Care"],
    icon: "💊",
    image: imgHealth,
    imageAlt: "Doctor reviewing results on a tablet",
  },
  {
    title: "Fintech",
    description:
      "Trust-building creator campaigns for money apps in a skeptical market.",
    clients: ["Money apps", "Trading platforms"],
    icon: "📈",
    image: imgFintech,
    imageAlt: "Hands holding a bank card while paying on a laptop",
  },
  {
    title: "Gaming",
    description: "Community-native campaigns that speak fluent gamer.",
    clients: ["Dream11", "Free Fire"],
    icon: "🎮",
    image: imgGaming,
    imageAlt: "Game controller glowing under neon light",
  },
  {
    title: "Food & Lifestyle",
    description:
      "Culture-first storytelling for brands people live with every day.",
    clients: ["Borosil", "D2C lifestyle brands"],
    icon: "✨",
    image: imgFood,
    imageAlt: "Vibrant food bowl styled for a lifestyle shoot",
  },
];
