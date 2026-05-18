"use client";

import type { ScenarioInputs } from "@/lib/financial-model";
import { Card } from "@/components/ui/Card";
import { SAMPLE_PROFILES } from "@/lib/sample-profiles";
import { formatCurrency, formatPercent } from "@/lib/utils";

type Props = {
  inputs: ScenarioInputs;
  onChange: (next: ScenarioInputs) => void;
  activeProfileId: string | null;
  onSelectProfile: (id: string) => void;
};

export function ScenarioControls({ inputs, onChange, activeProfileId, onSelectProfile }: Props) {
  const update = <K extends keyof ScenarioInputs>(key: K, value: ScenarioInputs[K]) => {
    onChange({ ...inputs, [key]: value });
  };

  return (
    <Card glow="violet" className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scenario Simulator</p>
          <h3 className="mt-1 font-display text-2xl tracking-tight text-white">
            Tune your model
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Adjust the inputs. The dashboard reacts in real time. Estimates only — not advice.
          </p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Sample profiles</p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_PROFILES.map((p) => {
            const active = p.id === activeProfileId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProfile(p.id)}
                className={`rounded-full border px-3 py-1.5 text-xs transition ${
                  active
                    ? "border-cyan-300/70 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {p.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SliderField
          label="Current age"
          value={inputs.currentAge}
          min={18}
          max={70}
          step={1}
          display={`${inputs.currentAge}`}
          onChange={(v) => update("currentAge", v)}
        />
        <SliderField
          label="Target age"
          value={inputs.targetAge}
          min={inputs.currentAge + 1}
          max={90}
          step={1}
          display={`${inputs.targetAge}`}
          onChange={(v) => update("targetAge", v)}
        />
        <SliderField
          label="Annual income"
          value={inputs.income}
          min={0}
          max={1_000_000}
          step={1_000}
          display={formatCurrency(inputs.income, { compact: true })}
          onChange={(v) => update("income", v)}
        />
        <SliderField
          label="Monthly savings"
          value={inputs.monthlySavings}
          min={0}
          max={20_000}
          step={50}
          display={formatCurrency(inputs.monthlySavings)}
          onChange={(v) => update("monthlySavings", v)}
        />
        <SliderField
          label="Current assets"
          value={inputs.currentAssets}
          min={0}
          max={5_000_000}
          step={1_000}
          display={formatCurrency(inputs.currentAssets, { compact: true })}
          onChange={(v) => update("currentAssets", v)}
        />
        <SliderField
          label="Debt"
          value={inputs.debt}
          min={0}
          max={1_000_000}
          step={500}
          display={formatCurrency(inputs.debt, { compact: true })}
          onChange={(v) => update("debt", v)}
        />
        <SliderField
          label="Investment return"
          value={Math.round(inputs.annualReturn * 1000)}
          min={-50}
          max={150}
          step={5}
          display={formatPercent(inputs.annualReturn, 1)}
          onChange={(v) => update("annualReturn", v / 1000)}
        />
        <SliderField
          label="Income growth / yr"
          value={Math.round(inputs.incomeGrowthRate * 1000)}
          min={-50}
          max={200}
          step={5}
          display={formatPercent(inputs.incomeGrowthRate, 1)}
          onChange={(v) => update("incomeGrowthRate", v / 1000)}
        />
        <SliderField
          label="Equity upside"
          value={inputs.equityUpside}
          min={0}
          max={2_500_000}
          step={5_000}
          display={formatCurrency(inputs.equityUpside, { compact: true })}
          onChange={(v) => update("equityUpside", v)}
        />
        <SliderField
          label="Career upside"
          value={Math.round(inputs.careerUpside * 100)}
          min={0}
          max={100}
          step={5}
          display={`${Math.round(inputs.careerUpside * 100)}%`}
          onChange={(v) => update("careerUpside", v / 100)}
        />
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Risk appetite</p>
        <div className="grid grid-cols-3 gap-2">
          {(["low", "medium", "high"] as const).map((level) => {
            const active = inputs.riskTolerance === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => update("riskTolerance", level)}
                className={`rounded-xl border px-3 py-2 text-sm capitalize transition ${
                  active
                    ? "border-violet-300/70 bg-violet-300/10 text-violet-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (next: number) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</span>
        <span className="text-sm text-white tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
      />
    </label>
  );
}
