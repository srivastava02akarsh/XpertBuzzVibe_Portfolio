"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/ui/Counter";

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  {
    value: 1,
    suffix: "B+",
    label: "Total Reach",
    sub: "across every major platform",
    gradient: "from-violet to-magenta",
  },
  {
    value: 200,
    suffix: "K+",
    label: "Conversions",
    sub: "driven through client funnels",
    gradient: "from-blue to-cyan",
  },
  {
    value: 70,
    suffix: "+",
    label: "Viral Campaigns",
    sub: "engineered end to end",
    gradient: "from-magenta to-orange",
  },
  {
    value: 96,
    suffix: "%",
    label: "Client Retention",
    sub: "partners who never left",
    gradient: "from-orange to-violet",
  },
];

/** Editorial big-type stats wall with alternating slide-ins and parallax. */
export default function StatsWall() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".sw-row", el).forEach((row, i) => {
        gsap.fromTo(
          row.querySelector(".sw-num"),
          { x: i % 2 === 0 ? "-14vw" : "14vw", opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          }
        );
        gsap.fromTo(
          row.querySelector(".sw-line"),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.inOut",
            transformOrigin: i % 2 === 0 ? "left center" : "right center",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          row.querySelector(".sw-meta"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          }
        );
      });

      // giant background word drifts upward as the section scrolls
      gsap.fromTo(
        ".sw-bgword",
        { yPercent: 35 },
        {
          yPercent: -35,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="results"
      data-bg="#051019"
      className="relative overflow-hidden py-32 md:py-44"
    >
      <p
        aria-hidden
        className="sw-bgword pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[34vw] font-bold whitespace-nowrap text-outline-faint select-none"
      >
        IMPACT
      </p>

      <div className="relative mx-auto max-w-7xl px-6">
        <p className="eyebrow mb-4">The receipts</p>
        <h2 className="max-w-xl font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
          Numbers we&apos;d put on a{" "}
          <span className="font-serif-accent text-gradient-cool">billboard.</span>
        </h2>

        <div className="mt-20">
          {ROWS.map((stat, i) => (
            <div key={stat.label} className="sw-row relative py-10 md:py-14">
              <div className="sw-line absolute top-0 left-0 h-px w-full bg-gradient-to-r from-white/25 to-transparent" />
              <div
                className={`flex flex-col gap-4 md:items-end md:justify-between ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="sw-num will-change-transform">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className={`bg-gradient-to-r font-display text-[19vw] leading-[0.85] font-bold md:text-[11vw] ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </div>
                <div className={`sw-meta pb-2 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <p className="font-display text-2xl font-bold text-ink md:text-3xl">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-muted">{stat.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <span className="glass rounded-full px-6 py-3 text-sm text-ink">
            <span className="font-display font-bold text-gradient">25+</span> major brands
          </span>
          <span className="glass rounded-full px-6 py-3 text-sm text-ink">
            <span className="font-display font-bold text-gradient">4,000+</span>{" "}
            deliverables in a single 10-day sprint
          </span>
          <span className="glass rounded-full px-6 py-3 text-sm text-ink">
            <span className="font-display font-bold text-gradient">100%</span> promised
            results delivered
          </span>
        </div>
      </div>
    </section>
  );
}
