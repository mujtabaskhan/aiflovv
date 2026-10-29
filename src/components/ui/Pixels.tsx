import { WORDMARK, TONE_DARK } from "@/lib/pixelFont";
import type { SVGProps } from "react";

/** The squares of one pixel "V" from the logo: seven cells on a 7×4 grid. */
const V_CELLS: [number, number][] = [
  [0, 0],
  [6, 0],
  [1, 1],
  [5, 1],
  [2, 2],
  [4, 2],
  [3, 3],
];

export const VV_CELLS: { x: number; y: number; v: 0 | 1 }[] = [
  ...V_CELLS.map(([x, y]) => ({ x, y, v: 0 as const })),
  ...V_CELLS.map(([x, y]) => ({ x: x + 8, y, v: 1 as const })),
];

/** The logo's pixel chevrons, drawn as true squares. */
export function PixelVV({
  colors = ["#4f7cff", "#3cc8ff"],
  gap = 0.06,
  ...props
}: SVGProps<SVGSVGElement> & { colors?: [string, string]; gap?: number }) {
  return (
    <svg viewBox="0 0 15 4" aria-hidden {...props}>
      {VV_CELLS.map((c, i) => (
        <rect
          key={i}
          x={c.x + gap / 2}
          y={c.y + gap / 2}
          width={1 - gap}
          height={1 - gap}
          fill={colors[c.v]}
          data-v={c.v}
        />
      ))}
    </svg>
  );
}

const ARROW: [number, number][] = [
  [2, 0],
  [3, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [3, 3],
  [2, 4],
];

const ARROW_UP_RIGHT: [number, number][] = [
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [3, 1],
  [2, 2],
  [1, 3],
  [0, 4],
];

/** A five-by-five pixel arrow. `diagonal` points up-right for outbound links. */
export function PixelArrow({ diagonal = false, size = 14, ...props }: SVGProps<SVGSVGElement> & { diagonal?: boolean; size?: number }) {
  const cells = diagonal ? ARROW_UP_RIGHT : ARROW;
  return (
    <svg viewBox="0 0 5 5" width={size} height={size} fill="currentColor" aria-hidden shapeRendering="crispEdges" {...props}>
      {cells.map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  );
}

/**
 * A symmetric 5×5 pixel glyph derived from a string — like a GitHub
 * identicon, so every capability gets its own mark.
 */
export function PixelIdenticon({ seed, size = 44, className }: { seed: string; size?: number; className?: string }) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const cells: [number, number][] = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      const bit = (h >>> (y * 3 + x)) & 1;
      if (bit || (x === 2 && y === 2)) {
        cells.push([x, y]);
        if (x < 2) cells.push([4 - x, y]);
      }
    }
  }
  return (
    <svg viewBox="0 0 5 5" width={size} height={size} className={className} aria-hidden shapeRendering="crispEdges">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x + 0.06} y={y + 0.06} width={0.88} height={0.88} fill={x < 2 ? "#4f7cff" : x > 2 ? "#3cc8ff" : "#eef2ff"} />
      ))}
    </svg>
  );
}

export const SERVICE_GLYPHS: Record<string, string[]> = {
  "web-development": ["#######", "#.#.#.#", "#######", "#.....#", "#.###.#", "#.....#", "#######"],
  "mobile-applications": [".#####.", ".#...#.", ".#...#.", ".#...#.", ".#...#.", ".#.#.#.", ".#####."],
  "ai-solutions": ["...#...", "...#...", "..###..", "#######", "..###..", "...#...", "...#..."],
  "software-development": ["#######", "#.....#", "#.#...#", "#..#..#", "#.#.###", "#.....#", "#######"],
  "saas-development": ["#######", "##....#", "##..#.#", "##.##.#", "##.####", "##....#", "#######"],
  "ecommerce-development": ["..###..", ".#...#.", "#######", "#.....#", "#.#.#.#", "#.....#", "#######"],
  "ui-ux-design": ["#.....#", ".#####.", ".#...#.", ".#...#.", ".#...#.", ".#####.", "#.....#"],
  "cloud-devops": [".......", "..###..", ".#...##", "#.....#", "#.....#", ".#####.", "......."],
};

/** A seven-by-seven pixel icon for each service. */
export function ServiceGlyph({ slug, size = 20, className }: { slug: string; size?: number; className?: string }) {
  const rows = SERVICE_GLYPHS[slug] ?? SERVICE_GLYPHS["web-development"];
  return (
    <svg viewBox="0 0 7 7" width={size} height={size} className={className} fill="currentColor" aria-hidden shapeRendering="crispEdges">
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) => (ch === "#" ? <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width={0.84} height={0.84} /> : null)),
      )}
    </svg>
  );
}

/** The AiFlovv wordmark in pixel letters. */
export function PixelWordmark({ className, gap = 0.08 }: { className?: string; gap?: number }) {
  return (
    <svg viewBox={`0 0 ${WORDMARK.cols} 7`} className={className} role="img" aria-label="AiFlovv" shapeRendering="crispEdges">
      {WORDMARK.cells.map((c, i) => (
        <rect
          key={i}
          x={c.x + gap / 2}
          y={c.y + gap / 2}
          width={1 - gap}
          height={1 - gap}
          fill={TONE_DARK[c.tone]}
          data-letter={c.letter}
        />
      ))}
    </svg>
  );
}
