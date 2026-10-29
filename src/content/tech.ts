export interface Tech {
  id: string;
  name: string;
  /** Keycap legend — kept to a few characters. */
  key: string;
  category: "Frontend" | "Language" | "Backend" | "Database" | "Cloud" | "DevOps";
  note: string;
}

/** The core toolkit — the ten from the studio's stack plus .NET and MySQL,
 *  which run through most of the portfolio projects. */
export const TECH: Tech[] = [
  { id: "nextjs", name: "Next.js", key: "Nx", category: "Frontend", note: "A React framework for fast, scalable, SEO-friendly web applications." },
  { id: "react", name: "React", key: "Re", category: "Frontend", note: "A flexible library for dynamic, interactive, reusable interfaces." },
  { id: "typescript", name: "TypeScript", key: "Ts", category: "Language", note: "Type safety that keeps software reliable and maintainable at scale." },
  { id: "node", name: "Node.js", key: "No", category: "Backend", note: "Fast, scalable server-side applications on the JavaScript ecosystem." },
  { id: "dotnet", name: ".NET", key: ".N", category: "Backend", note: "A proven backend framework behind most of our portfolio platforms." },
  { id: "python", name: "Python", key: "Py", category: "Language", note: "For automation, data work and intelligent features." },
  { id: "postgres", name: "PostgreSQL", key: "Pg", category: "Database", note: "A robust relational database for complex data and dependable performance." },
  { id: "mysql", name: "MySQL", key: "My", category: "Database", note: "The relational workhorse behind many of the products we have shipped." },
  { id: "mongodb", name: "MongoDB", key: "Mo", category: "Database", note: "A flexible document store for fast-evolving applications." },
  { id: "aws", name: "AWS", key: "Aw", category: "Cloud", note: "Scalable cloud infrastructure for secure, reliable products." },
  { id: "docker", name: "Docker", key: "Dk", category: "DevOps", note: "Identical environments from a laptop to production." },
  { id: "github", name: "GitHub", key: "Gh", category: "DevOps", note: "Version control, reviews and automated delivery." },
];

export const techById = (id: string) => TECH.find((t) => t.id === id);
