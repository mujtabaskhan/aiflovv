import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudy } from "@/content/work";
import { TLink } from "@/components/shell/TLink";
import { PixelArrow } from "@/components/ui/Pixels";
import { cn } from "@/lib/utils";

export function WorkCard({ work, index, className, reveal = true }: { work: CaseStudy; index?: number; className?: string; reveal?: boolean }) {
  return (
    <TLink
      href={`/case-studies/${work.slug}`}
      className={cn("work-card group", className)}
      data-cursor="View"
      style={{ "--c": work.accent } as CSSProperties}
    >
      <div className="work-poster" {...(reveal ? { "data-anim": "pixel", "data-cols": "6" } : {})}>
        <Image
          src={work.image}
          alt={`${work.name} — ${work.kind.toLowerCase()} for ${work.industry.toLowerCase()}`}
          width={360}
          height={509}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="t-label text-dim">
            {index !== undefined && <span className="text-cyan">{String(index + 1).padStart(2, "0")} · </span>}
            {work.kind} · {work.industry}
          </p>
          <h3 className="t-h3 mt-2 transition-colors group-hover:text-[var(--c)]">{work.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{work.summary}</p>
        </div>
        <span className="reel-go mt-1" aria-hidden>
          <PixelArrow size={12} />
        </span>
      </div>
    </TLink>
  );
}
