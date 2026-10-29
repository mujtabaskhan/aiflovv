import { h2, type Post } from "../postTypes";

/*
 * Topic inspiration (subjects only — every article is original writing):
 * devsinc.com/blog — vibe-coded CRMs and their real cost; integrating AI in
 * mobile apps; agentic AI; AI integration services for workflows.
 */
export const AI_POSTS: Post[] = [
  {
    slug: "vibe-coded-software-real-cost",
    title: "The Real Cost of Vibe-Coded Software, Three Years In",
    excerpt:
      "AI can produce a working app in an afternoon. The bill arrives later — in maintenance, security and the features nobody planned for.",
    category: "AI",
    date: "2026-10-14",
    body: [
      {
        type: "p",
        text: "It has never been easier to make software that works on the first try. Describe what you want, accept the suggestions, and by the evening there's a dashboard with a login screen and a database behind it. For a demo or an internal experiment, that's genuinely wonderful. The trouble starts when the experiment quietly becomes the system the business runs on.",
      },
      {
        type: "p",
        text: "“Vibe coding” — building by prompting and accepting whatever works, without really reading the result — is not a bad idea. It's a tool with a particular cost curve: almost free at the start, increasingly expensive over time. This article follows that curve across three years, because that's roughly how long it takes for the bill to arrive in full.",
      },
      h2("The afternoon demo is real"),
      {
        type: "p",
        text: "Let's be fair to the tools: the speed is not an illusion. AI-assisted coding is excellent at the first 80% of an application — screens, forms, basic data storage, the happy path where every customer behaves and every input is valid. If your goal is to test an idea with five friendly users, it may be exactly the right call. You learn whether anyone wants the thing before spending real money on it.",
      },
      {
        type: "p",
        text: "The question isn't whether it works today. It's what it costs to keep working once real customers, real data and real money flow through it — and whether anyone on your team actually understands how it works.",
      },
      h2("Year one: the gaps appear"),
      {
        type: "p",
        text: "The first year is usually fine on the surface. The cracks appear in the places a prompt rarely mentions, because the person writing the prompt was thinking about features, not failure.",
      },
      {
        type: "list",
        items: [
          "Permissions — who can see which records was never really designed, so it's patched one complaint at a time. A sales rep can see every customer; a contractor can export the whole database.",
          "Edge cases — refunds, partial orders, time zones, duplicate sign-ups and customers with two accounts arrive with real usage, and each is handled differently in different places.",
          "Validation — data that should never exist starts appearing in the database: negative quantities, missing emails, dates in the wrong format. Reports stop matching what people see on screen.",
          "Security — API keys in the code, missing rate limits on the login form, and dependencies nobody is tracking for known vulnerabilities.",
        ],
      },
      {
        type: "p",
        text: "None of these are exotic. They're the unglamorous 20% that experienced engineers build in by habit — and that generated code only includes when someone knew to ask.",
      },
      h2("Year two: change gets expensive"),
      {
        type: "p",
        text: "Generated code tends to solve each request in isolation. Ask for a discount feature and you get one; ask for a second kind of discount three months later and you often get a second, slightly different implementation next to the first. Without a consistent structure, the same business rule ends up living in several places, each a little different.",
      },
      {
        type: "p",
        text: "Without tests, nobody can say with confidence what a change will break. So every release needs someone to click through the whole app by hand. Small changes start taking days. The software still works — it has just become slow and nervous to change, and the people who depend on it learn to stop asking for improvements.",
      },
      {
        type: "quote",
        text: "The cheapest software to build is rarely the cheapest software to own.",
      },
      h2("Year three: the rebuild conversation"),
      {
        type: "p",
        text: "Eventually someone asks whether it would be faster to start again. Sometimes it is. But by now the system holds years of business data and habits, so a rebuild means migrating messy data, retraining staff and often running two systems side by side for a while. The afternoon of speed has turned into a quarter of careful untangling — and a rebuild done in a hurry can repeat the same mistakes.",
      },
      h2("Signs your app has outgrown its prototype"),
      {
        type: "list",
        items: [
          "Nobody can explain how a core feature works without opening the code and guessing.",
          "The same bug has been “fixed” more than once.",
          "You avoid upgrading packages because something always breaks.",
          "Customer data, payments or health information pass through it.",
          "Releases happen less often than they used to, and each one feels risky.",
        ],
      },
      h2("Rescue before you rewrite"),
      {
        type: "p",
        text: "A full rewrite is rarely the first step. A steadier path is to make the existing system safe to change, then replace the weakest parts one at a time. In practice that means:",
      },
      {
        type: "list",
        items: [
          "Write tests around the journeys that make money — sign-up, checkout, invoicing — before touching anything else.",
          "Document the real data model and permissions, then fix the most dangerous gaps first.",
          "Run a security review: secrets, authentication, access rules and dependency updates.",
          "Set up a deployment pipeline, so every change is built, tested and released the same way.",
          "Replace modules incrementally behind stable interfaces, instead of switching everything over in one weekend.",
        ],
      },
      h2("How to use AI coding well"),
      {
        type: "p",
        text: "None of this is an argument against AI-assisted development. Used well, it makes good engineers noticeably faster. The difference is who stays in charge of the design.",
      },
      {
        type: "list",
        items: [
          "Prototype with it freely — then decide deliberately what graduates to production.",
          "Keep a human who understands the architecture accountable for every merge.",
          "Ask for tests alongside features, and actually run them in a pipeline.",
          "Write down the data model and permissions before generating screens.",
          "Review generated code the way you'd review a new colleague's: kindly, but properly.",
        ],
      },
      {
        type: "callout",
        title: "The rule of thumb",
        text: "Use AI to go faster through the engineering, not to skip it. Speed is a gift when it compounds; it's a loan when it doesn't.",
      },
    ],
  },
  {
    slug: "adding-ai-to-mobile-apps",
    title: "Adding AI to a Mobile App Without Making It Worse",
    excerpt:
      "A good AI feature on a phone feels like the app got smarter. A bad one feels slow, nosy and unreliable. The difference is in the design.",
    category: "AI",
    date: "2026-07-09",
    body: [
      {
        type: "p",
        text: "Phones are personal, small and impatient. That makes them the hardest place to add AI well — and the most rewarding when it works. The goal isn't to put a chatbot in the corner of your app. It's to make the moments people already have a little faster, a little easier, a little less annoying.",
      },
      {
        type: "p",
        text: "This is a practical guide to doing that: where to look for opportunities, where the model should run, and the design details that decide whether people trust the feature or turn it off.",
      },
      h2("Start from a moment, not a model"),
      {
        type: "p",
        text: "The weakest AI features start with “we should use AI” and go looking for a place to put it. The strongest start with friction you can already see in your analytics or support inbox. Look for the moments where users:",
      },
      {
        type: "list",
        items: [
          "Type a lot on a small keyboard — long descriptions, addresses, repetitive notes.",
          "Search, scroll and give up because they don't know the exact words.",
          "Copy information from one place to another — a receipt, a label, a screenshot.",
          "Read something long to find the one line that matters to them.",
        ],
      },
      {
        type: "p",
        text: "A field pre-filled from a photo, a long thread summarised in three lines, a search that understands what someone meant rather than what they typed — those are AI features people notice in a good way, often without thinking of them as AI at all.",
      },
      h2("On the device, or on the server?"),
      {
        type: "p",
        text: "Modern phones can run useful models locally. Recognising text in a photo, detecting objects, simple classification and some language tasks run on the device itself — fast, private and available offline. Larger language tasks usually run on a server you control, calling a hosted model.",
      },
      {
        type: "list",
        items: [
          "On-device — instant, private, works offline, no per-request cost; limited model size and older phones may struggle.",
          "Server-side — far more capable models, easy to update without an app release; needs a connection, adds latency and an ongoing cost per request.",
          "Hybrid — a quick on-device step (read the text from the photo) followed by a server call only when needed (interpret it). Often the best of both.",
        ],
      },
      {
        type: "p",
        text: "One firm rule: never put a model provider's API key inside the app. Anything shipped to a phone can be extracted. Route requests through your own backend, where you can authenticate users, apply rate limits and keep costs under control.",
      },
      h2("Latency is the user experience"),
      {
        type: "p",
        text: "A two-second wait in a chat window is tolerable; the same wait after tapping a button feels broken. The design has to absorb the time the model needs.",
      },
      {
        type: "list",
        items: [
          "Stream text as it's generated, so people see progress immediately.",
          "Show skeletons that match the shape of the result, not a generic spinner.",
          "Never block the rest of the app — people should be able to keep working while the model thinks.",
          "If a task genuinely takes a while, make it background work and notify people when it's ready.",
          "Cache results that don't change, so the second visit is instant.",
        ],
      },
      {
        type: "quote",
        text: "On a phone, a feature that is slow is a feature that is off.",
      },
      h2("Privacy and permissions"),
      {
        type: "p",
        text: "Be explicit about what leaves the device and why. Ask for camera, microphone or photo permissions at the moment they're needed, explain the benefit in one sentence, and give people a way to use the app without the AI feature. Check what your model provider does with the data you send, and say so in your privacy policy in plain words. Trust lost on a phone is very hard to win back.",
      },
      h2("Fail gracefully"),
      {
        type: "p",
        text: "Models are sometimes wrong, networks drop and providers have outages. A good AI feature is designed so that none of those moments leaves the user stuck.",
      },
      {
        type: "list",
        items: [
          "Always show the source or the original next to an AI-generated summary.",
          "Make every suggestion editable before it's saved.",
          "When the network or the model fails, fall back to the normal, manual flow — silently if possible.",
          "Avoid confident wording for uncertain results; “Looks like…” beats “This is…”.",
        ],
      },
      h2("Measure whether it helps"),
      {
        type: "p",
        text: "Before launch, collect a small set of real examples with known good answers and test against them whenever the prompt or model changes. After launch, watch behaviour, not just usage: how often people accept a suggestion unchanged, edit it, or undo it. A feature people constantly correct is costing them time, however impressive it looks in a demo.",
      },
      h2("Good first features"),
      {
        type: "callout",
        title: "Where to begin",
        text: "Smarter search, summaries of long content, data capture from photos and drafted replies. Each is easy to check, easy to undo and immediately useful — a solid base to build on.",
      },
    ],
  },
  {
    slug: "chatbot-rag-or-agent",
    title: "Chatbot, RAG or Agent? Picking the Right Shape for an AI Feature",
    excerpt:
      "Three very different things get called “AI” in product meetings. Knowing which one you need saves months.",
    category: "AI",
    date: "2026-05-28",
    body: [
      {
        type: "p",
        text: "When a team says it wants “AI”, it usually means one of three shapes. They differ in what the model knows, what it's allowed to do, and how much can go wrong. Choosing the right shape is most of the design work — and choosing the wrong one is the most common reason AI projects disappoint.",
      },
      {
        type: "p",
        text: "Here's how each shape works, what it's good at, how it fails, and a simple way to decide between them.",
      },
      h2("Shape one: the chatbot"),
      {
        type: "p",
        text: "A conversation with a general-purpose model plus some instructions about tone and purpose. It's quick to build and genuinely good at drafting, rephrasing, summarising text the user pastes in, and brainstorming.",
      },
      {
        type: "p",
        text: "Its weakness is that it only knows what it learned in training. Ask about your refund policy or a customer's order and it has no way of knowing — but it may answer anyway, fluently and wrongly. That makes a plain chatbot a poor choice for anything where facts about your business matter.",
      },
      h2("Shape two: retrieval (RAG)"),
      {
        type: "p",
        text: "Retrieval-augmented generation adds a search step. Before answering, the system looks through your own documents — policies, manuals, product data, past tickets — and hands the most relevant passages to the model along with the question. The model answers from what you've actually written, and can link to its sources so people can check.",
      },
      {
        type: "code",
        lang: "ts",
        code: "// Retrieval in three steps\nconst passages = await search(question, { topK: 5, user });\nconst answer = await model.answer({ question, context: passages });\nreturn { answer, sources: passages.map((p) => p.url) };",
      },
      {
        type: "p",
        text: "The quality of a retrieval system depends far more on the search than on the model. A few details matter a lot:",
      },
      {
        type: "list",
        items: [
          "Clean sources — outdated or contradictory documents produce outdated or contradictory answers.",
          "Sensible chunking — splitting documents so each passage makes sense on its own.",
          "Freshness — re-indexing when documents change, so answers don't lag behind policy.",
          "Permissions — searching only what the person asking is allowed to see (note the user in the code above).",
          "Saying “I don't know” — when nothing relevant is found, the right answer is to say so.",
        ],
      },
      {
        type: "p",
        text: "For most internal assistants, help centres and document-heavy workflows, retrieval is the right starting point.",
      },
      h2("Shape three: the agent"),
      {
        type: "p",
        text: "An agent can take actions. Given a goal, it decides which tools to use — look up an order, update a record, issue a refund, send an email, call another system — and works through the steps. That's powerful, and it's where mistakes stop being embarrassing and start being expensive.",
      },
      {
        type: "list",
        items: [
          "Give it narrow tools — “refund up to the order total” rather than general database access.",
          "Require a person to approve anything consequential: money, customer messages, deletions.",
          "Log every step, so you can see exactly what it did and why.",
          "Set limits on how many steps it can take and how much it can spend.",
          "Test it against tricky scenarios, including users who try to talk it into things.",
        ],
      },
      h2("How to choose"),
      {
        type: "list",
        items: [
          "Need words, not facts? A chatbot is enough.",
          "Need answers about your own business? Use retrieval, and show sources.",
          "Need things done in other systems? Consider an agent — with approval steps.",
          "Not sure? Start with retrieval. It's useful on its own and becomes the foundation for an agent later.",
        ],
      },
      {
        type: "quote",
        text: "Start with the least autonomy that solves the problem. You can always give a system more freedom; taking it back is harder.",
      },
      h2("A natural progression"),
      {
        type: "p",
        text: "The shapes build on each other. A help-centre assistant starts as retrieval over your support articles. Once it answers well, it gains one read-only tool: looking up an order's status. Later, with approval, it can draft a refund for a person to confirm. Each step adds autonomy only after the previous one has earned trust with real usage.",
      },
      h2("What stays the same"),
      {
        type: "p",
        text: "Whatever the shape, the essentials don't change: a set of real test questions with known good answers, run every time something changes; logging so you can see what the system did; a way for users to flag bad answers; and an interface that makes checking and correcting easy. Those habits matter more than which model you pick.",
      },
    ],
  },
  {
    slug: "workflows-worth-automating",
    title: "Five Workflows Worth Automating in a Growing Business",
    excerpt:
      "The best automation candidates are repetitive, rule-shaped and easy to check. Here are five that almost every growing team has.",
    category: "AI",
    date: "2026-02-19",
    body: [
      {
        type: "p",
        text: "Automation pays off where the same judgement is made hundreds of times a month by people who'd rather be doing something else. Combined with AI, that now includes work that used to need a human to read, not just click — emails, PDFs, photos, free-text notes.",
      },
      {
        type: "p",
        text: "Here's how to find good candidates in your own business, five that show up almost everywhere, and how to roll them out without creating new problems.",
      },
      h2("How to spot a candidate"),
      {
        type: "list",
        items: [
          "It happens often — daily or weekly, not once a quarter.",
          "The input arrives in a predictable place: an inbox, a form, a folder, a system.",
          "A good result is easy to recognise when you see it.",
          "Today, someone copies information from one place into another.",
          "Mistakes are annoying but recoverable — at least at first.",
        ],
      },
      {
        type: "p",
        text: "A quick way to find them: ask each team what they do every Monday morning, and what they'd happily never do again.",
      },
      h2("1. Inbox triage"),
      {
        type: "p",
        text: "Shared inboxes collect questions, orders, complaints, invoices and spam in one pile, and someone spends the first hour of every day sorting it. A system can read each message, label it, pull out the order number or account, check it against your records, and route it to the right person with a suggested reply — so humans start from a draft instead of a blank page.",
      },
      {
        type: "p",
        text: "Watch out for: messages that fit no category. Give the system a clear “I'm not sure” route to a person, rather than forcing a guess.",
      },
      h2("2. Document data entry"),
      {
        type: "p",
        text: "Invoices, delivery notes, purchase orders, application forms: the data is all there, just trapped in a PDF or a photo. Extraction turns each document into structured fields, and validation checks them against what you already know — does this supplier exist, does the total add up, does the purchase order match?",
      },
      {
        type: "p",
        text: "The result is that hours of typing become a quick review of anything flagged as unusual. Watch out for: silent errors. Every extracted document should keep a link to the original so a person can check it in one click.",
      },
      h2("3. Recurring reporting"),
      {
        type: "p",
        text: "If someone spends Monday morning pulling numbers from three systems into a spreadsheet, that report can assemble itself. Connect the sources once, calculate the figures the same way every time, and add a short written summary of what changed since last week and why it might matter.",
      },
      {
        type: "p",
        text: "Watch out for: definitions. Agree exactly what “active customer” or “revenue” means before automating it, or the report will be consistently wrong instead of occasionally wrong.",
      },
      h2("4. Customer onboarding"),
      {
        type: "p",
        text: "Welcome emails, account setup, document collection, checks and reminders follow the same steps for every new customer — and steps get missed when the team is busy. Automating the sequence keeps it consistent, nudges customers who stall, and shows your team exactly who needs a conversation instead of an email.",
      },
      {
        type: "p",
        text: "Watch out for: sounding robotic. Automated messages should read like they came from a helpful person, and replies should reach a real one.",
      },
      h2("5. Internal questions"),
      {
        type: "p",
        text: "“Where's the latest price list?” “What's our policy on…?” “Who handles…?” A searchable assistant over your own documents answers these instantly, with links to the source — and quietly reveals which documents are missing, duplicated or out of date, because those are the questions it can't answer well.",
      },
      {
        type: "p",
        text: "Watch out for: access. The assistant should only search what the person asking is allowed to read.",
      },
      h2("Rolling it out"),
      {
        type: "list",
        items: [
          "Measure the current process first — how long it takes and how often it goes wrong — so you can tell whether automation helped.",
          "Start in “suggest” mode: the system drafts, a person approves. Move to automatic only where the suggestions are consistently right.",
          "Keep a log of every automated decision and make it easy to reverse one.",
          "Give one person ownership, so problems are noticed and the system keeps improving.",
        ],
      },
      {
        type: "callout",
        title: "Keep a human checkpoint",
        text: "Automate the reading, sorting and drafting. Keep a person on approvals that involve money, customers or anything hard to undo — at least until the numbers say you can relax it.",
      },
    ],
  },
];
