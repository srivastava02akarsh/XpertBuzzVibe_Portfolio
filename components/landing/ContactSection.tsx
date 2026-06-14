import Aurora from "@/components/ui/Aurora";
import TextReveal from "@/components/ui/TextReveal";
import ContactForm from "@/components/sections/contact/ContactForm";
import { site } from "@/lib/data/site";

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-bg="#160d20"
      className="relative overflow-hidden py-32 md:py-44"
    >
      <Aurora intensity="bold" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-6">Final act</p>
            <TextReveal
              as="h2"
              text="Let's make some"
              className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl"
            />
            <p className="font-serif-accent text-gradient-animated mt-2 text-6xl leading-[0.95] md:text-8xl">
              noise.
            </p>
            <p className="mt-8 max-w-md text-lg text-muted">
              Tell us where you want to be in 90 days. We reply within one
              business day — with a plan, not a pitch deck.
            </p>

            <div className="mt-12 space-y-4">
              <div className="flex flex-wrap gap-3">
                {site.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="glass rounded-full px-6 py-3 text-sm text-ink transition-colors hover:border-magenta/50"
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {site.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/-/g, "")}`}
                    className="glass rounded-full px-6 py-3 text-sm text-ink transition-colors hover:border-cyan/50"
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div className="grid gap-4 pt-6 sm:grid-cols-2">
                {site.offices.map((office) => (
                  <div key={office.city}>
                    <p className="eyebrow !text-[10px]">{office.label}</p>
                    <p className="mt-2 font-display text-xl font-bold text-ink">
                      {office.city}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>

              {/* Animated orbit — response promise */}
              <div className="glass mt-8 flex max-w-lg items-center gap-8 overflow-hidden rounded-3xl p-8">
                <div className="relative grid size-36 shrink-0 place-items-center">
                  <span
                    aria-hidden
                    className="animate-spin-slow absolute inset-0 rounded-full border border-violet/40"
                    style={{ animationDuration: "14s" }}
                  >
                    <span className="absolute -top-1 left-1/2 size-2 rounded-full bg-violet shadow-[0_0_12px_2px_rgba(168,85,247,0.8)]" />
                  </span>
                  <span
                    aria-hidden
                    className="animate-spin-slow absolute inset-4 rounded-full border border-magenta/35"
                    style={{ animationDuration: "22s", animationDirection: "reverse" }}
                  >
                    <span className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-magenta shadow-[0_0_10px_2px_rgba(255,61,190,0.8)]" />
                  </span>
                  <span
                    aria-hidden
                    className="animate-spin-slow absolute inset-9 rounded-full border border-cyan/30"
                    style={{ animationDuration: "30s" }}
                  >
                    <span className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px_rgba(34,228,255,0.8)]" />
                  </span>
                  <span className="font-display text-xl font-bold text-gradient-animated">
                    XBV
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg leading-snug font-bold text-ink">
                    Every campaign begins with one message.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-violet" />
                      Reply within one business day
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-magenta" />
                      Free strategy call, zero pressure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-cyan" />
                      A plan, not a pitch deck
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
