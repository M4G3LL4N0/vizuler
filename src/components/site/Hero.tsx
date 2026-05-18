import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

const PREVIEW_PATHS = [
  { label: "Current", value: 1.42, tone: "slate" as const, dot: "bg-slate-200" },
  { label: "Optimized", value: 2.6, tone: "cyan" as const, dot: "bg-cyan-300" },
  { label: "High Growth", value: 6.1, tone: "violet" as const, dot: "bg-violet-300" },
  { label: "Aggressive", value: 14.8, tone: "emerald" as const, dot: "bg-emerald-300" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <BackgroundGlow />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 pb-20 pt-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="lg:col-span-6">
          <Badge tone="cyan">Visual financial intelligence</Badge>
          <h1 className="mt-5 font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
            See where your financial life is headed.{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 bg-clip-text text-transparent">
              Then choose a better path.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Vizuler turns messy financial reality — screenshots, statements, scattered numbers — into a
            single, beautiful dashboard. Net worth today. Trajectory tomorrow. And the highest-leverage
            paths to 2x, 10x, or 100x where you’re headed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/demo" size="lg">
              Try the interactive demo
            </Button>
            <Button href="/dashboard" variant="secondary" size="lg">
              Open the dashboard
            </Button>
          </div>
          <p className="mt-6 max-w-md text-xs text-slate-500">
            Educational scenario modeling — not financial, tax, legal, or investment advice.
          </p>
        </div>

        <div className="lg:col-span-6">
          <Card glow="cyan" className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Badge tone="cyan">Live model preview</Badge>
              <span className="text-xs text-slate-500">Sample: Early career professional</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="Today" value={formatCurrency(4_000, { compact: true })} sub="net worth" />
              <Stat label="Age 55" value={formatCurrency(1_280_000, { compact: true })} sub="current path" accent />
              <Stat label="Direction" value="Increasing" sub="signal: green" emerald />
            </div>

            <div className="rounded-xl border border-white/8 bg-slate-950/40 p-4">
              <MiniChart />
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Wealth multiplier paths</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PREVIEW_PATHS.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-1.5 rounded-full ${p.dot}`} />
                      <span className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{p.label}</span>
                    </div>
                    <p className="mt-1 font-display text-lg tracking-tight text-white">{p.value.toFixed(1)}x</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
  emerald,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
  emerald?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p
        className={`mt-1 font-display text-xl tracking-tight ${
          accent
            ? "bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 bg-clip-text text-transparent"
            : emerald
              ? "text-emerald-200"
              : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10px] text-slate-500">{sub}</p>
    </div>
  );
}

function MiniChart() {
  const width = 560;
  const height = 160;
  const lines = [
    {
      stroke: "#94a3b8",
      points: [10, 22, 26, 32, 40, 48, 55, 68, 78, 90, 100, 110],
    },
    {
      stroke: "#22d3ee",
      points: [10, 25, 32, 42, 55, 68, 80, 95, 108, 122, 138, 152],
    },
    {
      stroke: "#a78bfa",
      points: [10, 28, 38, 52, 68, 84, 100, 118, 134, 148, 160, 170],
    },
    {
      stroke: "#34d399",
      points: [10, 30, 44, 60, 80, 100, 120, 140, 160, 175, 188, 200],
    },
  ];
  const step = width / (lines[0].points.length - 1);
  const max = 220;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" aria-hidden>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={0}
          x2={width}
          y1={height * g}
          y2={height * g}
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 5"
        />
      ))}
      {lines.map((l, i) => (
        <polyline
          key={i}
          fill="none"
          stroke={l.stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={l.points
            .map((v, idx) => `${idx * step},${height - (v / max) * height}`)
            .join(" ")}
        />
      ))}
    </svg>
  );
}

function BackgroundGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute right-[-120px] top-32 size-[420px] rounded-full bg-violet-500/15 blur-[120px]" />
      <div className="absolute bottom-[-160px] left-[-80px] size-[420px] rounded-full bg-emerald-500/10 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at top, rgba(0,0,0,0.6) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
