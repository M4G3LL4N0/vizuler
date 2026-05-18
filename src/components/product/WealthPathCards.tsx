"use client";

import type { ModelOutputs, PathKey, WealthPath } from "@/lib/financial-model";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatMultiple } from "@/lib/utils";

const PATH_TONE: Record<PathKey, "slate" | "cyan" | "violet" | "emerald"> = {
  current: "slate",
  optimized: "cyan",
  highGrowth: "violet",
  aggressive: "emerald",
};

const PATH_GLOW: Record<PathKey, "none" | "cyan" | "violet" | "emerald"> = {
  current: "none",
  optimized: "cyan",
  highGrowth: "violet",
  aggressive: "emerald",
};

const RISK_TONE: Record<WealthPath["riskLevel"], "emerald" | "cyan" | "amber" | "rose"> = {
  Low: "emerald",
  Medium: "cyan",
  High: "amber",
  "Very High": "rose",
};

export function WealthPathCards({ outputs }: { outputs: ModelOutputs }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {outputs.paths.map((path) => (
        <Card key={path.key} glow={PATH_GLOW[path.key]} className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Badge tone={PATH_TONE[path.key]}>{path.label}</Badge>
              <p className="mt-3 text-sm text-slate-400">{path.tagline}</p>
            </div>
            <Badge tone={RISK_TONE[path.riskLevel]}>{path.riskLevel} risk</Badge>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Projected net worth</p>
            <p className="font-display text-3xl tracking-tight text-white">
              {formatCurrency(path.projectedNetWorth, { compact: true })}
            </p>
            <p className="text-xs text-slate-500">in {path.timelineYears} years</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Metric label="Multiple" value={formatMultiple(path.multiple)} />
            <Metric label="CAGR" value={`${(path.cagr * 100).toFixed(1)}%`} />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Main levers</p>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {path.levers.map((lever) => (
                <li key={lever} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                  <span>{lever}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-0.5 text-base text-white">{value}</p>
    </div>
  );
}
