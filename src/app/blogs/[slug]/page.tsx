import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, formatDate, postBySlug, readingTime } from "@/content/posts";
import { SITE } from "@/content/site";
import { BreadcrumbLd } from "@/components/ui/PageHero";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { PixelCover } from "@/components/visuals/PixelCover";
import { PostCard } from "@/components/blog/PostCard";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { CopyLink, ReadingProgress, Toc } from "@/components/blog/ArticleParts";
import { SectionLabel } from "@/components/ui/Section";
import { PixelField } from "@/components/visuals/PixelField";
import { PixelEdge } from "@/components/ui/PixelEdge";
import { pageMeta } from "@/lib/meta";
import { fitStyle } from "@/lib/fit";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    shareTitle: post.title,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
    article: { publishedTime: post.date },
  });
}

export default async function ArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const toc = post.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
  // Same topic first, then the most recent of the rest.
  const more = [
    ...POSTS.filter((p) => p.category === post.category && p.slug !== post.slug),
    ...POSTS.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blogs/${post.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="page-hero compact article-hero">
        <PixelField />
        <div className="page-hero-fade" aria-hidden />
        <BreadcrumbLd items={[{ label: "Blogs", href: "/blogs" }, { label: post.title }]} />
        <div className="shell relative">
          <div className="page-hero-title fit-box">
            <h1 className="t-display fit max-w-[18ch]" style={fitStyle(post.title)} data-anim="lines">
              {post.title}
            </h1>
          </div>
          <p className="t-lead mt-8 max-w-2xl" data-anim="up" data-delay="0.3">
            {post.excerpt}
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-3 t-label text-dim" data-anim="fade" data-delay="0.4">
            <span className="text-cyan">{post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{readingTime(post)} min read</span>
            <span>·</span>
            <span>{SITE.name} Studio</span>
          </p>
          <div className="article-cover sh-straddle-wide" data-anim="pixel" data-cols="14">
            <PixelCover slug={post.slug} category={post.category} label={false} />
          </div>
        </div>
        <PixelEdge seed={post.slug} />
      </header>

      <section className="section article-body" id="article">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] grid gap-10">
              <Toc items={toc} />
              <CopyLink />
            </div>
          </aside>
          <article className="lg:col-span-8 lg:col-start-5" data-anim="up">
            <ArticleBody blocks={post.body} />
            <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-8 lg:hidden">
              <CopyLink />
            </div>
          </article>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <SectionLabel>Keep reading</SectionLabel>
          <div className="mt-10 grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
