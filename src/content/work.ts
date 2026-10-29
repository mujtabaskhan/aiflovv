import type { ServiceSlug } from "./services";

export type WorkKind = "Website" | "Web & Mobile" | "Mobile App";
export type Platform = "Web" | "iOS" | "Android";

export interface CaseStudy {
  slug: string;
  name: string;
  kind: WorkKind;
  industry: string;
  platforms: Platform[];
  services: ServiceSlug[];
  /** One line for cards. */
  summary: string;
  /** What the product is — taken from the client's portfolio poster. */
  overview: string;
  /** What it had to do. */
  brief: string;
  /** What we built — features visible in the delivered product. */
  built: { title: string; body: string }[];
  /** As listed on the project poster. */
  stack: string[];
  /** Portfolio poster, portrait 60:85. */
  image: string;
  /** The client's own brand colour, used to tint its page. */
  accent: string;
  /** Featured on the home page, in this order. */
  featured?: number;
}

/**
 * All eleven are real projects from the studio portfolio. Copy is drawn from
 * each project's poster; there are deliberately no invented metrics.
 */
export const WORK: CaseStudy[] = [
  {
    slug: "ocean-cart",
    name: "Ocean Cart",
    kind: "Website",
    industry: "E-commerce",
    platforms: ["Web"],
    services: ["ecommerce-development", "web-development", "software-development"],
    summary: "A one-stop online store for the UAE, with a catalogue of over two million products.",
    overview:
      "Ocean Cart is a customised e-commerce store in the UAE — a one-stop shop to find anything, with products shipped from around the world.",
    brief:
      "Merge a storefront that can carry a vast catalogue with the supply-chain operations behind it, including dedicated distribution and consolidation centres.",
    built: [
      { title: "Catalogue at scale", body: "Category navigation and search across more than two million products." },
      { title: "Product & checkout", body: "Rich product pages, variants and a cart built for fast repeat buying." },
      { title: "Operations modules", body: "Distribution and consolidation centre modules to run fulfilment smoothly." },
      { title: "Campaign-ready storefront", body: "Seasonal sale banners and collections the team can rotate." },
    ],
    stack: ["React", ".NET", "MySQL", "Python", "HTML5", "CSS3"],
    image: "/clients/ocean-cart.webp",
    accent: "#16a37a",
    featured: 1,
  },
  {
    slug: "pacex",
    name: "PaceX",
    kind: "Web & Mobile",
    industry: "Warehousing",
    platforms: ["Web", "iOS", "Android"],
    services: ["mobile-applications", "saas-development", "cloud-devops"],
    summary: "List space. Find space. Book space. A real-time marketplace for warehouse storage.",
    overview:
      "PaceX is an automated marketplace that matches buyers and sellers of warehouse space in real time — and handles the deal from beginning to end.",
    brief:
      "Replace formal RFPs with technology as the middle man: operators publish and price space, buyers find the right match, and both sides close without the paperwork.",
    built: [
      { title: "Facility configuration", body: "Operators configure facilities, publish space and manage availability and pricing over time." },
      { title: "Matching & ranking", body: "Buyers search a digital network with results curated and ranked to their needs." },
      { title: "Virtual handshake", body: "A secure, automated handshake seals the deal without a formal RFP." },
      { title: "Web and mobile apps", body: "The marketplace on the web, iOS and Android, with maps, bookings and insights." },
    ],
    stack: ["React", ".NET", "MySQL", "AWS", "Power BI", "HTML5", "CSS3"],
    image: "/clients/pacex.webp",
    accent: "#2fb24f",
    featured: 2,
  },
  {
    slug: "aida-pro",
    name: "Aida Pro",
    kind: "Web & Mobile",
    industry: "Hiring & AI Talent",
    platforms: ["Web", "iOS", "Android"],
    services: ["saas-development", "mobile-applications", "ui-ux-design"],
    summary: "A career and freelance community where data and AI professionals meet top companies.",
    overview:
      "Aida Pro is a community where data and AI professionals and companies meet — to share experience and knowledge, ask questions, and find the latest data and AI vacancies and projects.",
    brief:
      "Build an international, specialised career and freelance platform for data science, AI, analytics, data engineering and BI — matching rare talent with the companies that need it.",
    built: [
      { title: "Talent & job matching", body: "Profiles, vacancies and projects designed to match specialists with companies." },
      { title: "Community knowledge", body: "Spaces to share experience, ask questions and learn from peers." },
      { title: "Web and mobile", body: "One platform across a web application and native mobile apps." },
      { title: "Reporting", body: "Analytics and insights built on Power BI." },
    ],
    stack: ["React", ".NET", "MySQL", "AWS", "Power BI", "HTML5", "CSS3"],
    image: "/clients/aida-pro.webp",
    accent: "#18a58b",
    featured: 3,
  },
  {
    slug: "peervest",
    name: "Peervest",
    kind: "Website",
    industry: "Startup Funding",
    platforms: ["Web"],
    services: ["web-development", "software-development", "ui-ux-design"],
    summary: "A fundraising platform for emerging startups — from pre-seed to growth stage.",
    overview:
      "Peervest is a fundraising platform for emerging startups looking for pre-seed, seed and growth-stage funding to expedite their operations.",
    brief:
      "Connect startups with potential investors — and help founders find co-founders — through a diverse range of filters and listings.",
    built: [
      { title: "Startup listings", body: "Profiles that present a startup's stage, pitch and milestones." },
      { title: "Investor discovery", body: "Filters and listings that connect founders with potential investors." },
      { title: "Co-founder search", body: "A way for founders to find the partners they are missing." },
      { title: "Editorial landing pages", body: "A premium, story-led site that explains the platform to both sides." },
    ],
    stack: ["React", ".NET", "MySQL", "HTML5", "CSS3"],
    image: "/clients/peervest.webp",
    accent: "#c08a36",
    featured: 4,
  },
  {
    slug: "abwa-pharmacy",
    name: "ABWA Pharmacy",
    kind: "Mobile App",
    industry: "Pharmacy",
    platforms: ["iOS", "Android"],
    services: ["mobile-applications", "ui-ux-design"],
    summary: "An e-pharmacy app with prescription upload, ordering and delivery.",
    overview:
      "ABWA's pharmacy management software meets the end-to-end operational requirements of a comprehensive pharmacy service, with a customer app to match.",
    brief:
      "Improve digital engagement for a pharmacy: let customers find medicines, upload prescriptions and get orders delivered — while streamlining the workflow behind it.",
    built: [
      { title: "Medicine search", body: "Fast search and product pages with pricing and quantities." },
      { title: "Prescription upload", body: "Customers upload a prescription and the pharmacy delivers." },
      { title: "Checkout & delivery", body: "Delivery or pickup, saved addresses and multiple payment options." },
      { title: "Orders & alerts", body: "Ongoing and past orders, with notifications at every step." },
    ],
    stack: ["React", ".NET", "MySQL"],
    image: "/clients/abwa-pharmacy.webp",
    accent: "#3b82f6",
    featured: 5,
  },
  {
    slug: "influentem",
    name: "Influentem",
    kind: "Mobile App",
    industry: "Influencer Marketing",
    platforms: ["iOS", "Android"],
    services: ["mobile-applications", "ui-ux-design"],
    summary: "One-click influencer campaigns, connecting brands with creators across Pakistan.",
    overview:
      "Influentem helps businesses connect with a nationwide network of influencers, so brands can launch influencer marketing campaigns in one click.",
    brief:
      "Give brands access to creators with organic reach in niche categories — and give creators a simple way to find campaigns, deliver and get paid.",
    built: [
      { title: "Campaign marketplace", body: "Opportunities with requirements, skills and how-to-earn details." },
      { title: "Performance tracking", body: "Charts that show how campaigns and creators are performing." },
      { title: "Creator wallet", body: "Available balance and cash-out, right inside the app." },
      { title: "Profiles", body: "Creator profiles that brands can review before they book." },
    ],
    stack: ["React", ".NET", "MySQL"],
    image: "/clients/influentem.webp",
    accent: "#e8336d",
    featured: 6,
  },
  {
    slug: "sos-hr-suite",
    name: "SOS HR Suite",
    kind: "Website",
    industry: "HR Software",
    platforms: ["Web"],
    services: ["saas-development", "software-development"],
    summary: "A human resource management system that brings HR into one package.",
    overview:
      "SOS HR Suite is an application that consolidates numerous HR capacities — benefits, finances, recruitment and performance analysis — in one package.",
    brief:
      "Give HR admins one place to track employees, their information, status, attendance and leave — and to run payroll without spreadsheets.",
    built: [
      { title: "Employee management", body: "Employees organised by department and designation." },
      { title: "Leave management", body: "Requests, approvals and balances in one view." },
      { title: "Attendance", body: "Attendance tracking feeding straight into payroll." },
      { title: "Payroll & allowances", body: "Remittances, allowances and pay sheets generated from the admin portal." },
    ],
    stack: ["jQuery", ".NET", "MySQL", "JavaScript"],
    image: "/clients/sos-hr-suite.webp",
    accent: "#3aa58a",
  },
  {
    slug: "go4sitch",
    name: "Go4Sitch",
    kind: "Website",
    industry: "Menswear",
    platforms: ["Web"],
    services: ["ecommerce-development", "ui-ux-design"],
    summary: "Made-to-measure menswear, personalised online.",
    overview:
      "Go4Sitch is a menswear store built around true personalisation — shirts and suits made to the customer's own measurements.",
    brief:
      "Make tailoring work online: explain how it works, capture measurements and let customers design their own garment.",
    built: [
      { title: "Garment customiser", body: "Choose fabric and style details, and see the shirt come together." },
      { title: "Measurement flow", body: "A guided 'it's all in the measurements' journey." },
      { title: "How it works", body: "A step-by-step story that makes made-to-measure feel easy." },
      { title: "Catalogue & deals", body: "Collections and daily deals, managed from a dashboard." },
    ],
    stack: ["React", ".NET", "MySQL"],
    image: "/clients/go4sitch.webp",
    accent: "#2563eb",
  },
  {
    slug: "rlb-professionals",
    name: "RLB Professionals",
    kind: "Website",
    industry: "Recruitment",
    platforms: ["Web"],
    services: ["web-development", "ui-ux-design"],
    summary: "A recruitment and consultancy website built around the job search.",
    overview:
      "RLB Professionals is a recruitment and consultancy firm. Its website puts the job search first — helping candidates find the role they deserve.",
    brief:
      "Present the firm's services clearly, make roles easy to search and apply for, and keep candidates coming back.",
    built: [
      { title: "Job search", body: "A search-first hero that gets candidates to relevant roles quickly." },
      { title: "Sectors & roles", body: "Browsable categories that reflect the firm's specialisms." },
      { title: "How it works", body: "A clear path from search to application to placement." },
      { title: "Newsletter", body: "Sign-up to keep candidates informed about new openings." },
    ],
    stack: ["React", ".NET", "MySQL", "HTML5", "CSS3"],
    image: "/clients/rlb-professionals.webp",
    accent: "#f07a26",
  },
  {
    slug: "vearrol",
    name: "VearRol",
    kind: "Website",
    industry: "Home Renovation",
    platforms: ["Web"],
    services: ["web-development", "ui-ux-design"],
    summary: "A home renovation company website designed to turn visitors into enquiries.",
    overview:
      "VearRol helps homeowners build and renovate. Its website presents the company, its work and its services — and makes it easy to get in touch.",
    brief:
      "Show the quality of the work, explain what the company does, and turn interest into enquiries.",
    built: [
      { title: "Showcase-led design", body: "Large project imagery that lets the work speak first." },
      { title: "Services overview", body: "What the company does, set out simply." },
      { title: "Enquiry forms", body: "Contact and 'ask a question' forms at the moments that matter." },
      { title: "Responsive build", body: "A layout that holds up from phone to desktop." },
    ],
    stack: ["React", ".NET", "MySQL", "HTML5", "CSS3"],
    image: "/clients/vearrol.webp",
    accent: "#57b046",
  },
  {
    slug: "frosted-oil",
    name: "Frosted Oil",
    kind: "Website",
    industry: "E-commerce",
    platforms: ["Web"],
    services: ["ecommerce-development", "web-development"],
    summary: "A product-led storefront for a plant-extract brand.",
    overview:
      "Frosted Oil sells plant extracts online. The site tells the brand's story, explains its services and presents its products.",
    brief:
      "Build trust in a specialist product category with a clean, educational storefront.",
    built: [
      { title: "Brand story", body: "An immersive hero and an about section that explains the plant and the process." },
      { title: "Services", body: "What the brand offers, set out in clear, scannable blocks." },
      { title: "Product showcase", body: "Featured products presented with large, appetising imagery." },
      { title: "Get in touch", body: "Contact details and a location map, one click away." },
    ],
    stack: ["React", ".NET", "MySQL", "HTML5", "CSS3"],
    image: "/clients/frosted-oil.webp",
    accent: "#5b9a1f",
  },
];

export const workBySlug = (slug: string) => WORK.find((w) => w.slug === slug);

export const FEATURED = WORK.filter((w) => w.featured).sort(
  (a, b) => (a.featured ?? 0) - (b.featured ?? 0),
);

export const WORK_KINDS: { id: "all" | WorkKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Website", label: "Websites" },
  { id: "Web & Mobile", label: "Web & Mobile" },
  { id: "Mobile App", label: "Mobile Apps" },
];
