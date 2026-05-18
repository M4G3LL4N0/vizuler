import type { Metadata } from "next";
import { SubpageVisual } from "@/components/SubpageVisual";
import { Card, SectionTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/site/CTA";

export const metadata: Metadata = {
  title: "About — Vizuler",
  description:
    "Vizuler exists to give individuals a calm, visual answer to the only financial question that actually matters: am I headed somewhere good?",
};

export default function AboutPage() {
  return (
    <>
    <SubpageVisual variant="about" />
      <>
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <Badge tone="cyan">About</Badge>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            We built Vizuler because spreadsheets don’t answer the real question.
          </h1>
          <p className="mt-5 max-w-3xl text-base text-slate-300 md:text-lg">
            Most personal finance software is built for accountants and category junkies — not for
            humans trying to figure out if their life is on a good curve. Vizuler is a visual financial
            clarity engine for the rest of us.
          </p>
        </div>
      </section>

      <section className="border-b border-white/5 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What we believe"
            title="Three opinions Vizuler is built on."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card glow="cyan" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Direction beats detail.</h3>
              <p className="text-sm text-slate-400">
                Knowing whether you’re trending up or down is worth more than another pie chart of last
                month’s spending.
              </p>
            </Card>
            <Card glow="violet" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Leverage beats discipline.</h3>
              <p className="text-sm text-slate-400">
                Two or three high-leverage moves usually swamp a decade of micro-budgeting. Most tools
                hide those moves. We surface them.
              </p>
            </Card>
            <Card glow="emerald" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Honesty beats hype.</h3>
              <p className="text-sm text-slate-400">
                We don’t promise wealth. We model paths, show assumptions, and remind you that
                outcomes — especially aggressive ones — carry real risk.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Mission"
            title="Give every person a calm, visual answer to: am I headed somewhere good?"
            description="And if the answer isn’t great, give them the highest-leverage moves they can actually take."
          />
          <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-sm text-slate-300">
            <p>
              Vizuler is intentionally not a tax tool, not a brokerage, and not an advisor. It is a
              visual layer on top of your financial life — a place to see the shape of where you’re
              going, decide which path you actually want, and bring the right professionals into the
              loop when real money decisions are on the table.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              For tax, legal, or investment decisions, always consult a qualified professional.
              Vizuler’s outputs are educational scenario simulations and projections.
            </p>
          </div>
        </div>
      </section>

      <CTA />
    </>
  </>
  )
}
