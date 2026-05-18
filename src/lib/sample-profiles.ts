import type { ScenarioInputs } from "./financial-model";

export type SampleProfile = {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  vibe: string;
  inputs: ScenarioInputs;
};

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: "early-career",
    name: "Early Career Professional",
    shortLabel: "Early career",
    description:
      "26, working a first real salaried job, low savings but plenty of runway and time to compound.",
    vibe: "Time is the asset. Habits decide the rest.",
    inputs: {
      currentAge: 26,
      targetAge: 55,
      income: 78_000,
      monthlySavings: 600,
      incomeGrowthRate: 0.05,
      savingsRate: 0.1,
      currentAssets: 18_000,
      debt: 14_000,
      annualReturn: 0.07,
      riskTolerance: "medium",
      careerUpside: 0.7,
      equityUpside: 10_000,
    },
  },
  {
    id: "founder",
    name: "Startup Founder",
    shortLabel: "Startup founder",
    description:
      "33, low cash income, meaningful equity, high variance outcomes, optimizing for a specific window.",
    vibe: "Salary is the floor. Equity is the engine.",
    inputs: {
      currentAge: 33,
      targetAge: 50,
      income: 95_000,
      monthlySavings: 1_200,
      incomeGrowthRate: 0.06,
      savingsRate: 0.15,
      currentAssets: 60_000,
      debt: 18_000,
      annualReturn: 0.08,
      riskTolerance: "high",
      careerUpside: 0.85,
      equityUpside: 400_000,
    },
  },
  {
    id: "freelancer",
    name: "Freelancer / Independent",
    shortLabel: "Freelancer",
    description:
      "31, spiky income, no employer match, needs structure more than scarcity.",
    vibe: "Income is real. Structure is missing.",
    inputs: {
      currentAge: 31,
      targetAge: 60,
      income: 110_000,
      monthlySavings: 1_400,
      incomeGrowthRate: 0.03,
      savingsRate: 0.16,
      currentAssets: 42_000,
      debt: 9_000,
      annualReturn: 0.065,
      riskTolerance: "medium",
      careerUpside: 0.55,
      equityUpside: 25_000,
    },
  },
  {
    id: "high-earner-low-savings",
    name: "High Earner, Low Savings",
    shortLabel: "High earner, low savings",
    description:
      "38, big paycheck, lifestyle has scaled with it. The leak is the lifestyle, not the income.",
    vibe: "Income is solved. Behavior is the problem.",
    inputs: {
      currentAge: 38,
      targetAge: 60,
      income: 285_000,
      monthlySavings: 1_500,
      incomeGrowthRate: 0.03,
      savingsRate: 0.07,
      currentAssets: 120_000,
      debt: 65_000,
      annualReturn: 0.06,
      riskTolerance: "medium",
      careerUpside: 0.45,
      equityUpside: 80_000,
    },
  },
  {
    id: "debt-rebuild",
    name: "Debt-Heavy Rebuild",
    shortLabel: "Debt-heavy rebuild",
    description:
      "41, working back from a hard chapter. Debt is the gravity pulling everything down right now.",
    vibe: "Stop the bleed before chasing the win.",
    inputs: {
      currentAge: 41,
      targetAge: 65,
      income: 72_000,
      monthlySavings: 350,
      incomeGrowthRate: 0.025,
      savingsRate: 0.05,
      currentAssets: 9_000,
      debt: 48_000,
      annualReturn: 0.055,
      riskTolerance: "low",
      careerUpside: 0.5,
      equityUpside: 0,
    },
  },
];

export function getProfileById(id: string): SampleProfile | undefined {
  return SAMPLE_PROFILES.find((p) => p.id === id);
}
