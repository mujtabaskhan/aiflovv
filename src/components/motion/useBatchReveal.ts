"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Entrance for items inside client-rendered lists (filters, toggles). The
 * attribute engine can't own these — items come and go after it has run —
 * so they reveal in batches as they scroll in, and anything added later
 * simply appears.
 */
export function useBatchReveal(ref: RefObject<HTMLElement | null>, selector: string) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    let triggers: ScrollTrigger[] = [];
    let els: HTMLElement[] = [];
    const off = onReady(() => {
      els = gsap.utils.toArray<HTMLElement>(selector, root);
      gsap.set(els, { autoAlpha: 0, y: 48 });
      triggers = ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09, overwrite: true }),
      });
    });
    return () => {
      off();
      triggers.forEach((t) => t.kill());
      if (els.length) gsap.set(els, { clearProps: "opacity,visibility,transform" });
    };
  }, [ref, selector]);
}
