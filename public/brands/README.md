# Client brand assets — drop-in folder

The work section renders a **typographic brand plate** (client colors + wordmark
+ project title) for every case study by default. To upgrade a card to real
client branding, drop the files below into the matching folder — they are
detected automatically at build time (`lib/brand-assets.ts`), no code changes
needed. Re-run `npm run build` (or restart `npm run dev`) after adding files.

## File naming

Per case-study folder, two optional files:

| File | Used for | Recommended |
|---|---|---|
| `logo.svg` (or `.png` / `.webp`) | Client logo on the card + case-study page | SVG or transparent PNG, white/light variant, min 256px wide |
| `key-art.jpg` (or `.png` / `.webp`) | Card background + case-study hero | Show poster / campaign creative, ≥1200×800, dark-friendly |

## Assets needed (currently missing — all cards use typographic plates)

- `scam-1992/` — **SonyLIV logo** + **Scam 1992 key art / poster**
- `scam-2003/` — **SonyLIV logo** + **Scam 2003 key art / poster**
- `tvf-yeh-meri-family/` — **TVF logo** + **Yeh Meri Family key art**
- `tvf-amber-girls-school/` — **TVF logo** + **Amber Girls School key art**
- `bold-care/` — **Bold Care logo** + a campaign creative
- `music-album-launch/` — label logo + album artwork (client is anonymized as
  "Indie Label"; rename the mark in `lib/data/case-studies.ts` if it can be named)
- `amazon-minitv/` — **Amazon miniTV logo** + an original's key art

> ⚠️ These are third-party trademarks/copyrighted artworks. Source them from the
> client relationship (brand kits, campaign archives) — they were deliberately
> not scraped from the web.
