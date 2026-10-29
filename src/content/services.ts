export type ServiceSlug =
  | "web-development"
  | "mobile-applications"
  | "ai-solutions"
  | "software-development"
  | "saas-development"
  | "ecommerce-development"
  | "ui-ux-design"
  | "cloud-devops";

export type ServiceGroup = "Build" | "Intelligence" | "Design" | "Operations";

export interface Capability {
  title: string;
  body: string;
}

export interface Service {
  slug: ServiceSlug;
  index: string;
  title: string;
  /** Short name for chips and menus. */
  short: string;
  /** The word that rotates into the hero headline: "Ideas in. {noun} out." */
  noun: string;
  group: ServiceGroup;
  /** One line for menus and the hero ticker. */
  blurb: string;
  /** The line under the page title. */
  tagline: string;
  summary: string;
  capabilities: Capability[];
  approach: { title: string; body: string }[];
  deliverables: string[];
  /** Technology ids from `tech.ts`. Empty for design, which ships files, not code. */
  stack: string[];
  /** Case-study slugs, strongest first. Only real projects. */
  work: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    index: "01",
    title: "Web Development",
    short: "Websites",
    noun: "Websites",
    group: "Build",
    blurb: "Fast, search-ready websites that convert.",
    tagline: "Fast, responsive, search-ready websites that turn visitors into customers.",
    summary:
      "We design and develop fast, responsive, SEO-friendly websites that strengthen your online presence, engage users, and convert visitors into customers.",
    capabilities: [
      { title: "Custom Websites", body: "Designed around your brand and content — never bent to fit a template." },
      { title: "Web Applications", body: "Logged-in tools, portals and dashboards that live in the browser." },
      { title: "SEO Optimization", body: "Semantic markup, structured data and metadata so search engines understand every page." },
      { title: "Performance Engineering", body: "Lean pages, optimised media and modern rendering, so the site feels instant on any connection." },
      { title: "CMS & Content", body: "An editing experience your team can actually use, without a developer on call." },
      { title: "Accessibility", body: "Keyboard, screen-reader and contrast checks built in, not bolted on." },
    ],
    approach: [
      { title: "Map", body: "Goals, audience, sitemap and content — agreed before a single pixel." },
      { title: "Design", body: "Responsive layouts for every breakpoint, built from your brand." },
      { title: "Build", body: "Component-driven code, with a CMS or admin where you need one." },
      { title: "Launch", body: "SEO, analytics and performance checks, then a calm go-live." },
    ],
    deliverables: [
      "Responsive design for every screen",
      "CMS or admin panel when you need one",
      "On-page SEO and structured data",
      "Analytics and launch support",
    ],
    stack: ["nextjs", "react", "typescript", "node", "dotnet", "mysql"],
    work: ["peervest", "rlb-professionals", "vearrol", "ocean-cart"],
    faqs: [
      {
        q: "Can you redesign our existing website?",
        a: "Yes. We start by reviewing what works today — content, structure and search visibility — so the new site improves on it rather than starting from zero.",
      },
      {
        q: "Will we be able to update the content ourselves?",
        a: "If you need to, yes. We can build in a CMS or a custom admin so your team edits pages, products and posts without touching code.",
      },
      {
        q: "Will the site work well on phones?",
        a: "Every layout is designed for phones, tablets and desktops from the start, and tested on real devices before launch.",
      },
      {
        q: "How long does a website take?",
        a: "It depends on scope. After a short discovery call we share a written timeline with clear milestones before any work starts.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    index: "02",
    title: "Mobile App Development",
    short: "Mobile apps",
    noun: "Apps",
    group: "Build",
    blurb: "iOS and Android apps people keep.",
    tagline: "Apps people keep on their home screen — for iOS and Android.",
    summary:
      "We create intuitive, high-performance mobile applications that deliver seamless user experiences and connect businesses with customers wherever they are.",
    capabilities: [
      { title: "iOS Development", body: "iPhone apps that feel at home on the platform, prepared and published for the App Store." },
      { title: "Android Development", body: "Apps tuned for the range of Android devices your customers actually use, shipped to Google Play." },
      { title: "Cross Platform", body: "One codebase for iOS and Android when speed to market matters — without a second-rate feel." },
      { title: "App Strategy", body: "Scope, features and launch plan defined before code, so version one does the important things well." },
      { title: "Backend & Admin", body: "The API and admin panel behind the app, built alongside it." },
      { title: "Release & Updates", body: "Store submission, crash monitoring and a rhythm for the next version." },
    ],
    approach: [
      { title: "Scope", body: "The few journeys that matter most, defined and prioritised." },
      { title: "Prototype", body: "A clickable prototype, tested on real phones before code." },
      { title: "Build", body: "App, admin panel and API developed together, in sync." },
      { title: "Release", body: "Store submission, analytics and a plan for the next version." },
    ],
    deliverables: ["Clickable prototype", "iOS and Android builds", "Admin panel and API", "Store submission and release support"],
    stack: ["react", "typescript", "dotnet", "node", "mysql", "aws"],
    work: ["abwa-pharmacy", "influentem", "pacex", "aida-pro"],
    faqs: [
      {
        q: "Native or cross-platform — which should we choose?",
        a: "It depends on your features, budget and timeline. We recommend one after discovery and explain the trade-offs in plain terms.",
      },
      { q: "Do you handle App Store and Google Play submission?", a: "Yes. We prepare the builds and store listings and guide the release through review." },
      { q: "Can the app share a backend with our website?", a: "Yes — one API can serve your website, app and admin panel, so data stays in sync everywhere." },
      { q: "What happens after launch?", a: "We watch crashes and usage, fix what real users find, and plan the next release with you." },
    ],
  },
  {
    slug: "ai-solutions",
    index: "03",
    title: "AI Solutions & Automation",
    short: "AI & automation",
    noun: "AI agents",
    group: "Intelligence",
    blurb: "Assistants, automations and smart features.",
    tagline: "Practical AI that takes real work off your team's plate.",
    summary:
      "We design and build AI features and automations — assistants, document processing, smart search and workflow automation — grounded in your own data and designed around the moment the model is wrong.",
    capabilities: [
      { title: "AI Assistants", body: "Support and internal assistants that answer from your own knowledge — and show their sources." },
      { title: "Document Processing", body: "Read, classify and extract the data inside invoices, forms and emails." },
      { title: "Knowledge Search", body: "Ask your documents questions in plain language, with answers grounded in what you wrote." },
      { title: "Workflow Automation", body: "Routine steps that run themselves across your tools — with a human checkpoint where it matters." },
      { title: "AI in Your Product", body: "Summaries, recommendations and smart defaults inside your web or mobile app." },
      { title: "Evaluation & Guardrails", body: "Test sets, monitoring and safety checks, so quality is measured rather than assumed." },
    ],
    approach: [
      { title: "Find the task", body: "One workflow, with a clear input, output and a before-and-after we can measure." },
      { title: "Prototype", body: "A narrow working version on a real sample of your data." },
      { title: "Harden", body: "Guardrails, evaluation sets and human review for anything with consequences." },
      { title: "Ship & measure", body: "Integrated into the tools your team already uses, then measured against the baseline." },
    ],
    deliverables: ["Use-case assessment", "Working prototype on your data", "Production integration", "Evaluation set and monitoring"],
    stack: ["python", "typescript", "node", "postgres", "aws", "docker"],
    work: [],
    faqs: [
      {
        q: "Will our data be used to train someone else's model?",
        a: "We choose providers and settings that don't train on your data, and keep sensitive information out of prompts where it isn't needed. You'll know exactly where data goes before anything is built.",
      },
      {
        q: "Do we need a lot of data to start?",
        a: "Usually not. Most useful AI features work from documents and records you already have. We start with a small, real sample to prove the approach.",
      },
      {
        q: "What if the AI gets something wrong?",
        a: "Every feature is designed for it: sources are shown, structured output is validated, and a person approves anything with real consequences.",
      },
      {
        q: "Can you add AI to our existing product?",
        a: "Yes. We integrate AI features into existing web and mobile apps through your current backend — no rebuild required.",
      },
    ],
  },
  {
    slug: "software-development",
    index: "04",
    title: "Custom Software Development",
    short: "Custom software",
    noun: "Software",
    group: "Build",
    blurb: "Systems that run the way your business does.",
    tagline: "Custom software that runs the way your business actually does.",
    summary:
      "We build secure, scalable custom software that streamlines operations, automates workflows, and gives businesses the digital infrastructure they need to grow.",
    capabilities: [
      { title: "Web Applications", body: "Browser-based tools for operations, bookings, marketplaces and internal workflows." },
      { title: "API Development", body: "Secure, documented APIs that connect your web app, mobile apps and partners." },
      { title: "System Integration", body: "Payments, CRMs, analytics and legacy systems talking to each other — no more copy-paste." },
      { title: "Admin Portals", body: "Back-office tools that give your team control without a developer in the loop." },
      { title: "Legacy Modernisation", body: "Old systems rebuilt or wrapped step by step, without stopping the business." },
      { title: "Data & Reporting", body: "Dashboards and reports built from the data your systems already collect." },
    ],
    approach: [
      { title: "Model", body: "Map the workflows, roles and data the software has to serve." },
      { title: "Architect", body: "Choose the stack, design the data model and the APIs." },
      { title: "Build", body: "Short cycles with working releases you can click through." },
      { title: "Operate", body: "Deploy, monitor and keep improving as real usage arrives." },
    ],
    deliverables: ["Architecture and data model", "Admin and user portals", "Documented APIs", "Deployment and monitoring"],
    stack: ["typescript", "node", "dotnet", "python", "postgres", "mysql", "aws", "docker"],
    work: ["sos-hr-suite", "pacex", "ocean-cart", "aida-pro"],
    faqs: [
      {
        q: "We run on spreadsheets today. Where do we start?",
        a: "With the workflow, not the software. We map who does what, where the data lives and where time is lost, then design the smallest system that removes the bottleneck.",
      },
      { q: "Can you work with our existing systems?", a: "Yes. Integration is a core part of the work — new software connects to the tools and data you already rely on." },
      {
        q: "Will the software grow with us?",
        a: "We design data models and APIs for the next stage of the business, not just today's — and keep the code clean enough to change.",
      },
      {
        q: "Do you support the software after launch?",
        a: "Yes. Launch is a step in our process, not the end — we deploy, monitor and keep improving the product as real usage comes in.",
      },
    ],
  },
  {
    slug: "saas-development",
    index: "05",
    title: "SaaS Product Development",
    short: "SaaS products",
    noun: "Platforms",
    group: "Build",
    blurb: "Subscription products, from MVP to scale.",
    tagline: "Subscription products built to onboard, bill and scale.",
    summary:
      "We take SaaS products from first version to growing platform — accounts and roles, billing, multi-tenant data, admin tools and the analytics to run it all.",
    capabilities: [
      { title: "MVP Development", body: "A focused first version that proves the product with real, paying users." },
      { title: "Multi-Tenant Architecture", body: "Every customer's data kept separate and secure, on one codebase." },
      { title: "Billing & Subscriptions", body: "Plans, trials, upgrades and invoices wired to your payment provider." },
      { title: "Roles & Permissions", body: "Teams, invitations and access control that match how customers work." },
      { title: "Admin & Analytics", body: "An internal console to support customers and see how the product is used." },
      { title: "Public APIs", body: "APIs and integrations that make your product part of your customers' stack." },
    ],
    approach: [
      { title: "Validate", body: "Test the riskiest assumption before writing the riskiest code." },
      { title: "MVP", body: "One customer type, one core job, done properly." },
      { title: "Launch", body: "Onboarding, billing and support ready for the first real customers." },
      { title: "Scale", body: "New plans, integrations and performance as the customer base grows." },
    ],
    deliverables: ["Product roadmap and MVP scope", "Web app with accounts and billing", "Admin console", "API and documentation"],
    stack: ["nextjs", "react", "typescript", "node", "dotnet", "postgres", "aws", "docker"],
    work: ["sos-hr-suite", "aida-pro", "pacex"],
    faqs: [
      {
        q: "How small should our first version be?",
        a: "Smaller than feels comfortable: one customer type, one core job done well, and enough billing to charge for it.",
      },
      {
        q: "Which payment provider should we use?",
        a: "It depends on where your customers are. We recommend one that supports your markets and currencies, and integrate it cleanly.",
      },
      {
        q: "Can it handle larger customers later?",
        a: "We design for it from the start — roles, audit trails and data separation are far cheaper to build in than to bolt on.",
      },
      {
        q: "Do you help after launch?",
        a: "Yes. Most SaaS work happens after launch: onboarding improvements, new plans, integrations and performance.",
      },
    ],
  },
  {
    slug: "ecommerce-development",
    index: "06",
    title: "E-commerce Development",
    short: "E-commerce",
    noun: "Stores",
    group: "Build",
    blurb: "Stores built to be found and bought from.",
    tagline: "Online stores built to be found, browsed and bought from.",
    summary:
      "We build e-commerce experiences — from brand storefronts to large catalogues — with fast product discovery, a frictionless checkout and the operations tools behind them.",
    capabilities: [
      { title: "Custom Storefronts", body: "Brand-led stores designed around your products, not a theme." },
      { title: "Catalogue & Search", body: "Categories, filters and search that make large catalogues easy to browse." },
      { title: "Checkout & Payments", body: "A short, trustworthy checkout with the payment methods your customers use." },
      { title: "Orders & Inventory", body: "Admin tools for orders, stock, fulfilment and returns." },
      { title: "Headless Commerce", body: "A custom front end on a commerce platform — for speed and design freedom." },
      { title: "Store SEO", body: "Fast pages and product structured data, so products show up in search." },
    ],
    approach: [
      { title: "Plan", body: "Catalogue, customer journeys, payments and shipping, mapped up front." },
      { title: "Design", body: "Product pages and checkout designed to remove doubt and friction." },
      { title: "Build", body: "Storefront, admin and integrations, tested with real orders." },
      { title: "Grow", body: "Analytics, campaigns and improvements once customers arrive." },
    ],
    deliverables: ["Storefront design and build", "Product and order management", "Payment and shipping integration", "SEO and analytics setup"],
    stack: ["nextjs", "react", "typescript", "node", "dotnet", "mysql"],
    work: ["ocean-cart", "go4sitch", "frosted-oil"],
    faqs: [
      {
        q: "Should we use a platform or go custom?",
        a: "Many stores are best on a platform; some outgrow it. We recommend the simplest setup that fits your catalogue, markets and operations.",
      },
      { q: "Can you migrate our existing store?", a: "Yes — products, customers and orders, with redirects so you keep your search rankings." },
      {
        q: "Which payment methods can you support?",
        a: "Cards, wallets, bank transfers and cash on delivery, depending on your market and payment provider.",
      },
      { q: "Can the store connect to our inventory or accounting?", a: "Yes. Integrations with stock, accounting and fulfilment systems are part of the build." },
    ],
  },
  {
    slug: "ui-ux-design",
    index: "07",
    title: "UI/UX & Digital Design",
    short: "UI/UX design",
    noun: "Interfaces",
    group: "Design",
    blurb: "Interfaces that feel obvious.",
    tagline: "Interfaces that feel obvious — and brands people remember.",
    summary:
      "We create purposeful digital interfaces and brand experiences that combine visual clarity, usability, and strategy to make every interaction matter.",
    capabilities: [
      { title: "UI UX Design", body: "User flows, wireframes and high-fidelity screens that make complex tasks feel simple." },
      { title: "Product Design", body: "From problem framing to tested prototype — decisions grounded in how people use the product." },
      { title: "Design Systems", body: "Reusable components, tokens and guidelines that keep every screen consistent as you grow." },
      { title: "Brand Identity", body: "Logo, typography, colour and voice that make your product recognisable everywhere." },
    ],
    approach: [
      { title: "Research", body: "Users, competitors and the jobs your product is hired to do." },
      { title: "Structure", body: "Flows and wireframes that settle what goes where, and why." },
      { title: "Visualise", body: "High-fidelity UI and motion, true to your brand." },
      { title: "Systemise", body: "Components, tokens and specs, ready for development." },
    ],
    deliverables: ["User flows and wireframes", "High-fidelity UI for every screen", "Interactive prototype", "Design system and developer handoff"],
    stack: [],
    work: ["aida-pro", "abwa-pharmacy", "influentem", "go4sitch"],
    faqs: [
      {
        q: "Can you design a product someone else will build?",
        a: "Yes. We deliver organised design files, a component library and specs so any development team can build it accurately.",
      },
      { q: "Do you test designs with users?", a: "We validate key flows with clickable prototypes before development, when changing course costs least." },
      {
        q: "We already have a brand. Can you work within it?",
        a: "Absolutely. We extend existing guidelines into a digital design system rather than reinventing what already works.",
      },
      { q: "Do you design and build, or only design?", a: "Both. Design and engineering sit in the same team, so what we design is exactly what ships." },
    ],
  },
  {
    slug: "cloud-devops",
    index: "08",
    title: "Cloud & DevOps",
    short: "Cloud & DevOps",
    noun: "Pipelines",
    group: "Operations",
    blurb: "Infrastructure that deploys and stays up.",
    tagline: "Infrastructure that deploys on every merge — and stays up when it matters.",
    summary:
      "We set up and run the cloud foundations behind your product — infrastructure as code, automated pipelines, monitoring and backups — so releases are routine and outages are rare.",
    capabilities: [
      { title: "Cloud Architecture", body: "AWS environments designed around your workload, budget and growth." },
      { title: "CI/CD Pipelines", body: "Automated build, test and deploy on every change." },
      { title: "Containers", body: "Docker images that run the same on a laptop and in production." },
      { title: "Infrastructure as Code", body: "Environments defined in version control — reviewable and reproducible." },
      { title: "Monitoring & Alerts", body: "Logs, metrics and alerts, so problems are found before customers report them." },
      { title: "Backups & Recovery", body: "Automated backups and a recovery plan you've actually tested." },
    ],
    approach: [
      { title: "Audit", body: "What you run today, where the risks are and what it costs." },
      { title: "Design", body: "The target setup — right-sized, secure and documented." },
      { title: "Automate", body: "Pipelines, infrastructure as code and repeatable environments." },
      { title: "Operate", body: "Monitoring, alerts, backups and a monthly review of cost and health." },
    ],
    deliverables: ["Infrastructure as code", "CI/CD pipeline", "Monitoring dashboards and alerts", "Backup and recovery runbook"],
    stack: ["aws", "docker", "github", "node", "postgres", "mysql"],
    work: ["pacex", "aida-pro"],
    faqs: [
      {
        q: "We already have servers. Do we need to move everything?",
        a: "Not necessarily. We start with an audit and move only what benefits from it — sometimes the right answer is a better-run version of what you have.",
      },
      { q: "How do you keep cloud costs under control?", a: "Right-sized resources, tagging by project, budget alerts from day one and a monthly review." },
      { q: "Can you take over an existing setup?", a: "Yes. We document what's there, fix the riskiest gaps first and automate from there." },
      {
        q: "What happens when something breaks at night?",
        a: "Alerts route to the right people with a runbook for common failures. We agree response expectations with you before go-live.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const SERVICE_GROUPS: { id: ServiceGroup; label: string; note: string }[] = [
  { id: "Build", label: "Build", note: "Websites, apps and platforms" },
  { id: "Intelligence", label: "Intelligence", note: "AI that does real work" },
  { id: "Design", label: "Design", note: "Interfaces and identity" },
  { id: "Operations", label: "Operations", note: "Cloud that stays up" },
];
