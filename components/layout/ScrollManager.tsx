"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Owns scroll position across navigation so Lenis + pinned ScrollTriggers stay
 * consistent:
 *  - refresh / first load  → start at the top (clean, repeatable cinematic start)
 *  - back from a case study → land on the Work section once the pins have laid out
 *
 * Native scroll restoration is disabled because it applies the saved position
 * before the pins add their spacer height, which drops you above the section.
 */
export default function ScrollManager() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const from = prev.current;
    prev.current = pathname;

    const jump = (y: number) => {
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };

    // Returning to the landing page from a case study → restore to the Work
    // section after the pinned layout has settled (pins grow the document).
    if (pathname === "/" && from?.startsWith("/work/")) {
      let tries = 0;
      let raf = 0;
      let timer: ReturnType<typeof setTimeout>;
      const settle = () => {
        ScrollTrigger.refresh();
        const el = document.getElementById("work");
        if (el) jump(el.getBoundingClientRect().top + window.scrollY);
        if (++tries < 5) timer = setTimeout(() => (raf = requestAnimationFrame(settle)), 100);
      };
      raf = requestAnimationFrame(settle);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }

    // First load / refresh / any other entry → start at the top.
    jump(0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname]);

  return null;
}
