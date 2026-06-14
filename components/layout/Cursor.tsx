"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor: instant dot + lerped ring. Grows over interactive elements;
 * elements with [data-cursor] expand the ring into a labelled pill.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || reduced || !dot || !ring || !label) return;

    document.documentElement.classList.add("cursor-on");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setHover = (state: "default" | "link" | "label", text = "") => {
      if (state === "label") {
        label.textContent = text;
        gsap.to(ring, {
          width: 88,
          height: 88,
          backgroundColor: "rgba(247,245,255,0.95)",
          borderColor: "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.25, delay: 0.08 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (state === "link") {
        gsap.to(ring, {
          width: 56,
          height: 56,
          backgroundColor: "rgba(247,245,255,0.12)",
          borderColor: "rgba(247,245,255,0.5)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, scale: 0.5, duration: 0.2 });
      } else {
        gsap.to(ring, {
          width: 36,
          height: 36,
          backgroundColor: "rgba(247,245,255,0)",
          borderColor: "rgba(247,245,255,0.35)",
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setHover("label", labelled.dataset.cursor || "View");
        return;
      }
      if (target.closest("a, button, input, textarea, [role='button']")) {
        setHover("link");
        return;
      }
      setHover("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] size-2 rounded-full bg-ink mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] flex size-9 items-center justify-center rounded-full border border-white/35"
      >
        <span
          ref={labelRef}
          className="font-display text-[10px] font-bold tracking-[0.2em] text-bg uppercase opacity-0"
        />
      </div>
    </>
  );
}
