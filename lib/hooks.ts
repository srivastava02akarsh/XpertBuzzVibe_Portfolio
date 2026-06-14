import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect on the client, useEffect during SSR (avoids the warning). */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Smooth-scroll to an element, preferring the Lenis instance when present. */
export function scrollToSection(selector: string, offset = -72) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(selector, { offset, duration: 1.4 });
    return;
  }
  const el = document.querySelector(selector);
  el?.scrollIntoView({ behavior: "smooth" });
}
