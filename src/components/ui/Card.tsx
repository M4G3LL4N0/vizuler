import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "violet" | "emerald" | "amber" | "rose" | "none";
};

const GLOW: Record<NonNullable<CardProps["glow"]>, string> = {
  cyan: "before:bg-cyan-400/10",
  violet: "before:bg-violet-400/10",
  emerald: "before:bg-emerald-400/10",
  amber: "before:bg-amber-400/10",
  rose: "before:bg-rose-400/10",
  none: "before:opacity-0",
};

export function Card({ children, className, glow = "none" }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-xl",
        "before:absolute before:-top-24 before:-right-24 before:h-56 before:w-56 before:rounded-full before:blur-3xl before:content-['']",
        GLOW[glow],
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-200/90">
          <span className="size-1.5 rounded-full bg-cyan-300" /> {eyebrow}
        </span>
      )}
      <h2 className="font-display text-balance text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty text-base text-slate-400 md:text-lg">{description}</p>
      )}
    </div>
  );
}
