import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { WORK } from "@/content/work";

export const alt = `${SITE.name} case studies: ${WORK.map((w) => w.name).join(", ")}.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  const industries = new Set(WORK.map((w) => w.industry)).size;
  return ogImage({
    label: `Case studies · ${WORK.length} projects`,
    title: "Work that ships.",
    accentWord: "ships",
    text: "Websites, platforms and mobile apps for e-commerce, warehousing, hiring, pharmacy, HR and more.",
    footer: `${WORK.length} projects · ${industries} industries`,
    swatches: WORK.map((w) => w.accent),
    seed: "case-studies",
  });
}
