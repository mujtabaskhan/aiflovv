import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { SERVICE_GLYPHS } from "@/components/ui/Pixels";

export const alt = `${SITE.name} — ${SITE.descriptor}: websites, apps, AI, custom software, SaaS, e-commerce, design and cloud.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    label: SITE.descriptor,
    title: "Ideas in. Products out.",
    accentWord: "Products",
    text: "Websites, apps, AI, software, SaaS, e-commerce, design and cloud — from Lahore, for the world.",
    footer: "Lahore · Worldwide",
    glyphs: SERVICES.map((s) => SERVICE_GLYPHS[s.slug]),
    seed: "home",
  });
}
