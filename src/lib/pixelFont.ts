/**
 * The AiFlovv wordmark as pixel letters, drawn to echo the logo: a peaked
 * "A" with no crossbar, a lowercase "i" with a square dot, the blue "F", the
 * rounded "O" and the stepped chevrons of "VV".
 */

type Tone = "ink" | "blue" | "cyan";

interface Glyph {
  rows: string[];
  tone: Tone;
  /** Tone for the "o" cells, used for the i's dot. */
  accent?: Tone;
}

const GLYPHS: Glyph[] = [
  { tone: "ink", rows: ["..#..", ".#.#.", ".#.#.", "#...#", "#...#", "#...#", "#...#"] },
  { tone: "ink", accent: "blue", rows: ["o", ".", "#", "#", "#", "#", "#"] },
  { tone: "blue", rows: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."] },
  { tone: "ink", rows: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"] },
  { tone: "ink", rows: [".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."] },
  { tone: "blue", rows: ["#.....#", "#.....#", ".#...#.", ".#...#.", "..#.#..", "..#.#..", "...#..."] },
  { tone: "cyan", rows: ["#.....#", "#.....#", ".#...#.", ".#...#.", "..#.#..", "..#.#..", "...#..."] },
];

export interface WordCell {
  x: number;
  y: number;
  tone: Tone;
  /** Which letter this cell belongs to (0–6). */
  letter: number;
}

export const WORDMARK_ROWS = 7;

/** Every lit cell of the wordmark, left to right, with one column between letters. */
export const WORDMARK: { cells: WordCell[]; cols: number } = (() => {
  const cells: WordCell[] = [];
  let x0 = 0;
  GLYPHS.forEach((g, letter) => {
    const w = g.rows[0].length;
    g.rows.forEach((row, y) =>
      [...row].forEach((ch, x) => {
        if (ch === "#") cells.push({ x: x0 + x, y, tone: g.tone, letter });
        if (ch === "o") cells.push({ x: x0 + x, y, tone: g.accent ?? g.tone, letter });
      }),
    );
    x0 += w + 1;
  });
  return { cells, cols: x0 - 1 };
})();

export const TONE_DARK: Record<Tone, string> = { ink: "#eef2ff", blue: "#4f7cff", cyan: "#3cc8ff" };
