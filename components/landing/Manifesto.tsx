"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/ui/Marquee";
import { site } from "@/lib/data/site";
import imgBoardroom from "@/public/images/about-boardroom.webp";
import imgWhiteboard from "@/public/images/about-whiteboard.webp";
import imgOffice from "@/public/images/about-office.webp";

gsap.registerPlugin(ScrollTrigger);

type Segment = { text: string; accent?: boolean };

const MANIFESTO: Segment[] = [
  { text: "We are XpertBuzzVibe — the " },
  { text: "viral engine", accent: true },
  { text: " behind India's loudest launches. Primetime OTT premieres, TVF originals, EdTech empires, chart-topping albums. We fuse " },
  { text: "internet culture", accent: true },
  { text: " with ruthless data to turn brands into " },
  { text: "conversations", accent: true },
  { text: " nobody can scroll past." },
];

const VALUES = [
  "Culturally Native",
  "Data-Driven, Always",
  "A Network Money Can't Buy",
  "End-to-End Ownership",
  "Zero Boring Briefs",
];

const STACK = [
  { src: imgBoardroom, alt: "Strategy session in the boardroom" },
  { src: imgWhiteboard, alt: "Campaign planning on a whiteboard" },
  { src: imgOffice, alt: "Inside the XpertBuzzVibe studio" },
];

/** Scroll-lit manifesto with a fanning stack of studio photographs. */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".m-word"),
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: el.querySelector(".m-copy"),
            start: "top 72%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        }
      );

      // photo stack fans open as it enters
      const imgs = gsap.utils.toArray<HTMLElement>(".m-stack-img", el);
      if (imgs.length) {
        gsap.set(imgs, { xPercent: -50, yPercent: -50 });
        gsap.fromTo(
          imgs,
          { y: (i: number) => 60 + i * 30, rotation: 0, opacity: 0, scale: 0.92 },
          {
            y: (i: number) => [-42, 0, 44][i] ?? 0,
            x: (i: number) => [-52, 8, 56][i] ?? 0,
            rotation: (i: number) => [-9, 3, 11][i] ?? 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".m-stack",
              start: "top 80%",
              end: "center 42%",
              scrub: 0.8,
            },
          }
        );
      }

      gsap.fromTo(
        ".m-meta",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".m-meta-row", start: "top 85%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      data-bg="#0d0618"
      className="relative overflow-hidden py-36 md:py-48"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[7fr_5fr] lg:items-center">
          <div>
            <p className="eyebrow mb-10">The Manifesto</p>
            <p className="m-copy font-display text-3xl leading-[1.25] font-medium text-ink md:text-[2.6rem] md:leading-[1.2]">
              {MANIFESTO.map((segment, si) =>
                segment.text.split(" ").map((word, wi) =>
                  word === "" ? null : (
                    <span
                      key={`${si}-${wi}`}
                      className={`m-word inline-block whitespace-pre ${
                        segment.accent
                          ? "font-serif-accent text-gradient text-[1.18em]"
                          : ""
                      }`}
                    >
                      {word}{" "}
                    </span>
                  )
                )
              )}
            </p>
          </div>

          {/* Layered photo stack (desktop) */}
          <div className="m-stack relative hidden h-[520px] lg:block">
            {STACK.map((photo) => (
              <div
                key={photo.alt}
                className="m-stack-img absolute top-1/2 left-1/2 w-[68%] overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/50"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 0px"
                    placeholder="blur"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Photo strip (mobile) */}
          <div className="flex gap-3 lg:hidden">
            {STACK.map((photo) => (
              <div
                key={photo.alt}
                className="relative h-36 flex-1 overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="33vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="m-meta-row mt-20 grid gap-6 md:grid-cols-3">
          <div className="m-meta glass rounded-2xl p-7">
            <p className="eyebrow mb-3 !text-violet">Mission</p>
            <p className="font-display text-lg leading-snug font-semibold text-ink">
              Make every brand we touch a part of internet culture — measurably,
              repeatably, unforgettably.
            </p>
          </div>
          <div className="m-meta glass rounded-2xl p-7">
            <p className="eyebrow mb-3 !text-magenta">Vision</p>
            <p className="font-display text-lg leading-snug font-semibold text-ink">
              To be the agency the world calls when it needs the internet to care.
            </p>
          </div>
          <div className="m-meta glass rounded-2xl p-7">
            <p className="eyebrow mb-3 !text-orange">Base</p>
            {site.offices.map((office) => (
              <p key={office.city} className="font-display text-lg font-semibold text-ink">
                {office.city}{" "}
                <span className="text-sm font-normal text-muted">{office.label}</span>
              </p>
            ))}
            <p className="mt-2 text-sm text-muted">
              Campaigns everywhere the internet lives.
            </p>
          </div>
        </div>
      </div>

      <Marquee
        items={VALUES}
        duration="28s"
        className="mt-24 border-y border-white/8 py-6"
        itemClassName="font-display text-xl font-semibold text-muted md:text-2xl"
      />
    </section>
  );
}
