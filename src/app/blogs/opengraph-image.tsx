import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/og";
import { SITE } from "@/content/site";
import { POSTS, POST_CATEGORIES } from "@/content/posts";
import { CATEGORY_GLYPHS } from "@/components/visuals/PixelCover";
import type { PostCategory } from "@/content/postTypes";

export const alt = `${SITE.name} blog — practical writing on AI, web, mobile, design, cloud and process.`;
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  const categories = POST_CATEGORIES.filter((c): c is PostCategory => c !== "All");
  return ogImage({
    label: `Blog · ${POSTS.length} articles`,
    title: "Notes from the build.",
    accentWord: "build",
    text: "Practical writing on AI, web, mobile, design and cloud — what we've learned shipping real software.",
    footer: categories.join(" · "),
    glyphs: categories.slice(0, 8).map((c) => CATEGORY_GLYPHS[c]),
    seed: "blogs",
  });
}
