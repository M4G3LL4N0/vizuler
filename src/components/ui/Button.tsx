import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 text-slate-950 hover:brightness-110 shadow-[0_18px_45px_-22px_rgba(56,189,248,0.7)]",
  secondary:
    "bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10 hover:border-white/20",
  ghost:
    "bg-transparent text-slate-200 hover:text-white hover:bg-white/5 border border-transparent",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const className = cn(BASE, VARIANT_CLASSES[variant], SIZE_CLASSES[size], props.className);

  if ("href" in props && props.href) {
    const { href, target, rel, children } = props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target={target} rel={rel ?? "noreferrer"} className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } = props as ButtonAsButton;
  void _v;
  void _s;
  void _c;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
