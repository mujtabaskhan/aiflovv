import { h2, type Block, type Post, type PostCategory } from "./postTypes";
import { AI_POSTS } from "./posts/ai";
import { WEB_POSTS } from "./posts/web";
import { BUILD_POSTS } from "./posts/build";

export type { Block, Post, PostCategory };

const ORIGINAL_POSTS: Post[] = [
  {
    slug: "where-generative-ai-fits",
    title: "Where Generative AI Actually Fits in Daily Operations",
    excerpt:
      "Skip the demo-day magic. The useful places for AI in a business are specific, a little boring, and easy to check.",
    category: "AI",
    date: "2026-09-18",
    body: [
      {
        type: "p",
        text: "Most conversations about AI start with the model. The useful ones start with a task — a specific, repeated piece of work that someone on your team does every week and would happily never do again. Find that, and you have a candidate. Start from the model, and you usually end up with a chatbot nobody opens.",
      },
      h2("Start with the task, not the model"),
      {
        type: "p",
        text: "Write down the task in one sentence, the input it starts from and the output it produces. \"Turn a supplier's PDF invoice into a row in our accounts sheet\" is a task. \"Use AI for finance\" is not. If you can't describe the input and output, no model will fix that — the process needs defining first.",
      },
      h2("Three places it earns its keep"),
      {
        type: "list",
        items: [
          "Drafting — first versions of product descriptions, replies, reports and summaries that a person then edits. The human stays the author; the blank page disappears.",
          "Sorting — classifying support tickets, routing enquiries, tagging documents, pulling fields out of messy text. Repetitive judgement calls with a clear right answer.",
          "Finding — search across your own documents, policies and past work, answering in plain language and pointing to the source.",
        ],
      },
      {
        type: "p",
        text: "Notice what these share: the output is easy for a person to check. That is the single best predictor of whether an AI feature will survive contact with a real team.",
      },
      h2("Where it doesn't belong — yet"),
      {
        type: "p",
        text: "Be careful anywhere a wrong answer is expensive and hard to spot: decisions with legal or financial consequences, anything that needs exact figures, and tasks where even your experts disagree on the right answer. In those places AI can still assist — gathering, summarising, flagging — but a person should decide.",
      },
      {
        type: "quote",
        text: "The best AI feature is one your team forgets is AI. It just feels like the software got smarter.",
      },
      h2("Design for the wrong answer"),
      {
        type: "p",
        text: "Every model is sometimes wrong, so the interface around it matters more than the model itself. Show where an answer came from. Make editing faster than starting over. Validate structured output before it touches your database. Log what the model produced, so you can see where it struggles and improve it.",
      },
      h2("A small first project"),
      {
        type: "callout",
        title: "A good first project",
        text: "One workflow, one team, one measurable before-and-after. Time the task today, ship a narrow tool, and time it again a month later. If it didn't help, you learned cheaply.",
      },
      {
        type: "p",
        text: "Small, specific and checkable beats ambitious and vague. Once one workflow is genuinely faster, the next candidate is usually obvious — and your team will be the ones pointing it out.",
      },
    ],
  },
  {
    slug: "mobile-app-feel-fast",
    title: "What Actually Makes a Mobile App Feel Fast",
    excerpt:
      "Speed on a phone is mostly perception. Here's how we design apps that feel instant, even on a slow connection.",
    category: "Mobile",
    date: "2026-08-27",
    body: [
      {
        type: "p",
        text: "Users don't run benchmarks. They tap something and decide, almost instantly, whether the app is quick or sluggish. That judgement is shaped less by how many milliseconds the server takes and more by what the screen does while it waits.",
      },
      h2("Respond to every touch, immediately"),
      {
        type: "p",
        text: "A button that changes the moment it is pressed feels fast even if the work behind it takes a second. A button that does nothing until the network replies feels broken. The rule is simple: acknowledge every touch at once — a pressed state, a ripple, a spinner in place of the label — then do the work.",
      },
      h2("Show something straight away"),
      {
        type: "p",
        text: "An empty screen with a spinner tells people to wait. A screen that already shows the layout — cached data from last time, or skeletons in the shape of the content — tells them it's nearly there. Keep the last good data on the device and refresh it quietly in the background.",
      },
      h2("Be optimistic"),
      {
        type: "p",
        text: "When someone likes a post, adds an item to a cart or marks a task done, update the screen first and sync after. Most requests succeed; for the few that fail, roll back clearly and explain why. It's one of the cheapest ways to make an app feel dramatically quicker.",
      },
      {
        type: "code",
        lang: "ts",
        code: "// Optimistic update: change the UI first, reconcile after.\nsetCart((c) => [...c, item]);\ntry {\n  await api.cart.add(item.id);\n} catch {\n  setCart((c) => c.filter((i) => i.id !== item.id));\n  toast(\"Couldn't add that item — please try again.\");\n}",
      },
      h2("Send less over the wire"),
      {
        type: "list",
        items: [
          "Paginate long lists instead of loading everything at once.",
          "Serve images at the size the screen actually needs.",
          "Ask the API for the fields a screen uses, not the whole record.",
          "Prefetch the screen a user is most likely to open next.",
        ],
      },
      h2("Motion that explains"),
      {
        type: "p",
        text: "Good animation hides nothing — it shows where things came from and where they went. A card that expands into a detail screen keeps people oriented, so the transition itself feels like progress rather than a delay. Keep it short and purposeful, and never block input while it plays.",
      },
      {
        type: "quote",
        text: "Fast isn't a number on a dashboard. It's the absence of the moment where someone wonders whether the app heard them.",
      },
    ],
  },
  {
    slug: "cloud-for-small-teams",
    title: "What Cloud Infrastructure Actually Changes for a Small Team",
    excerpt:
      "The cloud doesn't remove operations work — it changes its shape. What small teams gain, what they take on, and when a simple server is still the right call.",
    category: "Cloud",
    date: "2026-07-30",
    body: [
      {
        type: "p",
        text: "\"Move to the cloud\" gets sold as a way to stop worrying about servers. For a small team, the honest version is more interesting: you stop maintaining hardware and start maintaining configuration. That trade is usually worth it — if you know what you're signing up for.",
      },
      h2("You trade servers for configuration"),
      {
        type: "p",
        text: "Nobody on your team will replace a failed disk again. Instead, someone needs to understand permissions, networking and the services you've chosen. Keep that configuration in code, in version control, reviewed like any other change — so your infrastructure is documented by default and reproducible on demand.",
      },
      h2("Deploys become boring — in a good way"),
      {
        type: "p",
        text: "With containers and an automated pipeline, a release becomes a merged pull request rather than an evening of nervous manual steps. The same image runs on a laptop, in staging and in production, which removes a whole category of \"works on my machine\" problems.",
      },
      h2("Pay for what you use — and watch what you use"),
      {
        type: "p",
        text: "Usage-based pricing is great when you're small and spiky. It's also how forgotten test environments quietly cost money for months. Tag resources by project, set budget alerts on day one, and review the bill monthly the way you'd review any other subscription.",
      },
      h2("Backups you have actually tested"),
      {
        type: "p",
        text: "Managed databases make automated backups easy to switch on. The step most teams skip is restoring one. Schedule a restore drill — into a separate environment — so you know how long recovery takes before you need it.",
      },
      {
        type: "callout",
        title: "A sensible starting point",
        text: "A managed database, containers for your app, automated deploys from your main branch, and budget alerts. Add more only when a real problem asks for it.",
      },
      h2("When a simple server is still right"),
      {
        type: "p",
        text: "A brochure site, an internal tool with a handful of users, a prototype you're testing with five customers — these often run perfectly well on a single, well-maintained server. The cloud earns its complexity when you need to scale, recover quickly or ship many times a week. Choose the setup your product needs this year, not the one you might need in five.",
      },
    ],
  },
  {
    slug: "website-or-web-app",
    title: "Website or Web App? How to Tell What You Actually Need",
    excerpt:
      "The difference decides your budget, timeline and team. One question usually settles it.",
    category: "Web",
    date: "2026-06-24",
    body: [
      {
        type: "p",
        text: "Clients often arrive asking for a website when they need an application — or for an app when a fast, well-made website would do the job better. The distinction matters, because it changes the budget, the timeline and the people you need.",
      },
      h2("The one-question test"),
      {
        type: "p",
        text: "Do your users sign in to get work done? If people mostly read, browse, compare and contact you, you need a website. If they log in to create, manage or transact — bookings, dashboards, orders, records — you need a web application.",
      },
      h2("Signs you need a website"),
      {
        type: "list",
        items: [
          "Success means people find you, trust you and get in touch.",
          "Content changes weekly, not every second.",
          "Search visibility and page speed matter more than complex features.",
          "Your team needs to edit pages without a developer.",
        ],
      },
      h2("Signs you need a web app"),
      {
        type: "list",
        items: [
          "Users have accounts, roles and data of their own.",
          "The product replaces a spreadsheet, a paper form or an email chain.",
          "It needs to talk to payment providers, ERPs or other systems.",
          "Different people see different things depending on who they are.",
        ],
      },
      h2("The hybrid most businesses end up with"),
      {
        type: "p",
        text: "Many products need both: a public, search-friendly marketing site and an application behind a login. Building them as two parts that share a design system and an API keeps each one simple — the site stays fast and editable, the app stays focused on the work.",
      },
      {
        type: "quote",
        text: "Build the smallest thing that proves the value, then let real usage tell you what comes next.",
      },
      h2("Start with the smallest thing"),
      {
        type: "p",
        text: "If you're unsure, start with the website and one well-chosen interactive feature. You'll learn what customers actually use before investing in a full platform — and nothing you build is wasted when the application comes later.",
      },
    ],
  },
  {
    slug: "design-systems-small-teams",
    title: "Design Systems Aren't Just for Big Companies",
    excerpt:
      "You don't need a dedicated team or a hundred components. A small design system pays for itself the second time you build a screen.",
    category: "Design",
    date: "2026-05-21",
    body: [
      {
        type: "p",
        text: "\"Design system\" sounds like something for companies with fifty designers. In practice it's simply a shared set of decisions — colours, type, spacing, components — written down once so nobody has to make them again. Small teams benefit the most, because they have the least time to waste.",
      },
      h2("The cost of not having one"),
      {
        type: "p",
        text: "Without a system, every new screen quietly invents its own button, its own grey and its own spacing. Each choice is small; together they make a product feel inconsistent and slow to build. Developers rebuild what already exists, and every redesign touches every page.",
      },
      h2("Start with tokens"),
      {
        type: "p",
        text: "Tokens are named values: your brand colours, a type scale, a spacing scale, corner radii, shadows. Name them by purpose rather than appearance, so they survive a rebrand.",
      },
      {
        type: "code",
        lang: "css",
        code: ":root {\n  --color-surface: #0b1020;\n  --color-accent: #4f7cff;\n  --space-2: 0.5rem;\n  --space-4: 1rem;\n  --radius-card: 1.25rem;\n}",
      },
      h2("Then the components you already repeat"),
      {
        type: "p",
        text: "Don't design a library up front. Look at what you've already built and extract the pieces that appear again and again: buttons, inputs, cards, navigation, modals. Make each one handle its real states — hover, focus, disabled, loading, error — and stop there.",
      },
      h2("Document decisions, not just components"),
      {
        type: "p",
        text: "A component gallery shows what exists; good documentation explains when to use what. One line — \"use the secondary button for actions that leave the page\" — prevents a dozen inconsistent choices later.",
      },
      {
        type: "callout",
        title: "Where to begin",
        text: "Tokens, five core components and a page of written rules. Grow it only when a real screen asks for something new.",
      },
    ],
  },
  {
    slug: "first-two-weeks",
    title: "The First Two Weeks of a Software Project",
    excerpt:
      "Why we don't start with code — and what you should have in your hands before any is written.",
    category: "Process",
    date: "2026-04-16",
    body: [
      {
        type: "p",
        text: "The most expensive mistakes in software are made before anyone writes a line of code: building the wrong thing, for the wrong people, in the wrong order. That's why the first two weeks of every project we run are about understanding, not building.",
      },
      h2("Week one: Discover"),
      {
        type: "p",
        text: "We learn your business, your users, your goals and your market. We talk to the people who will use the product, look at the tools they use today, and find where time and money are being lost. The output is concrete: a project brief, user insights and success metrics — what \"this worked\" will actually mean.",
      },
      h2("Week two: Define"),
      {
        type: "p",
        text: "Insights become direction. We set priorities, write requirements, decide the technical approach and shape a focused roadmap. You leave the week with a product strategy, a technical scope and a delivery roadmap you can hold us to.",
      },
      {
        type: "quote",
        text: "A clear scope is the kindest thing you can give a development team — and the best protection for your budget.",
      },
      h2("What you should have at the end"),
      {
        type: "list",
        items: [
          "A one-page brief anyone in your company can understand.",
          "A prioritised list of features — and an honest list of what's out of scope.",
          "The technical approach, explained in plain language.",
          "A roadmap with milestones you can check progress against.",
        ],
      },
      h2("Questions to ask any studio"),
      {
        type: "list",
        items: [
          "What will I have after the first two weeks?",
          "How will I see progress during the build?",
          "Who exactly is working on my project?",
          "What happens after launch?",
        ],
      },
      {
        type: "p",
        text: "If a team can't answer those clearly, the project will feel unclear too. If they can, the next ten weeks become what they should be: steady, visible progress towards something everyone already agrees on.",
      },
    ],
  },
];

/** Every article, newest first. */
export const POSTS: Post[] = [...ORIGINAL_POSTS, ...AI_POSTS, ...WEB_POSTS, ...BUILD_POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);

export const POST_CATEGORIES: ("All" | PostCategory)[] = [
  "All",
  "AI",
  "Web",
  "Mobile",
  "Software",
  "E-commerce",
  "Design",
  "Cloud",
  "Process",
];

/** Words per minute for a comfortable read. */
export function readingTime(post: Post) {
  const words = post.body
    .map((b) =>
      b.type === "list" ? b.items.join(" ") : b.type === "code" ? b.code : b.type === "callout" ? `${b.title} ${b.text}` : b.text,
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
