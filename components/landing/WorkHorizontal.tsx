"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/lib/data/case-studies";
import type { BrandAssets } from "@/lib/brand-assets";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  /** Real client assets detected server-side (public/brands/<slug>/). */
  brandAssets?: Record<string, BrandAssets>;
};

/**
 * Pinned horizontal gallery of branded case-study plates. Each card carries
 * the client's identity: real logo/key-art when available, otherwise a
 * typographic brand plate in the client's colors.
 */
export default function WorkHorizontal({ brandAssets = {} }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      track.classList.add("!overflow-visible", "w-max");

      const distance = () => track.scrollWidth - window.innerWidth;
      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".wh-card", track).forEach((card) => {
        const plate = card.querySelector(".wh-plate");
        const inner = card.querySelector(".wh-inner");
        const big = card.querySelector(".wh-big");

        if (plate) {
          gsap.fromTo(
            plate,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left 100%",
                end: "left 55%",
                scrub: true,
              },
            }
          );
        }
        if (inner) {
          gsap.fromTo(
            inner,
            { x: 70 },
            {
              x: -70,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
        if (big) {
          gsap.fromTo(
            big,
            { xPercent: 14 },
            {
              xPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      data-bg="#120714"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden py-20 md:h-svh md:py-0"
    >
      <div className="mx-auto mb-10 w-full max-w-7xl px-6 md:mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Campaigns that{" "}
              <span className="font-serif-accent text-gradient">broke</span> the
              internet.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">
            Drag your scroll wheel — the gallery moves sideways. Every card is a
            full case study.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:snap-none md:gap-7 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pr-[12vw] md:pb-0"
      >
        {caseStudies.map((study) => {
          const assets = brandAssets[study.slug];
          return (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              data-cursor="View case"
              className="wh-card group relative flex h-[58vh] w-[85vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-7 md:h-[62vh] md:w-[540px] md:p-10"
              style={{
                background: `linear-gradient(150deg, ${study.brand.from}, ${study.brand.to})`,
              }}
            >
              {/* Brand plate (clip-wipes open as it travels) */}
              <div aria-hidden className="wh-plate absolute inset-0 overflow-hidden">
                {assets?.keyArt ? (
                  <>
                    <Image
                      src={assets.keyArt}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 540px, 85vw"
                      className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute -top-1/3 -right-1/4 h-[120%] w-[120%] rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background: `radial-gradient(circle, ${study.brand.accent}, transparent 65%)`,
                      }}
                    />
                    <p className="wh-big absolute -bottom-4 left-0 font-display text-[9rem] leading-none font-bold whitespace-nowrap text-white/5 select-none">
                      {study.brand.mark}
                    </p>
                  </>
                )}
              </div>

              {/* Brand identity + project */}
              <div className="wh-inner relative will-change-transform">
                <div className="flex items-center justify-between gap-3">
                  {assets?.logo ? (
                    <span className="relative h-10 w-32">
                      <Image
                        src={assets.logo}
                        alt={`${study.client} logo`}
                        fill
                        sizes="128px"
                        className="object-contain object-left"
                      />
                    </span>
                  ) : (
                    <span
                      className="rounded-xl border px-4 py-2 font-display text-base font-bold tracking-tight text-ink"
                      style={{
                        borderColor: `${study.brand.accent}66`,
                        background: `${study.brand.accent}1a`,
                      }}
                    >
                      {study.brand.mark}
                    </span>
                  )}
                  <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] text-muted">
                    {study.category}
                  </span>
                </div>

                <p
                  className="mt-8 font-display text-4xl leading-[0.95] font-bold tracking-tight transition-[letter-spacing] duration-500 group-hover:tracking-normal md:text-5xl"
                  style={{ color: study.brand.accent }}
                >
                  {study.brand.showTitle}
                </p>
                <p className="font-serif-accent mt-3 text-xl text-ink/85 md:text-2xl">
                  {study.brand.tag}
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {study.title}
                </p>
              </div>

              <div className="wh-inner relative flex items-end justify-between will-change-transform">
                <div>
                  <p className="font-display text-5xl font-bold text-ink md:text-6xl">
                    {study.headlineMetric.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{study.headlineMetric.label}</p>
                </div>
                <span className="glass flex size-12 items-center justify-center rounded-full text-lg transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </div>
            </Link>
          );
        })}

        <div className="flex h-[58vh] w-[70vw] shrink-0 snap-center items-center justify-center md:h-[62vh] md:w-[420px]">
          <p className="max-w-[16ch] text-center font-display text-3xl font-bold text-ink md:text-4xl">
            The next slot is{" "}
            <span className="font-serif-accent text-gradient">yours.</span>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 hidden w-full max-w-7xl px-6 md:block">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-magenta via-orange to-cyan"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
