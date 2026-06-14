export type Stat = {
  value: number;
  suffix: string;
  label: string;
  sub?: string;
};

export const heroStats: Stat[] = [
  { value: 1, suffix: "B+", label: "Total Reach" },
  { value: 70, suffix: "+", label: "Viral Campaigns" },
  { value: 96, suffix: "%", label: "Client Retention" },
];

export const stats: Stat[] = [
  { value: 1, suffix: "B+", label: "Total Reach", sub: "across every major platform" },
  { value: 200, suffix: "K+", label: "Conversions", sub: "driven for client funnels" },
  { value: 70, suffix: "+", label: "Viral Campaigns", sub: "engineered end to end" },
  { value: 96, suffix: "%", label: "Client Retention", sub: "partners who stay with us" },
  { value: 25, suffix: "+", label: "Major Brands", sub: "from OTT giants to startups" },
  { value: 4000, suffix: "+", label: "Deliverables", sub: "in a single 10-day campaign" },
];
