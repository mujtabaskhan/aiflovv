import type { PostCategory } from "@/content/posts";
import { cn, hashString, mulberry32 } from "@/lib/utils";

/**
 * Generative cover art for articles: a pixel field shaped by the post's slug,
 * with the category's glyph lit in the middle. Deterministic, so the server
 * and the browser draw the same picture — and every post gets its own.
 */

export const CATEGORY_GLYPHS: Record<PostCategory, string[]> = {
  AI: [
    "....#....",
    "....#....",
    "...###...",
    "..#####..",
    "#########",
    "..#####..",
    "...###...",
    "....#....",
    "....#....",
  ],
  Mobile: [
    "..#####..",
    "..#...#..",
    "..#.#.#..",
    "..#...#..",
    "..#.#.#..",
    "..#...#..",
    "..#...#..",
    "..#.#.#..",
    "..#####..",
  ],
  Cloud: [
    ".........",
    "...###...",
    "..#...#..",
    ".##...##.",
    "#.......#",
    "#.......#",
    ".#######.",
    ".........",
    ".........",
  ],
  Web: [
    "#########",
    "#.#.#...#",
    "#########",
    "#.......#",
    "#.###.#.#",
    "#.......#",
    "#.##.##.#",
    "#.......#",
    "#########",
  ],
  Design: [
    "....#....",
    "...#.#...",
    "..#...#..",
    ".#.....#.",
    "#...#...#",
    ".#.....#.",
    "..#...#..",
    "...#.#...",
    "....#....",
  ],
  Software: [
    ".........",
    "#........",
    ".#.......",
    "..#......",
    ".#.......",
    "#........",
    ".........",
    "....#####",
    ".........",
  ],
  "E-commerce": [
    "...###...",
    "..#...#..",
    "..#...#..",
    "#########",
    "#.......#",
    "#.......#",
    "#.......#",
    "#.......#",
    "#########",
  ],
  Process: [
    ".........",
    "#...#....",
    ".#...#...",
    "..#...#..",
    "...#...#.",
    "..#...#..",
    ".#...#...",
    "#...#....",
    ".........",
  ],
};

const COLS = 32;
const ROWS = 18;

export function PixelCover({
  slug,
  category,
  className,
  label = true,
}: {
  slug: string;
  category: PostCategory;
  className?: string;
  label?: boolean;
}) {
  const rand = mulberry32(hashString(slug));
  const fa = 0.18 + rand() * 0.25;
  const fb = 0.2 + rand() * 0.3;
  const ph = rand() * Math.PI * 2;
  const tilt = (rand() - 0.5) * 1.4;
  const glyph = CATEGORY_GLYPHS[category];
  const gx = Math.round(COLS * (0.5 + (rand() - 0.5) * 0.3)) - 4;
  const gy = Math.round((ROWS - 9) / 2);

  const cells: { x: number; y: number; o: number; c: number }[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const inGlyph = glyph[y - gy]?.[x - gx] === "#";
      if (inGlyph) continue;
      // A wave field, swept diagonally — the "flow".
      const v =
        Math.sin(x * fa + y * tilt * fa + ph) * 0.5 +
        Math.sin(y * fb - x * 0.07 + ph * 1.7) * 0.5 +
        (rand() - 0.5) * 0.55;
      // Rounded so the server and the browser serialise identical values.
      if (v > 0.2) cells.push({ x, y, o: Math.round(Math.min(1, (v - 0.2) * 1.4) * 1000) / 1000, c: x / COLS });
    }
  }
  // One path per opacity step (and per flicker phase for the glyph) instead of
  // a rect per cell keeps a page of covers to a few dozen DOM nodes.
  const square = (x: number, y: number, inset: number) => {
    const s = (1 - inset * 2).toFixed(2);
    return `M${(x + inset).toFixed(2)} ${(y + inset).toFixed(2)}h${s}v${s}h-${s}z`;
  };
  const field = new Map<number, string>();
  for (const c of cells) {
    const o = Math.round((0.12 + c.o * 0.5) * 20) / 20;
    field.set(o, (field.get(o) ?? "") + square(c.x, c.y, 0.08));
  }
  const lit: string[] = Array(7).fill("");
  let n = 0;
  glyph.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === "#") lit[n++ % 7] += square(x + gx, y + gy, 0.06);
    }),
  );

  return (
    <div className={cn("pixel-cover", className)} aria-hidden>
      <svg viewBox={`0 0 ${COLS} ${ROWS}`} preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
        <defs>
          <linearGradient id={`pc-${slug}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={COLS} y2={ROWS * 0.4}>
            <stop offset="0" stopColor="#2453e8" />
            <stop offset="1" stopColor="#3cc8ff" />
          </linearGradient>
        </defs>
        <rect width={COLS} height={ROWS} fill="#070b18" />
        {[...field].map(([o, d]) => (
          <path key={o} d={d} fill={`url(#pc-${slug})`} opacity={o} />
        ))}
        {lit.map((d, i) =>
          d ? <path key={`g${i}`} className="pc-lit" d={d} fill="#eef2ff" style={{ animationDelay: `${i * 0.12}s` }} /> : null,
        )}
      </svg>
      {label && <span className="pixel-cover-tag t-label">{category}</span>}
    </div>
  );
}
