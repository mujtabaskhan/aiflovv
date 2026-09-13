export type TechCategory =
  | "frontend"
  | "language"
  | "backend"
  | "database"
  | "cloud"
  | "devops";

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
  /** Short line shown when the technology is focused. */
  note: string;
}

export const CATEGORY_LABEL: Record<TechCategory, string> = {
  frontend: "Frontend",
  language: "Language",
  backend: "Backend",
  database: "Database",
  cloud: "Cloud",
  devops: "DevOps",
};

/**
 * In the 3D stack these stand on four floors — interface, services & APIs,
 * data, cloud & DevOps (see TECH_LAYERS in lib/interfaceAtlas.ts).
 */
export const TECHNOLOGIES: Technology[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    note: "A powerful React framework for fast, scalable, SEO-friendly web applications.",
  },
  {
    id: "react",
    name: "React",
    category: "frontend",
    note: "A flexible library for building dynamic, interactive, and reusable user interfaces.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "language",
    note: "Adds type safety that helps create reliable and maintainable software at scale.",
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    note: "Enables fast, scalable server-side applications using a modern JavaScript ecosystem.",
  },
  {
    id: "python",
    name: "Python",
    category: "language",
    note: "A versatile language for automation, backend systems, data, and intelligent applications.",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    category: "database",
    note: "A robust relational database built for complex data and dependable performance.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    note: "A flexible database that supports rapidly evolving applications and modern data structures.",
  },
  {
    id: "aws",
    name: "AWS",
    category: "cloud",
    note: "Provides scalable cloud infrastructure for deploying secure and reliable digital products.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    note: "Creates consistent development and deployment environments across teams and infrastructure.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "devops",
    note: "Supports collaborative development, version control, automation, and streamlined software delivery.",
  },
];

