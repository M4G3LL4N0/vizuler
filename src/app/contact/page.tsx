import type { Metadata } from "next";
import { SubpageVisual } from "@/components/SubpageVisual";
import { ContactForm } from "./ContactForm";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Contact — Vizuler",
  description:
    "Request early access to Vizuler, ask a question, or partner with us. We respond personally — no autoresponders.",
};

export default function ContactPage() {
  return (
    <>
    <SubpageVisual variant="contact" />
      <section className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Badge tone="cyan">Contact</Badge>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            Talk to a human, not a funnel.
          </h1>
          <p className="mt-4 max-w-lg text-base text-slate-300 md:text-lg">
            Request early access, ask a question, or tell us how you’d use Vizuler with clients. We read
            every message and respond personally.
          </p>

          <div className="mt-8 space-y-3">
            <Card glow="violet" className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">For coaches & advisors</p>
              <p className="text-sm text-slate-200">
                If you work with clients on money, Vizuler can be the visual layer you’ve been missing.
                Let’s talk about how it fits your practice.
              </p>
            </Card>
            <Card glow="emerald" className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">For founders</p>
              <p className="text-sm text-slate-200">
                Equity-heavy compensation, low cash, weird tax surface — that’s exactly the kind of
                situation Vizuler is built for. Show us your shape, we’ll show you yours.
              </p>
            </Card>
          </div>

          <p className="mt-8 text-xs text-slate-500">
            Vizuler is not a licensed financial, tax, legal, or investment advisor. We won’t give advice;
            we’ll show you a model and point you toward qualified professionals when real decisions are
            on the line.
          </p>
        </div>

        <Card glow="cyan" className="flex flex-col gap-5">
          <ContactForm />
        </Card>
      </div>
    </section>
  </>
  )
}
