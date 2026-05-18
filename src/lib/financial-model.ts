import { clamp } from "./utils";

export type RiskTolerance = "low" | "medium" | "high";

export type ScenarioInputs = {
  currentAge: number;
  targetAge: number;
  income: number;
  monthlySavings: number;
  incomeGrowthRate: number;
  savingsRate: number;
  currentAssets: number;
  debt: number;
  annualReturn: number;
  riskTolerance: RiskTolerance;
  careerUpside: number;
  equityUpside: number;
};

export type PathKey = "current" | "optimized" | "highGrowth" | "aggressive";

export type WealthPath = {
  key: PathKey;
  label: string;
  tagline: string;
  projectedNetWorth: number;
  multiple: number;
  timelineYears: number;
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  levers: string[];
  series: ProjectionPoint[];
  cagr: number;
};

export type ProjectionPoint = {
  year: number;
  age: number;
  netWorth: number;
};

export type Direction = "increasing" | "flat" | "declining";

export type BiggestLever = {
  category:
    | "Income"
    | "Savings Rate"
    | "Debt"
    | "Investment Returns"
    | "Equity Upside"
    | "Career Growth"
    | "Tax Efficiency"
    | "Skills";
  title: string;
  description: string;
  estimatedImpact: number;
};

export type ModelOutputs = {
  inputs: ScenarioInputs;
  years: number;
  currentNetWorth: number;
  futureNetWorth: number;
  paths: WealthPath[];
  direction: Direction;
  directionLabel: string;
  yearlyDelta: number;
  healthScore: number;
  healthBand: "Critical" | "Fragile" | "Steady" | "Strong" | "Exceptional";
  healthSummary: string;
  biggestLever: BiggestLever;
  timelineToFirstMillion: number | null;
  insight: string;
  multiples: {
    current: number;
    optimized: number;
    highGrowth: number;
    aggressive: number;
  };
};

type PathConfig = {
  key: PathKey;
  label: string;
  tagline: string;
  savingsBoost: number;
  returnBoost: number;
  incomeBoost: number;
  equityFactor: number;
  riskLevel: WealthPath["riskLevel"];
  levers: string[];
};

const PATH_CONFIGS: PathConfig[] = [
  {
    key: "current",
    label: "Current Path",
    tagline: "What happens if nothing changes.",
    savingsBoost: 0,
    returnBoost: 0,
    incomeBoost: 0,
    equityFactor: 0,
    riskLevel: "Low",
    levers: ["Maintain current habits", "No new income streams", "Status quo investing"],
  },
  {
    key: "optimized",
    label: "Optimized Path",
    tagline: "Tighten the obvious leaks. Compound the obvious wins.",
    savingsBoost: 0.05,
    returnBoost: 0.01,
    incomeBoost: 0.01,
    equityFactor: 0.1,
    riskLevel: "Low",
    levers: [
      "Raise savings rate by ~5%",
      "Automate investing into low-cost index funds",
      "Refinance or accelerate high-interest debt",
    ],
  },
  {
    key: "highGrowth",
    label: "High Growth Path",
    tagline: "Stack income, equity, and disciplined risk.",
    savingsBoost: 0.1,
    returnBoost: 0.02,
    incomeBoost: 0.03,
    equityFactor: 0.5,
    riskLevel: "Medium",
    levers: [
      "Pursue higher-leverage career moves",
      "Add a second income stream or equity comp",
      "Increase exposure to growth-oriented assets",
    ],
  },
  {
    key: "aggressive",
    label: "Aggressive Upside Path",
    tagline: "Outsized bets, outsized variance. Eyes open.",
    savingsBoost: 0.15,
    returnBoost: 0.035,
    incomeBoost: 0.05,
    equityFactor: 1,
    riskLevel: "Very High",
    levers: [
      "Take meaningful equity in a startup or business",
      "Concentrated investing with clear risk limits",
      "Skill stacking that 2–4x lifetime earning power",
    ],
  },
];

const RISK_RETURN_ADJUST: Record<RiskTolerance, number> = {
  low: -0.005,
  medium: 0,
  high: 0.01,
};

