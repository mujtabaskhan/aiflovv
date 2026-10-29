export type PostCategory = "AI" | "Web" | "Mobile" | "Software" | "E-commerce" | "Design" | "Cloud" | "Process";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; lang: string; code: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  /** ISO date. */
  date: string;
  body: Block[];
}

/** A section heading with an id derived from its text, for the table of contents. */
export const h2 = (text: string): Block => ({
  type: "h2",
  text,
  id: text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
});
