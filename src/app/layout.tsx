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

export const metadata: Metadata = {
  metadataBase: new URL("https://aiflovv.com"),
  title: {
    default: `${COMPANY.name} — ${COMPANY.descriptor}`,
    template: `%s — ${COMPANY.name}`,
  },
  description:
    "We design and develop high-performance websites, custom software, mobile apps, and digital experiences built to scale.",
  keywords: [
    "web development",
    "software development",
    "mobile applications",
    "UI/UX design",
    "digital product studio",
    "Lahore",
  ],
  openGraph: {
    title: `${COMPANY.name} — ${COMPANY.descriptor}`,
    description:
      "We turn ambitious ideas into intelligent digital products, powerful brands, and technology built for measurable growth.",
    type: "website",
    siteName: COMPANY.name,
  },
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
      <body className="bg-void text-chalk antialiased">{children}</body>
    </html>
  );
}
