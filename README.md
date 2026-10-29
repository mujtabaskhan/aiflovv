# AiFlovv

The website of AiFlovv, a digital product & software studio in Lahore.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Three.js · GSAP
(ScrollTrigger, SplitText, ScrambleText, Flip) · Lenis · Tailwind CSS v4

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check (62 routes)
npm start
npm run typecheck
```

The previous single-page version is archived in `_archive/` (excluded from the build).

---

## The idea: "Ideas in. Products out."

The brand is **AiFlovv**, and the square pixel of its logo is the unit the whole site is
built from. The site is white and editorial; the hero, page headers, menus, product demos
and footer are dark "screens" set into it.

- **Hero (WebGL).** Thousands of square points stream in from the left — loose, noisy
  "ideas" — and lock into a pixel grid as a product. It opens on the pixel **AiFlovv**
  wordmark, then cycles through all eight services (website, phone, AI, software, SaaS
  dashboard, shopping bag, design canvas, cloud) every ~2.6 s. The headline's word rolls
  with it ("Websites out.", "Apps out." …) and the ticker links to the matching service
  page; hovering the ticker pauses the cycle, its segments jump to any service. On phones
  the product is fitted into the space above the copy.
- **Preloader.** The AiFlovv wordmark assembles cell by cell beside a short build log and a
  000 → 100 counter, then hands over to the transition pixels.
- **Page transitions.** A wave of blue → cyan pixels sweeps across, holds with the
  destination path (`→ ~/services`), and dissolves into the new page.
- **Inner pages.** Every hero sits on an LED wall — a 2D canvas of pixels that twinkle and
  light up around the pointer. Case-study pages re-tint it with the client's own colour.
- **Details.** A pixel cursor that frames anything clickable, stepped "loading" fills on
  buttons, pixel arrows, a ⌘K / Ctrl K command palette, a keyboard of tech keycaps, a
  CI-style process pipeline, generative pixel covers for every article, and a pixel
  signature in the developer console.
- **Footer sign-off.** An LED panel that writes "AiFlovv" itself every time it scrolls into
  view, on every page: each letter is traced along its strokes behind a glowing cyan pen tip,
  then a cursor blinks. Tap it to write it again; pass the pointer over it and it glows.

Type: **Hubot Sans** (display, expanded), **Mona Sans** (text), **Martian Mono** (labels).
Colour comes from the logo: navy, the blue of the first V, the cyan of the second.

---

## Routes

| Route | |
| --- | --- |
| `/` | Hero, clients, position, services, selected work (pinned horizontal reel), process, toolkit, blogs, CTA |
| `/services` | All eight services grouped (Build · Intelligence · Design · Operations), process, toolkit |
| `/services/[slug]` | Eight pages, each composed differently — see below |
| `/case-studies` | All 11 projects — filter by type, grid or list (list shows a poster that follows the cursor) |
| `/case-studies/[slug]` | One page per project, tinted with the client's brand colour |
| `/blogs`, `/blogs/[slug]` | 22 articles — topic filter with counts, search, load more; articles with reading progress, live table of contents, copy link |
| `/contact` | Brief builder with a live `brief.ts` preview, emailed via `/api/contact` |
| `/api/contact` | Contact form endpoint (validation, spam filtering, SMTP or Resend delivery) |
| `/privacy` | Plain-language privacy notice (linked from the footer and the contact form) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated from the content files |
| `…/opengraph-image` | A generated share card for every page (see below) |

### Navigation

The **Services** item in the nav opens a mega menu: all eight services with their pixel
glyphs, and a live preview of the hovered service. It opens on hover or click, works with
the arrow keys and Escape, and the nav turns light while it's open. In the mobile menu,
Services is an accordion with the same eight links.

### Service pages

Every service shares a few building blocks (`components/services/blocks.tsx`) but has its
own hero layout, order and interactive "signature" sections
(`components/services/signatures/`):

| Service | Signatures |
| --- | --- |
| Web Development | Device switcher (desktop / tablet / phone), page anatomy |
| Mobile App Development | Phone tour, platform picker (native / cross-platform / PWA) |
| AI Solutions & Automation | Step-through AI demo (marked "illustrative example"), guardrails |
| Custom Software Development | Spreadsheet → system comparison slider, architecture explorer |
| SaaS Product Development | Platform building blocks, roadmap |
| E-commerce Development | Working mini store + checkout steps, customer journey |
| UI/UX & Digital Design | Design playground, wireframe → final slider |
| Cloud & DevOps | Deploy console that runs a pipeline |

## Where things live

```
src/
  app/                  routes, layout (fonts, metadata, structured data), template, globals.css
    styles/             components, sections, pages, visuals, prose
  content/              ALL copy and data — site, services, work, posts, process, tech
  components/
    shell/              Nav, Menu, Footer, Preloader, Transition (+ TLink), Cursor, CommandPalette
    motion/             AnimationEngine (attribute-driven reveals), useBatchReveal
    hero/               HomeHero + FlowField (Three.js)
    home/               home-page sections
    services/           service page blocks, ServicePage (per-service composition), signatures/
    work/ blog/ contact/
    visuals/            ServiceVisual (8 animated illustrations), PixelCover, PixelField
    ui/                 Button, Pixels, Section, PageHero, PixelEdge, CtaBlock, Faq
  lib/                  gsap setup, hero shapes, pixel wordmark, mailer, ready signal, utils
