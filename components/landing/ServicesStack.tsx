"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/data/services";
import svcDigital from "@/public/images/svc-digital.webp";
import svcMeme from "@/public/images/svc-meme.webp";
import svcInfluencer from "@/public/images/svc-influencer.webp";
import svcSocial from "@/public/images/svc-social.webp";
import svcVideo from "@/public/images/svc-video.webp";
import svcPerf from "@/public/images/svc-perf.webp";
import svcBrand from "@/public/images/svc-brand.webp";
import svcUgc from "@/public/images/svc-ugc.webp";
import svcWeb from "@/public/images/svc-web.webp";

gsap.registerPlugin(ScrollTrigger);

const IMAGES: Record<string, { src: StaticImageData; alt: string }> = {
  "digital-marketing": {
    src: svcDigital,
    alt: "Campaign analytics charts on a laptop",
  },
  "meme-marketing": {
    src: svcMeme,
    alt: "Creator laughing while reviewing content on a tablet",
  },
  "influencer-marketing": {
    src: svcInfluencer,
    alt: "Creator portrait lit in neon blue",
  },
  "social-media": {
    src: svcSocial,
    alt: "Social team managing channels together",
  },
  "video-production": {
    src: svcVideo,
    alt: "Videographer operating a cinema rig under neon light",
  },
  "performance-marketing": {
    src: svcPerf,
    alt: "Performance dashboard with conversion graphs",
  },
  branding: {
    src: svcBrand,
    alt: "Brand color palettes and identity boards",
  },
  "ugc-content": {
    src: svcUgc,
    alt: "Writer drafting content by hand",
  },
  "web-development": {
    src: svcWeb,
    alt: "Code for a marketing site on screen",
  },
};

const THEMES = [
  { bg: "#170d2e", glow: "from-violet/35", accent: "text-violet" },
  { bg: "#0c1430", glow: "from-blue/35", accent: "text-blue" },
  { bg: "#250b22", glow: "from-magenta/30", accent: "text-magenta" },
  { bg: "#261107", glow: "from-orange/30", accent: "text-orange" },
  { bg: "#07222b", glow: "from-cyan/25", accent: "text-cyan" },
  { bg: "#14102f", glow: "from-violet/30", accent: "text-violet" },
  { bg: "#220d18", glow: "from-magenta/25", accent: "text-magenta" },
  { bg: "#0a1837", glow: "from-blue/30", accent: "text-blue" },
  { bg: "#241307", glow: "from-orange/25", accent: "text-orange" },
];

/** Pinned deck — each service card slides up and buries the previous one. */
export default function ServicesStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const frame = stack.querySelector<HTMLElement>(".svc-frame");
      const cardsBox = stack.querySelector<HTMLElement>(".svc-cards");
      const cards = gsap.utils.toArray<HTMLElement>(".svc-card", stack);
      if (!frame || !cardsBox || cards.length < 2) return;

      stack.dataset.animated = "true";
      frame.classList.add("h-svh", "flex", "flex-col", "justify-center");
      cardsBox.classList.add("h-[64vh]", "max-h-[640px]", "min-h-[460px]");

      gsap.set(cards.slice(1), { yPercent: 125, rotation: 5 });

      const count = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: () => `+=${(count - 1) * 620}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // tick at each transition's midpoint so the counter matches the
            // card visually in front (cards ease in with power2.out, arriving
            // before the timeline hits the integer mark — floor lagged by ~1)
            const idx = Math.min(
              count,
              Math.round(self.progress * (count - 1)) + 1
            );
            if (indexRef.current)
              indexRef.current.textContent = String(idx).padStart(2, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      cards.slice(1).forEach((card, i) => {
        tl.to(card, { yPercent: 0, rotation: 0, duration: 1, ease: "power2.out" }, i)
          .to(
            cards[i],
            {
              scale: 0.92,
              rotation: i % 2 ? 2.5 : -2.5,
              filter: "brightness(0.4)",
              duration: 1,
              ease: "power2.out",
            },
            i
          );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-bg="#0d0618"
      className="relative"
    >
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 text-center md:pt-44">
        <p className="eyebrow mb-5">What we do</p>
        <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Nine weapons.{" "}
          <span className="font-serif-accent text-gradient">One arsenal.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted md:text-lg">
          Keep scrolling — every card is a discipline we&apos;ve sharpened on
          campaigns the whole internet saw.
        </p>
      </div>

      <div ref={stackRef} className="pin-stack relative mx-auto max-w-5xl px-6 pb-24">
        <div className="svc-frame">
          <div className="svc-cards relative w-full">
            {services.map((service, i) => {
              const theme = THEMES[i % THEMES.length];
              return (
                <article
                  key={service.slug}
                  className="pin-item svc-card mb-6 overflow-hidden rounded-[2rem] border border-white/10 will-change-transform"
                  style={{ backgroundColor: theme.bg }}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-br via-transparent to-transparent ${theme.glow}`}
                  />
                  <p
                    aria-hidden
                    className="pointer-events-none absolute -top-10 right-2 font-display text-[11rem] leading-none font-bold text-white/5 select-none md:text-[15rem]"
                  >
                    {service.index}
                  </p>
                  <div className="relative flex h-full flex-col gap-5 p-6 md:flex-row md:gap-10 md:p-12">
                    {/* Service visual */}
                    <div className="group/img relative h-28 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 md:order-2 md:h-auto md:w-[36%] md:rounded-2xl">
                      <Image
                        src={IMAGES[service.slug].src}
                        alt={IMAGES[service.slug].alt}
                        fill
                        sizes="(min-width: 768px) 340px, 90vw"
                        placeholder="blur"
                        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 md:order-1">
                      <div>
                        <p className="eyebrow">
                          <span className={theme.accent}>{service.index} — Service</span>
                        </p>
                        <h3 className="mt-3 max-w-xl font-display text-2xl font-bold text-ink md:mt-4 md:text-4xl lg:text-5xl">
                          {service.title}
                        </h3>
                        <p className="font-serif-accent text-gradient mt-2 text-xl md:mt-3 md:text-3xl">
                          {service.hook}
                        </p>
                      </div>
                      <div>
                        <p className="max-w-2xl text-sm leading-relaxed text-ink/75 md:text-lg">
                          {service.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2 md:mt-6">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-ink/85 md:px-4 md:py-2 md:text-sm"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 hidden items-center gap-5 md:flex">
            <p className="font-display text-sm font-bold text-muted">
              <span ref={indexRef} className="text-ink">01</span> / {String(services.length).padStart(2, "0")}
            </p>
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <div
                ref={barRef}
                className="h-full origin-left bg-gradient-to-r from-violet via-magenta to-orange"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
