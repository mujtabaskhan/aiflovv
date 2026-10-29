import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `Contact ${SITE.name} — tell us what you're building.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

/** An envelope, drawn in pixels. */
const ENVELOPE = ["#########", "##.....##", "#.#...#.#", "#..#.#..#", "#...#...#", "#.......#", "#########"];

export default function Image() {
  return ogImage({
    label: "Contact",
    title: "Let's build what's next.",
    accentWord: "next",
    text: "Tell us what you're building. A few details now means a more useful first conversation.",
    footer: `${SITE.email} · ${SITE.phone}`,
    glyphs: [ENVELOPE],
    seed: "contact",
  });
}
