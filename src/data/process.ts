export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  duration: string;
  body: string;
  outputs: string[];
}

export const PROCESS: ProcessStep[] = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    duration: "Week 01",
    body: "We begin by understanding your business, users, goals, challenges, and market. This creates the strategic foundation for every decision that follows.",
    outputs: ["Project Brief", "User Insights", "Success Metrics"],
  },
  {
    id: "define",
    index: "02",
    title: "Define",
    duration: "Week 02",
    body: "We turn insights into a clear product direction, defining priorities, requirements, technical needs, and a focused roadmap built around measurable outcomes.",
    outputs: ["Product Strategy", "Technical Scope", "Delivery Roadmap"],
  },
  {
    id: "design",
    index: "03",
    title: "Design",
    duration: "Weeks 03–05",
    body: "We transform strategy into intuitive user journeys and polished interfaces, testing ideas early and building a flexible design system for the product.",
    outputs: ["User Flows", "Interface Design", "Design System"],
  },
  {
    id: "build",
    index: "04",
    title: "Build",
    duration: "Weeks 06–10",
    body: "Our developers turn approved designs into scalable, secure software using modern technologies, clean architecture, and continuous collaboration throughout the build.",
    outputs: ["Production Code", "Core Features", "Integrations"],
  },
  {
    id: "test",
    index: "05",
    title: "Test",
    duration: "Weeks 10–11",
    body: "We test performance, functionality, usability, and reliability across devices and environments, resolving issues before the product reaches real users.",
    outputs: ["Quality Testing", "Performance Review", "Launch Readiness"],
  },
  {
    id: "launch",
    index: "06",
    title: "Launch",
    duration: "Ongoing",
    body: "We deploy, monitor, and continuously improve your digital product, using real data and user feedback to support growth long after launch day.",
    outputs: ["Product Launch", "Performance Monitoring", "Continuous Growth"],
  },
];
