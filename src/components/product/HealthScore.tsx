"use client";

import type { ModelOutputs } from "@/lib/financial-model";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const BAND_TONE: Record<ModelOutputs["healthBand"], "rose" | "amber" | "cyan" | "emerald" | "violet"> = {
  Critical: "rose",
  Fragile: "amber",
  Steady: "cyan",
  Strong: "emerald",
  Exceptional: "violet",
};

const BAND_GLOW: Record<ModelOutputs["healthBand"], "rose" | "amber" | "cyan" | "emerald" | "violet"> = BAND_TONE;

export function HealthScore({ outputs }: { outputs: ModelOutputs }) {
  const { healthScore, healthBand, healthSummary, direction, directionLabel } = outputs;
  const arc = Math.max(0, Math.min(100, healthScore));
  const tone = BAND_TONE[healthBand];

  return (
    <Card glow={BAND_GLOW[healthBand]} className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Financial Health Score</p>
          <p className="mt-1 text-sm text-slate-300">{healthSummary}</p>
        </div>
        <Badge tone={tone}>{healthBand}</Badge>
      </div>

      <div className="flex items-end gap-4">
        <div className="font-display text-6xl tracking-tight text-white">{healthScore}</div>
        <div className="pb-2 text-sm text-slate-400">out of 100</div>
      </div>

      <div className="space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${
              healthBand === "Critical"
                ? "from-rose-400 to-rose-500"
                : healthBand === "Fragile"
                  ? "from-amber-300 to-rose-400"
                  : healthBand === "Steady"
                    ? "from-cyan-300 to-sky-400"
                    : healthBand === "Strong"
                      ? "from-emerald-300 to-cyan-400"
                      : "from-violet-300 via-cyan-300 to-emerald-300"
            }`}
            style={{ width: `${arc}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-500">
          <span>Critical</span>
          <span>Steady</span>
          <span>Exceptional</span>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
        <DirectionDot direction={direction} />
        <p className="text-sm text-slate-200">{directionLabel}</p>
      </div>
    </Card>
  );
}

function DirectionDot({ direction }: { direction: ModelOutputs["direction"] }) {
  const color =
    direction === "increasing"
      ? "bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.15)]"
      : direction === "declining"
        ? "bg-rose-400 shadow-[0_0_0_6px_rgba(244,63,94,0.15)]"
        : "bg-amber-300 shadow-[0_0_0_6px_rgba(251,191,36,0.15)]";
  return <span className={`inline-block size-3 rounded-full ${color}`} />;
}
