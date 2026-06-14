# XpertBuzzVibe — Single-Page Cinematic Agency Experience

A vibrant, heavily animated, image-rich single-page storytelling site for **XpertBuzzVibe**, merging all content and credibility from the legacy XpertBuzzVibe site and DBMC (dbmc.co.in) into one premium brand experience. Awwwards-style: pinned scroll scenes, a letter-exploding hero with floating campaign snapshots, aurora backgrounds, custom cursor, photographic case-study plates.

## Imagery & branding

21 royalty-free Unsplash photos live locally in `public/images/` (pre-optimized WebP, fetched at display size), serving the manifesto stack, service panels and industry previews via `next/image` static imports — responsive `srcset`, lazy loading, blur-up placeholders. Every image was visually reviewed; none contain third-party brand marks. The hero is purely typographic — no imagery competes with the wordmark.

**The work section uses client branding, not stock photos.** Each case-study card renders a typographic brand plate (client wordmark, project title, brand color field) defined in `lib/data/case-studies.ts`. Real client assets (logos, key art) dropped into `public/brands/<slug>/` are auto-detected at build time (`lib/brand-assets.ts`) and upgrade the cards/heroes automatically — see `public/brands/README.md` for the exact files needed. Testimonial avatars are intentionally monogram-based (no stock faces attached to real client names).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Stack

- **Next.js 16** (App Router, TypeScript) + React 19
- **Tailwind CSS v4** — design tokens in `app/globals.css` (`@theme`)
- **GSAP + ScrollTrigger / ScrambleText / MotionPath** — pinned scrub scenes, letter explosion, SVG comet path
- **Lenis** — smooth scrolling (synced to ScrollTrigger in `components/layout/SmoothScroll.tsx`, instance on `window.__lenis` for anchor nav)
- **Motion (Framer Motion)** — magnetic elements, mobile menu, micro-interactions
- Fonts: Space Grotesk (display) + Instrument Serif italic (accents) + Inter (body)

## Architecture

**One page** (`/`) tells the whole story; only case-study details are separate routes (`/work/[slug]`, 8 pages). Old routes (`/about`, `/services`, `/industries`, `/contact`, `/work`) 308-redirect to their landing anchors (see `next.config.ts`).

Scroll journey (components in `components/landing/`):

| # | Scene | Signature animation |
|---|---|---|
| 1 | `HeroCinematic` | XPERT/BUZZ/VIBE fills the viewport; letters animate in independently, then scatter/rotate/scale away on scroll (320vh pinned scrub) + per-letter mouse parallax + scramble subtitle |
| 2 | `Manifesto` | Words ignite one-by-one with scroll (scrub stagger), serif italic accents |
| 3 | `ClientsVelocity` | Giant outlined/gradient client rows that skew with scroll velocity |
| 4 | `StatsWall` | Editorial mega-numbers slide in alternating sides; parallax "IMPACT" backdrop |
| 5 | `ServicesStack` | Pinned card deck — 9 service cards bury each other with rotation + progress counter |
| 6 | `WorkHorizontal` | Pinned horizontal gallery of branded case-study plates; clip-wipe reveals via `containerAnimation`, inner parallax |
| 7 | `IndustriesList` | Hover index with gradient clip fill + cursor-chasing preview card |
| 8 | `ProcessPath` | Scroll-drawn neon SVG path with a MotionPath comet; steps ignite |
| 9 | `TestimonialsScrub` | Pinned, scroll-controlled quote reel in serif italic |
| 10 | `ContactSection` + mega footer | Aurora finale, animated orbit element, lead form, letter-hover wordmark |

Global systems: `BackgroundMorph` (page background color morphs per section via `data-bg`), `Cursor` (custom dot + labelled ring), `ScrollProgress`, `Aurora`, film-grain overlay. All motion is gated behind `prefers-reduced-motion` — static layouts remain complete without JS animation.

## Design system

- Canvas `#07060F` morphing through deep violet/blue/magenta/teal per section
- Palette: electric purple `#A855F7` · neon blue `#4D7CFF` · cyan `#22E4FF` · magenta `#FF3DBE` · orange `#FF7A3D`
- Utilities: `.text-gradient(-animated/-cool)`, `.text-outline(-faint)`, `.glass`, `.eyebrow`, `.font-serif-accent`, aurora keyframes
- Gotcha: `background-clip: text` does not paint through transformed children — apply gradient classes to the innermost span (see `HeroCinematic`)

## Content

All copy/data lives in typed files under `lib/data/` — services, case studies, clients, testimonials, industries, stats, process, site contact info. Client roster and case studies are merged from DBMC's portfolio (TVF, Sony LIV, Amazon MiniTV, Samsung, etc.) per brand-consolidation decision; client names render as styled text, no logo assets bundled.

## Contact form

`components/sections/contact/ContactForm.tsx` posts to `app/api/contact/route.ts`, which currently logs the inquiry. Wire it to Resend / Formspree / your CRM by replacing the `console.log`.
