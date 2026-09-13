import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/data/company";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const TITLE = `${COMPANY.name} — ${COMPANY.descriptor} in Lahore`;

// Icons, the share image and the manifest come from the file conventions in
// this folder (favicon.ico, icon.png, apple-icon.png, opengraph-image.png,
// twitter-image.png, manifest.ts) — Next links them into <head> itself.
export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: TITLE,
    template: `%s — ${COMPANY.name}`,
  },
  description: COMPANY.summary,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name, url: COMPANY.url }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  category: "technology",
  keywords: [
    "AiFlovv",
    "software house in Lahore",
    "web development company Lahore",
    "software development company Pakistan",
    "custom software development",
    "website development",
    "ecommerce website development",
    "mobile app development",
    "iOS and Android apps",
    "UI/UX design agency",
    "SaaS development",
    "Next.js development",
    "digital product studio",
    "Bahria Town Lahore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: COMPANY.name,
    title: TITLE,
    description: COMPANY.pitch,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: COMPANY.pitch,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { title: COMPANY.name },
  // The contact details are real links already; iOS turning every number and
  // address it finds into one of its own restyles them.
  formatDetection: { telephone: false, email: false, address: false },
};

/**
 * Structured data: who the studio is, where, and how to reach it — what search
 * engines use for the business panel and the site name in results.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${COMPANY.url}/#organization`,
      name: COMPANY.name,
      alternateName: COMPANY.wordmark,
      slogan: COMPANY.tagline,
      description: COMPANY.summary,
      url: COMPANY.url,
      logo: `${COMPANY.url}/icons/icon-512.png`,
      image: `${COMPANY.url}/opengraph-image.png`,
      email: COMPANY.email,
      telephone: COMPANY.phone.replace(/\s/g, ""),
      foundingDate: String(COMPANY.founded),
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.postal.street,
        addressLocality: COMPANY.postal.locality,
        addressRegion: COMPANY.postal.region,
        addressCountry: COMPANY.postal.country,
      },
      areaServed: "Worldwide",
      sameAs: [COMPANY.instagram.url],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone.replace(/\s/g, ""),
        availableLanguage: ["English"],
      },
      knowsAbout: [
        "Web Development",
        "Software Development",
        "Mobile Application Development",
        "UI/UX Design",
        "Ecommerce Development",
        "SaaS Platforms",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY.url}/#website`,
      name: COMPANY.name,
      url: COMPANY.url,
      inLanguage: "en",
      publisher: { "@id": `${COMPANY.url}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f4f5f8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      {/* Scroll restoration is disabled from the preloader's layout effect,
          which runs before paint and behind the curtain — a raw <script> here
          is not a valid child of <html> and next/script cannot be placed
          outside head/body. */}
      <body className="bg-void text-chalk antialiased">
        <script
          type="application/ld+json"
          // Escaped so no string in the payload can close the tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
