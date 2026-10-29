"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { scroller } from "@/lib/utils";

/** A gradient bar along the top edge that fills as the article is read. */
export function ReadingProgress() {
  const bar = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = bar.current;
    const article = document.getElementById("article");
    if (!el || !article) return;
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: article,
        start: "top 20%",
        end: "bottom 80%",
        onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
      });
    });
    return () => {
      off();
      st?.kill();
    };
  }, []);
  return (
    <div className="read-progress" aria-hidden>
      <i ref={bar} />
    </div>
  );
}

/** Table of contents that follows the reader. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  // The active section is the last heading above the reading line (35% down the
  // viewport) — robust to jumps and to sections taller than the screen.
  useEffect(() => {
    const heads = items.map((i) => document.getElementById(i.id)).filter((h): h is HTMLElement => !!h);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = heads[0];
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= line) current = h;
        else break;
      }
      if (current) setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="t-label mb-4 text-dim">On this page</p>
      <ol className="toc">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id}
              onClick={(e) => {
                const target = document.getElementById(i.id);
                if (!target) return;
                e.preventDefault();
                if (scroller.lenis) scroller.lenis.scrollTo(target, { offset: -110 });
                else target.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", `#${i.id}`);
              }}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CopyLink() {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="chip hover:text-ink"
      onClick={() =>
        navigator.clipboard?.writeText(window.location.href.split("#")[0]).then(() => {
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        })
      }
      aria-live="polite"
    >
      {done ? "Link copied" : "Copy link"}
    </button>
  );
}
