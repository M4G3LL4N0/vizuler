"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState("individual");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    setTimeout(() => setStatus("sent"), 750);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
          />
        </Field>
      </div>

      <Field label="I am a…">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { id: "individual", label: "Individual" },
            { id: "founder", label: "Founder" },
            { id: "advisor", label: "Advisor / Coach" },
            { id: "team", label: "Team / Org" },
          ].map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => setRole(opt.id)}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                role === opt.id
                  ? "border-cyan-300/70 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="What would you use Vizuler for?">
        <textarea
          rows={4}
          required
          placeholder="A sentence or two about your situation — what you want to see, and what would make Vizuler genuinely useful for you."
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20"
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="max-w-sm text-xs text-slate-500">
          We won’t share your message. No autoresponders, no funnels — a human reads this.
        </p>
        <Button
          type="submit"
          disabled={status !== "idle"}
        >
          {status === "idle"
            ? "Request access"
            : status === "submitting"
              ? "Sending…"
              : "Thanks — we’ll be in touch"}
        </Button>
      </div>

      {status === "sent" && (
        <div className="rounded-xl border border-emerald-300/30 bg-emerald-300/5 px-4 py-3 text-sm text-emerald-100">
          Got it. We’ll respond within a couple of days. (Demo form — nothing is actually sent.)
        </div>
      )}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}
