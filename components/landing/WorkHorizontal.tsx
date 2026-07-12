"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/lib/data/case-studies";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned horizontal gallery of campaign posters. Each card is a vertical show
 * poster badged with its view count; it clip-wipes open as it travels sideways.
 */
export default function WorkHorizontal() {
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
            <p className="eyebrow mb-4">Success stories</p>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Campaigns that{" "}
              <span className="font-serif-accent text-gradient">broke</span> the
              internet.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted md:block">
            Drag your scroll wheel — the gallery moves sideways. Every poster is
            a full case study.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:snap-none md:gap-7 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pb-0"
      >
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            data-cursor="View case"
            className="wh-card group relative flex aspect-[4/5] h-[62vh] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-white/10"
            style={{
              background: `linear-gradient(150deg, ${study.brand.from}, ${study.brand.to})`,
            }}
          >
            {/* Poster (clip-wipes open as it travels) */}
            <div aria-hidden className="wh-plate absolute inset-0 overflow-hidden">
              <Image
                src={study.poster}
                alt={study.posterAlt}
                fill
                sizes="(min-width: 768px) 50vh, 78vw"
                placeholder="blur"
                loading="eager"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
            </div>

            {/* Platform chip */}
            <div className="absolute inset-x-0 top-0 z-10 p-5">
              <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                {study.brand.mark}
              </span>
            </div>

            {/* Views badge + open affordance */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-5">
              <div>
                <p
                  className="font-display text-4xl leading-none font-bold drop-shadow-lg md:text-5xl"
                  style={{ color: study.brand.accent }}
                >
                  {study.views}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold tracking-[0.28em] text-white/75 uppercase">
                  Views
                </p>
              </div>
              <span className="glass flex size-11 items-center justify-center rounded-full text-lg text-white transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </div>
          </Link>
        ))}

        <div className="flex aspect-[4/5] h-[62vh] shrink-0 snap-center items-center justify-center rounded-[1.75rem] border border-dashed border-white/15">
          <p className="max-w-[16ch] px-6 text-center font-display text-3xl font-bold text-ink md:text-4xl">
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