export const DEFAULT_INPUTS: ScenarioInputs = {
  currentAge: 32,
  targetAge: 55,
  income: 120_000,
  monthlySavings: 1_800,
  incomeGrowthRate: 0.04,
  savingsRate: 0.18,
  currentAssets: 95_000,
  debt: 22_000,
  annualReturn: 0.07,
  riskTolerance: "medium",
  careerUpside: 0.5,
  equityUpside: 75_000,
};

export function normalizeInputs(inputs: ScenarioInputs): ScenarioInputs {
  const currentAge = clamp(Math.round(inputs.currentAge), 16, 90);
  const targetAge = clamp(Math.round(inputs.targetAge), currentAge + 1, 95);
  return {
    currentAge,
    targetAge,
    income: Math.max(0, inputs.income),
    monthlySavings: Math.max(0, inputs.monthlySavings),
    incomeGrowthRate: clamp(inputs.incomeGrowthRate, -0.1, 0.25),
    savingsRate: clamp(inputs.savingsRate, 0, 0.9),
    currentAssets: Math.max(0, inputs.currentAssets),
    debt: Math.max(0, inputs.debt),
    annualReturn: clamp(inputs.annualReturn, -0.05, 0.2),
    riskTolerance: inputs.riskTolerance,
    careerUpside: clamp(inputs.careerUpside, 0, 1),
    equityUpside: Math.max(0, inputs.equityUpside),
  };
}

function projectPath(inputs: ScenarioInputs, config: PathConfig): WealthPath {
  const years = inputs.targetAge - inputs.currentAge;
  const baseAnnualSavings = Math.max(
    inputs.monthlySavings * 12,
    inputs.income * inputs.savingsRate,
  );

  const effectiveSavingsRate = clamp(inputs.savingsRate + config.savingsBoost, 0, 0.95);
  const effectiveReturn = clamp(
    inputs.annualReturn + config.returnBoost + RISK_RETURN_ADJUST[inputs.riskTolerance],
    -0.05,
    0.22,
  );
  const effectiveIncomeGrowth = clamp(inputs.incomeGrowthRate + config.incomeBoost, -0.05, 0.3);
  const careerBonus = 1 + inputs.careerUpside * config.incomeBoost * 4;
  const equityKick = inputs.equityUpside * config.equityFactor;

  let assets = inputs.currentAssets;
  let debt = inputs.debt;
  let income = inputs.income * careerBonus;
  let savings = baseAnnualSavings;

  const series: ProjectionPoint[] = [
    { year: 0, age: inputs.currentAge, netWorth: Math.round(assets - debt) },
  ];

  for (let y = 1; y <= years; y += 1) {
    assets = assets * (1 + effectiveReturn) + savings;
    debt = Math.max(0, debt * 1.06 - Math.max(2_500, savings * 0.1));
    income = income * (1 + effectiveIncomeGrowth);
    savings = Math.max(savings, income * effectiveSavingsRate);

    if (y === Math.max(1, Math.floor(years / 2)) && equityKick > 0) {
      assets += equityKick;
    }

    series.push({
      year: y,
      age: inputs.currentAge + y,
      netWorth: Math.round(assets - debt),
    });
  }

  const startNetWorth = series[0].netWorth;
  const endNetWorth = series[series.length - 1].netWorth;
  const baseMultiple = startNetWorth > 0 ? endNetWorth / startNetWorth : endNetWorth / 1;
  const multiple = Number.isFinite(baseMultiple) && baseMultiple > 0 ? baseMultiple : 1;
  const cagr = startNetWorth > 0 && years > 0
    ? Math.pow(endNetWorth / Math.max(1, startNetWorth), 1 / years) - 1
    : 0;

  return {
    key: config.key,
    label: config.label,
    tagline: config.tagline,
    projectedNetWorth: endNetWorth,
    multiple,
    timelineYears: years,
    riskLevel: config.riskLevel,
    levers: config.levers,
    series,
    cagr,
  };
}

function timelineToFirstMillion(series: ProjectionPoint[]): number | null {
  const hit = series.find((p) => p.netWorth >= 1_000_000);
  return hit ? hit.year : null;
}

