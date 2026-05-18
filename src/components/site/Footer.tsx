import Link from "next/link";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/demo", label: "Interactive demo" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-block size-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-violet-300" />
            <span className="font-display text-lg tracking-tight text-white">Vizuler</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            A visual financial clarity engine. See where your financial life is headed, and discover the
            highest-leverage paths to multiply it.
          </p>
          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            Vizuler is not a licensed financial, tax, legal, or investment advisor. Outputs are estimates
            and educational scenario simulations. Always consult qualified professionals before making
            financial decisions.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Vizuler. Built for clarity, not clickbait.</p>
          <p>Educational projections only — not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
