import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data/case-studies";
import TextReveal from "@/components/ui/TextReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CtaSection from "@/components/sections/CtaSection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.client} — Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      {/* Branded hero */}
      <section
        className="relative overflow-hidden pt-44 pb-20"
        style={{
          background: `linear-gradient(170deg, ${study.brand.from} 0%, ${study.brand.to} 45%, var(--bg) 100%)`,
        }}
      >
        <p
          aria-hidden
          className="pointer-events-none absolute top-28 -right-[2%] font-display text-[13vw] leading-none font-bold whitespace-nowrap text-white/4 select-none"
        >
          {study.brand.showTitle}
        </p>

        <div className="relative mx-auto max-w-6xl px-6">
          <Link
            href="/#work"
            className="mb-8 inline-block text-sm text-muted transition-colors hover:text-ink"
          >
            ← All work
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className="rounded-xl border px-4 py-2 font-display text-base font-bold tracking-tight text-ink"
                  style={{
                    borderColor: `${study.brand.accent}66`,
                    background: `${study.brand.accent}1a`,
                  }}
                >
                  {study.brand.mark}
                </span>
                <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-muted">
                  {study.category}
                </span>
              </div>

              <p
                className="mt-8 font-display text-5xl leading-[0.95] font-bold tracking-tight md:text-7xl"
                style={{ color: study.brand.accent }}
              >
                {study.brand.showTitle}
              </p>
              <p className="font-serif-accent mt-3 text-2xl text-ink/85 md:text-3xl">
                {study.brand.tag}
              </p>
              <TextReveal
                as="h1"
                text={study.title}
                className="mt-8 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl"
              />
              <div className="mt-12 inline-block rounded-3xl glass px-10 py-8">
                <p className="font-display text-6xl font-bold text-gradient md:text-7xl">
                  {study.headlineMetric.value}
                </p>
                <p className="mt-2 text-sm tracking-wider text-muted uppercase">
                  {study.headlineMetric.label}
                </p>
              </div>
            </div>

            {/* The poster — the campaign's hero visual */}
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[2.5rem] opacity-40 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${study.brand.accent}, transparent 70%)`,
                }}
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/12 shadow-2xl">
                <Image
                  src={study.poster}
                  alt={study.posterAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-5xl space-y-6 px-6 pb-12">
        <SpotlightCard className="p-8 md:p-12">
          <p className="eyebrow mb-4">The challenge</p>
          <p className="text-lg leading-relaxed text-ink md:text-xl">
            {study.challenge}
          </p>
        </SpotlightCard>
        <SpotlightCard className="p-8 md:p-12">
          <p className="eyebrow mb-4">The strategy</p>
          <p className="text-lg leading-relaxed text-ink md:text-xl">
            {study.strategy}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {study.services.map((service) => (
              <span
                key={service}
                className="rounded-full bg-gradient-to-r from-violet/15 to-magenta/15 px-4 py-2 text-sm text-ink"
              >
                {service}
              </span>
            ))}
          </div>
        </SpotlightCard>
        <SpotlightCard className="p-8 md:p-12">
          <p className="eyebrow mb-6">The results</p>
          <ul className="space-y-4">
            {study.results.map((result) => (
              <li key={result} className="flex items-start gap-4">
                <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet to-magenta text-xs font-bold text-white">
                  ✓
                </span>
                <p className="text-lg text-ink">{result}</p>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </section>

      {/* Next project */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <Link
          href={`/work/${next.slug}`}
          className="group relative block overflow-hidden rounded-3xl border border-white/10 p-10 transition-colors duration-500 hover:border-white/25 md:p-14"
          style={{
            background: `linear-gradient(150deg, ${next.brand.from}, ${next.brand.to})`,
          }}
        >
          <div aria-hidden className="absolute inset-0 overflow-hidden">
            <Image
              src={next.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              placeholder="blur"
              className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/55 to-bg/30" />
          </div>
          <div className="relative flex items-center justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Next case study</p>
              <span
                className="rounded-lg border px-3 py-1.5 font-display text-sm font-bold text-ink"
                style={{
                  borderColor: `${next.brand.accent}66`,
                  background: `${next.brand.accent}1a`,
                }}
              >
                {next.brand.mark}
              </span>
              <p
                className="mt-4 font-display text-2xl font-bold md:text-4xl"
                style={{ color: next.brand.accent }}
              >
                {next.brand.showTitle}
              </p>
              <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
                {next.title}
              </p>
            </div>
            <span className="glass flex size-14 shrink-0 items-center justify-center rounded-full text-xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </Link>
      </section>

      <CtaSection
        eyebrow="Want results like these?"
        title="Let's write your headline number."
      />
    </>
  );
}
