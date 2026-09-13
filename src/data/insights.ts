export type InsightKind = "Case Study" | "Blog";

export interface Insight {
  id: string;
  kind: InsightKind;
  /** Outcome-led headline. Keep to roughly 60 characters. */
  title: string;
  meta: string;
  href: string;
  /** Picks the generated plate behind the card. */
  variant: 0 | 1 | 2 | 3 | 4;
  /**
   * Optional real artwork. Drop a file in `public/insights/` and set this to
   * e.g. "/insights/fincore.jpg" — it replaces the generated plate for that
   * card. Leave it out and the plate is used instead, so the two can be mixed
   * while imagery is still being produced.
   */
  image?: string;
  /** Crop focus for `image` as a CSS object-position, when the subject is
   *  off-centre and the card is a different shape from the photo. */
  focus?: string;
  /** Card proportion — drives the staggered rhythm of the grid. */
  ratio: "tall" | "square" | "wide";
}

/**
 * The five case studies are drawn from real project data, so their figures
 * match the Work section exactly.
 *
 * Photography is from Unsplash (Unsplash License — free for commercial use,
 * no attribution required; credited here anyway):
 *   fincore      Luke Chesser     unsplash.com/photos/JKUTrJ4vK00
 *   cloud-blog   Winston Chen     unsplash.com/photos/iZe21DzHnUg
 *   northline    Arthur Baudry    unsplash.com/photos/4vioYQ9Nn9Y
 *   medflow      Vitaly Gariev    unsplash.com/photos/8Ls2cnZwAaM
 *   mobile-blog  Balázs Kétyi     unsplash.com/photos/sScmok4Iq1o
 *   cartiq       rupixen          unsplash.com/photos/Q59HmzK38eQ
 *   atlasops     CDC              unsplash.com/photos/_XLJy3h77cw
 *   ai-blog      Growtika         unsplash.com/photos/nGoCBxiaRO0
 *
 * TODO: the three Blog entries are placeholder titles — replace with real
 * posts. Eight cards balance cleanly across the three-column masonry; drop to
 * six if you would rather not write blog copy, but avoid seven.
 */
export const INSIGHTS: Insight[] = [
  {
    id: "fincore",
    kind: "Case Study",
    title: "FinCore Cuts Financial Reporting Time by 68%",
    meta: "Financial Technology",
    href: "#work",
    variant: 4,
    image: "/insights/fincore.webp",
    ratio: "tall",
  },
  {
    id: "cloud-blog",
    kind: "Blog",
    title: "What Cloud Infrastructure Actually Changes for a Small Team",
    meta: "Cloud",
    href: "#technology",
    variant: 3,
    image: "/insights/cloud-blog.webp",
    ratio: "square",
  },
  {
    id: "northline",
    kind: "Case Study",
    title: "Northline Lifts Qualified Leads 54% After Rebuild",
    meta: "Real Estate",
    href: "#work",
    variant: 0,
    image: "/insights/northline.webp",
    ratio: "wide",
  },
  {
    id: "medflow",
    kind: "Case Study",
    title: "MedFlow Removes 61% of Manual Clinical Work",
    meta: "Healthcare Technology",
    href: "#work",
    variant: 1,
    image: "/insights/medflow.webp",
    focus: "40% 50%",
    ratio: "square",
  },
  {
    id: "mobile-blog",
    kind: "Blog",
    title: "What Actually Makes a Mobile App Feel Fast",
    meta: "Mobile",
    href: "#services",
    variant: 2,
    image: "/insights/mobile-blog.webp",
    focus: "28% 50%",
    ratio: "tall",
  },
  {
    id: "cartiq",
    kind: "Case Study",
    title: "Cartiq Raises Conversion 47% on a Headless Rebuild",
    meta: "Ecommerce",
    href: "#work",
    variant: 3,
    image: "/insights/cartiq.webp",
    ratio: "wide",
  },
  {
    id: "atlasops",
    kind: "Case Study",
    title: "AtlasOps Saves 72% of Weekly Operations Time",
    meta: "Enterprise Software",
    href: "#work",
    variant: 2,
    image: "/insights/atlasops.webp",
    focus: "38% 50%",
    ratio: "tall",
  },
  {
    id: "ai-blog",
    kind: "Blog",
    title: "Where Generative AI Actually Fits in Daily Operations",
    meta: "Artificial Intelligence",
    href: "#services",
    variant: 4,
    image: "/insights/ai-blog.webp",
    ratio: "square",
  },
];
