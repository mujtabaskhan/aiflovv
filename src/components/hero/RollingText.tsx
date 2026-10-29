"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import { lineChars } from "@/lib/fit";

/**
 * Text that rolls: the old word's letters lift out of a mask, the new word's
 * letters rise into it, and the box eases to the new width so whatever
 * follows slides along instead of jumping.
 *
 * With `fit`, the text also exposes its length (--fit-line) so CSS can shrink
 * a long line to its box. It changes with the letters themselves — while the
 * new word is still hidden below the mask — so the size never visibly jumps.
 */
export function RollingText({ text, className, fit = false }: { text: string; className?: string; fit?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);
  const fromWidth = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || text === shown) return;
    if (prefersReducedMotion()) {
      setShown(text);
      return;
    }
    fromWidth.current = el.getBoundingClientRect().width;
    const tween = gsap.to(el.querySelectorAll(".rc"), {
      yPercent: -112,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.012,
      onComplete: () => setShown(text),
    });
    return () => {
      tween.kill();
    };
  }, [text, shown]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || fromWidth.current === null) return;
    const chars = el.querySelectorAll(".rc");
    const to = el.getBoundingClientRect().width;
    gsap.fromTo(el, { width: fromWidth.current }, { width: to, duration: 0.5, ease: "flow", clearProps: "width" });
    gsap.fromTo(chars, { yPercent: 112 }, { yPercent: 0, duration: 0.6, ease: "flow", stagger: 0.016 });
    fromWidth.current = null;
  }, [shown]);

  return (
    <span
      ref={ref}
      className={cn("roll", className)}
      style={fit ? ({ "--fit-line": lineChars(shown) } as CSSProperties) : undefined}
      aria-hidden
    >
      {[...shown].map((c, i) => (
        <span key={`${shown}-${i}`} className="rc">
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}
