"use client";

import { useEffect } from "react";
import { journey, SECTION_IDS } from "@/lib/journey";
import { swapOpacity, themeAt } from "@/lib/theme";
import { useAppStore } from "@/store/useAppStore";

type Side = "dark" | "light";

const mark = (el: HTMLElement, side: Side) => {
  if (side === "dark") {
    if (el.dataset.theme !== "dark") el.dataset.theme = "dark";
  } else if (el.dataset.theme) {
    delete el.dataset.theme;
  }
};

/**
 * Drives the light/dark environment in the DOM as the journey advances.
 *
 * The canvas inverts continuously; the DOM follows it in two cheap moves:
 *
 *  - Colours. The dark tokens live in CSS under `[data-theme="dark"]`, and
 *    only what is on screen is ever marked: the one or two sections in view
 *    (plus the footer after the last), and the fixed chrome (`data-chrome`).
 *    The mark flips once per crossover, at its midpoint, when the content is
 *    dipped almost to nothing; a section arriving later picks up the current
 *    side as it scrolls into view. A switch therefore restyles a few hundred
 *    elements, never the whole document. The nav cross-fades on its own CSS
 *    transition.
 *  - The dip itself: plain opacity on the sections in view, every frame.
 */
export function ThemeDriver() {
  const webgl = useAppStore((s) => s.webgl);

  useEffect(() => {
    // The static fallback is a single flat light backdrop: leave everything
    // on the default (light) tokens.
    if (!webgl) return;

    let raf = 0;
    let lastSide: Side | null = null;
    let lastOpacity = 1;
    let dimmed: HTMLElement[] = [];

    const section = (i: number): HTMLElement | null => {
      if (i < 0) return null;
      if (i < SECTION_IDS.length) return document.getElementById(SECTION_IDS[i]);
      return i === SECTION_IDS.length ? document.querySelector("footer") : null;
    };

    const tick = () => {
      const t = themeAt(journey.stage);
      const side: Side = t < 0.5 ? "dark" : "light";
      const i = Math.floor(journey.stage);
      const inView = [section(i), section(i + 1)].filter(Boolean) as HTMLElement[];

      if (side !== lastSide) {
        lastSide = side;
        document.querySelectorAll<HTMLElement>("[data-chrome]").forEach((el) => mark(el, side));
      }
      for (const el of inView) mark(el, side);

      const op = swapOpacity(t);
      if (Math.abs(op - lastOpacity) > 0.002 || (op === 1 && lastOpacity !== 1)) {
        lastOpacity = op;
        for (const el of dimmed) if (!inView.includes(el)) el.style.opacity = "";
        for (const el of inView) el.style.opacity = op < 0.999 ? op.toFixed(3) : "";
        dimmed = op < 0.999 ? inView : [];
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [webgl]);

  return null;
}
