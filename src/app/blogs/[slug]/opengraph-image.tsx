import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { POSTS, formatDate, postBySlug, readingTime } from "@/content/posts";
import { CATEGORY_GLYPHS } from "@/components/visuals/PixelCover";

type Params = Promise<{ slug: string }> | { slug: string };

export async function generateImageMetadata({ params }: { params: Params }) {
  const p = postBySlug((await params).slug);
  return [{ id: "card", alt: p ? `${p.title} — ${SITE.name}` : SITE.name, size: OG_SIZE, contentType: OG_TYPE }];
}

export default async function Image({ params }: { params: Params }) {
  const p = postBySlug((await params).slug) ?? POSTS[0];
  return ogImage({
    label: `${p.category} · ${readingTime(p)} min read`,
    title: p.title,
    text: p.excerpt,
    footer: `${formatDate(p.date)} · ${SITE.name} Studio`,
    glyphs: [CATEGORY_GLYPHS[p.category]],
    seed: p.slug,
  });
}
