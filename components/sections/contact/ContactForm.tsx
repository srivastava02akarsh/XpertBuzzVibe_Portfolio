"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { services } from "@/lib/data/services";

type Status = "idle" | "sent";

// XpertBuzzVibe WhatsApp — +91 9117962709 (country code 91 + number, no "+" for wa.me)
const WHATSAPP_NUMBER = "919117962709";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (title: string) => {
    setInterests((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const line = (label: string, value: FormDataEntryValue | null) =>
      value ? `*${label}:* ${value}` : null;

    const text = [
      "New project inquiry from the XpertBuzzVibe website 👋",
      "",
      line("Name", form.get("name")),
      line("Email", form.get("email")),
      line("Phone", form.get("phone")),
      line("Company", form.get("company")),
      interests.length ? `*Interested in:* ${interests.join(", ")}` : null,
      "",
      "*Project:*",
      String(form.get("message") ?? ""),
    ]
      .filter((l) => l !== null)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-12 text-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-r from-violet to-magenta text-2xl">
          ✓
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-ink">
          WhatsApp is open. Just hit send.
        </h3>
        <p className="mt-3 max-w-sm text-muted">
          We&apos;ve pre-filled your details in a WhatsApp message to our team —
          tap send and we&apos;ll reply within one business day.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/8 bg-white/3 px-5 py-4 text-ink placeholder:text-muted/60 outline-none transition-colors duration-300 focus:border-violet/60 focus:bg-white/5";

  return (
    <form onSubmit={onSubmit} className="glass space-y-5 rounded-3xl p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <input name="name" required placeholder="Your name *" className={inputClass} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email *"
          className={inputClass}
        />
        <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
        <input name="company" placeholder="Company / brand" className={inputClass} />
      </div>

      <div>
        <p className="mb-3 text-sm text-muted">What are you interested in?</p>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => toggleInterest(service.title)}
              className={`rounded-full px-4 py-2 text-xs transition-all duration-300 ${
                interests.includes(service.title)
                  ? "bg-gradient-to-r from-violet to-magenta font-semibold text-white"
                  : "border border-white/10 text-muted hover:border-violet/40 hover:text-ink"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about your project *"
        className={inputClass}
      />

      <div className="flex flex-wrap items-center gap-4">
        <MagneticButton type="submit">
          Send on WhatsApp <span aria-hidden>→</span>
        </MagneticButton>
        <p className="text-xs text-muted/70">
          Opens WhatsApp with your details pre-filled.
        </p>
      </div>
    </form>
  );
}
