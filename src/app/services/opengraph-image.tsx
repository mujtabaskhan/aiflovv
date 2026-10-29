import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { SERVICE_GLYPHS } from "@/components/ui/Pixels";
import { pad } from "@/lib/utils";

export const alt = `${SITE.name} services: ${SERVICES.map((s) => s.title).join(", ")}.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    label: `Services · ${pad(SERVICES.length)}`,
    title: "Eight services. One team.",
    accentWord: "One",
    text: "From the first sketch to the cloud it runs on — designed, built and shipped end to end.",
    footer: SERVICES.map((s) => s.short).slice(0, 4).join(" · "),
    glyphs: SERVICES.map((s) => SERVICE_GLYPHS[s.slug]),
    seed: "services",
  });
}