function deriveDirection(series: ProjectionPoint[]): { direction: Direction; yearlyDelta: number } {
  if (series.length < 2) return { direction: "flat", yearlyDelta: 0 };
  const recentWindow = series.slice(0, Math.min(5, series.length));
  const start = recentWindow[0].netWorth;
  const end = recentWindow[recentWindow.length - 1].netWorth;
  const yearlyDelta = (end - start) / Math.max(1, recentWindow.length - 1);
  const threshold = Math.max(1_500, Math.abs(start) * 0.02);
  if (yearlyDelta > threshold) return { direction: "increasing", yearlyDelta };
  if (yearlyDelta < -threshold) return { direction: "declining", yearlyDelta };
  return { direction: "flat", yearlyDelta };
}

function directionLabel(direction: Direction): string {
  if (direction === "increasing") return "Trajectory: increasing wealth";
  if (direction === "declining") return "Trajectory: declining net worth";
  return "Trajectory: flat — no compounding yet";
}

function computeHealthScore(inputs: ScenarioInputs, paths: WealthPath[]): {
  score: number;
  band: ModelOutputs["healthBand"];
  summary: string;
} {
  const debtRatio = inputs.income > 0 ? inputs.debt / inputs.income : inputs.debt > 0 ? 2 : 0;
  const liquidity = inputs.income > 0
    ? inputs.currentAssets / Math.max(1, inputs.income * 0.5)
    : 0;
  const savingsScore = clamp(inputs.savingsRate / 0.3, 0, 1);
  const returnScore = clamp((inputs.annualReturn + 0.05) / 0.2, 0, 1);
  const debtScore = clamp(1 - debtRatio / 1.5, 0, 1);
  const liquidityScore = clamp(liquidity / 3, 0, 1);
  const ageScore = clamp(1 - (inputs.currentAge - 22) / 60, 0.2, 1);
  const trajectory = paths.find((p) => p.key === "current");
  const trajectoryScore = trajectory && trajectory.projectedNetWorth > 1_000_000 ? 1 : 0.55;

  const raw =
    savingsScore * 26 +
    returnScore * 14 +
    debtScore * 22 +
    liquidityScore * 18 +
    ageScore * 8 +
    trajectoryScore * 12;
  const score = Math.round(clamp(raw, 4, 99));

  let band: ModelOutputs["healthBand"] = "Steady";
  if (score >= 85) band = "Exceptional";
  else if (score >= 70) band = "Strong";
  else if (score >= 50) band = "Steady";
  else if (score >= 30) band = "Fragile";
  else band = "Critical";

  const summaryMap: Record<ModelOutputs["healthBand"], string> = {
    Exceptional: "Foundation is excellent. Focus on upside, not survival.",
    Strong: "Solid base. A few smart moves can meaningfully accelerate.",
    Steady: "Stable, but not compounding fast enough yet.",
    Fragile: "Cash flow and debt are the bottleneck — fix those first.",
    Critical: "Stabilize income and reduce high-interest debt before anything else.",
  };

  return { score, band, summary: summaryMap[band] };
}

