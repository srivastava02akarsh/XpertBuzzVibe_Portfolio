"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Aurora from "@/components/ui/Aurora";
import ParticleField from "./ParticleField";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const ROWS: { word: string; className: string }[] = [
  { word: "XPERT", className: "text-ink" },
  { word: "BUZZ", className: "text-gradient-animated" },
  { word: "VIBE", className: "text-outline" },
];

const SUBTITLE = "India's viral marketing engine — TVF · SonyLIV · Amazon · Samsung";

/**
 * Cinematic opening: monumental wordmark fills the viewport, letters animate
 * in independently, then scroll scatters them into the void (pinned scrub).
 */
export default function HeroCinematic() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const letters = gsap.utils.toArray<HTMLElement>(".h-letter", section);
      const inners = gsap.utils.toArray<HTMLElement>(".h-letter-in", section);

      /* --- Entrance --- */
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from(letters, {
          yPercent: 130,
          opacity: 0,
          rotateX: -80,
          duration: 1.4,
          stagger: { each: 0.05, from: "random" },
        })
        .from(
          ".h-corner",
          { opacity: 0, y: 26, duration: 0.9, stagger: 0.1 },
          "-=0.8"
        )
        .to(
          ".h-subtitle",
          {
            duration: 1.8,
            scrambleText: {
              text: SUBTITLE,
              chars: "XPERTBUZZVIBE→×!",
              speed: 0.5,
            },
          },
          "-=1.0"
        );

      /* --- Scroll-driven explosion (pinned via CSS sticky) --- */
      const tl = gsap.timeline({
        defaults: { ease: "power2.in" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      letters.forEach((letter) => {
        const row = Number(letter.dataset.row);
        const bias = row === 0 ? -1 : row === 2 ? 1 : 0;
        tl.to(
          letter,
          {
            x: gsap.utils.random(-48, 48) + "vw",
            y:
              (bias === 0
                ? gsap.utils.random(-35, 35)
                : bias * gsap.utils.random(25, 70)) + "vh",
            rotation: gsap.utils.random(-200, 200),
            scale: gsap.utils.random(1.5, 3.2),
            opacity: 0,
            duration: 0.5,
          },
          gsap.utils.random(0, 0.12)
        );
      });

      tl.to(".h-corner, .h-subtitle", { opacity: 0, y: -30, duration: 0.12 }, 0)
        .fromTo(
          ".h-phrase",
          { opacity: 0, scale: 0.8, yPercent: 16 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 0.22, ease: "power2.out" },
          0.42
        )
        .to(
          ".h-phrase",
          { opacity: 0, scale: 1.12, yPercent: -16, duration: 0.18, ease: "power2.in" },
          0.8
        );

      /* --- Per-letter mouse parallax (on inner spans) --- */
      const setters = inners.map((inner) => ({
        x: gsap.quickTo(inner, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(inner, "y", { duration: 0.7, ease: "power3" }),
        depth: gsap.utils.random(0.4, 1.6),
      }));
      const onMouse = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * 34 * s.depth);
          s.y(ny * 22 * s.depth);
        });
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMouse);
        intro.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-bg="#07060f"
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <Aurora intensity="bold" />
        <ParticleField />

        {/* Monumental wordmark */}
        <h1
          className="relative z-10 mx-auto w-full max-w-[94vw] font-display font-bold tracking-tight select-none"
          style={{ perspective: "1200px" }}
          aria-label="XpertBuzzVibe"
        >
          {ROWS.map((row, r) => (
            <span
              key={row.word}
              aria-hidden
              className="flex w-full items-baseline justify-between leading-[0.84]"
              style={{ fontSize: "clamp(4.5rem, 21.5vw, 24rem)" }}
            >
              {row.word.split("").map((ch, i) => (
                <span
                  key={`${r}-${i}`}
                  data-row={r}
                  className="h-letter inline-block will-change-transform"
                >
                  {/* row style lives on the innermost span — background-clip:text
                      does not paint through composited (transformed) children */}
                  <span className={`h-letter-in inline-block ${row.className}`}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle (scrambles in) */}
        <p className="h-subtitle relative z-10 mx-auto mt-8 max-w-[94vw] text-center font-display text-xs tracking-[0.3em] text-muted uppercase md:text-sm">
          {SUBTITLE}
        </p>

        {/* Mid-scroll phrase */}
        <div className="h-phrase pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 opacity-0">
          <p className="max-w-5xl text-center font-display text-4xl font-bold leading-tight text-ink md:text-7xl">
            We don&apos;t chase trends.{" "}
            <span className="font-serif-accent text-gradient">we start them.</span>
          </p>
        </div>

        {/* Bottom frame: scroll cue + rotating badge */}
        <div className="h-corner absolute bottom-8 left-6 z-10 flex items-center gap-4 md:left-10">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
            <span className="animate-scroll-dot block size-1.5 rounded-full bg-cyan" />
          </div>
          <p className="text-xs tracking-[0.25em] text-muted uppercase">Scroll</p>
        </div>
        <div className="h-corner absolute right-6 bottom-8 z-10 hidden md:right-10 md:block">
          <svg viewBox="0 0 100 100" className="animate-spin-slow size-24">
            <defs>
              <path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="fill-muted font-display text-[10.5px] tracking-[0.18em] uppercase">
              <textPath href="#circ">1B+ reach · 70+ viral campaigns ·</textPath>
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
