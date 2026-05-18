import type { Metadata } from "next";
import { SubpageVisual } from "@/components/SubpageVisual";
import { PricingTiers } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { Card, SectionTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Pricing — Vizuler",
  description:
    "Vizuler pricing tiers — Free, Pro, Builder, and Enterprise / Advisor. Simple plans built around what you actually need to see.",
};

export default function PricingPage() {
  return (
    <>
    <SubpageVisual variant="pricing" />
      <>
      <section className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <Badge tone="cyan">Pricing</Badge>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            Pay only when seeing your future is worth it.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-400 md:text-lg">
            Vizuler is free to start. Upgrade only when unlimited scenarios, full multiplier modeling, or
            founder-grade equity scenarios become useful for you.
          </p>
        </div>
      </section>

      <section className="border-b border-white/5 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

      <section className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What you get on every plan"
            title="Same dashboard. Same philosophy. Different depth."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card glow="cyan" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Clear visuals, always</h3>
              <p className="text-sm text-slate-400">
                Dark, cinematic, glanceable. Designed to lower anxiety, not amplify it.
              </p>
            </Card>
            <Card glow="violet" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Honest projections</h3>
              <p className="text-sm text-slate-400">
                Transparent formulas. No fake guarantees. Disclaimers on every output.
              </p>
            </Card>
            <Card glow="emerald" className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">Real privacy posture</h3>
              <p className="text-sm text-slate-400">
                Local-first by default. Persistence is opt-in, encrypted, and clearly disclosed when it ships.
              </p>
            </Card>
          </div>
        </div>
      </section>
      <CTA />
    </>
  </>
  )
}
