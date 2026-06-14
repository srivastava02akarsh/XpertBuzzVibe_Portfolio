"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

/** Pinned, scroll-controlled testimonial reel. */
export default function TestimonialsScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const frame = stack.querySelector<HTMLElement>(".ts-frame");
      const box = stack.querySelector<HTMLElement>(".ts-box");
      const quotes = gsap.utils.toArray<HTMLElement>(".ts-quote", stack);
      const dots = dotsRef.current
        ? Array.from(dotsRef.current.children)
        : [];
      if (!frame || !box || quotes.length < 2) return;

      stack.dataset.animated = "true";
      frame.classList.add("h-svh", "flex", "flex-col", "justify-center");
      box.classList.add("h-[58vh]", "min-h-[440px]");

      gsap.set(quotes.slice(1), { opacity: 0, yPercent: 22, rotation: 2 });

      const count = quotes.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: () => `+=${count * 560}`,
          pin: true,
          scrub: 0.7,
          onUpdate: (self) => {
            const idx = Math.min(
              count - 1,
              Math.floor(self.progress * count)
            );
            dots.forEach((dot, i) =>
              dot.classList.toggle("ts-dot-on", i === idx)
            );
          },
        },
      });

      quotes.forEach((quote, i) => {
        if (i > 0) {
          tl.fromTo(
            quote,
            { opacity: 0, yPercent: 22, rotation: 2 },
            { opacity: 1, yPercent: 0, rotation: 0, duration: 0.8, ease: "power2.out" },
            i * 2
          );
        }
        if (i < count - 1) {
          tl.to(
            quote,
            { opacity: 0, yPercent: -22, rotation: -2, duration: 0.7, ease: "power2.in" },
            i * 2 + 1.2
          );
        }
      });

      // huge background quote-mark drifts and spins slowly with the pin
      tl.fromTo(
        ".ts-mark",
        { rotation: -8, yPercent: 10 },
        { rotation: 8, yPercent: -10, duration: count * 2, ease: "none" },
        0
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-bg="#1a0a14"
      className="relative overflow-hidden"
    >
      <div ref={stackRef} className="pin-stack relative mx-auto max-w-5xl px-6 py-24 md:py-0">
        <div className="ts-frame relative">
          <p
            aria-hidden
            className="ts-mark pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif-accent text-[40rem] leading-none text-white/4 select-none"
          >
            &ldquo;
          </p>

          <p className="eyebrow relative mb-12 text-center">Client love</p>

          <div className="ts-box relative">
            {testimonials.map((t) => (
              <figure
                key={t.company}
                className="pin-item ts-quote mb-16 flex flex-col items-center justify-center text-center"
              >
                {t.metric && (
                  <p className="mb-8 inline-block rounded-full border border-white/12 bg-gradient-to-r from-violet/15 to-magenta/15 px-6 py-2.5 font-display text-sm font-bold text-gradient">
                    {t.metric}
                  </p>
                )}
                <blockquote className="font-serif-accent max-w-3xl text-3xl leading-snug text-ink md:text-5xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex flex-col items-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet via-magenta to-orange p-[2px]">
                    <span className="flex size-full items-center justify-center rounded-full bg-surface-2 font-display text-sm font-bold text-ink">
                      {t.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </span>
                  <p className="mt-4 font-display text-lg font-bold text-ink">{t.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {t.role} · {t.company}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div
            ref={dotsRef}
            className="relative mt-4 hidden justify-center gap-3 md:flex"
            aria-hidden
          >
            {testimonials.map((t, i) => (
              <span
                key={t.company}
                className={`h-1.5 w-8 rounded-full bg-white/15 transition-colors duration-300 ${
                  i === 0 ? "ts-dot-on" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
