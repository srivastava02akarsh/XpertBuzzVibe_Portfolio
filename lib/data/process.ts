export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We immerse ourselves in your brand, audience and category — finding the cultural insight everyone else missed.",
  },
  {
    step: "02",
    title: "Strategize",
    description:
      "Data-driven campaign architecture: channels, creators, content formats and the moment to strike.",
  },
  {
    step: "03",
    title: "Create",
    description:
      "Memes, videos, UGC, influencer briefs — thumb-stopping content produced at campaign speed.",
  },
  {
    step: "04",
    title: "Amplify",
    description:
      "Our creator network, premium page partnerships and paid media push the campaign into the trend charts.",
  },
  {
    step: "05",
    title: "Optimize",
    description:
      "Real-time analytics steer every rupee. We double down on what's working and report what matters.",
  },
];
