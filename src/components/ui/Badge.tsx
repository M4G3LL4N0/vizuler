import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "cyan" | "violet" | "emerald" | "amber" | "rose" | "slate";

const TONE: Record<Tone, string> = {
  cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  slate: "border-white/10 bg-white/5 text-slate-200",
};

export function Badge({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em]",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
