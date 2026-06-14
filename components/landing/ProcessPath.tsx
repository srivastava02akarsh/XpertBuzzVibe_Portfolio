"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { processSteps } from "@/lib/data/process";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const PATH_D =
  "M 500 30 C 900 220, 100 330, 500 540 C 900 750, 100 850, 500 1060 C 900 1270, 100 1370, 500 1580 C 800 1740, 620 1860, 500 1960";

/**
 * Scroll-drawn SVG journey — a neon path inks itself down the section while
 * a glowing comet rides it; steps ignite as it passes.
 */
export default function ProcessPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!section || !path || !dot) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const scrollCfg = {
        trigger: section,
        start: "top 55%",
        end: "bottom 80%",
        scrub: 0.8,
      };

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: scrollCfg,
      });

      gsap.to(dot, {
        motionPath: { path, alignOrigin: [0.5, 0.5] },
        ease: "none",
        scrollTrigger: scrollCfg,
      });

      gsap.utils.toArray<HTMLElement>(".pp-step", section).forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 70, scale: 0.92, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 75%", once: true },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      data-bg="#07171c"
      className="relative overflow-hidden py-32 md:py-44"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="eyebrow mb-4">How we work</p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-ink md:text-6xl">
          Brief to{" "}
          <span className="font-serif-accent text-gradient">trending</span> in
          five moves.
        </h2>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl px-6">
        {/* Neon journey line */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1000 2000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="pp-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="35%" stopColor="#ff3dbe" />
              <stop offset="70%" stopColor="#22e4ff" />
              <stop offset="100%" stopColor="#ff7a3d" />
            </linearGradient>
            <filter id="pp-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="url(#pp-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#pp-glow)"
          />
          <circle ref={dotRef} r="9" fill="#fff" filter="url(#pp-glow)" />
        </svg>

        {/* Steps */}
        <div className="relative">
          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className={`flex min-h-[34vh] items-center py-10 ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="pp-step glass w-full max-w-md rounded-3xl p-8 md:p-10">
                <p className="font-display text-5xl font-bold text-gradient md:text-6xl">
                  {step.step}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