function biggestLever(inputs: ScenarioInputs, paths: WealthPath[]): BiggestLever {
  const current = paths.find((p) => p.key === "current")!;
  const optimized = paths.find((p) => p.key === "optimized")!;
  const highGrowth = paths.find((p) => p.key === "highGrowth")!;

  const debtRatio = inputs.income > 0 ? inputs.debt / inputs.income : 0;
  const savingsRate = inputs.savingsRate;
  const annualReturn = inputs.annualReturn;

  if (debtRatio > 0.4) {
    return {
      category: "Debt",
      title: "Crush high-interest debt first",
      description:
        "Your debt-to-income ratio is heavy enough that interest is fighting compounding. Eliminating it is the single highest-return move on the board.",
      estimatedImpact: optimized.projectedNetWorth - current.projectedNetWorth,
    };
  }

  if (savingsRate < 0.12) {
    return {
      category: "Savings Rate",
      title: "Lift savings rate to ~20%+",
      description:
        "You are saving below the rate that lets compounding actually carry the weight. Even a small structural lift creates a very different curve.",
      estimatedImpact: optimized.projectedNetWorth - current.projectedNetWorth,
    };
  }

  if (inputs.equityUpside < 25_000 && inputs.careerUpside >= 0.5) {
    return {
      category: "Equity Upside",
      title: "Add real equity exposure",
      description:
        "Salary alone rarely creates multi-decade wealth. Equity — startup, business, or concentrated ownership — is where outsized multiples come from.",
      estimatedImpact: highGrowth.projectedNetWorth - current.projectedNetWorth,
    };
  }

  if (annualReturn < 0.05) {
    return {
      category: "Investment Returns",
      title: "Modernize your investment mix",
      description:
        "Sitting in cash or low-yield accounts is a slow leak. A diversified, long-horizon allocation is one of the most reliable upgrades available.",
      estimatedImpact: optimized.projectedNetWorth - current.projectedNetWorth,
    };
  }

  if (inputs.careerUpside < 0.4) {
    return {
      category: "Career Growth",
      title: "Engineer your next career step",
      description:
        "Income growth is the biggest lever most people underuse. A deliberate move every 2–4 years compounds harder than any spreadsheet hack.",
      estimatedImpact: highGrowth.projectedNetWorth - current.projectedNetWorth,
    };
  }

  return {
    category: "Tax Efficiency",
    title: "Tighten the tax + structure layer",
    description:
      "Your fundamentals are already healthy. The next layer is usually tax-aware accounts, entity structure, and where dollars actually live.",
    estimatedImpact: optimized.projectedNetWorth - current.projectedNetWorth,
  };
}

function buildInsight(
  inputs: ScenarioInputs,
  outputs: Omit<ModelOutputs, "insight">,
): string {
  const current = outputs.paths.find((p) => p.key === "current")!;
  const aggressive = outputs.paths.find((p) => p.key === "aggressive")!;
  const years = outputs.years;
  const directionPhrase =
    outputs.direction === "increasing"
      ? "you are quietly compounding in the right direction"
      : outputs.direction === "declining"
        ? "your trajectory is bleeding net worth and that needs to stop first"
        : "your trajectory is essentially flat — compounding isn't working for you yet";

  const upside = aggressive.projectedNetWorth - current.projectedNetWorth;
  const upsidePhrase = upside > 0
    ? `An aggressive upside path could add roughly ${shortDollars(upside)} on top of your current trajectory over ${years} years.`
    : "Your current path is already close to your aggressive ceiling — focus shifts from accumulation to preservation and meaning.";

  return `At ${inputs.currentAge}, ${directionPhrase}. ${outputs.biggestLever.title} is the highest-leverage move in front of you right now. ${upsidePhrase} These are educational projections — not guarantees.`;
}

function shortDollars(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${Math.round(value)}`;
}

export function runFinancialModel(rawInputs: ScenarioInputs): ModelOutputs {
  const inputs = normalizeInputs(rawInputs);
  const years = inputs.targetAge - inputs.currentAge;

  const paths = PATH_CONFIGS.map((config) => projectPath(inputs, config));
  const current = paths.find((p) => p.key === "current")!;
  const optimized = paths.find((p) => p.key === "optimized")!;
  const highGrowth = paths.find((p) => p.key === "highGrowth")!;
  const aggressive = paths.find((p) => p.key === "aggressive")!;

  const { direction, yearlyDelta } = deriveDirection(current.series);
  const health = computeHealthScore(inputs, paths);
  const lever = biggestLever(inputs, paths);
  const millionYear = timelineToFirstMillion(current.series);

  const outputsCore: Omit<ModelOutputs, "insight"> = {
    inputs,
    years,
    currentNetWorth: current.series[0].netWorth,
    futureNetWorth: current.series[current.series.length - 1].netWorth,
    paths,
    direction,
    directionLabel: directionLabel(direction),
    yearlyDelta,
    healthScore: health.score,
    healthBand: health.band,
    healthSummary: health.summary,
    biggestLever: lever,
    timelineToFirstMillion: millionYear,
    multiples: {
      current: current.multiple,
      optimized: optimized.multiple,
      highGrowth: highGrowth.multiple,
      aggressive: aggressive.multiple,
    },
  };

  return {
    ...outputsCore,
    insight: buildInsight(inputs, outputsCore),
  };
}