```

To change copy, edit `src/content/`. Pages are generated from those files.

### Animation engine

Server components opt into motion with attributes — no client wrapper needed:

```html
<h2 data-anim="lines">…</h2>          lines rise out of masks
<h1 data-anim="chars">…</h1>          characters rise in
<p data-anim="words">…</p>            words light up as you scroll (scrubbed)
<p data-anim="scramble">…</p>         decodes from glyphs
<div data-anim="pixel">…</div>        media dissolves out of pixels
<div data-anim="up|fade|clip|stagger|rule">…</div>
data-delay="0.2"  data-start="top 80%"  data-speed="0.15" (parallax)  data-magnetic
```

`src/components/motion/AnimationEngine.tsx` waits for the page to be visible (preloader or
transition finished) and rebuilds on every route. Lists that change client-side (filters)
use `useBatchReveal` instead.

### Notes for whoever works on this next

- **Pin inner wrappers, never a component's root.** ScrollTrigger wraps pinned elements in
  a spacer; React must still find a component's root where it left it on unmount.
- **Pointer effects key off `pointerType`, not media queries.** Hybrid devices (a Surface,
  touch laptops) report `hover: none` while a mouse is in use.
- **Lenis owns scrolling.** In development, `window.__lenis` is exposed for QA
  (`__lenis.scrollTo(y, { immediate: true })`).
- **Reduced motion** turns off smooth scrolling, the preloader, transitions and entrance
  animations; the hero renders a still frame.

## Launch checklist

The site builds and runs as-is. Before pointing aiflovv.com at it:

1. **Email** — set the contact-form variables (next section) in the host's environment and
   send yourself a test brief from the live site.
2. **Domain** — the canonical URLs, sitemap and share cards assume `https://aiflovv.com`
   (`SITE.url` in `src/content/site.ts`). Redirect `www` to it (or change `SITE.url`).
3. **Host** — any Node host works (`npm run build && npm start`); Vercel needs no config.
   The contact rate limit is kept in memory, per server instance.
4. **Search** — after launch, add the site to Google Search Console and submit
   `/sitemap.xml`.
5. **Review** — read the privacy page (`src/app/privacy/page.tsx`) and the content notes at
   the end of this file.

### Built in

- **Share cards** — every page has its own 1200×630 image (`opengraph-image.tsx` per route,
  drawn by `src/lib/og.tsx`): the pixel wordmark, the page's pixel glyph and the white pixel
  skyline. Articles show their category and reading time; case studies are tinted with
  the client's colour.
- **Metadata** — unique title, description (≤ 160 characters), canonical URL, Open Graph and
  Twitter card per page (`src/lib/meta.ts`), plus Organization / WebSite / BlogPosting
  structured data. Pages carry their trail (Home › Services › Web Development) as
  BreadcrumbList data for search results rather than as a visible breadcrumb.
- **Security headers** (`next.config.ts`) — Content-Security-Policy (production only),
  HSTS, nosniff, Referrer-Policy, frame protection, Permissions-Policy; no `X-Powered-By`.
