"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isMouse, prefersReducedMotion } from "@/lib/utils";

/**
 * A single cyan pixel that trails the pointer. Over anything clickable it
 * grows a four-corner frame; elements with `data-cursor="Label"` put a word
 * inside the frame.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const smooth = !prefersReducedMotion();
    const xTo = gsap.quickTo(el, "x", { duration: smooth ? 0.28 : 0, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: smooth ? 0.28 : 0, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (!isMouse(e)) {
        el.dataset.visible = "false";
        return;
      }
      el.dataset.visible = "true";
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        el.dataset.mode = "label";
        if (labelRef.current) labelRef.current.textContent = labelled.dataset.cursor ?? "";
        return;
      }
      if (t.closest("input, textarea, select")) {
        el.dataset.mode = "text";
        return;
      }
      el.dataset.mode = t.closest("a, button, [role='button'], label, summary") ? "link" : "default";
    };
    const onLeave = () => {
      el.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" data-mode="default" data-visible="false" aria-hidden>
      <div className="cursor-dot" />
      <div className="cursor-frame">
        <i />
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
