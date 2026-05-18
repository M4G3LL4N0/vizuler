"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg tracking-tight text-white">Vizuler</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button href="/demo" variant="secondary" size="sm">
            Try the demo
          </Button>
          <Button href="/contact" variant="primary" size="sm">
            Early access
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="space-y-1 border-t border-white/5 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Button href="/demo" variant="secondary" size="sm">
                Try the demo
              </Button>
              <Button href="/contact" variant="primary" size="sm">
                Early access
              </Button>
            </div>
            <p className="px-3 pt-2 text-[11px] leading-relaxed text-slate-500">
              Projections and health scores are educational models — not investment, tax, or fiduciary advice.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="relative inline-flex size-8 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-violet-400/20"
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-5">
        <path d="M3 17l5-7 4 4 4-8 5 6" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="g" x1="3" y1="17" x2="21" y2="3" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
