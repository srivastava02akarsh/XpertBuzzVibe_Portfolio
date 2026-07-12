"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clients, type Client } from "@/lib/data/clients";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [clients.slice(0, 7), clients.slice(7)];

function Tile({ name, logo }: Client) {
  return (
    <div className="mx-3 shrink-0 md:mx-4">
      <div className="size-28 overflow-hidden rounded-[1.4rem] shadow-xl shadow-black/50 transition-transform duration-300 hover:-translate-y-1.5 md:size-36">
        <Image
          src={logo}
          alt={`${name} logo`}
          sizes="144px"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}

/** Brand-logo tiles scrolling in rows that skew with scroll velocity. */
export default function ClientsVelocity() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = el.querySelectorAll(".cv-row");
      const clamp = gsap.utils.clamp(-6, 6);
      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / 400);
          gsap.to(rows, {
            skewX: skew,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-bg="#07060f"
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Brands we have worked with"
    >
      <p className="eyebrow mb-14 text-center">
        Trusted by the brands everyone&apos;s talking about
      </p>

      <div className="space-y-6 md:space-y-8">
        {ROWS.map((row, r) => (
          <div key={r} className="cv-row will-change-transform">
            <div className="marquee-group overflow-hidden">
              <div
                className={`flex w-max ${r % 2 ? "animate-marquee-reverse" : "animate-marquee"}`}
                style={
                  { "--marquee-duration": r % 2 ? "40s" : "34s" } as React.CSSProperties
                }
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
                    {row.map((c) => (
                      <Tile key={`${copy}-${c.name}`} {...c} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
