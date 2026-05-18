"use client";

import { useMemo, useState } from "react";
import type { ModelOutputs, ScenarioInputs } from "@/lib/financial-model";
import { runFinancialModel } from "@/lib/financial-model";
import { SAMPLE_PROFILES } from "@/lib/sample-profiles";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HealthScore } from "./HealthScore";
import { ProjectionChart } from "./ProjectionChart";
import { WealthPathCards } from "./WealthPathCards";
import { ScenarioControls } from "./ScenarioControls";
import { IntakeMock } from "./IntakeMock";
import { formatCurrency, formatMultiple } from "@/lib/utils";

const DEFAULT_PROFILE_ID = "early-career";

export function FinancialDashboard() {
  const initialProfile = SAMPLE_PROFILES.find((p) => p.id === DEFAULT_PROFILE_ID) ?? SAMPLE_PROFILES[0];
  const [inputs, setInputs] = useState<ScenarioInputs>(initialProfile.inputs);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(initialProfile.id);

  const outputs = useMemo<ModelOutputs>(() => runFinancialModel(inputs), [inputs]);

  const handleProfile = (id: string) => {
    const profile = SAMPLE_PROFILES.find((p) => p.id === id);
    if (!profile) return;
    setInputs(profile.inputs);
    setActiveProfileId(profile.id);
  };

  const handleInputs = (next: ScenarioInputs) => {
    setInputs(next);
    setActiveProfileId(null);
  };

  const handleIntakePatch = (patch: Partial<ScenarioInputs>) => {
    setInputs({ ...inputs, ...patch });
    setActiveProfileId(null);
  };

  const profile = activeProfileId
    ? SAMPLE_PROFILES.find((p) => p.id === activeProfileId)
    : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card glow="cyan" className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Net Worth Snapshot</p>
              <p className="mt-1 text-sm text-slate-300">
                {profile ? profile.vibe : "Custom scenario — your inputs, modeled live."}
              </p>
            </div>
            <Badge tone="cyan">Live model</Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Stat
              label="Today"
              value={formatCurrency(outputs.currentNetWorth, { compact: true })}
              sub={`${outputs.inputs.currentAge} years old`}
            />
            <Stat
              label="Projected"
              value={formatCurrency(outputs.futureNetWorth, { compact: true })}
              sub={`age ${outputs.inputs.targetAge}, current path`}
              accent
            />
            <Stat
              label="To first $1M"
              value={
                outputs.timelineToFirstMillion === null
                  ? "Not on current path"
                  : `${outputs.timelineToFirstMillion} years`
              }
              sub="from today, current path"
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Multiple label="Current" value={outputs.multiples.current} tone="slate" />
            <Multiple label="Optimized" value={outputs.multiples.optimized} tone="cyan" />
            <Multiple label="High Growth" value={outputs.multiples.highGrowth} tone="violet" />
            <Multiple label="Aggressive" value={outputs.multiples.aggressive} tone="emerald" />
          </div>
        </Card>

        <HealthScore outputs={outputs} />
      </div>

      <ProjectionChart outputs={outputs} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card glow="violet" className="lg:col-span-2 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Biggest Lever</p>
              <h3 className="mt-1 font-display text-2xl tracking-tight text-white">
                {outputs.biggestLever.title}
              </h3>
            </div>
            <Badge tone="violet">{outputs.biggestLever.category}</Badge>
          </div>
          <p className="text-sm text-slate-300">{outputs.biggestLever.description}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Estimated upside vs. current path</p>
              <p className="mt-1 font-display text-2xl tracking-tight text-white">
                +{formatCurrency(Math.max(0, outputs.biggestLever.estimatedImpact), { compact: true })}
              </p>
              <p className="mt-1 text-xs text-slate-500">over {outputs.years} years, modeled</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Plain-English insight</p>
              <p className="mt-1 text-sm text-slate-200">{outputs.insight}</p>
            </div>
          </div>
        </Card>

        <Card glow="emerald" className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Direction Signal</p>
              <h3 className="mt-1 font-display text-2xl tracking-tight text-white">
                {outputs.direction === "increasing"
                  ? "Compounding upward"
                  : outputs.direction === "declining"
                    ? "Trajectory is bleeding"
                    : "Flat — no compounding yet"}
              </h3>
            </div>
            <SignalLight direction={outputs.direction} />
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2">
              <span>Avg annual change (current path)</span>
              <span className="tabular-nums text-white">
                {formatCurrency(outputs.yearlyDelta, { compact: true })} / yr
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2">
              <span>Multiple to aggressive upside</span>
              <span className="tabular-nums text-white">{formatMultiple(outputs.multiples.aggressive)}</span>
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2">
              <span>Years to model out</span>
              <span className="tabular-nums text-white">{outputs.years}</span>
            </li>
          </ul>
          <p className="text-[11px] leading-relaxed text-slate-500">
            Educational projections only. Not financial, tax, legal, or investment advice.
          </p>
        </Card>
      </div>

      <WealthPathCards outputs={outputs} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ScenarioControls
          inputs={inputs}
          onChange={handleInputs}
          activeProfileId={activeProfileId}
          onSelectProfile={handleProfile}
        />
        <IntakeMock onApply={handleIntakePatch} />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p
        className={`mt-1 font-display text-3xl tracking-tight ${
          accent
            ? "bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function Multiple({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "slate" | "cyan" | "violet" | "emerald";
}) {
  const ring =
    tone === "cyan"
      ? "border-cyan-300/30 text-cyan-200"
      : tone === "violet"
        ? "border-violet-300/30 text-violet-200"
        : tone === "emerald"
          ? "border-emerald-300/30 text-emerald-200"
          : "border-white/10 text-slate-200";
  return (
    <div className={`rounded-xl border ${ring} bg-white/[0.02] px-3 py-3`}>
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 font-display text-2xl tracking-tight">{formatMultiple(value)}</p>
    </div>
  );
}

function SignalLight({ direction }: { direction: ModelOutputs["direction"] }) {
  const color =
    direction === "increasing"
      ? "bg-emerald-400 shadow-[0_0_24px_4px_rgba(52,211,153,0.4)]"
      : direction === "declining"
        ? "bg-rose-400 shadow-[0_0_24px_4px_rgba(244,63,94,0.4)]"
        : "bg-amber-300 shadow-[0_0_24px_4px_rgba(251,191,36,0.4)]";
  return (
    <div className="flex items-center gap-2">
      <span className={`inline-block size-3 rounded-full ${color}`} />
      <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
        {direction === "increasing" ? "Green" : direction === "declining" ? "Red" : "Yellow"}
      </span>
    </div>
  );
}
