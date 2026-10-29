"use client";

import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { WORDMARK, TONE_DARK } from "@/lib/pixelFont";
import { onReady } from "@/lib/ready";
import { isMouse, prefersReducedMotion } from "@/lib/utils";

const OX = 3;
const OY = 2;
const COLS = WORDMARK.cols + OX * 2;
const ROWS = 7 + OY * 2;

/** Glow trail: each light follows the pointer a little later and fainter. */
const TRAIL = [
  { r: 2.4, lag: 0.08, o: 0.85 },
  { r: 2, lag: 0.3, o: 0.5 },
  { r: 1.6, lag: 0.7, o: 0.3 },
];

/* ------------------------------------------------------------------ */
/* Pen paths: the order a hand would draw each pixel letter.           */

type P = { x: number; y: number; i: number };

// Same direction first, then a right-angle turn, then a diagonal.
const DIRS = [
  [0, -1], [1, 0], [0, 1], [-1, 0],
  [1, -1], [1, 1], [-1, 1], [-1, -1],
] as const;

/**
 * Walks a letter's cells like a pen: keep going the same way while you can,
 * turn when you must, and lift the pen to the nearest unvisited cell when a
 * stroke ends (the F's middle bar, the i's dot).
 */
function trace(cells: P[], start: P): P[] {
  const left = new Map(cells.map((c) => [`${c.x},${c.y}`, c]));
  const out: P[] = [];
  let cur: P | undefined = start;
  let dir: readonly [number, number] = [0, 0];
  while (cur) {
    out.push(cur);
    left.delete(`${cur.x},${cur.y}`);
    let best: { c: P; d: readonly [number, number]; score: number } | undefined;
    for (const d of DIRS) {
      const c = left.get(`${cur.x + d[0]},${cur.y + d[1]}`);
      if (!c) continue;
      const score = d[0] === dir[0] && d[1] === dir[1] ? 0 : d[0] === 0 || d[1] === 0 ? 1 : 2;
      if (!best || score < best.score) best = { c, d, score };
    }
    if (best) {
      cur = best.c;
      dir = best.d;
    } else {
      // Pen lift: the nearest cell still to draw.
      const from: P = cur;
      cur = [...left.values()].sort((a, b) => Math.hypot(a.x - from.x, a.y - from.y) - Math.hypot(b.x - from.x, b.y - from.y))[0];
      dir = [0, 0];
    }
  }
  return out;
}

/** Where the pen starts on each glyph of A i F L O V V. */
const STARTS: ("bottom-left" | "top-left" | "stem-top")[] = ["bottom-left", "stem-top", "bottom-left", "top-left", "top-left", "top-left", "top-left"];

const STROKES: { order: P[][]; letters: number } = (() => {
  const byLetter = new Map<number, P[]>();
  WORDMARK.cells.forEach((c, i) => {
    const list = byLetter.get(c.letter) ?? [];
    list.push({ x: c.x, y: c.y, i });
    byLetter.set(c.letter, list);
  });
  const order = [...byLetter.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([letter, cells]) => {
      const minX = Math.min(...cells.map((c) => c.x));
      const leftCol = cells.filter((c) => c.x === minX);
      const kind = STARTS[letter] ?? "top-left";
      const start =
        kind === "bottom-left"
          ? leftCol.reduce((a, b) => (b.y > a.y ? b : a))
          : kind === "stem-top"
            ? cells.filter((c) => c.y > 1).reduce((a, b) => (b.y < a.y ? b : a))
            : cells.reduce((a, b) => (b.y < a.y || (b.y === a.y && b.x < a.x) ? b : a));
      return trace(cells, start);
    });
  return { order, letters: order.length };
})();

const STEP = 0.026; // seconds per cell along a stroke
const GAP = 0.07; // pause between letters

/**
 * The footer sign-off: AiFlovv written out on an LED panel, in the same pixel
 * letters as the preloader and the hero. It writes itself — stroke by stroke,
 * behind a glowing pen — every time it scrolls into view, on every page; tap
 * it to write it again. Pass the pointer over it and the panel answers.
 *
 * The dark cells are one patterned rect and the glow is a few gradient
 * circles masked to the cells, so the panel stays light on the DOM.
 */
