import { ImageResponse } from "next/og";
import { WORDMARK, WORDMARK_ROWS, TONE_DARK } from "@/lib/pixelFont";
import { hashString, mulberry32 } from "@/lib/utils";

/**
 * Share cards for every page, drawn in the site's own language: the pixel
 * wordmark, a dark "screen", the page's pixel glyph with loose pixels
 * streaming into it ("ideas in, products out"), and the white pixel skyline
 * every dark section dissolves into.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = "image/png";

const W = OG_SIZE.width;
const H = OG_SIZE.height;
const BG = "#03050b";
const INK = "#eef2ff";
const MUTED = "#8691ae";
const DIM = "#737e9e";
const BLUE = "#4f7cff";
const CYAN = "#3cc8ff";

export interface OgCard {
  /** Small caps line above the title, e.g. "Service 03 / 08". */
  label: string;
  title: string;
  /** One word of the title drawn in brand blue. */
  accentWord?: string;
  /** A sentence under the title. */
  text?: string;
  /** Bottom-left detail, e.g. "4 min read · 22 Oct 2026". */
  footer?: string;
  /** One glyph drawn large, or several drawn small in a grid. */
  glyphs?: string[][];
  /** Plain colour squares instead of glyphs (e.g. client brand colours). */
  swatches?: string[];
  /** Glyph colour, left to right. */
  tint?: [string, string];
  seed: string;
}

const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function mix(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
}

const clip = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(" ", max - 1))}…`);

function Glyph({ rows, cell, tint }: { rows: string[]; cell: number; tint: [string, string] }) {
  const n = rows[0].length;
  return (
    <div style={{ position: "relative", display: "flex", width: n * cell, height: rows.length * cell }}>
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "#" ? (
            <div
              key={`${x}-${y}`}
              style={{
                position: "absolute",
                left: x * cell,
                top: y * cell,
                width: cell - Math.max(2, cell * 0.12),
                height: cell - Math.max(2, cell * 0.12),
                background: mix(tint[0], tint[1], x / Math.max(1, n - 1)),
              }}
            />
          ) : null,
        ),
      )}
    </div>
  );
}

export function ogImage(card: OgCard) {
  const rand = mulberry32(hashString(card.seed));
  const tint = card.tint ?? [BLUE, CYAN];
  const size = card.title.length <= 26 ? 84 : card.title.length <= 44 ? 68 : card.title.length <= 64 ? 58 : 50;
  const glyphs = card.glyphs ?? [];
  const single = glyphs.length === 1;
  const cell = single ? Math.floor(300 / glyphs[0][0].length) : 10;

  // Loose pixels drifting toward the glyph.
  const loose = Array.from({ length: 34 }, (_, i) => {
    const t = rand();
    return {
      x: 700 + t * 150 + rand() * 30,
      y: 150 + rand() * 300,
      s: 4 + Math.round(rand() * 6),
      o: 0.15 + t * 0.6,
      c: i % 3 === 0 ? CYAN : BLUE,
    };
  });

  // The white pixel skyline along the bottom edge.
  const COLS = 40;
  const SQ = W / COLS;
  const sky: { x: number; y: number; o: number }[] = [];
  for (let x = 0; x < COLS; x++) {
    const base = Math.sin(x * 0.55) * 0.9 + Math.sin(x * 0.21 + 2) * 0.8 + 1.2;
    const height = Math.max(0, Math.min(3, Math.round(base + (rand() - 0.5) * 1.2)));
    for (let k = 0; k < 3; k++) {
      if (k < height) sky.push({ x, y: k, o: 1 });
      else if (rand() < 0.22) sky.push({ x, y: k, o: 0.35 });
    }
  }

  const wcell = 8;
  const words = card.title.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: BG,
          backgroundImage: "radial-gradient(circle at 78% 44%, rgba(79,124,255,0.24), rgba(3,5,11,0) 46%)",
          padding: "52px 64px",
          color: INK,
        }}
      >
        {/* Faint grid */}
        {Array.from({ length: 31 }, (_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", left: i * 40, top: 0, width: 1, height: H, background: "rgba(148,168,255,0.05)" }} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <div key={`h${i}`} style={{ position: "absolute", left: 0, top: i * 40, width: W, height: 1, background: "rgba(148,168,255,0.05)" }} />
        ))}

        {/* Header: pixel wordmark and address */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", width: WORDMARK.cols * wcell, height: WORDMARK_ROWS * wcell }}>
            {WORDMARK.cells.map((c, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: c.x * wcell,
                  top: c.y * wcell,
                  width: wcell - 1,
                  height: wcell - 1,
                  background: TONE_DARK[c.tone],
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: DIM, textTransform: "uppercase" }}>aiflovv.com</div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", marginTop: -40 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 680 }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: 19, letterSpacing: 4, color: CYAN, textTransform: "uppercase" }}>
              <div style={{ width: 10, height: 10, background: CYAN, marginRight: 14 }} />
              {card.label}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 22,
                fontSize: size,
                lineHeight: 1.04,
                letterSpacing: -size * 0.035,
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  style={{
                    marginRight: size * 0.24,
                    color: card.accentWord && w.replace(/[^\w-]/g, "") === card.accentWord ? BLUE : INK,
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
            {card.text && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 25, lineHeight: 1.42, color: MUTED, maxWidth: 640 }}>
                {/* Two lines at most — one when the title already takes four. */}
                {clip(card.text, card.title.length > 64 ? 54 : 100)}
              </div>
            )}
          </div>

          {/* Product: loose pixels flowing into the glyph */}
          <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            {single ? (
              <Glyph rows={glyphs[0]} cell={cell} tint={tint} />
            ) : glyphs.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", width: 4 * 70 + 3 * 28, gap: 28 }}>
                {glyphs.map((g, i) => (
                  <Glyph key={i} rows={g} cell={Math.floor(70 / g[0].length)} tint={tint} />
                ))}
              </div>
            ) : card.swatches ? (
              <div style={{ display: "flex", flexWrap: "wrap", width: 4 * 64 + 3 * 14, gap: 14 }}>
                {card.swatches.map((c, i) => (
                  <div key={i} style={{ width: 64, height: 64, background: c }} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {loose.map((p, i) => (
          <div key={`p${i}`} style={{ position: "absolute", left: p.x, top: p.y, width: p.s, height: p.s, background: p.c, opacity: p.o }} />
        ))}

        {card.footer && (
          <div style={{ position: "absolute", left: 64, bottom: 3 * SQ + 26, display: "flex", fontSize: 20, letterSpacing: 2, color: DIM, textTransform: "uppercase" }}>
            {clip(card.footer, 66)}
          </div>
        )}

        {/* Pixel skyline */}
        {sky.map((s, i) => (
          <div
            key={`s${i}`}
            style={{ position: "absolute", left: s.x * SQ, bottom: s.y * SQ, width: SQ, height: SQ, background: "#ffffff", opacity: s.o }}
          />
        ))}
      </div>
    ),
    OG_SIZE,
  );
}
