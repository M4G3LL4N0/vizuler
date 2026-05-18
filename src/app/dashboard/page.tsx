import type { Metadata } from "next";
import { SubpageVisual } from "@/components/SubpageVisual";
import { FinancialDashboard } from "@/components/product/FinancialDashboard";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Dashboard — Vizuler",
  description:
    "The full Vizuler dashboard: net worth snapshot, direction signal, trajectory chart, wealth multiplier engine, biggest lever, and scenario simulator.",
};

export default function DashboardPage() {
  return (
    <>
    <SubpageVisual variant="dashboard" />
      <section className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/3 size-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute left-0 top-40 size-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge tone="violet">Dashboard</Badge>
            <h1 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
              Your financial reality, on one canvas.
            </h1>
            <p className="mt-2 max-w-2xl text-base text-slate-400">
              Snapshot, signal, trajectory, multiplier paths, biggest lever, and the simulator — all in
              one place. Adjust anything to see how your future rewires.
            </p>
          </div>
          <p className="max-w-xs text-xs text-slate-500">
            Educational projections only. Vizuler is not a licensed financial, tax, legal, or
            investment advisor.
          </p>
        </div>
        <FinancialDashboard />
      </div>
    </section>
  </>
  )
}
