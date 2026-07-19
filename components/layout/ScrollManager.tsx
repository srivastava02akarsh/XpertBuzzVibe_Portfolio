"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Owns scroll position across navigation so Lenis + pinned ScrollTriggers stay
 * consistent:
 *  - refresh / first load  → start at the top (clean, repeatable cinematic start)
 *  - back from a case study → land on the Work section
 *
 * Native scroll restoration is disabled because it applies the saved position
 * before the pins add their spacer height, which drops you above the section.
 *
 * Coming back from a case study, the pinned sections (hero, services deck) only
 * add their height a few frames after mount, so the Work section's final offset
 * isn't known immediately — the restore settles over a few frames. The overlay
 * is raised synchronously (in a layout effect, before paint, via direct DOM so
 * there's no React-state lag) to hide that settle, then faded out once the Work
 * position locks in — so the intermediate jump-to-top is never visible.
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useIsoLayoutEffect(() => {
    const from = prev.current;
    prev.current = pathname;
    const mask = maskRef.current;

    const showMask = () => {
      if (!mask) return;
      mask.style.transition = "none"; // cover instantly, no fade-in
      mask.style.visibility = "visible";
      mask.style.opacity = "1";
    };
    const hideMask = () => {
      if (!mask) return;
      mask.style.transition = "opacity 280ms ease";
      mask.style.opacity = "0";
      window.setTimeout(() => {
        if (mask.style.opacity === "0") mask.style.visibility = "hidden";
      }, 320);
    };
    const jump = (y: number) => {
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    };

    // Returning to the landing page from a case study → land on the Work
    // section once the pinned layout settles (hidden behind the overlay).
    if (pathname === "/" && from?.startsWith("/work/")) {
      showMask();
      let tries = 0;
      let lastY = -1;
      let stable = 0;
      let raf = 0;
      let timer: ReturnType<typeof setTimeout>;

      const settle = () => {
        ScrollTrigger.refresh();
        const el = document.getElementById("work");
        if (el) {
          const y = Math.round(el.getBoundingClientRect().top + window.scrollY);
          jump(y);
          if (y === lastY) stable++;
          else {
            stable = 0;
            lastY = y;
          }
        }
        if (stable < 2 && ++tries < 12) {
          timer = setTimeout(() => (raf = requestAnimationFrame(settle)), 60);
        } else {
          hideMask();
        }
      };
      raf = requestAnimationFrame(settle);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        hideMask();
      };
    }

    // First load / refresh / any other entry → start at the top.
    jump(0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return (
    <div
      ref={maskRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] bg-bg"
      style={{ opacity: 0, visibility: "hidden" }}
    />
  );
}
