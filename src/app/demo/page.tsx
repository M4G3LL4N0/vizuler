import type { Metadata } from "next";
import { SubpageVisual } from "@/components/SubpageVisual";
import { VizulerDemo } from "@/components/product/VizulerDemo";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Demo — Vizuler",
  description:
    "Try Vizuler live. Adjust scenarios, drop simulated documents, and watch your financial trajectory rewire in real time.",
};

export default function DemoPage() {
  return (
    <>
    <SubpageVisual variant="demo" />
      <section className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute right-0 top-32 size-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3">
          <Badge tone="cyan">Interactive demo</Badge>
          <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl">
            Pick a profile. Or tune your own.
          </h1>
          <p className="max-w-2xl text-base text-slate-400 md:text-lg">
            Everything here is live. Choose a sample profile, drag the sliders, or simulate a document
            intake — Vizuler rebuilds your trajectory on every change.
          </p>
          <p className="text-xs text-slate-500">
            Educational scenarios only. Not financial, tax, legal, or investment advice.
          </p>
        </div>
        <VizulerDemo />
      </div>
    </section>
  </>
  )
}
