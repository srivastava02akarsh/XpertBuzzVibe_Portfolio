import Link from "next/link";
import { site } from "@/lib/data/site";

const WORDMARK = "XPERTBUZZVIBE";
const HOVER_COLORS = [
  "hover:text-violet",
  "hover:text-magenta",
  "hover:text-cyan",
  "hover:text-orange",
];

const links = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#industries", label: "Industries" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        {/* Giant interactive wordmark */}
        <Link
          href="/#top"
          aria-label="XpertBuzzVibe — back to top"
          className="block w-full text-center"
        >
          <span
            aria-hidden
            className="flex w-full items-baseline justify-between font-display leading-none font-bold text-ink select-none"
            style={{ fontSize: "clamp(2rem, 7vw, 8rem)" }}
          >
            {WORDMARK.split("").map((ch, i) => (
              <span
                key={i}
                className={`inline-block transition-transform duration-300 ease-out hover:-translate-y-3 ${
                  HOVER_COLORS[i % HOVER_COLORS.length]
                }`}
              >
                {ch}
              </span>
            ))}
          </span>
        </Link>

        <div className="mt-14 flex flex-col items-start justify-between gap-8 border-t border-white/8 pt-8 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-5 py-2 text-sm text-muted transition-colors hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 text-xs text-muted/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>We don&apos;t chase trends. We start them.</p>
        </div>
      </div>
    </footer>
  );
}
