"use client";

import { useId, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, scroller } from "@/lib/utils";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    const dur = prefersReducedMotion() ? 0 : 0.55;
    panels.current.forEach((p, k) => {
      if (!p) return;
      const target = k === next ? "auto" : 0;
      gsap.to(p, {
        height: target,
        duration: dur,
        ease: "flow",
        onComplete: () => scroller.lenis?.resize(),
      });
    });
    setOpen(next);
  };

  return (
    <div>
      {items.map((it, i) => (
        <div key={it.q} className="faq-item" data-open={open === i}>
          <h3>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open === i}
              aria-controls={`${base}-${i}`}
              id={`${base}-q${i}`}
              onClick={() => toggle(i)}
            >
              <span>{it.q}</span>
              <span className="faq-icon" aria-hidden />
            </button>
          </h3>
          <div
            id={`${base}-${i}`}
            role="region"
            aria-labelledby={`${base}-q${i}`}
            ref={(el) => {
              panels.current[i] = el;
            }}
            className="faq-a"
            inert={open !== i}
            style={i === 0 ? { height: "auto" } : undefined}
          >
            <p className="max-w-2xl pb-8 text-soft">{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
