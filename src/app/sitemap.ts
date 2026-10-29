import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { WORK } from "@/content/work";
import { POSTS } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("", 1),
    page("/services", 0.9),
    ...SERVICES.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/case-studies", 0.9),
    ...WORK.map((w) => page(`/case-studies/${w.slug}`, 0.7)),
    page("/blogs", 0.7),
    ...POSTS.map((p) => page(`/blogs/${p.slug}`, 0.6, new Date(`${p.date}T00:00:00Z`))),
    page("/contact", 0.8),
    page("/privacy", 0.2),
  ];
}
