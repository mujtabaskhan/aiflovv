import { PageHero } from "@/components/ui/PageHero";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { BlogBrowser } from "@/components/blog/BlogBrowser";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Blogs",
  description:
    "Practical writing from AiFlovv on AI, web, mobile, design, cloud and process — what we've learned building real products.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blogs" }]}
        title={
          <>
            Notes from
            <br />
            the build.
          </>
        }
        lead="Short, practical writing on product, engineering and design — what we've learned shipping real software."
      />
      <section className="pb-24 pt-6 lg:pb-36" aria-labelledby="all-articles">
        <div className="shell">
          <h2 id="all-articles" className="sr-only">
            All articles
          </h2>
          <BlogBrowser />
        </div>
      </section>
      <CtaBlock
        title={
          <>
            Ask us
            <br />
            directly.
          </>
        }
        body="If you're weighing a build, a rebuild or an AI feature, we're happy to talk it through — no pitch deck required."
      />
    </>
  );
}
