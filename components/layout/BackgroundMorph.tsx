"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fixed backdrop whose color morphs as sections with [data-bg] cross
 * the viewport center — cinematic color journey through the page.
 */
export default function BackgroundMorph() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sections = gsap.utils.toArray<HTMLElement>("[data-bg]");
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(el, {
                backgroundColor: section.dataset.bg,
                duration: 1.1,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: "#07060f" }}
    />
  );
}
