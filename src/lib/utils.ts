export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, options: { compact?: boolean } = {}): string {
  const abs = Math.abs(value);
  if (options.compact || abs >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: abs >= 1_000_000 ? 2 : 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMultiple(multiple: number): string {
  if (!Number.isFinite(multiple) || multiple <= 0) return "—";
  if (multiple < 10) return `${multiple.toFixed(1)}x`;
  return `${Math.round(multiple)}x`;
}

export function formatPercent(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
