import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { SERVICES, serviceBySlug } from "@/content/services";
import { SERVICE_GLYPHS } from "@/components/ui/Pixels";
import { pad } from "@/lib/utils";

type Params = Promise<{ slug: string }> | { slug: string };

export async function generateImageMetadata({ params }: { params: Params }) {
  const s = serviceBySlug((await params).slug);
  return [{ id: "card", alt: s ? `${s.title} — ${s.tagline}` : SITE.name, size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Params }) {
  const s = serviceBySlug((await params).slug) ?? SERVICES[0];
  return ogImage({
    label: `Service ${s.index} / ${pad(SERVICES.length)} · ${s.group}`,
    title: s.title,
    text: s.tagline,
    footer: s.capabilities
      .slice(0, 3)
      .map((c) => c.title)
      .join(" · "),
    glyphs: [SERVICE_GLYPHS[s.slug]],
    seed: s.slug,
  });
}
