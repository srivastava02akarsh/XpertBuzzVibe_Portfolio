"use client";

import Link from "next/link";
import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-violet to-magenta text-white shadow-[0_0_40px_-8px_rgba(139,92,246,0.7)] hover:shadow-[0_0_60px_-8px_rgba(217,70,239,0.8)]"
      : "glass text-ink hover:border-violet/50";

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={`${base} ${styles} ${className}`}>
          {inner}
        </Link>
      ) : (
        <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
