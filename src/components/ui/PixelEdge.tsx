"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { hashString, mulberry32, prefersReducedMotion } from "@/lib/utils";

interface Cell {
  x: number;
  y: number;
  /** Scroll progress at which this square switches on. */
  t: number;
}

function build(cols: number, rows: number, seed: number) {
  const rand = mulberry32(seed);
  const cells: Cell[] = [];
  for (let x = 0; x < cols; x++) {
    // A soft, uneven skyline: neighbouring columns stay close in height.
    const base = Math.sin(x * 0.55 + seed * 0.001) * 0.9 + Math.sin(x * 0.21 + 2) * 0.8 + 1.2;
    const height = Math.max(0, Math.min(rows, Math.round(base + (rand() - 0.5) * 1.2)));
    for (let k = 0; k < rows; k++) {
      const y = rows - 1 - k;
      const solid = k < height;
      // Squares near the bottom are there from the start; the rest fill in.
      const t = solid ? (k === 0 ? 0 : 0.15 + rand() * 0.45) : 0.55 + rand() * 0.45;
      if (solid || rand() < 0.35) cells.push({ x, y, t });
    }
  }
  return cells;
}

/**
 * Where a dark section meets the white page, it dissolves into pixels: white
 * squares climb out of the edge and fill in as the section scrolls away.
 * Place it as the last child of a `position: relative` dark section.
 */
export function PixelEdge({ color = "#ffffff", side = "bottom", seed = "edge" }: { color?: string; side?: "bottom" | "top"; seed?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const s = hashString(seed);
  const wide = build(40, 3, s);
  const narrow = build(12, 3, s + 7);

  useEffect(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;
    const rects = Array.from(el.querySelectorAll<SVGRectElement>("rect"));
    const apply = (p: number) => {
      for (const r of rects) {
        const t = Number(r.dataset.t);
        r.style.opacity = p >= t ? "1" : "0";
      }
    };
    if (prefersReducedMotion()) {
      apply(0.6);
      return;
    }
    apply(0.12);
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: section,
        start: side === "bottom" ? "bottom 95%" : "top bottom",
        end: side === "bottom" ? "bottom 25%" : "top 40%",
        onUpdate: (self) => apply(0.12 + self.progress * 0.88),
      });
    });
    return () => {
      off();
      st?.kill();
    };
  }, [side]);

  const svg = (cells: Cell[], cols: number, cls: string) => (
    <svg className={cls} viewBox={`0 0 ${cols} 3`} preserveAspectRatio="none" shapeRendering="crispEdges" aria-hidden>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1.02} height={1.02} fill={color} data-t={c.t.toFixed(3)} opacity={c.t <= 0.12 ? 1 : 0} />
      ))}
    </svg>
  );

  return (
    <div ref={ref} className="pixel-edge" data-side={side} aria-hidden>
      {svg(wide, 40, "pixel-edge-wide")}
      {svg(narrow, 12, "pixel-edge-narrow")}
    </div>
  );
}
