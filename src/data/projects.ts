export interface Project {
  id: string;
  name: string;
  industry: string;
  year: string;
  scope: string;
  description: string;
  stack: string[];
  results: { value: string; label: string }[];
  /** Selects the procedural visual rendered on the portal plane. */
  variant: 0 | 1 | 2 | 3 | 4;
}

/**
 * `variant` picks the generated visual behind each case study, chosen to suit
 * the work: contour topography for property, a vitals radial for healthcare,
 * advected flow for operations, a silk drape for retail, a data field for
 * financial reporting. All five are used once.
 */
export const PROJECTS: Project[] = [
  {
    id: "fincore",
    name: "FinCore",
    industry: "Financial Technology",
    year: "2026",
    scope: "Product Strategy · Web Application · UI/UX Design",
    description:
      "A scalable financial management platform designed to simplify reporting, automate workflows, and give growing businesses real-time visibility into their financial operations.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    results: [
      { value: "68%", label: "Faster Reporting" },
      { value: "3.2x", label: "Workflow Efficiency" },
      { value: "42%", label: "More Engagement" },
    ],
    variant: 4,
  },
  {
    id: "northline",
    name: "Northline",
    industry: "Real Estate",
    year: "2026",
    scope: "Website Design · Development · SEO Strategy",
    description:
      "A premium real estate platform combining immersive property discovery, powerful search tools, and a high-performance architecture designed to generate qualified leads.",
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Vercel"],
    results: [
      { value: "54%", label: "More Leads" },
      { value: "41%", label: "Faster Loading" },
      { value: "2.8x", label: "Search Visibility" },
    ],
    variant: 0,
  },
  {
    id: "medflow",
    name: "MedFlow",
    industry: "Healthcare Technology",
    year: "2025",
    scope: "Product Design · Software Development · Automation",
    description:
      "A secure digital platform built to streamline internal workflows, centralize information, and reduce manual processes across a growing healthcare organization.",
    stack: ["React", "Node.js", "Python", "PostgreSQL", "Docker"],
    results: [
      { value: "61%", label: "Less Manual Work" },
      { value: "35%", label: "Faster Processing" },
      { value: "4.6/5", label: "User Satisfaction" },
    ],
    variant: 1,
  },
  {
    id: "cartiq",
    name: "Cartiq",
    industry: "Ecommerce",
    year: "2025",
    scope: "Ecommerce Development · UX Design · Performance Optimization",
    description:
      "A conversion-focused ecommerce experience built around fast product discovery, frictionless purchasing, and scalable infrastructure for a rapidly expanding online brand.",
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe"],
    results: [
      { value: "47%", label: "Higher Conversion" },
      { value: "39%", label: "Faster Checkout" },
      { value: "2.1x", label: "Mobile Sales" },
    ],
    variant: 3,
  },
  {
    id: "atlasops",
    name: "AtlasOps",
    industry: "Enterprise Software",
    year: "2024",
    scope: "SaaS Development · Dashboard Design · API Integration",
    description:
      "A centralized operations platform that connects disconnected systems, automates repetitive processes, and gives leadership a clearer view of business performance.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    results: [
      { value: "72%", label: "Time Saved" },
      { value: "58%", label: "Fewer Errors" },
      { value: "3.5x", label: "Faster Decisions" },
    ],
    variant: 2,
  },
];
