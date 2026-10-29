import { h2, type Post } from "../postTypes";

/*
 * Topic inspiration (subjects only — every article is original writing):
 * devsinc.com/blog — website development mistakes small businesses make;
 * how much a website costs; questions to ask before hiring a developer;
 * responsive vs adaptive design.
 */
export const WEB_POSTS: Post[] = [
  {
    slug: "website-mistakes-small-businesses",
    title: "Nine Website Mistakes That Quietly Cost Small Businesses Customers",
    excerpt:
      "Most websites don't fail loudly. They just leak visitors — through slow pages, vague headlines and forms nobody finishes.",
    category: "Web",
    date: "2026-09-30",
    body: [
      {
        type: "p",
        text: "A small business website rarely breaks in an obvious way. It loads, it looks fine, and the contact form technically works. The cost is invisible: people who arrived with intent and left without a trace. Nobody emails to say “your headline confused me” — they just go back to the search results and click the next name.",
      },
      {
        type: "p",
        text: "These are the nine leaks we see most often. The fixes are usually simpler than a redesign, and most can be checked in an afternoon.",
      },
      h2("1. Saying what you are, not what you do"),
      {
        type: "p",
        text: "“Innovative solutions for a changing world” tells a visitor nothing. Your first screen has a few seconds to answer three questions in plain words: what you do, who it's for, and what to do next. “Accounting for restaurants in Lahore — book a free call” beats any amount of clever wording, because a visitor instantly knows whether they're in the right place.",
      },
      h2("2. Burying the next step"),
      {
        type: "p",
        text: "If the only call to action is a link in the footer, most visitors will never see it. Give every page one obvious next step, and repeat it where intent peaks — after the proof, after the pricing, after the answer to the question that brought them there. Use specific wording too: “Get a quote” or “Book a table” is clearer than “Learn more”.",
      },
      h2("3. Slow pages on real phones"),
      {
        type: "p",
        text: "Sites are usually tested on fast office Wi-Fi and a new laptop. Your customers browse on mid-range phones on patchy mobile connections, often with one hand. The usual culprits are oversized images, auto-playing videos, several tracking scripts and fonts loaded from multiple places. All of them are fixable: compress and resize images, load what's below the fold later, and remove scripts nobody looks at the data from.",
      },
      h2("4. Forms that ask too much"),
      {
        type: "p",
        text: "Every extra field is a reason to stop. Ask for what you need to reply — usually a name, an email and a message — and collect the rest in the conversation. Make errors clear and friendly, keep what the visitor typed when something goes wrong, and confirm clearly when the message has been sent. Then check that it actually arrives: a form whose emails land in spam is a very quiet way to lose business.",
      },
      h2("5. No proof"),
      {
        type: "p",
        text: "Real work, real clients and specific details earn more trust than any adjective. Photos of your actual team and premises beat stock images. If you can't name clients, describe what you did and for what kind of business. If you have reviews on another platform, link to them. Specifics are persuasive precisely because they're hard to fake.",
      },
      h2("6. Ignoring search basics"),
      {
        type: "p",
        text: "Unique page titles, one clear heading per page, descriptive link text, image descriptions and a sitemap are not advanced SEO — they're the minimum that lets search engines understand you. For a local business, a complete and accurate business profile with consistent address and opening hours often matters as much as the website itself.",
      },
      h2("7. A CMS nobody can use"),
      {
        type: "p",
        text: "If changing a price, adding a photo or posting an update needs a developer, the site goes stale — and a stale site quietly suggests a business that isn't paying attention. Content tools should match how your team actually works, with sensible fields rather than a blank page builder that makes it easy to break the layout.",
      },
      h2("8. Never measuring"),
      {
        type: "p",
        text: "Without simple analytics and form tracking you can't tell which pages earn enquiries and which ones lose them. You don't need dozens of dashboards. Track a handful of things well: where visitors come from, which pages they land on, and how many reach your contact form or checkout — and respect their privacy while you do it.",
      },
      h2("9. Treating launch as the end"),
      {
        type: "p",
        text: "The best websites are improved in small steps after launch, guided by what visitors actually do. Plan a review a month after go-live: look at the numbers, watch a few people use the site, read the questions that still arrive by phone. Then fix the biggest friction point, and repeat every few months.",
      },
      h2("Where to start"),
      {
        type: "list",
        items: [
          "Rewrite your first screen so a stranger can say what you do after five seconds.",
          "Add one clear call to action to every page.",
          "Test your homepage speed on a phone over mobile data.",
          "Cut your contact form to the fields you truly need, then send yourself a test message.",
        ],
      },
      {
        type: "callout",
        title: "A quick audit",
        text: "Open your site on your own phone, on mobile data, and try to contact yourself. Note every moment you hesitate. That list is your roadmap.",
      },
    ],
  },
  {
    slug: "what-drives-website-cost",
    title: "What Actually Drives the Cost of a Website",
    excerpt:
      "Two websites with the same number of pages can differ in cost by an order of magnitude. Here's where the effort really goes.",
    category: "Web",
    date: "2026-08-13",
    body: [
      {
        type: "p",
        text: "“How much does a website cost?” is a fair question with an unsatisfying answer: it depends. But it depends on specific, knowable things. Once you understand them, quotes stop looking random — you can compare them honestly, spot what's missing, and decide where your money matters most.",
      },
      h2("Pages are the wrong unit"),
      {
        type: "p",
        text: "Quotes are often framed per page, but a page of text and a page with a product configurator are not the same job. Most of the effort lives in templates — the distinct page types a site needs — and in the interactions and integrations behind them. A fifty-page site built from four templates can cost less than a ten-page site where every page is unique and interactive.",
      },
      h2("Content: who writes it, and when"),
      {
        type: "p",
        text: "Content is the most common cause of delay in website projects. If copy, photography and product data are ready and approved, a project moves fast. If they're being written alongside the build, the design has to be done with placeholder text and revisited later, and the launch date depends on the slowest document.",
      },
      {
        type: "p",
        text: "Be honest about this early. Professional copywriting and photography cost money, but they often do more for results than any design detail — and doing them first makes everything else faster.",
      },
      h2("Design: template, adapted or custom"),
      {
        type: "list",
        items: [
          "A template is quick and affordable, but you'll look like everyone else using it, and changes outside its design can be awkward.",
          "An adapted design starts from proven patterns and is shaped around your brand — a good balance for many businesses.",
          "A fully custom design costs more, and is worth it when your site is a core part of how you sell or how people judge your quality.",
        ],
      },
      h2("Functionality: where the hours hide"),
      {
        type: "p",
        text: "Each of these adds real engineering and, just as importantly, real testing:",
      },
      {
        type: "list",
        items: [
          "Online payments and checkout.",
          "Customer accounts, logins and saved details.",
          "Booking calendars and availability.",
          "Multiple languages or regions.",
          "Connections to your CRM, inventory, accounting or email marketing tools.",
          "Search and filtering across large catalogues.",
        ],
      },
      {
        type: "p",
        text: "List them all early, including the “nice to haves”, so the estimate reflects reality and nothing surprises anyone halfway through.",
      },
      h2("Migration and SEO"),
      {
        type: "p",
        text: "Moving from an existing site means carrying over content, mapping every old address to a new one with redirects, and protecting the search rankings you've already earned. It's careful, detailed work that's easy to under-estimate — and skipping it can mean a noticeable drop in search traffic right after launch.",
      },
      h2("Quality you can't see"),
      {
        type: "p",
        text: "Accessibility, performance, security and testing across devices don't show up in a design mockup, but they decide whether the site works for everyone who visits. Cheaper quotes often save money here. Ask explicitly what's included.",
      },
      h2("After launch"),
      {
        type: "p",
        text: "Hosting, domain renewals, security updates, backups and small improvements all have ongoing costs. A cheaper build with no plan for maintenance often costs more over two years than a sturdier one, especially if it has to be patched by someone who didn't build it.",
      },
      h2("Reading a quote"),
      {
        type: "list",
        items: [
          "Is it broken down by phase — discovery, design, build, testing, launch?",
          "Which templates and features are included, specifically?",
          "Who provides content, and how many rounds of revision are included?",
          "Is migration, SEO setup and analytics included?",
          "What does support cost after launch, and what does it cover?",
        ],
      },
      {
        type: "callout",
        title: "How to get an honest quote",
        text: "Share your goals, a list of must-have features, examples you like and whether content is ready. Ask for the estimate broken down by phase, and ask what's not included.",
      },
    ],
  },
  {
    slug: "questions-before-hiring-a-studio",
    title: "Twelve Questions to Ask Before You Hire a Development Studio",
    excerpt:
      "Portfolios show what a studio can make. These questions show how it will be to work with them.",
    category: "Process",
    date: "2026-06-11",
    body: [
      {
        type: "p",
        text: "Choosing a development partner is part technical decision, part relationship. You'll spend months working closely with these people, trusting them with your budget and often with your customers' data. Good studios welcome hard questions — and their answers tell you far more than a polished case study.",
      },
      {
        type: "p",
        text: "Here are twelve questions, grouped by what they reveal, with notes on what to listen for.",
      },
      h2("About the work"),
      {
        type: "list",
        items: [
          "Can you show something similar you've built — and what you'd do differently now?",
          "Who designs, and who builds? Are they on the same team?",
          "What will you need from us, and when?",
        ],
      },
      {
        type: "p",
        text: "The first question is the most revealing. A team that can talk honestly about past mistakes has learned from them. The second matters because hand-offs between separate design and development teams are where many projects lose quality. The third tests whether they've thought about your role — content, decisions, access — not just theirs.",
      },
      h2("About the people"),
      {
        type: "list",
        items: [
          "Who exactly will work on our project, day to day?",
          "Who do we talk to when something goes wrong?",
          "How do you handle disagreements about scope or priorities?",
        ],
      },
      {
        type: "p",
        text: "Ask to meet the people who will actually do the work, not only the people who sell it. Listen for a named point of contact and a clear route for escalation. A good answer to the third question describes a process — written scope, trade-off conversations — rather than promising that disagreements never happen.",
      },
      h2("About the process"),
      {
        type: "list",
        items: [
          "What will we have in hand after the first two weeks?",
          "How often will we see working software, not just updates?",
          "How do you estimate, and what happens when an estimate is wrong?",
        ],
      },
      {
        type: "p",
        text: "Early, tangible output — a scope document, a clickable prototype, a first working screen — is a good sign. Regular demos of real software mean problems surface early. And every honest studio has been wrong about an estimate; what matters is that they tell you early and offer options, rather than quietly cutting corners.",
      },
      h2("About afterwards"),
      {
        type: "list",
        items: [
          "Who owns the code, designs and accounts when the project ends?",
          "What does support look like after launch?",
          "How would another team take over if they needed to?",
        ],
      },
      {
        type: "p",
        text: "You should own your code, designs, domain and hosting accounts outright, and the contract should say so. Support should be defined: response times, what's covered, what it costs. The last question is a good test of quality — a studio confident in its work will talk about documentation, clean repositories and hand-over notes without hesitation.",
      },
      {
        type: "quote",
        text: "Listen less to the confident answers and more to the specific ones.",
      },
      h2("Red flags"),
      {
        type: "list",
        items: [
          "A fixed price for a large project before anyone has asked detailed questions.",
          "No access to the work in progress until the end.",
          "Vague answers about who will do the work.",
          "Reluctance to put ownership of code and accounts in writing.",
          "Promises that everything is possible, on any timeline.",
        ],
      },
      h2("What good answers sound like"),
      {
        type: "p",
        text: "Concrete and calm. A good partner names the people, describes the rhythm, admits where estimates usually slip and explains how they handle it. They ask you as many questions as you ask them. Vague enthusiasm is easy; specifics are earned.",
      },
    ],
  },
  {
    slug: "responsive-vs-adaptive-design",
    title: "Responsive vs. Adaptive Design: What Your Customers Actually Experience",
    excerpt:
      "Two ways to make a site work on every screen — and why modern CSS has quietly changed the answer.",
    category: "Design",
    date: "2026-03-26",
    body: [
      {
        type: "p",
        text: "Your customers don't think about breakpoints. They think “this is easy to use on my phone” or “this is annoying”. Responsive and adaptive design are two ways of earning the first reaction — and modern CSS has blurred the line between them in useful ways.",
      },
      h2("Responsive: one layout that flows"),
      {
        type: "p",
        text: "A responsive layout stretches and rearranges continuously as the screen changes size. Columns stack, images scale, navigation collapses into a menu. It's one codebase, it handles screens nobody planned for — foldables, tablets in split view, large monitors — and it's the default for good reason.",
      },
      {
        type: "p",
        text: "Its risk is that everything gets designed for desktop and then squeezed. Done carelessly, the phone version becomes a long, narrow column of content that was never really designed for a small screen.",
      },
      h2("Adaptive: layouts for specific sizes"),
      {
        type: "p",
        text: "An adaptive approach designs distinct layouts for a few target sizes and switches between them. It gives more control over each experience — a phone can get a genuinely different layout, not just a narrower one — at the cost of more design and more maintenance, and sometimes awkward moments on the sizes in between.",
      },
      h2("What customers notice"),
      {
        type: "list",
        items: [
          "Tap targets — buttons and links big enough to hit with a thumb, with space between them.",
          "Readable text — no zooming or sideways scrolling to read a paragraph.",
          "Forms — the right keyboard for each field, and inputs that aren't hidden behind it.",
          "Speed — the phone version shouldn't download desktop-sized images.",
          "Priorities — the most important action is easy to reach on every screen.",
        ],
      },
      {
        type: "p",
        text: "None of these depend on which approach you choose. They depend on whether someone designed and tested each size deliberately.",
      },
      h2("Container queries change the game"),
      {
        type: "p",
        text: "Traditionally, layouts responded only to the size of the whole screen. Modern CSS lets a component respond to the space it's actually given. A product card can be compact in a sidebar and generous in a wide grid — on the same page, with the same code.",
      },
      {
        type: "code",
        lang: "css",
        code: ".card { container-type: inline-size; }\n\n@container (min-width: 28rem) {\n  .card-body { display: grid; grid-template-columns: 1fr 1fr; }\n}",
      },
      {
        type: "p",
        text: "This brings some of adaptive design's control to responsive layouts: components have deliberate designs for different amounts of space, without needing separate page layouts for each device.",
      },
      h2("Fluid sizing"),
      {
        type: "p",
        text: "Another modern technique is fluid sizing: type and spacing that scale smoothly between a minimum and a maximum, instead of jumping at breakpoints. Headings stay proportionate on every screen and the layout feels designed at every width, not only at the sizes on the mockup.",
      },
      h2("What we use"),
      {
        type: "p",
        text: "Responsive by default, with fluid type and spacing; deliberately designed breakpoints for the moments that matter — navigation, checkout, data-heavy tables; and container queries for components that live in more than one place. Phones get their own design decisions, not a squeezed desktop.",
      },
      {
        type: "callout",
        title: "Test on real devices",
        text: "Browser resizing is a start, not a test. Real phones reveal tap targets that are too small, keyboards that cover inputs and pages that are slow on mobile data.",
      },
    ],
  },
  {
    slug: "why-software-projects-slip",
    title: "Why Software Projects Slip — and How to Keep Yours on Track",
    excerpt:
      "Projects rarely slip because people are slow. They slip because of a handful of predictable, preventable patterns.",
    category: "Process",
    date: "2026-01-22",
    body: [
      {
        type: "p",
        text: "Almost every late software project has the same few causes. The good news is that each one has a known remedy, and most of them are about how the work is organised rather than how fast anyone types. Here are the patterns, how to spot them early, and what to do about each.",
      },
      h2("Scope that was never really agreed"),
      {
        type: "p",
        text: "If two people imagine two different products, the gap shows up late and expensively — usually in a demo where someone says “but I assumed it would…”. A short written scope is the cheapest insurance there is: the main user journeys, the features in the first release, and, just as important, what's explicitly out.",
      },
      {
        type: "p",
        text: "Early warning sign: nobody can point to a single document that describes what's being built.",
      },
      h2("Feedback that arrives too late"),
      {
        type: "p",
        text: "Seeing the product for the first time at the end guarantees surprises. Short cycles — a demo of working software every week or two — turn big surprises into small corrections. Clickable prototypes before development do the same for design questions, at a fraction of the cost of changing built code.",
      },
      {
        type: "p",
        text: "Early warning sign: progress is reported as percentages and status updates rather than things you can click.",
      },
      h2("Integrations discovered halfway"),
      {
        type: "p",
        text: "“It just needs to talk to our accounting system” can be a day or a month, depending on the system's API, its documentation and how long it takes to get access. Find every system the product touches in the first week, request credentials immediately, and prove each connection works with a small test before building on top of it.",
      },
      h2("Decisions waiting on people"),
      {
        type: "p",
        text: "Work stalls quietly while a question waits for an answer. Two days here, a week there — it adds up to months across a project. Name one decision-maker on each side, agree how quickly questions get answered, and keep a visible list of open decisions so nothing waits unnoticed.",
      },
      h2("Content and data arriving late"),
      {
        type: "p",
        text: "A finished product with placeholder text can't launch. Product data, copy, images and legal pages need owners and deadlines just like code does, and real data should flow into the product early — it reveals problems that sample data never will.",
      },
      h2("Testing saved for the end"),
      {
        type: "p",
        text: "Quality can't be added in the last week. Automated tests written alongside features, a pipeline that runs them on every change, and regular checks on real devices keep the end of the project from becoming a crisis of bugs nobody has time to fix.",
      },
      h2("Scope that grows without trade-offs"),
      {
        type: "p",
        text: "New ideas are a healthy sign — people are engaged with the product. The problem is adding them without removing anything. Every new request should come with a conversation: does it replace something, move to a later release, or extend the timeline? Any answer is fine, as long as it's a deliberate choice.",
      },
      {
        type: "quote",
        text: "Projects rarely fail in a day. They slip an unanswered question at a time.",
      },
      {
        type: "callout",
        title: "What keeps projects on track",
        text: "A written scope, a fortnightly demo, integrations proven in week one, one decision-maker each side, content with deadlines, testing from day one, and trade-offs for every new idea.",
      },
    ],
  },
];