- **Errors** — branded 404, a branded error page with *Try again*, and a last-resort
  `global-error` screen.
- **Accessibility** — text colours meet WCAG AA contrast on every surface, one `h1` per page
  with no skipped heading levels, labelled controls, skip link, reduced-motion support.
- **Performance** — static pages, self-hosted fonts, display-sized logo images, and pixel
  art drawn as merged paths (the home page went from ~5,200 DOM nodes to ~3,100).
- **Responsive** — checked at 320, 390, 768, 1024, 1280, 1440 and 1920 px: no sideways
  scrolling, and display titles never split a word — `.fit` titles size themselves to the
  column they sit in (`src/lib/fit.ts`). Small controls get a 24 px+ tap area (`.hit`).

## Contact form

`/api/contact` validates the brief (name, email, message; needs and timeline from fixed
lists), drops obvious bots (a hidden honeypot field and forms sent in under 1.5 s), limits
each IP to 5 messages per 10 minutes, then emails the brief to the studio with the
visitor's address as Reply-To. It never claims success unless the mail provider accepted
the message.

**To turn delivery on,** copy `.env.example` to `.env.local` (or set the same variables in
your host's dashboard) and fill in **one** provider:

| Variable | |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Option A — any SMTP mailbox. For Gmail / Google Workspace: `smtp.gmail.com`, port `465`, your address, and an [App Password](https://myaccount.google.com/apppasswords) (needs 2-Step Verification). `SMTP_SECURE` is optional (defaults to true on port 465). |
| `RESEND_API_KEY` | Option B — [Resend](https://resend.com) HTTP API, with your domain verified there |
| `CONTACT_TO` | Where briefs go (defaults to info@aiflovv.com) |
| `CONTACT_FROM` | A sender your provider allows, e.g. `AiFlovv Website <website@aiflovv.com>` (for Gmail, your own address) |
| `CONTACT_ACK` | Optional — `true` also sends the visitor a short "we've received your brief" email |

What visitors see:

- **Sent** — "Brief received." with their first name and email.
- **Delivery failed** (provider down or rejected) — an error panel with *Try again* and *Send
  via email* (opens their mail app with the whole brief filled in). Nothing they typed is lost.
- **Not configured** — the same mail-app fallback; in development the panel also lists the
  missing variables.

Delivery was tested end to end against a local SMTP server: the brief arrived with the
correct From / To / Reply-To, and the acknowledgement reached the visitor.

## Content — please review before launch

- **Case studies** are the 11 real projects from the portfolio. Descriptions, platforms and
  stacks come from each project poster; there are no invented metrics. The old placeholder
  studies (FinCore, Northline, MedFlow, Cartiq, AtlasOps) and their figures were removed.
- **Project posters** are 360 px wide. Higher-resolution exports (or real screenshots)
  would sharpen the case-study pages noticeably.
- **Blog articles** (22) are original writing for this site — review them for voice and
  accuracy. Sixteen of them take their *topics* from subjects covered on
  [Devsinc's blog](https://www.devsinc.com/blog); no text was copied. The topics used are
  listed at the top of each file in `src/content/posts/`:
  vibe-coded software's real cost · AI in mobile apps · agentic AI (chatbot vs RAG vs
  agent) · AI workflow automation · website mistakes small businesses make · what drives
  website cost · questions before hiring a developer · responsive vs adaptive design ·
  why projects slip · mobile app process from idea to launch · native vs cross-platform ·
  scalable custom software · system integration · international e-commerce · headless
  commerce · DevOps to DevSecOps.
- **Services** grew from four to eight. The four new ones (AI Solutions & Automation, SaaS
  Product Development, E-commerce Development, Cloud & DevOps) need a read-through to
  confirm they match what AiFlovv sells. AI Solutions shows no case studies, because none
  of the portfolio projects is an AI project.
- **Demo content** on service pages is clearly illustrative: the store demo's products and
  prices, and the AI demo (labelled "Illustrative example").
- **Toolkit** adds .NET and MySQL to the original ten technologies, since most portfolio
  projects list them.
- The old "100% / 4.8/5 / 99.9%" pillar figures were dropped.
