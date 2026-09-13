export const COMPANY = {
  name: "AiFlovv",
  wordmark: "AIFLOVV",
  tagline: "AI-Driven. Developed. Worldwide.",
  descriptor: "Digital Product & Software Studio",
  /** Search and app-store description — kept under ~160 characters. */
  summary:
    "AiFlovv designs and builds high-performance websites, custom software, mobile apps and UI/UX for ambitious businesses — from Lahore, for clients worldwide.",
  /** The line shown when the site is shared. */
  pitch:
    "We turn ambitious ideas into intelligent digital products, powerful brands, and technology built for measurable growth.",
  url: "https://aiflovv.com",
  founded: 2024,
  locations: ["Lahore"],
  email: "info@aiflovv.com",
  phone: "+92 332 1722442",
  instagram: { handle: "@aiflovv", url: "https://www.instagram.com/aiflovv/" },
  address: "Commercial Area Sector C, Bahria Town, Lahore",
  /** `address`, split into its postal parts for structured data. */
  postal: {
    street: "Commercial Area, Sector C, Bahria Town",
    locality: "Lahore",
    region: "Punjab",
    country: "PK",
  },
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work", index: "01" },
  { label: "Services", href: "#services", index: "02" },
  { label: "Technology", href: "#technology", index: "03" },
  { label: "Studio", href: "#about", index: "04" },
  { label: "Contact", href: "#cta", index: "05" },
] as const;

export const PILLARS = [
  {
    id: "strategy",
    title: "Strategy",
    body: "Every successful digital product starts with clarity. We focus on understanding the problem, defining the opportunity, and aligning technology with real business goals.",
    metric: "100%",
    metricLabel: "Goal Aligned",
  },
  {
    id: "design",
    title: "Design",
    body: "We design digital experiences around people, combining usability, visual clarity, and purposeful interaction to create products users understand and enjoy.",
    metric: "4.8/5",
    metricLabel: "User Experience",
  },
  {
    id: "engineering",
    title: "Engineering",
    body: "Our development approach prioritizes clean architecture, performance, security, and scalability so products remain reliable as businesses and user demands grow.",
    metric: "99.9%",
    metricLabel: "Platform Reliability",
  },
  {
    id: "partnership",
    title: "Partnership",
    body: "We work as an extension of your team, communicating openly, solving challenges together, and staying focused on outcomes beyond simply delivering a project.",
    metric: "Long-Term",
    metricLabel: "Client Focus",
  },
] as const;
