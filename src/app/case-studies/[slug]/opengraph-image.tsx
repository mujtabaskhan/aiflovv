import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { WORK, workBySlug } from "@/content/work";
import { SERVICE_GLYPHS } from "@/components/ui/Pixels";

type Params = Promise<{ slug: string }> | { slug: string };

export async function generateImageMetadata({ params }: { params: Params }) {
  const w = workBySlug((await params).slug);
  return [{ id: "card", alt: w ? `${w.name} — ${w.summary}` : SITE.name, size: OG_SIZE, contentType: OG_TYPE }];
}

/** Tinted with the client's own brand colour, like the case-study page. */
export default async function Image({ params }: { params: Params }) {
  const w = workBySlug((await params).slug) ?? WORK[0];
  return ogImage({
    label: `Case study · ${w.industry}`,
    title: w.name,
    text: w.summary,
    footer: `${w.kind} · ${w.platforms.join(" · ")}`,
    glyphs: [SERVICE_GLYPHS[w.services[0]]],
    tint: [w.accent, "#eef2ff"],
    seed: w.slug,
  });
}
