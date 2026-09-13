export interface Service {
  id: string;
  index: string;
  title: string;
  /** One line that says what this actually buys you. */
  summary: string;
  capabilities: string[];
  /** Drives the accent hue of the matching 3D cluster. */
  hue: number;
}

export const SERVICES: Service[] = [
  {
    id: "web",
    index: "01",
    title: "Web Development",
    summary:
      "We design and develop fast, responsive, SEO-friendly websites that strengthen your online presence, engage users, and convert visitors into customers.",
    capabilities: [
      "Custom Websites",
      "Ecommerce Development",
      "SEO Optimization",
      "Performance Engineering",
    ],
    hue: 0.0,
  },
  {
    id: "software",
    index: "02",
    title: "Software Development",
    summary:
      "We build secure, scalable custom software that streamlines operations, automates workflows, and gives businesses the digital infrastructure they need to grow.",
    capabilities: [
      "SaaS Platforms",
      "Web Applications",
      "API Development",
      "System Integration",
    ],
    hue: 0.25,
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile Applications",
    summary:
      "We create intuitive, high-performance mobile applications that deliver seamless user experiences and connect businesses with customers wherever they are.",
    capabilities: [
      "iOS Development",
      "Android Development",
      "Cross Platform",
      "App Strategy",
    ],
    hue: 0.55,
  },
  {
    id: "design",
    index: "04",
    title: "UI/UX & Digital Design",
    summary:
      "We create purposeful digital interfaces and brand experiences that combine visual clarity, usability, and strategy to make every interaction matter.",
    capabilities: [
      "UI UX Design",
      "Product Design",
      "Design Systems",
      "Brand Identity",
    ],
    hue: 0.82,
  },
];
