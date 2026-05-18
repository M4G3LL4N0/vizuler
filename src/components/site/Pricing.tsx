import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
  tone: "slate" | "cyan" | "violet" | "emerald";
};

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Get a clean snapshot of where you are today.",
    features: [
      "Basic financial snapshot",
      "1 saved scenario model",
      "Sample projections",
      "Educational disclaimers built in",
    ],
    cta: { label: "Start free", href: "/demo" },
    tone: "slate",
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/ month",
    description: "Unlimited scenarios, the full multiplier engine, and intake.",
    features: [
      "Unlimited scenarios",
      "Full Wealth Multiplier Engine",
      "Advanced projections + CAGR",
      "Screenshot intake simulation",
    ],
    cta: { label: "Go Pro", href: "/contact" },
    highlighted: true,
    tone: "cyan",
  },
  {
    name: "Builder",
    price: "$49",
    cadence: "/ month",
    description: "For founders, freelancers, and high-variance income.",
    features: [
      "Founder equity scenarios",
      "Income / career modeling",
      "Tax-aware planning simulations",
      "Downloadable visual reports",
    ],
    cta: { label: "Get Builder", href: "/contact" },
    tone: "violet",
  },
  {
    name: "Enterprise / Advisor",
    price: "Custom",
    cadence: "talk to us",
    description: "Coaches, accelerators, wealth teams, advisory firms.",
    features: [
      "Multi-client dashboards",
      "White-label visual reports",
      "Custom modeling logic",
      "Priority support & onboarding",
    ],
    cta: { label: "Contact sales", href: "/contact" },
    tone: "emerald",
  },
];

export function PricingTiers() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {TIERS.map((tier) => (
        <Card
          key={tier.name}
          glow={tier.tone === "slate" ? "none" : tier.tone}
          className={`flex flex-col gap-5 ${
            tier.highlighted ? "ring-1 ring-cyan-300/30" : ""
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl tracking-tight text-white">{tier.name}</h3>
            {tier.highlighted && <Badge tone="cyan">Most popular</Badge>}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl tracking-tight text-white">{tier.price}</span>
            <span className="text-sm text-slate-400">{tier.cadence}</span>
          </div>
          <p className="text-sm text-slate-400">{tier.description}</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="pt-1">
            <Button
              href={tier.cta.href}
              variant={tier.highlighted ? "primary" : "secondary"}
              className="w-full"
            >
              {tier.cta.label}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
