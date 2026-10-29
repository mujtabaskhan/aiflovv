export const SITE = {
  name: "AiFlovv",
  wordmark: "AIFLOVV",
  tagline: "AI-Driven. Developed. Worldwide.",
  descriptor: "Digital Product & Software Studio",
  /** Search description — kept under ~160 characters. */
  summary:
    "AiFlovv designs and builds websites, mobile apps, AI solutions and custom software for ambitious businesses — from Lahore, for clients worldwide.",
  pitch:
    "We turn ambitious ideas into intelligent digital products, powerful brands, and technology built for measurable growth.",
  url: "https://aiflovv.com",
  founded: 2024,
  city: "Lahore",
  timezone: "Asia/Karachi",
  email: "info@aiflovv.com",
  phone: "+92 332 1722442",
  instagram: { handle: "@aiflovv", url: "https://www.instagram.com/aiflovv/" },
  address: "Commercial Area Sector C, Bahria Town, Lahore",
  postal: {
    street: "Commercial Area, Sector C, Bahria Town",
    locality: "Lahore",
    region: "Punjab",
    country: "PK",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Commercial+Area+Sector+C+Bahria+Town+Lahore",
} as const;

export const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;
export const mailHref = `mailto:${SITE.email}`;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];
