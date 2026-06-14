import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { caseStudies } from "@/lib/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...caseStudies.map((study) => ({
      url: `${site.url}/work/${study.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
