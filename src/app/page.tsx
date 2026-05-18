import Link from "next/link";
import { TrustStrip } from "@/components/TrustStrip";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { Hero } from "@/components/site/Hero";
import { CTA } from "@/components/site/CTA";
import { PricingTiers } from "@/components/site/Pricing";
import { Card, SectionTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>
        <MarketingGraphicsStack />

      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <ProductPreview />
      <WealthMultiplier />
      <UseCases />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}

function Problem() {
  const items = [
    {
      title: "Money lives in 14 different places.",
      copy: "Bank apps, brokerage logins, spreadsheets, screenshots in your camera roll. None of them talk to each other.",
    },
    {
      title: "You don’t know which direction you’re actually headed.",
      copy: "Up? Flat? Quietly bleeding? Most people genuinely don’t know — and budget apps don’t answer that question.",
    },
    {
      title: "You can’t see the high-leverage moves.",
      copy: "The 1–2 decisions that actually multiply net worth are invisible inside spreadsheets and category pie charts.",
    },
  ];
  return (
    <section className="border-b border-white/5 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The problem"
          title="Personal finance tools tell you where the money went. Not where you’re going."
          description="Vizuler exists because the question that actually matters — am I headed somewhere good? — is the one nobody’s software answers."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="flex flex-col gap-3">
              <h3 className="font-display text-xl tracking-tight text-white">{it.title}</h3>
              <p className="text-sm text-slate-400">{it.copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const pillars = [
    {
      tone: "cyan" as const,
      title: "A single visual layer.",
      copy: "Drop screenshots, paste numbers, type a few inputs. Vizuler turns the mess into one calm dashboard.",
    },
    {
      tone: "violet" as const,
      title: "A direction signal.",
      copy: "Green, yellow, or red — instantly know whether your net worth is climbing, drifting, or eroding.",
    },
    {
      tone: "emerald" as const,
      title: "Wealth multiplier paths.",
      copy: "See your current path next to optimized, high-growth, and aggressive upside paths — modeled in real time.",
    },
  ];
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="What Vizuler is"
          title="A visual financial clarity engine, not another budget app."
          description="No category pie charts. No guilt loops. Just a clean visual model of where you are and where you could go."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} glow={p.tone} className="flex flex-col gap-3">
              <Badge tone={p.tone}>Pillar</Badge>
              <h3 className="font-display text-xl tracking-tight text-white">{p.title}</h3>
              <p className="text-sm text-slate-400">{p.copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Drop what you have.",
      copy: "Screenshots, statements, salary offers, debt balances, or a few typed numbers. Sample profiles work too.",
    },
    {
      step: "02",
      title: "Vizuler structures the chaos.",
      copy: "A simulated parser (real OCR in production) turns inputs into a clean structured model.",
    },
    {
      step: "03",
      title: "See your trajectory.",
      copy: "Net worth today, your current path, and the highest-leverage upgrades — all on one canvas.",
    },
    {
      step: "04",
      title: "Choose a better path.",
      copy: "Compare optimized, high-growth, and aggressive paths. Adjust inputs. Watch the future rewire.",
    },
  ];
  return (
    <section id="how" className="border-b border-white/5 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="How it works"
          title="From messy reality to a clean future model in under a minute."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.step} className="flex flex-col gap-3">
              <span className="font-display text-sm tracking-[0.18em] text-cyan-200/90">{s.step}</span>
              <h3 className="font-display text-lg tracking-tight text-white">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Product"
          title="A dashboard built for clarity, not for engagement metrics."
          description="Inspired by Bloomberg terminals, made for normal humans. Dark, calm, glanceable. Designed to be opened weekly, not daily."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card glow="cyan" className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Badge tone="cyan">Snapshot</Badge>
              <span className="text-xs text-slate-500">Net worth · trajectory · direction</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <PreviewStat label="Today" value="$142K" />
              <PreviewStat label="Age 55, current path" value="$1.7M" accent />
              <PreviewStat label="To first $1M" value="14 yrs" />
            </div>
            <div className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
              <PreviewChart />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <PreviewMultiple label="Current" value="12x" tone="slate" />
              <PreviewMultiple label="Optimized" value="22x" tone="cyan" />
              <PreviewMultiple label="High Growth" value="48x" tone="violet" />
              <PreviewMultiple label="Aggressive" value="96x" tone="emerald" />
            </div>
          </Card>

          <Card glow="violet" className="flex flex-col gap-4">
            <Badge tone="violet">Biggest lever</Badge>
            <h3 className="font-display text-xl tracking-tight text-white">
              Raise savings rate to ~20%.
            </h3>
            <p className="text-sm text-slate-400">
              Modeled upside vs. current path: roughly +$540K over 20 years. A small structural lift
              changes the entire curve.
            </p>
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3 text-xs text-slate-500">
              Educational scenarios only. Vizuler is not a licensed financial, tax, legal, or
              investment advisor.
            </div>
            <Button href="/demo" className="w-fit">
              Open the live model
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p
        className={`mt-1 font-display text-xl tracking-tight ${
          accent
            ? "bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PreviewMultiple({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "slate" | "cyan" | "violet" | "emerald";
}) {
  const ring =
    tone === "cyan"
      ? "border-cyan-300/30 text-cyan-200"
      : tone === "violet"
        ? "border-violet-300/30 text-violet-200"
        : tone === "emerald"
          ? "border-emerald-300/30 text-emerald-200"
          : "border-white/10 text-slate-200";
  return (
    <div className={`rounded-lg border ${ring} bg-white/[0.02] px-3 py-2`}>
      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 font-display text-lg tracking-tight">{value}</p>
    </div>
  );
}

function PreviewChart() {
  const width = 560;
  const height = 180;
  const series = [
    { color: "#94a3b8", values: [10, 18, 26, 32, 40, 46, 52, 58, 66, 72, 78, 82] },
    { color: "#22d3ee", values: [10, 22, 32, 42, 54, 66, 78, 90, 102, 114, 124, 132] },
    { color: "#a78bfa", values: [10, 26, 40, 58, 78, 96, 112, 128, 142, 156, 168, 178] },
    { color: "#34d399", values: [10, 30, 50, 72, 94, 116, 138, 158, 176, 190, 202, 214] },
  ];
  const step = width / (series[0].values.length - 1);
  const max = 230;
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
      {series.map((s, i) => (
        <polyline
          key={i}
          fill="none"
          stroke={s.color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={s.values
            .map((v, idx) => `${idx * step},${height - (v / max) * height}`)
            .join(" ")}
        />
      ))}
    </svg>
  );
}

function WealthMultiplier() {
  const paths = [
    {
      tone: "slate" as const,
      label: "Current Path",
      tagline: "Status quo.",
      multiple: "1.0–2x",
      copy: "Whatever you’re already doing, projected forward.",
    },
    {
      tone: "cyan" as const,
      label: "Optimized Path",
      tagline: "Plug the leaks.",
      multiple: "2–5x",
      copy: "Higher savings rate, cleaner allocation, less interest drag.",
    },
    {
      tone: "violet" as const,
      label: "High Growth Path",
      tagline: "Stack the leverage.",
      multiple: "5–15x",
      copy: "Career upside, second income streams, exposure to growth assets.",
    },
    {
      tone: "emerald" as const,
      label: "Aggressive Upside Path",
      tagline: "Outsized variance.",
      multiple: "10–100x",
      copy: "Real equity ownership. Concentrated bets. Eyes wide open.",
    },
  ];

  return (
    <section className="relative border-b border-white/5 bg-slate-950/40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/3 top-10 size-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="absolute left-1/4 bottom-0 size-[420px] rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="The Wealth Multiplier Engine"
          title="The same person. Four very different futures."
          description="Vizuler models each path side-by-side so you can choose deliberately instead of drifting into one."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {paths.map((p) => (
            <Card key={p.label} glow={p.tone === "slate" ? "none" : p.tone} className="flex flex-col gap-3">
              <Badge tone={p.tone}>{p.label}</Badge>
              <h3 className="font-display text-xl tracking-tight text-white">{p.tagline}</h3>
              <p className="font-display text-3xl tracking-tight bg-gradient-to-r from-cyan-200 via-sky-200 to-violet-200 bg-clip-text text-transparent">
                {p.multiple}
              </p>
              <p className="text-sm text-slate-400">{p.copy}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Multiples shown are illustrative ranges from Vizuler’s modeling engine. Educational only — not
          financial advice or guaranteed outcomes.
        </p>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      tone: "cyan" as const,
      title: "Early career professional",
      copy: "Tiny balance sheet, huge runway. See exactly how habits today compound into a very different age 55.",
    },
    {
      tone: "violet" as const,
      title: "Startup founder",
      copy: "Low cash, real equity. Model what the exit window has to look like for the math to actually work.",
    },
    {
      tone: "emerald" as const,
      title: "Freelancer / operator",
      copy: "Spiky income, no employer match. Convert variance into a stable trajectory.",
    },
    {
      tone: "amber" as const,
      title: "High earner, low savings",
      copy: "Income is solved. Lifestyle is the leak. Vizuler makes the leak visible.",
    },
    {
      tone: "rose" as const,
      title: "Rebuilding from debt",
      copy: "Stop the bleed, then design a path forward. See the order of operations clearly.",
    },
    {
      tone: "slate" as const,
      title: "Coaches & advisors",
      copy: "Use Vizuler with clients to make the conversation visual, calm, and grounded in modeling.",
    },
  ];
  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Who it’s for" title="Built for everyone whose money is messier than a spreadsheet." />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((c) => (
            <Card key={c.title} glow={c.tone === "slate" ? "none" : c.tone} className="flex flex-col gap-3">
              <Badge tone={c.tone}>Profile</Badge>
              <h3 className="font-display text-xl tracking-tight text-white">{c.title}</h3>
              <p className="text-sm text-slate-400">{c.copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="border-b border-white/5 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple tiers. Built around what you actually need to see."
          description="Start free. Upgrade only when scenarios, intake, or founder-grade modeling become useful."
        />
        <div className="mt-10">
          <PricingTiers />
        </div>
        <div className="mt-6">
          <Link href="/pricing" className="text-sm text-cyan-200 hover:text-white">
            See full pricing details →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is Vizuler giving me financial advice?",
      a: "No. Vizuler is an educational scenario modeling tool. It does not provide financial, tax, legal, or investment advice. For decisions about your money, consult a qualified professional.",
    },
    {
      q: "Do I have to connect my bank accounts?",
      a: "No. You can use sample profiles, paste numbers, type inputs, or simulate document intake. Real account connections are on the roadmap, not required.",
    },
    {
      q: "How accurate are the projections?",
      a: "They’re modeled estimates based on simple, transparent formulas (compounding, savings rate, return assumptions). They’re directional, not guaranteed. Outsized outcomes — especially aggressive paths — carry real risk.",
    },
    {
      q: "What makes Vizuler different from a budget app?",
      a: "Budget apps focus on the past month. Vizuler focuses on the next 20 years. We don’t care which restaurant you went to — we care which path you’re on.",
    },
    {
      q: "Do you store my data?",
      a: "The MVP runs locally in your browser. When persistence ships, it will be opt-in, encrypted, and clearly disclosed.",
    },
  ];
  return (
    <section id="faq" className="border-b border-white/5">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Honest answers to obvious questions." />
        <div className="mt-10 divide-y divide-white/5 rounded-2xl border border-white/8 bg-white/[0.02]">
          {items.map((it) => (
            <details key={it.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base text-white">
                <span>{it.q}</span>
                <span className="ml-auto inline-flex size-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition group-open:rotate-45">
                  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-400">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
