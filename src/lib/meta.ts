import type { Metadata } from "next";
import { SITE } from "@/content/site";

/** Whole sentences that fit a search snippet (~160 characters); a word cut only if one sentence is too long. */
export function snippet(text: string, max = 160) {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > max) break;
    out += s;
  }
  out = out.trim();
  if (out) return out;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

interface PageMeta {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/services". */
  path: string;
  /** Overrides the "Title — AiFlovv" heading used when the page is shared. */
  shareTitle?: string;
  article?: { publishedTime: string };
}

/**
 * Page metadata with a matching canonical URL, Open Graph and Twitter card —
 * so a shared link always shows this page's own title and text. The image
 * comes from an `opengraph-image` file beside the page: every route that uses
 * this needs one, because this Open Graph object replaces the inherited one.
 */
export function pageMeta({ title, description, path, shareTitle, article }: PageMeta): Metadata {
  const heading = shareTitle ?? `${title} — ${SITE.name}`;
  const text = snippet(description);
  return {
    title,
    description: text,
    alternates: { canonical: path },
    openGraph: {
      type: article ? "article" : "website",
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      title: heading,
      description: text,
      ...(article ? { publishedTime: article.publishedTime, authors: [SITE.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: heading, description: text },
  };
}
