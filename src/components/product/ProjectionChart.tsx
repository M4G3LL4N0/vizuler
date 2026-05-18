"use client";

import type { ModelOutputs, PathKey, ProjectionPoint } from "@/lib/financial-model";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

const PATH_STYLE: Record<
  PathKey,
  { stroke: string; fill: string; label: string; dot: string }
> = {
  current: {
    stroke: "stroke-slate-300/70",
    fill: "url(#fill-current)",
    label: "text-slate-300",
    dot: "bg-slate-200",
  },
  optimized: {
    stroke: "stroke-cyan-300",
    fill: "url(#fill-optimized)",
    label: "text-cyan-200",
    dot: "bg-cyan-300",
  },
  highGrowth: {
    stroke: "stroke-violet-300",
    fill: "url(#fill-highgrowth)",
    label: "text-violet-200",
    dot: "bg-violet-300",
  },
  aggressive: {
    stroke: "stroke-emerald-300",
    fill: "url(#fill-aggressive)",
    label: "text-emerald-200",
    dot: "bg-emerald-300",
  },
};

const PATH_LABEL: Record<PathKey, string> = {
  current: "Current",
  optimized: "Optimized",
  highGrowth: "High Growth",
  aggressive: "Aggressive Upside",
};

export function ProjectionChart({ outputs }: { outputs: ModelOutputs }) {
  const width = 720;
  const height = 280;
  const padding = { top: 24, right: 24, bottom: 28, left: 56 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const allPoints: ProjectionPoint[] = outputs.paths.flatMap((p) => p.series);
  const minYear = 0;
  const maxYear = outputs.years;
  const maxNet = Math.max(
    1,
    ...allPoints.map((p) => p.netWorth),
    outputs.futureNetWorth,
  );
  const minNet = Math.min(0, ...allPoints.map((p) => p.netWorth));

  const xFor = (year: number) =>
    padding.left + ((year - minYear) / Math.max(1, maxYear - minYear)) * innerWidth;
  const yFor = (val: number) =>
    padding.top + innerHeight - ((val - minNet) / Math.max(1, maxNet - minNet)) * innerHeight;

  const buildPath = (series: ProjectionPoint[]): string =>
    series
      .map((point, i) => `${i === 0 ? "M" : "L"} ${xFor(point.year).toFixed(1)} ${yFor(point.netWorth).toFixed(1)}`)
      .join(" ");

  const buildArea = (series: ProjectionPoint[]): string => {
    if (!series.length) return "";
    const top = series.map((p) => `L ${xFor(p.year).toFixed(1)} ${yFor(p.netWorth).toFixed(1)}`);
    const start = `M ${xFor(series[0].year).toFixed(1)} ${yFor(minNet).toFixed(1)}`;
    const end = `L ${xFor(series[series.length - 1].year).toFixed(1)} ${yFor(minNet).toFixed(1)} Z`;
    return `${start} ${top.join(" ")} ${end}`;
  };

  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => minNet + ((maxNet - minNet) * i) / ticks);
  const xTickCount = Math.min(6, maxYear);
  const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) =>
    Math.round((maxYear / xTickCount) * i),
  );

  return (
    <Card glow="cyan" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Past · Present · Future</p>
          <h3 className="mt-1 font-display text-2xl tracking-tight text-white">Net worth trajectory</h3>
          <p className="mt-1 text-sm text-slate-400">
            Projection from age {outputs.inputs.currentAge} to {outputs.inputs.targetAge}.
            Educational scenarios, not guaranteed outcomes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-300">
          {outputs.paths.map((p) => (
            <span key={p.key} className="inline-flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${PATH_STYLE[p.key].dot}`} />
              <span className={PATH_STYLE[p.key].label}>{PATH_LABEL[p.key]}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-white/8 bg-slate-950/40 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Projected net worth chart">
          <defs>
            <linearGradient id="fill-current" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(148,163,184,0.35)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0)" />
            </linearGradient>
            <linearGradient id="fill-optimized" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </linearGradient>
            <linearGradient id="fill-highgrowth" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(167,139,250,0.35)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0)" />
            </linearGradient>
            <linearGradient id="fill-aggressive" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
              <stop offset="100%" stopColor="rgba(52,211,153,0)" />
            </linearGradient>
          </defs>

          {yTicks.map((tick, i) => (
            <g key={`y-${i}`}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={yFor(tick) + 3}
                textAnchor="end"
                fontSize="10"
                fill="rgba(148,163,184,0.7)"
              >
                {formatCurrency(tick, { compact: true })}
              </text>
            </g>
          ))}

          {xTicks.map((tick, i) => (
            <g key={`x-${i}`}>
              <text
                x={xFor(tick)}
                y={height - padding.bottom + 16}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(148,163,184,0.7)"
              >
                {`+${tick}y`}
              </text>
            </g>
          ))}

          {outputs.paths.map((p) => (
            <path key={`area-${p.key}`} d={buildArea(p.series)} fill={PATH_STYLE[p.key].fill} opacity={0.55} />
          ))}

          {outputs.paths.map((p) => (
            <path
              key={`line-${p.key}`}
              d={buildPath(p.series)}
              className={PATH_STYLE[p.key].stroke}
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {outputs.paths.map((p) => {
            const last = p.series[p.series.length - 1];
            return (
              <circle
                key={`end-${p.key}`}
                cx={xFor(last.year)}
                cy={yFor(last.netWorth)}
                r={3.5}
                className={PATH_STYLE[p.key].stroke}
                fill="currentColor"
              />
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
