import { POSTS } from "@/content/posts";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";

export function LatestNotes() {
  const [first, ...rest] = POSTS.slice(0, 3);
  return (
    <section className="section">
      <div className="shell">
        <SectionHead
          title={
            <>
              Notes from
              <br />
              the build.
            </>
          }
          lead="Short, practical writing on product, engineering and design — what we've learned shipping real software."
        />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <PostCard post={first} size="lg" className="lg:col-span-7" />
          <div className="grid content-start gap-14 lg:col-span-5">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
        <div className="mt-16" data-anim="up">
          <Button href="/blogs" variant="ghost">
            All articles
          </Button>
        </div>
      </div>
    </section>
  );
}
