import type { Metadata, Viewport } from "next";
import { Hubot_Sans, Martian_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { Providers } from "@/components/shell/Providers";
import { Nav } from "@/components/shell/Nav";
import { Footer } from "@/components/shell/Footer";
import { Preloader } from "@/components/shell/Preloader";
import { Cursor } from "@/components/shell/Cursor";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { AnimationEngine } from "@/components/motion/AnimationEngine";

/** Display: GitHub's Hubot Sans — mechanical, squared-off, built for tech. */
const hubot = Hubot_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-hubot", display: "swap" });
/** Text: its sibling Mona Sans, tuned for reading. */
const mona = Mona_Sans({ subsets: ["latin"], variable: "--font-mona", display: "swap" });
/** Labels and code. */
const martian = Martian_Mono({ subsets: ["latin"], variable: "--font-martian", display: "swap" });

const TITLE = `${SITE.name} — ${SITE.descriptor} in Lahore`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s — ${SITE.name}` },
  description: SITE.summary,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  keywords: [
    "AiFlovv",
    "software house in Lahore",
    "web development company Lahore",
    "software development company Pakistan",
    "custom software development",
    "mobile app development",
    "AI solutions and automation",
    "UI/UX design agency",
    "ecommerce website development",
    "SaaS development",
    "cloud and DevOps",
    "digital product studio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: SITE.pitch,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.pitch },
  robots: { index: true, follow: true },
  appleWebApp: { title: SITE.name },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#03050b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: SITE.wordmark,
      slogan: SITE.tagline,
      description: SITE.summary,
      url: SITE.url,
      logo: `${SITE.url}/icons/icon-512.png`,
      image: `${SITE.url}/opengraph-image.png`,
      email: SITE.email,
      telephone: SITE.phone.replace(/\s/g, ""),
      foundingDate: String(SITE.founded),
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.postal.street,
        addressLocality: SITE.postal.locality,
        addressRegion: SITE.postal.region,
        addressCountry: SITE.postal.country,
      },
      areaServed: "Worldwide",
      sameAs: [SITE.instagram.url],
      knowsAbout: SERVICES.map((s) => s.title),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

/**
 * Runs before first paint:
 * - `anim`    hides elements the animation engine will reveal (skipped for
 *             reduced motion, and withdrawn if the engine never starts);
 * - `preload` shows the preloader; `preload-fast` shortens it on repeat visits.
 */
const BOOT = `(function(){try{var d=document.documentElement;var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){d.classList.add('anim');setTimeout(function(){if(!window.__aiflovvAnim)d.classList.remove('anim','preload')},8000);d.classList.add('preload');try{if(sessionStorage.getItem('aiflovv:seen'))d.classList.add('preload-fast')}catch(e){}}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hubot.variable} ${mona.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c") }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <Preloader />
          <CommandPalette />
          <AnimationEngine />
        </Providers>
        <Cursor />
      </body>
    </html>
  );
}
