import type { StaticImageData } from "next/image";

import amazonMinitv from "@/public/images/brands/amazon-minitv.png";
import sonyLiv from "@/public/images/brands/sony-liv.png";
import pw from "@/public/images/brands/pw.png";
import tvf from "@/public/images/brands/tvf.png";
import motionEducation from "@/public/images/brands/motion-education.png";
import mxPlayer from "@/public/images/brands/mx-player.png";
import mentorsEduserv from "@/public/images/brands/mentors-eduserv.png";
import vedantu from "@/public/images/brands/vedantu.png";
import allen from "@/public/images/brands/allen.png";
import altbalaji from "@/public/images/brands/altbalaji.png";
import nexttoppers from "@/public/images/brands/nexttoppers.png";
import realme from "@/public/images/brands/realme.png";
import oppo from "@/public/images/brands/oppo.png";
import sikhMusic from "@/public/images/brands/sikh-music.png";

export type Client = { name: string; logo: StaticImageData };

/**
 * Trusted-brand logos shown as chips in the marquee. Real logos were
 * auto-fetched; TVF, ALTBalaji, Mentors Eduserv and Sikh Music had no reliable
 * logo available and use gradient monogram chips instead — drop a real
 * public/images/brands/<slug>.png in to replace any of them.
 */
export const clients: Client[] = [
  { name: "Amazon miniTV", logo: amazonMinitv },
  { name: "Sony LIV", logo: sonyLiv },
  { name: "TVF", logo: tvf },
  { name: "PW", logo: pw },
  { name: "Motion Education", logo: motionEducation },
  { name: "MX Player", logo: mxPlayer },
  { name: "Mentors Eduserv", logo: mentorsEduserv },
  { name: "Vedantu", logo: vedantu },
  { name: "Allen", logo: allen },
  { name: "ALTBalaji", logo: altbalaji },
  { name: "NextToppers", logo: nexttoppers },
  { name: "Realme", logo: realme },
  { name: "Oppo", logo: oppo },
  { name: "Sikh Music", logo: sikhMusic },
];
