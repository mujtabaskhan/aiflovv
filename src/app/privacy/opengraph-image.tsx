import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} privacy policy — what we collect and why.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

/** A padlock, drawn in pixels. */
const LOCK = ["..###..", ".#...#.", ".#...#.", "#######", "#######", "###.###", "#######"];

export default function Image() {
  return ogImage({
    label: "Legal",
    title: "Privacy Policy.",
    accentWord: "Policy",
    text: "No cookies, no tracking. What you send us is used only to reply to you.",
    footer: SITE.email,
    glyphs: [LOCK],
    seed: "privacy",
  });
}
