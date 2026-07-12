"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "@/components/ui/Magnetic";
import { scrollToSection } from "@/lib/hooks";
import logo from "@/public/images/logo.png";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "industries", label: "Industries" },
  { id: "process", label: "Process" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const onLanding = pathname === "/";

  // Hide the navbar over the cinematic hero; reveal once it's scrolled past.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const hero = onLanding ? document.getElementById("top") : null;
      if (!hero) {
        setVisible(true);
        return;
      }
      const threshold = hero.offsetHeight - window.innerHeight - 80;
      setVisible(y > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onLanding]);

  // scrollspy on the landing page
  useEffect(() => {
    if (!onLanding) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    links.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onLanding]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (onLanding) {
      e.preventDefault();
      scrollToSection(`#${id}`);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        } ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link
            href="/#top"
            onClick={go("top")}
            aria-label="XpertBuzzVibe — home"
            className="relative z-50 inline-flex items-center"
          >
            <Image
              src={logo}
              alt="XpertBuzzVibe"
              priority
              sizes="140px"
              className="h-9 w-auto md:h-10"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 md:flex ${
              scrolled ? "glass" : ""
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={go(link.id)}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  onLanding && active === link.id
                    ? "bg-white/10 text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic>
              <Link
                href="/#contact"
                onClick={go("contact")}
                className="rounded-full bg-gradient-to-r from-violet via-magenta to-orange px-6 py-2.5 font-display text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_-6px_rgba(255,61,190,0.8)]"
              >
                Start a Project
              </Link>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex size-11 items-center justify-center rounded-full glass md:hidden"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {[...links, { id: "contact", label: "Contact" }].map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 32, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.07 + i * 0.06,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/#${link.id}`}
                    onClick={go(link.id)}
                    className="group flex items-baseline gap-4 py-2.5"
                  >
                    <span className="font-display text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl font-bold tracking-tight text-ink transition-colors group-hover:text-gradient">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  href="/#contact"
                  onClick={go("contact")}
                  className="inline-block rounded-full bg-gradient-to-r from-violet via-magenta to-orange px-8 py-4 font-display font-semibold text-white"
                >
                  Start a Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
