"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { POSTS, POST_CATEGORIES, type PostCategory } from "@/content/posts";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { useBatchReveal } from "@/components/motion/useBatchReveal";
import { PostCard } from "./PostCard";

const PAGE = 9;

export function BlogBrowser() {
  const [cat, setCat] = useState<"All" | PostCategory>("All");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const gridRef = useRef<HTMLDivElement>(null);
  const state = useRef<Flip.FlipState | null>(null);
  useBatchReveal(gridRef, "[data-flip]");

  const filtered = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return POSTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [cat, query]);

  const searching = query.trim().length > 0;
  const [first, ...rest] = filtered;
  const shown = rest.slice(0, limit);
  const categories = POST_CATEGORIES.filter((c) => c === "All" || POSTS.some((p) => p.category === c));
  const count = (c: "All" | PostCategory) => (c === "All" ? POSTS.length : POSTS.filter((p) => p.category === c).length);

  const capture = () => {
    if (gridRef.current && !prefersReducedMotion()) {
      state.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip]"));
    }
  };

  useLayoutEffect(() => {
    const s = state.current;
    if (!s || !gridRef.current) return;
    state.current = null;
    Flip.from(s, {
      targets: gridRef.current.querySelectorAll("[data-flip]"),
      duration: 0.75,
      ease: "flow",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [cat, limit]);

  return (
    <div>
      <div className="bb-bar" data-anim="up">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={cat === c}
              onClick={() => {
                if (c === cat) return;
                capture();
                setCat(c);
                setLimit(PAGE);
              }}
            >
              {c}
              <span className="opacity-60">{pad(count(c))}</span>
            </button>
          ))}
        </div>
        <label className="bb-search">
          <span className="sr-only">Search articles</span>
          <svg viewBox="0 0 7 7" width="12" height="12" aria-hidden shapeRendering="crispEdges" fill="currentColor">
            <rect x="1" y="0" width="3" height="1" />
            <rect x="0" y="1" width="1" height="3" />
            <rect x="4" y="1" width="1" height="3" />
            <rect x="1" y="4" width="3" height="1" />
            <rect x="5" y="5" width="1" height="1" />
            <rect x="6" y="6" width="1" height="1" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search articles"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"}
      </p>

      <div ref={gridRef} className="grid gap-16">
        {filtered.length === 0 && (
          <div className="bb-empty">
            <p className="t-h3">Nothing matches “{query}”.</p>
            <button
              type="button"
              className="t-label mt-4 text-blue hover:text-ink"
              onClick={() => {
                setQuery("");
                setCat("All");
              }}
            >
              Clear search
            </button>
          </div>
        )}
        {first && !searching && (
          <div data-flip data-flip-id={first.slug} key={`lead-${first.slug}`}>
            <PostCard post={first} size="lg" reveal={false} />
          </div>
        )}
        {(searching ? filtered.slice(0, limit + 1) : shown).length > 0 && (
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
            {(searching ? filtered.slice(0, limit + 1) : shown).map((p) => (
              <div key={p.slug} data-flip data-flip-id={p.slug}>
                <PostCard post={p} reveal={false} />
              </div>
            ))}
          </div>
        )}
      </div>

      {rest.length > limit && (
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="t-label text-dim">
            Showing {Math.min(filtered.length, limit + 1)} of {filtered.length}
          </p>
          <button
            type="button"
            className="btn btn-ghost btn-text"
            onClick={() => {
              capture();
              setLimit((l) => l + PAGE);
            }}
          >
            <span>Load more articles</span>
          </button>
        </div>
      )}
    </div>
  );
}
