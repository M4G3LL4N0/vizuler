"use client";

import { useState } from "react";
import type { ScenarioInputs } from "@/lib/financial-model";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

type SimulatedDoc = {
  id: string;
  label: string;
  type: "Bank" | "Brokerage" | "Salary Offer" | "Debt Statement" | "Cap Table";
  parsed: {
    field: string;
    value: string;
  }[];
  patch: Partial<ScenarioInputs>;
};

const SIMULATED_DOCS: SimulatedDoc[] = [
  {
    id: "bank",
    label: "Checking + Savings screenshot",
    type: "Bank",
    parsed: [
      { field: "Checking balance", value: "$8,240" },
      { field: "Savings balance", value: "$31,500" },
      { field: "Avg monthly inflow", value: "$9,800" },
      { field: "Avg monthly outflow", value: "$7,420" },
    ],
    patch: { currentAssets: 39_740, monthlySavings: 2_380 },
  },
  {
    id: "brokerage",
    label: "Brokerage account screenshot",
    type: "Brokerage",
    parsed: [
      { field: "Total portfolio value", value: "$142,300" },
      { field: "Equities allocation", value: "82%" },
      { field: "Bonds / cash", value: "18%" },
      { field: "Trailing 3yr return", value: "8.4%" },
    ],
    patch: { currentAssets: 142_300, annualReturn: 0.08 },
  },
  {
    id: "offer",
    label: "Salary offer letter",
    type: "Salary Offer",
    parsed: [
      { field: "Base salary", value: "$185,000" },
      { field: "Target bonus", value: "15%" },
      { field: "Equity (4yr)", value: "$220,000" },
      { field: "Sign-on", value: "$15,000" },
    ],
    patch: { income: 212_750, equityUpside: 235_000, careerUpside: 0.7 },
  },
  {
    id: "debt",
    label: "Debt statement (credit + auto)",
    type: "Debt Statement",
    parsed: [
      { field: "Credit card balance", value: "$18,200" },
      { field: "Avg APR", value: "23.4%" },
      { field: "Auto loan", value: "$11,400" },
      { field: "Min monthly debt service", value: "$830" },
    ],
    patch: { debt: 29_600 },
  },
  {
    id: "cap-table",
    label: "Startup cap table snippet",
    type: "Cap Table",
    parsed: [
      { field: "Common shares (founder)", value: "1,250,000" },
      { field: "Fully diluted %", value: "12.4%" },
      { field: "409A price", value: "$0.42" },
      { field: "Implied equity value", value: "$520,000" },
    ],
    patch: { equityUpside: 520_000, careerUpside: 0.9, riskTolerance: "high" },
  },
];

const TONE_FOR_TYPE: Record<SimulatedDoc["type"], "cyan" | "violet" | "emerald" | "amber" | "rose"> = {
  Bank: "cyan",
  Brokerage: "violet",
  "Salary Offer": "emerald",
  "Debt Statement": "rose",
  "Cap Table": "amber",
};

export function IntakeMock({ onApply }: { onApply: (patch: Partial<ScenarioInputs>) => void }) {
  const [hover, setHover] = useState(false);
  const [activeDoc, setActiveDoc] = useState<SimulatedDoc | null>(null);
  const [parsing, setParsing] = useState(false);

  const simulateParse = (doc: SimulatedDoc) => {
    setParsing(true);
    setActiveDoc(doc);
    setTimeout(() => setParsing(false), 650);
  };

  const apply = () => {
    if (!activeDoc) return;
    onApply(activeDoc.patch);
  };

  return (
    <Card glow="cyan" className="flex flex-col gap-5">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Document Intake (Simulated)</p>
        <h3 className="mt-1 font-display text-2xl tracking-tight text-white">
          Drop messy financial reality. Get clean structure.
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          In production, Vizuler parses uploaded screenshots and statements. This MVP simulates the parser so
          you can feel the workflow without paid APIs or uploads.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          simulateParse(SIMULATED_DOCS[0]);
        }}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          hover
            ? "border-cyan-300/70 bg-cyan-300/5"
            : "border-white/10 bg-white/[0.02] hover:border-white/20"
        }`}
      >
        <div className="flex size-12 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-200">
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
            <path d="M12 4v12m0-12-4 4m4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-sm text-slate-200">
          Drop a bank screenshot, brokerage screenshot, offer letter, debt statement, or cap table.
        </p>
        <p className="text-xs text-slate-500">Or pick a simulated sample below.</p>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Try a simulated document</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SIMULATED_DOCS.map((doc) => {
            const active = activeDoc?.id === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => simulateParse(doc)}
                className={`flex items-start justify-between gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "border-cyan-300/60 bg-cyan-300/5"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
              >
                <span className="text-slate-200">{doc.label}</span>
                <Badge tone={TONE_FOR_TYPE[doc.type]}>{doc.type}</Badge>
              </button>
            );
          })}
        </div>
      </div>

      {activeDoc && (
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-slate-200">
              Parsed:{" "}
              <span className="text-white">{activeDoc.label}</span>
            </p>
            <Badge tone={TONE_FOR_TYPE[activeDoc.type]}>{parsing ? "Parsing…" : "Parsed"}</Badge>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {activeDoc.parsed.map((row) => (
              <div key={row.field} className="flex items-center justify-between gap-2 rounded-lg border border-white/8 bg-slate-950/50 px-3 py-2">
                <span className="text-slate-400">{row.field}</span>
                <span className="text-white tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Will update: {Object.keys(activeDoc.patch).join(", ")}
            </p>
            <Button size="sm" variant="primary" onClick={apply} disabled={parsing}>
              {parsing ? "Parsing…" : "Apply to dashboard"}
            </Button>
          </div>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-slate-500">
        Disclaimer: Vizuler is not a licensed financial, tax, legal, or investment advisor. Numbers shown
        here — including parsed values like {formatCurrency(0)} placeholders — are educational simulations.
      </p>
    </Card>
  );
}
