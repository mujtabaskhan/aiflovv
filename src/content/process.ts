export interface Step {
  id: string;
  index: string;
  title: string;
  body: string;
  outputs: string[];
}

export const PROCESS: Step[] = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    body: "Your business, users, goals and market — the foundation for every decision that follows.",
    outputs: ["Project Brief", "User Insights", "Success Metrics"],
  },
  {
    id: "define",
    index: "02",
    title: "Define",
    body: "Insights become a clear direction: priorities, requirements, technical needs and a focused roadmap.",
    outputs: ["Product Strategy", "Technical Scope", "Delivery Roadmap"],
  },
  {
    id: "design",
    index: "03",
    title: "Design",
    body: "Strategy turns into intuitive journeys and polished interfaces, tested early, built on a flexible system.",
    outputs: ["User Flows", "Interface Design", "Design System"],
  },
  {
    id: "build",
    index: "04",
    title: "Build",
    body: "Approved designs become scalable, secure software — clean architecture, continuous collaboration.",
    outputs: ["Production Code", "Core Features", "Integrations"],
  },
  {
    id: "test",
    index: "05",
    title: "Test",
    body: "Performance, functionality, usability and reliability, checked across devices before real users arrive.",
    outputs: ["Quality Testing", "Performance Review", "Launch Readiness"],
  },
  {
    id: "launch",
    index: "06",
    title: "Launch",
    body: "We deploy, monitor and keep improving — using real data and feedback long after launch day.",
    outputs: ["Product Launch", "Performance Monitoring", "Continuous Growth"],
  },
];
