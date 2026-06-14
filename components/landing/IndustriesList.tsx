"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries } from "@/lib/data/industries";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hover index — rows fill with gradient on hover while a preview card
 * chases the cursor. On touch, details render inline.
 */
export default function IndustriesList() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const px = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
        const py = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          px(e.clientX + 24);
          py(e.clientY - 140);
        };
        section.addEventListener("mousemove", onMove, { passive: true });
        return () => section.removeEventListener("mousemove", onMove);
      }
    );
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        section.querySelectorAll(".ind-row"),
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  const current = active === null ? null : industries[active];

  return (
    <section
      ref={sectionRef}
      id="industries"
      data-bg="#0a0716"
      className="relative py-32 md:py-44"
      onMouseLeave={() => setActive(null)}
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow mb-4">Industries</p>
        <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Fluent in your audience&apos;s{" "}
          <span className="font-serif-accent text-gradient-cool">language.</span>
        </h2>

        <div className="mt-16 border-t border-white/10">
          {industries.map((industry, i) => (
            <div
              key={industry.title}
              className="ind-row group relative border-b border-white/10"
              onMouseEnter={() => setActive(i)}
            >
              <div className="flex items-baseline gap-6 py-6 transition-[padding] duration-500 group-hover:pl-6 md:py-8">
                <span className="font-display text-sm text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative font-display text-3xl font-bold tracking-tight uppercase md:text-6xl">
                  <span className="text-outline-faint">{industry.title}</span>
                  <span
                    aria-hidden
                    className="text-gradient absolute inset-0 transition-[clip-path] duration-500 ease-out"
                    style={{
                      clipPath:
                        active === i ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    }}
                  >
                    {industry.title}
                  </span>
                </div>
                <span className="ml-auto hidden text-2xl md:block" aria-hidden>
                  {industry.icon}
                </span>
              </div>

              {/* Inline details for touch / small screens */}
              <div className="flex gap-4 pb-6 md:hidden">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes="80px"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted">{industry.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {industry.clients.map((client) => (
                      <span
                        key={client}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted"
                      >
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor-chasing preview card (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden w-80 overflow-hidden rounded-2xl border border-white/12 bg-surface-2/95 backdrop-blur-xl transition-opacity duration-300 md:block ${
          current ? "opacity-100" : "opacity-0"
        }`}
      >
        {current && (
          <>
            <div className="relative h-40">
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="320px"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/30 to-transparent" />
              <div className="absolute bottom-3 left-5 flex items-center gap-3">
                <span className="text-2xl">{current.icon}</span>
                <p className="font-display font-bold text-ink">{current.title}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-muted">
                {current.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.clients.map((client) => (
                  <span
                    key={client}
                    className="rounded-full bg-white/6 px-3 py-1 text-xs text-ink/80"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
