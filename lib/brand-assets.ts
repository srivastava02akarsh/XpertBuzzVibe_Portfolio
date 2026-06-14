import fs from "node:fs";
import path from "node:path";

/**
 * Server-only: resolves real client brand assets dropped into
 * public/brands/<slug>/. Components fall back to typographic brand plates
 * when an asset is absent. See public/brands/README.md for the file list.
 */
export type BrandAssets = {
  logo: string | null; // public/brands/<slug>/logo.(svg|png|webp|jpg)
  keyArt: string | null; // public/brands/<slug>/key-art.(jpg|png|webp)
};

const EXTS = [".svg", ".png", ".webp", ".jpg", ".jpeg"];

function find(slug: string, base: string): string | null {
  for (const ext of EXTS) {
    const file = path.join(process.cwd(), "public", "brands", slug, base + ext);
    if (fs.existsSync(file)) return `/brands/${slug}/${base}${ext}`;
  }
  return null;
}

export function getBrandAssets(slug: string): BrandAssets {
  return { logo: find(slug, "logo"), keyArt: find(slug, "key-art") };
}

export function getAllBrandAssets(slugs: string[]): Record<string, BrandAssets> {
  return Object.fromEntries(slugs.map((slug) => [slug, getBrandAssets(slug)]));
}
