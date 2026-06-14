"use client";

import { useState } from "react";
import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { services } from "@/lib/data/services";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (title: string) => {
    setInterests((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: form.get("company"),
          message: form.get("message"),
          interests,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
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
          Message received. Buckle up.
        </h3>
        <p className="mt-3 max-w-sm text-muted">
          Our team will get back to you within one business day with next steps.
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

      <div className="flex items-center gap-4">
        <MagneticButton type="submit">
          {status === "sending" ? "Sending…" : "Send Message"}{" "}
          <span aria-hidden>→</span>
        </MagneticButton>
        {status === "error" && (
          <p className="text-sm text-magenta">
            Something went wrong — try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
