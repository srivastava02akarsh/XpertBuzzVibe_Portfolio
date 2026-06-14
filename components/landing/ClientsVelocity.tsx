"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/ui/Marquee";
import { clients } from "@/lib/data/clients";

gsap.registerPlugin(ScrollTrigger);

/** Giant client-name rows that skew with scroll velocity. */
export default function ClientsVelocity() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = el.querySelectorAll(".cv-row");
      const clamp = gsap.utils.clamp(-9, 9);
      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / 320);
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
      className="relative overflow-hidden py-28 md:py-36"
      aria-label="Brands we have worked with"
    >
      <p className="eyebrow mb-14 text-center">
        Trusted by the brands everyone&apos;s talking about
      </p>

      <div className="cv-row will-change-transform">
        <Marquee
          items={clients.slice(0, 9)}
          duration="46s"
          itemClassName="font-display text-6xl font-bold text-outline-faint uppercase md:text-8xl"
        />
      </div>
      <div className="cv-row mt-4 will-change-transform">
        <Marquee
          items={clients.slice(9, 18)}
          reverse
          duration="52s"
          itemClassName="font-display text-6xl font-bold text-gradient uppercase md:text-8xl"
        />
      </div>
      <div className="cv-row mt-4 will-change-transform">
        <Marquee
          items={clients.slice(18)}
          duration="48s"
          itemClassName="font-display text-6xl font-bold text-outline-faint uppercase md:text-8xl"
        />
      </div>
    </section>
  );
}
