import { h2, type Post } from "../postTypes";

/*
 * Topic inspiration (subjects only — every article is original writing):
 * devsinc.com/blog — the mobile app development process from concept to
 * launch; native apps and cross-platform development; custom software and
 * scalability; system integration services; e-commerce for international
 * expansion; Shopify headless; the shift from DevOps to DevSecOps.
 */
export const BUILD_POSTS: Post[] = [
  {
    slug: "mobile-app-idea-to-launch",
    title: "From Idea to App Store: How a Mobile App Actually Gets Built",
    excerpt:
      "The path from a sketch on a napkin to a listing in the stores — step by step, including the parts nobody mentions.",
    category: "Mobile",
    date: "2026-09-04",
    body: [
      {
        type: "p",
        text: "Building an app is less mysterious than it looks from outside, but it has more steps than most people expect. The code is only part of it. There's a backend, an admin panel, store listings, privacy declarations, testing on devices you don't own, and a review process you don't control.",
      },
      {
        type: "p",
        text: "Here's the journey we take, what happens at each stage, and what you should have in hand before moving on.",
      },
      h2("1. Discovery and scope"),
      {
        type: "p",
        text: "Who is the app for, and which two or three journeys matter most? A booking app might live or die on “find a slot and book it in under a minute”. Everything else is secondary. We write those journeys down, decide what's in version one, and — just as important — what isn't.",
      },
      {
        type: "p",
        text: "This is also when we find the hidden work: payments, maps, notifications, integrations with systems you already use, and any rules about data your industry has. You leave this stage with a short scope everyone can point at, and an estimate based on it.",
      },
      h2("2. A prototype on real phones"),
      {
        type: "p",
        text: "Before any code, a clickable prototype runs on actual devices. People tap through the key journeys with their own thumbs, and confusing flows reveal themselves in minutes. It's the cheapest moment to discover that a screen is missing or a step is unnecessary — changing a prototype takes hours; changing a built app takes weeks.",
      },
      h2("3. Design for each platform"),
      {
        type: "p",
        text: "iPhone and Android users expect slightly different things: navigation patterns, back gestures, date pickers, system dialogs, even where buttons sit. Good apps respect those expectations while keeping one recognisable brand. The design stage produces every screen in every state — empty, loading, error, offline — not just the attractive ones.",
      },
      h2("4. Build the app, the backend and the admin together"),
      {
        type: "p",
        text: "An app is rarely just an app. There's an API behind it that stores data and enforces rules, and usually an admin panel where your team manages content, users and orders. Building all three in step keeps data, permissions and features in sync. We work in short cycles, so you can install a test build on your own phone every week or two and see real progress.",
      },
      h2("5. Test on the devices people own"),
      {
        type: "p",
        text: "Your customers don't all have the latest flagship phone. Testing covers:",
      },
      {
        type: "list",
        items: [
          "Older and lower-powered phones, and small screens.",
          "Slow or dropped connections — on a train, in a lift, between Wi-Fi and mobile data.",
          "Interruptions — a call arriving mid-payment, the app sent to the background and reopened.",
          "Permissions denied — what happens if someone says no to location or notifications?",
          "Larger text sizes and screen readers, for accessibility.",
        ],
      },
      {
        type: "p",
        text: "These cases are what separate an app that demos well from one that holds up in the real world.",
      },
      h2("6. Store submission and review"),
      {
        type: "p",
        text: "Both stores need developer accounts, screenshots for several screen sizes, descriptions, privacy details explaining exactly what data the app collects, and notes for the reviewer — including a test account if the app needs a login. Reviews can take a day or a week, and can ask for changes. Plan your launch date with a little room, and don't announce a launch day until the app is approved.",
      },
      h2("7. Launch, then listen"),
      {
        type: "p",
        text: "Crash reporting and basic analytics should be in place from the first release. In the first weeks, watch where people get stuck, which features they use, and what support questions arrive. Fix the biggest friction quickly — app updates are routine, and early users notice when you respond.",
      },
      {
        type: "callout",
        title: "The first month after launch",
        text: "Watch crash reports and real usage, fix what people trip over, and decide the next release from evidence rather than guesses.",
      },
    ],
  },
  {
    slug: "native-cross-platform-or-web-app",
    title: "Native, Cross-Platform or Web App? Choosing How to Build",
    excerpt:
      "Three ways to get your product onto phones. Each one is the right answer for someone — here's how to tell if it's you.",
    category: "Mobile",
    date: "2026-04-30",
    body: [
      {
        type: "p",
        text: "One of the first decisions in any mobile project is how to build it. The options are often argued about like sports teams. They're better treated as tools with different strengths — and the right choice depends far more on your product and your plans than on which technology is fashionable.",
      },
      h2("Native"),
      {
        type: "p",
        text: "Separate apps written for iOS and Android using each platform's own languages and tools. You get the deepest access to device features, the best performance for demanding work, and the most platform-true feel. New operating system features are available on day one.",
      },
      {
        type: "p",
        text: "The cost is two codebases, usually two sets of specialists, and every feature built twice. For products where the mobile experience is the whole business — or where hardware access is central — that cost is often worth paying.",
      },
      h2("Cross-platform"),
      {
        type: "p",
        text: "One shared codebase that produces real apps for both stores, using frameworks such as React Native or Flutter, with native modules written where a feature needs them. For most business apps — bookings, ordering, accounts, content, dashboards — it delivers a high-quality experience with one team moving faster.",
      },
      {
        type: "p",
        text: "The trade-offs are a small dependency on the framework keeping up with platform changes, and occasional extra work for features the framework doesn't cover. Well-built cross-platform apps are hard to tell apart from native ones in everyday use.",
      },
      h2("Web app (PWA)"),
      {
        type: "p",
        text: "A progressive web app is a website that can be installed on the home screen, work offline and send notifications on supported platforms. There's no store review, updates are instant, and it can share a codebase with your existing website.",
      },
      {
        type: "p",
        text: "The limits: more restricted access to device features, less consistent behaviour across platforms, and no presence in the app stores — which matters if your customers expect to find you there. For internal tools, simple ordering or content products, it can be the fastest and cheapest route.",
      },
      h2("Questions that decide it"),
      {
        type: "list",
        items: [
          "Do you need demanding device features — advanced camera work, Bluetooth hardware, heavy background processing?",
          "Must you launch on both platforms at once, with one budget?",
          "Does being in the app stores matter to your customers, or to how you'll be found?",
          "How often will the product change in the first year?",
          "Who will maintain it afterwards, and what skills does your team already have?",
        ],
      },
      h2("A simple rule of thumb"),
      {
        type: "list",
        items: [
          "Hardware-heavy or performance-critical product → native.",
          "Business app on both platforms, evolving quickly → cross-platform.",
          "Content or internal tool, speed and budget first → web app.",
        ],
      },
      {
        type: "p",
        text: "The rule bends for specific cases, but it's a good place to start the conversation.",
      },
      h2("You're not locked in forever"),
      {
        type: "p",
        text: "Many successful products started as a web app to prove demand, moved to cross-platform when the audience grew, and rewrote a single demanding feature natively later. What matters most is that your backend and data are designed cleanly, because they outlive whichever front end you choose first.",
      },
      {
        type: "quote",
        text: "Pick the option that gets real users to real value soonest. You can change the engine later; you can't get back the months.",
      },
    ],
  },
  {
    slug: "software-that-survives-success",
    title: "Building Software That Survives Its Own Success",
    excerpt:
      "Scaling isn't only about traffic. It's about data, change and the team that has to keep the system running.",
    category: "Software",
    date: "2026-07-23",
    body: [
      {
        type: "p",
        text: "The irony of successful software is that success is what breaks it. More users, more data, more features, more people changing the code. Designing for growth doesn't mean building for a million users on day one — that wastes money on problems you may never have. It means making a few decisions carefully, so growth is a matter of turning dials rather than starting again.",
      },
      h2("Scale is more than traffic"),
      {
        type: "p",
        text: "When people talk about scale they usually mean visitors. In practice, most business systems hit limits in other places first:",
      },
      {
        type: "list",
        items: [
          "Data — reports that took a second now take a minute because the tables are a hundred times bigger.",
          "Complexity — a simple change touches ten files, because rules are scattered.",
          "People — a new teammate needs a month before they feel safe changing anything.",
          "Operations — deployments are manual and nerve-wracking, so they happen less often.",
        ],
      },
      h2("Get the data model right first"),
      {
        type: "p",
        text: "Screens are easy to change. Data is not. Once a system holds years of records, changing how customers, orders, roles and their relationships are stored means migrations, downtime planning and careful testing. Time spent modelling the data properly — with constraints that stop bad data getting in — pays back for years.",
      },
      h2("Draw boundaries in the code"),
      {
        type: "p",
        text: "Group code by business area — billing, inventory, accounts, notifications — with clear interfaces between them. Billing shouldn't reach into inventory's tables directly; it should ask inventory through a defined function. When something needs to change, the blast radius stays small, and different people can work on different areas without stepping on each other.",
      },
      {
        type: "p",
        text: "This doesn't require microservices. A well-organised single application — a modular monolith — gives most of the benefits with far less operational overhead, and can be split later if a part genuinely needs to scale on its own.",
      },
      h2("Move slow work to the background"),
      {
        type: "p",
        text: "Emails, imports, exports, image processing and large reports don't need to make users wait. Background jobs and queues let the app respond instantly (“your export is being prepared”) and do the heavy work separately. As volume grows, you add more workers rather than making every request slower.",
      },
      h2("Make it observable"),
      {
        type: "p",
        text: "Logs, metrics and alerts turn “it feels slow” into “this query got slower on Tuesday after the release”. Good observability means you hear about problems before customers do, and you can see the trend before it becomes an outage. You can't fix what you can't see.",
      },
      h2("Make change safe"),
      {
        type: "p",
        text: "The real measure of healthy software is how confidently you can change it. Automated tests around the important journeys, a pipeline that deploys the same way every time, and the ability to roll back quickly turn releases from events into routine. Teams that deploy small changes often tend to break things less, not more.",
      },
      h2("Write things down"),
      {
        type: "p",
        text: "A short architecture overview, notes on why key decisions were made, and a setup guide that actually works save enormous time as the team grows. Documentation is how a system survives the people who built it moving on.",
      },
      {
        type: "callout",
        title: "Don't over-build",
        text: "Design for the next stage of the business, not the fifth. Clean structure makes it cheap to scale when the numbers ask for it.",
      },
    ],
  },
  {
    slug: "integrations-are-the-product",
    title: "Integrations Are the Product: Connecting the Tools You Already Use",
    excerpt:
      "Much of the value in business software is in the connections — and most of the risk is in how they fail.",
    category: "Software",
    date: "2026-03-05",
    body: [
      {
        type: "p",
        text: "Most businesses don't need one more tool. They need the tools they already have to talk to each other: the store and the accounting system, the CRM and the email platform, the booking calendar and the payment provider. That's integration work, and it's often where custom software delivers its clearest return.",
      },
      h2("The copy-paste tax"),
      {
        type: "p",
        text: "Every time someone re-types an order into the accounting system, exports a CSV to update a CRM, or checks stock in one system before confirming a sale in another, the business pays a small tax in time and errors. Individually the tasks are minor. Added up across a team and a year, they're a significant cost — and the errors they introduce are often discovered much later, when they're harder to fix.",
      },
      h2("Map the flow of data first"),
      {
        type: "p",
        text: "Before writing code, draw where each piece of data is created, who changes it and where it needs to end up. For each kind of record — customer, product, order, invoice — decide which system is the source of truth. When two systems disagree, the source of truth wins.",
      },
      {
        type: "p",
        text: "This step often reveals that the problem isn't technical at all: two teams were maintaining the same customer list in different places, each assuming theirs was correct.",
      },
      h2("APIs, webhooks and schedules"),
      {
        type: "list",
        items: [
          "Webhooks — the source system notifies yours the moment something changes. Fast and efficient, when the system supports it.",
          "API polling — your system asks regularly whether anything has changed. Simple and reliable, but less immediate.",
          "Scheduled batch sync — a nightly or hourly job moves data in bulk. Fine for reporting and data that doesn't need to be fresh.",
          "File exchange — sometimes the only option with older systems, and still perfectly workable with care.",
        ],
      },
      {
        type: "p",
        text: "The right choice depends on how fresh the data needs to be and what each system supports. Many integrations combine them: webhooks for speed, plus a nightly reconciliation to catch anything missed.",
      },
      h2("Design for failure"),
      {
        type: "p",
        text: "Networks drop, services go down for maintenance, and APIs occasionally return errors for no clear reason. Good integrations assume all of this will happen. They retry safely with increasing delays, never process the same event twice, and tell someone when they're stuck rather than failing silently.",
      },
      {
        type: "code",
        lang: "ts",
        code: "// Process each event exactly once, even if it's delivered twice.\nif (await processed.has(event.id)) return;\nawait syncOrder(event.payload);\nawait processed.add(event.id);",
      },
      {
        type: "p",
        text: "Failed events should land in a queue a person can inspect and replay — so a two-hour outage at your payment provider becomes a short delay, not a set of missing orders.",
      },
      h2("Security and access"),
      {
        type: "p",
        text: "Integrations hold keys to your most important systems. Give each one the narrowest access it needs, store credentials in a secrets manager rather than the code, rotate them on a schedule, and verify that incoming webhooks genuinely come from the system they claim to.",
      },
      h2("Own it after launch"),
      {
        type: "p",
        text: "APIs change versions, credentials expire, and a vendor occasionally retires an endpoint with a few months' notice. Monitoring, alerts and a named owner keep integrations working long after the project that built them. Budget for a little ongoing care; it's far cheaper than discovering a broken sync after a month of missing data.",
      },
      {
        type: "callout",
        title: "Where to start",
        text: "Pick the one copy-paste task your team complains about most. Map its data, automate it with proper error handling, and measure the time saved. It's usually the best argument for the next one.",
      },
    ],
  },
  {
    slug: "selling-across-borders",
    title: "Selling Across Borders: What a Store Needs Before It Goes International",
    excerpt:
      "Currency is the easy part. Payments, shipping, returns and search are where international e-commerce succeeds or stalls.",
    category: "E-commerce",
    date: "2026-06-25",
    body: [
      {
        type: "p",
        text: "Opening your store to another country can look like a settings change: add a currency, translate the buttons, done. In practice, customers abroad judge you on whether buying feels local — whether they understand the price, trust the payment, know when it'll arrive and what happens if it doesn't fit. Here's what that takes.",
      },
      h2("Choose the market deliberately"),
      {
        type: "p",
        text: "Start with evidence. Where do you already get visitors, enquiries or orders from abroad? Which markets have demand for your products, workable shipping costs and manageable regulation? One well-chosen market beats a dozen opened at once.",
      },
      h2("Currency and pricing"),
      {
        type: "p",
        text: "Show prices in local currency with sensible rounding — a price ending in .37 looks like a conversion, not a decision. Decide whether prices follow exchange rates automatically or stay fixed per market and are reviewed periodically. Fixed prices feel more trustworthy; floating prices protect your margin. Either way, the price on the product page must match the price at checkout. Surprises at checkout lose orders.",
      },
      h2("Language and content"),
      {
        type: "p",
        text: "Translation is the start, and machine translation alone often reads awkwardly to native speakers. Beyond words, sizes, units, date formats, address forms, product descriptions and even photography may need local adjustment. A size guide that only uses one country's sizing will generate returns.",
      },
      h2("Payments people trust"),
      {
        type: "p",
        text: "The payment methods customers expect vary widely by country — cards dominate in some places, digital wallets, bank transfers, buy-now-pay-later or cash on delivery in others. Offering the familiar ones is often the biggest single improvement to conversion in a new market. Modern payment providers make many local methods available through one integration.",
      },
      h2("Shipping, duties and returns"),
      {
        type: "list",
        items: [
          "Show realistic delivery times before checkout, not after.",
          "Be clear about who pays import duties and taxes — surprise charges on delivery are a common reason for refused parcels.",
          "Explain returns plainly: who pays, where to send it, how long refunds take.",
          "Offer tracking that works in the customer's language.",
        ],
      },
      {
        type: "p",
        text: "Uncertainty in any of these is a major reason international carts are abandoned.",
      },
      h2("Tax and compliance"),
      {
        type: "p",
        text: "Sales taxes, invoicing rules, consumer rights, product regulations and data protection laws all differ by market. Your platform needs to calculate and record taxes correctly, and you'll want local advice before launch. This is the one area where guessing is genuinely expensive.",
      },
      h2("Search, market by market"),
      {
        type: "p",
        text: "Separate URLs per market, correct language and region tags, and localised product pages let each country's search engines show the right version of your store. Keyword research matters too: people in different countries often search for the same product using different words.",
      },
      h2("Support and operations"),
      {
        type: "p",
        text: "Customers will have questions in their own language and time zone. Decide how you'll answer them, how stock is allocated across markets, and how you'll handle returns that cross borders. The operations behind the store matter as much as the storefront.",
      },
      {
        type: "callout",
        title: "Start with one market",
        text: "Launch properly in one new country, learn from real orders, then repeat. A half-localised store in five markets usually sells less than a well-localised store in one.",
      },
    ],
  },
  {
    slug: "headless-commerce-explained",
    title: "Headless Commerce, Explained Without the Hype",
    excerpt:
      "Separating your storefront from your commerce engine can unlock speed and design freedom — and add real complexity.",
    category: "E-commerce",
    date: "2025-12-11",
    body: [
      {
        type: "p",
        text: "“Headless” is one of those words that gets used as if it were automatically better. It isn't. It's a trade-off that suits some stores very well and others not at all. Here's what it actually means, what you gain, what it costs, and how to tell which side of the line you're on.",
      },
      h2("What headless means"),
      {
        type: "p",
        text: "A traditional online store uses the platform's own theme system for everything customers see. The platform stores the products and handles checkout, and it also renders the pages. A headless store splits those jobs. The platform keeps doing what it's good at — products, inventory, carts, checkout, orders — while the storefront is built as a separate, custom application that talks to the platform through its APIs.",
      },
      {
        type: "p",
        text: "The “head” is the part customers see. Headless means the commerce engine doesn't come with one; you build your own.",
      },
      h2("What you gain"),
      {
        type: "list",
        items: [
          "Speed — a custom front end can be much leaner than a theme carrying many plugins and scripts.",
          "Design freedom — layouts and interactions aren't limited by what the theme system supports.",
          "Content flexibility — combine products with rich editorial content from a dedicated CMS.",
          "Multiple storefronts — a website, an app and in-store screens can share one commerce engine.",
          "Independence — you can change the front end without migrating your orders and customers.",
        ],
      },
      h2("What it costs"),
      {
        type: "list",
        items: [
          "More engineering, both to build and to maintain — you now own a whole application.",
          "Some platform apps and plugins that inject features into the theme won't work without extra integration.",
          "Your team needs a workflow for previewing and publishing content across systems.",
          "Hosting, monitoring and security for the front end become your responsibility.",
        ],
      },
      h2("Signs headless might suit you"),
      {
        type: "list",
        items: [
          "Your brand depends on a distinctive, highly designed experience a theme can't deliver.",
          "Content — guides, stories, lookbooks — is central to how you sell.",
          "You sell through several channels and want one source of products and orders.",
          "Performance problems persist even after a well-optimised theme.",
          "You have, or can afford, ongoing engineering support.",
        ],
      },
      h2("When to stay on a theme"),
      {
        type: "p",
        text: "If your catalogue is modest, your marketing team relies on platform apps for reviews, upsells and promotions, and your theme performs well after proper optimisation, a carefully built theme is often the smarter choice. Modern commerce platforms' themes are far more capable than they used to be, and the money saved can go into photography, content and marketing — which may matter more.",
      },
      {
        type: "quote",
        text: "Go headless to solve a problem you actually have, not to own an architecture diagram.",
      },
      {
        type: "callout",
        title: "A middle path",
        text: "Many stores benefit from going headless in stages: start with a custom landing or product experience, keep checkout on the platform, and expand only if the results justify it.",
      },
    ],
  },
  {
    slug: "devsecops-for-small-teams",
    title: "DevSecOps for Teams Without a Security Department",
    excerpt:
      "You don't need a security team to ship securely. You need a pipeline that checks the boring things every time.",
    category: "Cloud",
    date: "2026-01-08",
    body: [
      {
        type: "p",
        text: "Small teams often treat security as a project for later — after launch, after the next round of features, after hiring. The trouble is that “later” tends to arrive as an incident. DevSecOps simply means building the routine checks into the same pipeline that already builds and deploys your code, so they happen without anyone remembering to do them.",
      },
      {
        type: "p",
        text: "None of what follows needs a dedicated security team. Most of it can be set up in a few days and then runs on its own.",
      },
      h2("Security as a pipeline step"),
      {
        type: "p",
        text: "If every merge is built and tested automatically, it can be scanned automatically too. Static analysis catches common coding mistakes, dependency scanning catches known vulnerabilities, and secret scanning catches keys that shouldn't be there. Problems are found while the change is small and fresh in someone's mind — not months later in an audit.",
      },
      h2("Watch your dependencies"),
      {
        type: "p",
        text: "Most of the code in a modern application comes from open-source packages, and each of those has dependencies of its own. Turn on automated alerts for known vulnerabilities, keep a lockfile so builds are reproducible, and make small, regular updates a habit. Updating a little every week is far easier than a painful upgrade once a year.",
      },
      h2("Keep secrets out of code"),
      {
        type: "p",
        text: "API keys, database passwords and tokens belong in a secrets manager or environment configuration — never in the repository, where they live forever in the history. Scanners can block a commit that accidentally includes one. If a secret does leak, rotate it immediately; deleting the commit isn't enough.",
      },
      h2("Least privilege, everywhere"),
      {
        type: "p",
        text: "People, services and deployment pipelines should have only the access they need. A developer doesn't need production database access day to day; a deployment pipeline doesn't need permission to delete backups. Limiting access limits the damage of a leaked key or a compromised account — and makes it easier to see who can do what.",
      },
      h2("Protect the accounts"),
      {
        type: "p",
        text: "Many incidents start with a stolen password rather than a clever exploit. Require multi-factor sign-in for every account that touches code, cloud infrastructure, domains and email. Remove access promptly when people leave. Review who has admin rights every few months.",
      },
      h2("Patch the platform"),
      {
        type: "p",
        text: "Operating systems, container images and runtimes need updates too. Managed services handle much of this for you, which is one reason they're often the right choice for small teams. For anything you run yourself, schedule regular updates and rebuild images from fresh bases.",
      },
      h2("Backups you've restored"),
      {
        type: "p",
        text: "Security includes recovering from bad days — a deleted table, a broken migration, ransomware. Automated backups are only real once you've restored one and timed it. Keep at least one copy somewhere a compromised account can't delete it.",
      },
      h2("Know what's happening"),
      {
        type: "p",
        text: "Centralised logs, alerts for unusual activity — repeated failed logins, unexpected admin actions, spikes in errors — and an alert route that reaches a real person. Write a one-page plan for what to do if something goes wrong: who to call, how to rotate keys, how to inform customers. You'll be glad it exists.",
      },
      {
        type: "callout",
        title: "A starter checklist",
        text: "Dependency alerts on, secret scanning on, multi-factor sign-in for every account, least-privilege access, tested backups, and an alert that reaches a human.",
      },
    ],
  },
];