export function Signature() {
  const svgRef = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");
  const pathname = usePathname();

  // Writing: rebuilt on every route, because the footer itself never unmounts.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const rects = Array.from(svg.querySelectorAll<SVGRectElement>("[data-lit]"));
    const pen = svg.querySelector<SVGRectElement>(".sig-pen")!;
    const halo = svg.querySelector<SVGCircleElement>(".sig-halo")!;
    const cursor = svg.querySelector<SVGRectElement>(".sig-cursor")!;

    if (prefersReducedMotion()) {
      gsap.set(rects, { opacity: 1 });
      return;
    }

    const tone = (i: number) => TONE_DARK[WORDMARK.cells[i].tone];
    const tl = gsap.timeline({ paused: true });
    let t = 0.1;
    STROKES.order.forEach((stroke) => {
      stroke.forEach((p, k) => {
        const at = t + k * STEP;
        const x = p.x + OX;
        const y = p.y + OY;
        tl.set(pen, { attr: { x, y }, opacity: 1 }, at)
          .set(halo, { attr: { cx: x + 0.5, cy: y + 0.5 }, opacity: 1 }, at)
          .set(rects[p.i], { opacity: 1, fill: "#ffffff" }, at)
          .to(rects[p.i], { fill: tone(p.i), duration: 0.5, ease: "power2.out" }, at + 0.05);
      });
      t += stroke.length * STEP + GAP;
    });
    // The pen becomes a cursor one cell after the last letter, blinks, and goes out.
    const cx = WORDMARK.cols + OX + 1 + 0.06;
    tl.set(pen, { opacity: 0 }, t)
      .to(halo, { opacity: 0, duration: 0.3 }, t)
      .set(cursor, { attr: { x: cx }, opacity: 1 }, t);
    for (let b = 0; b < 3; b++) {
      tl.set(cursor, { opacity: 0 }, t + 0.35 + b * 0.5).set(cursor, { opacity: 1 }, t + 0.6 + b * 0.5);
    }
    tl.to(cursor, { opacity: 0, duration: 0.3 }, t + 1.9);

    const hide = () => {
      tl.pause(0);
      gsap.set(rects, { opacity: 0, fill: (i: number) => tone(i) });
      gsap.set([pen, halo, cursor], { opacity: 0 });
    };
    hide();
    const write = () => tl.restart();

    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: svg,
        start: "top 92%",
        onEnter: write,
        // Scrolled back up past it: blank the panel so it writes again next time.
        onLeaveBack: hide,
      });
    });

    const onTap = () => write();
    svg.addEventListener("click", onTap);
    return () => {
      off();
      st?.kill();
      tl.kill();
      svg.removeEventListener("click", onTap);
    };
  }, [pathname]);

  // Pointer glow.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const glows = Array.from(svg.querySelectorAll<SVGCircleElement>(".sig-glow"));
    const toPanel = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * COLS, y: ((e.clientY - r.top) / r.height) * ROWS };
    };
    const onEnter = (e: PointerEvent) => {
      if (!isMouse(e)) return;
      const p = toPanel(e);
      glows.forEach((g, i) => {
        gsap.set(g, { attr: { cx: p.x, cy: p.y } });
        gsap.to(g, { opacity: TRAIL[i].o, duration: 0.2, overwrite: "auto" });
      });
    };
    const onMove = (e: PointerEvent) => {
      if (!isMouse(e)) return;
      const p = toPanel(e);
      glows.forEach((g, i) => gsap.to(g, { attr: { cx: p.x, cy: p.y }, duration: TRAIL[i].lag, ease: "power2.out", overwrite: "auto" }));
    };
    const onLeave = () => glows.forEach((g) => gsap.to(g, { opacity: 0, duration: 1.1, ease: "power2.out" }));
    svg.addEventListener("pointerenter", onEnter);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      svg.removeEventListener("pointerenter", onEnter);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="sig relative mt-20 mb-6 sm:mt-32">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${COLS} ${ROWS}`}
        className="h-auto w-full cursor-pointer"
        role="img"
        aria-label="AiFlovv"
        shapeRendering="crispEdges"
      >
        <defs>
          <pattern id={`${id}-cell`} width="1" height="1" patternUnits="userSpaceOnUse">
            <rect x={0.06} y={0.06} width={0.88} height={0.88} fill="#0b1124" />
          </pattern>
          <pattern id={`${id}-hole`} width="1" height="1" patternUnits="userSpaceOnUse">
            <rect x={0.06} y={0.06} width={0.88} height={0.88} fill="#fff" />
          </pattern>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={COLS} height={ROWS}>
            <rect width={COLS} height={ROWS} fill={`url(#${id}-hole)`} />
          </mask>
          <radialGradient id={`${id}-glow`}>
            <stop offset="0" stopColor="#eaf2ff" />
            <stop offset="1" stopColor="#eaf2ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-halo`}>
            <stop offset="0" stopColor="#3cc8ff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#3cc8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={COLS} height={ROWS} fill={`url(#${id}-cell)`} />
        {WORDMARK.cells.map((c, i) => (
          <rect key={i} data-lit="" x={c.x + OX + 0.06} y={c.y + OY + 0.06} width={0.88} height={0.88} fill={TONE_DARK[c.tone]} />
        ))}
        <g mask={`url(#${id}-mask)`}>
          <circle className="sig-halo" cx={-10} cy={-10} r={2.2} fill={`url(#${id}-halo)`} opacity={0} />
          {TRAIL.map((t, i) => (
            <circle key={i} className="sig-glow" cx={-10} cy={-10} r={t.r} fill={`url(#${id}-glow)`} opacity={0} />
          ))}
        </g>
        <rect className="sig-pen" x={-10} y={-10} width={1} height={1} fill="#ffffff" opacity={0} />
        <rect className="sig-cursor" x={-10} y={OY + 0.06} width={0.88} height={7 - 0.12} fill="#3cc8ff" opacity={0} />
      </svg>
    </div>
  );
}
