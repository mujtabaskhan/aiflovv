import { formatDate, readingTime, type Post } from "@/content/posts";
import { TLink } from "@/components/shell/TLink";
import { PixelCover } from "@/components/visuals/PixelCover";
import { PixelArrow } from "@/components/ui/Pixels";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  size = "md",
  className,
  reveal = true,
}: {
  post: Post;
  size?: "lg" | "md";
  className?: string;
  reveal?: boolean;
}) {
  return (
    <TLink href={`/blogs/${post.slug}`} className={cn("post-card group", size === "lg" && "post-card-lg", className)} data-cursor="Read">
      <div className="post-cover" {...(reveal ? { "data-anim": "pixel", "data-cols": size === "lg" ? "10" : "7" } : {})}>
        <PixelCover slug={post.slug} category={post.category} />
      </div>
      <div className="mt-6 flex items-center gap-3 t-label text-dim">
        <span className="text-cyan">{post.category}</span>
        <span>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{readingTime(post)} min read</span>
      </div>
      <h3 className={cn("mt-3 transition-colors group-hover:text-cyan", size === "lg" ? "t-h2 max-w-3xl" : "t-h3")}>
        {post.title}
      </h3>
      {size === "lg" && <p className="t-lead mt-5 max-w-2xl">{post.excerpt}</p>}
      <span className="post-more t-label mt-6 inline-flex items-center gap-2 text-soft">
        Read article <PixelArrow size={10} />
      </span>
    </TLink>
  );
}
