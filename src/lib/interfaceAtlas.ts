import { makeRng } from "@/lib/math";
import { TECHNOLOGIES, CATEGORY_LABEL } from "@/data/technologies";

/**
 * The interface atlas: every screen in the 3D scene, drawn once into a single
 * canvas.
 *
 * The channels carry meaning rather than colour, so the shader can re-ink the
 * same drawing for the light and dark acts without a second texture:
 *
 *   R  ink     — text, strokes, icons
 *   G  accent  — the brand blue
 *   B  fill    — secondary surfaces (inputs, tiles, sidebars)
 *
 * All three at full strength marks a caret, which the shader blinks. Content
 * that sits on an accent block (a label on a button) is knocked out to black,
 * so it shows the panel surface through it — white on blue in the light acts,
 * glass on glowing blue in the dark ones.
 */

export const TECH_LAYERS = [
  { name: "Interface", techs: ["nextjs", "react", "typescript"] },
  { name: "Services & APIs", techs: ["node", "python"] },
  { name: "Data", techs: ["postgres", "mongodb"] },
  { name: "Cloud & DevOps", techs: ["aws", "docker", "github"] },
] as const;

const BASE_KINDS = {
  browser: [720, 450],
  dashboard: [720, 450],
  terminal: [512, 320],
  code: [512, 384],
  design: [512, 384],
  image: [384, 256],
  card: [384, 288],
  chart: [384, 288],
  table: [384, 288],
  form: [288, 384],
  phone: [240, 520],
  phone2: [240, 520],
  toast: [384, 128],
  palette: [384, 216],
  type: [288, 216],
  buttons: [384, 216],
  input: [704, 160],
} as const;

export type BaseKind = keyof typeof BASE_KINDS;
export type PanelKind = BaseKind | `chip${number}` | `layer${number}`;

const CHIP_PX: [number, number] = [320, 100];
const LAYER_PX: [number, number] = [480, 300];

export function kindPixels(kind: PanelKind): [number, number] {
  if (kind.startsWith("chip")) return CHIP_PX;
  if (kind.startsWith("layer")) return LAYER_PX;
  const [w, h] = BASE_KINDS[kind as BaseKind];
  return [w, h];
}

export const ATLAS_SIZE = 2048;
const PAD = 16;

/** Atlas rect in UV space, already flipped for `flipY` textures. */
export interface AtlasRect {
  u: number;
  v: number;
  w: number;
  h: number;
}

interface Placed {
  kind: PanelKind;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Shelf-pack every kind, tallest first. Deterministic, so rects are stable. */
function pack(kinds: PanelKind[]): Placed[] {
  const items = kinds
    .map((kind) => {
      const [w, h] = kindPixels(kind);
      return { kind, w, h };
    })
    .sort((a, b) => b.h - a.h);

  const placed: Placed[] = [];
  let x = PAD;
  let y = PAD;
  let row = 0;
  for (const it of items) {
    if (x + it.w + PAD > ATLAS_SIZE) {
      x = PAD;
      y += row + PAD;
      row = 0;
    }
    placed.push({ kind: it.kind, x, y, w: it.w, h: it.h });
    x += it.w + PAD;
    row = Math.max(row, it.h);
  }
  if (y + row + PAD > ATLAS_SIZE && process.env.NODE_ENV === "development") {
    console.warn("[interfaceAtlas] atlas overflow — shrink a kind");
  }
  return placed;
}

/* ------------------------------------------------------------------------ */
/* Drawing primitives                                                        */
/* ------------------------------------------------------------------------ */

type Ch = "ink" | "accent" | "fill" | "caret";
const CH: Record<Ch, string> = {
  ink: "255,0,0",
  accent: "0,255,0",
  fill: "0,0,255",
  caret: "255,255,255",
};

interface Fonts {
  sans: string;
  mono: string;
}

class Painter {
  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly fonts: Fonts,
  ) {}

  private style(ch: Ch, a: number) {
    const c = `rgba(${CH[ch]},${a})`;
    this.ctx.fillStyle = c;
    this.ctx.strokeStyle = c;
  }

  private path(x: number, y: number, w: number, h: number, r: number) {
    const c = this.ctx;
    const rr = Math.max(0, Math.min(r, w / 2, h / 2));
    c.beginPath();
    c.roundRect(x, y, w, h, rr);
  }

  /** Filled rounded rect; `r` defaults to a pill. */
  bar(x: number, y: number, w: number, h: number, ch: Ch, a: number, r = h / 2) {
    this.style(ch, a);
    this.path(x, y, w, h, r);
    this.ctx.fill();
  }

  box(x: number, y: number, w: number, h: number, ch: Ch, a: number, r: number, lw = 1.5) {
    this.style(ch, a);
    this.ctx.lineWidth = lw;
    this.path(x + lw / 2, y + lw / 2, w - lw, h - lw, r);
    this.ctx.stroke();
  }

  dot(x: number, y: number, r: number, ch: Ch, a: number) {
    this.style(ch, a);
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  ring(x: number, y: number, r: number, lw: number, ch: Ch, a: number, from = 0, to = Math.PI * 2) {
    this.style(ch, a);
    this.ctx.lineWidth = lw;
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, from, to);
    this.ctx.stroke();
  }

  line(pts: [number, number][], ch: Ch, a: number, lw = 2) {
    this.style(ch, a);
    this.ctx.lineWidth = lw;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.beginPath();
    pts.forEach(([px, py], i) => (i ? this.ctx.lineTo(px, py) : this.ctx.moveTo(px, py)));
    this.ctx.stroke();
  }

  area(pts: [number, number][], base: number, ch: Ch, a: number) {
    this.style(ch, a);
    const c = this.ctx;
    c.beginPath();
    c.moveTo(pts[0][0], base);
    pts.forEach(([px, py]) => c.lineTo(px, py));
    c.lineTo(pts[pts.length - 1][0], base);
    c.closePath();
    c.fill();
  }

  poly(pts: [number, number][], ch: Ch, a: number) {
    this.style(ch, a);
    const c = this.ctx;
    c.beginPath();
    pts.forEach(([px, py], i) => (i ? c.lineTo(px, py) : c.moveTo(px, py)));
    c.closePath();
    c.fill();
  }

  text(
    s: string,
    x: number,
    y: number,
    px: number,
    ch: Ch,
    a: number,
    { mono = false, weight = 500, align = "left" as CanvasTextAlign, spacing = 0 } = {},
  ) {
    const c = this.ctx;
    this.style(ch, a);
    c.font = `${weight} ${px}px ${mono ? this.fonts.mono : this.fonts.sans}`;
    c.textAlign = align;
    c.textBaseline = "alphabetic";
    c.letterSpacing = `${spacing}px`;
    c.fillText(s, x, y);
    c.letterSpacing = "0px";
    return c.measureText(s).width;
  }

  /** Coloured runs on one baseline — syntax highlighting, prompts. */
  runs(parts: [string, Ch, number][], x: number, y: number, px: number, mono = true) {
    let cx = x;
    for (const [s, ch, a] of parts) {
      cx += this.text(s, cx, y, px, ch, a, { mono });
    }
    return cx;
  }

  /** Knock content out to black so the panel surface shows through. */
  knock(draw: () => void) {
    const c = this.ctx;
    c.save();
    c.globalCompositeOperation = "source-over";
    const fill = c.fillStyle;
    const stroke = c.strokeStyle;
    // Every primitive sets its own style, so override the channel colour by
    // temporarily routing all channels to black.
    const saved = { ...CH };
    CH.ink = CH.accent = CH.fill = CH.caret = "0,0,0";
    draw();
    Object.assign(CH, saved);
    c.fillStyle = fill;
    c.strokeStyle = stroke;
    c.restore();
  }
}

/* ------------------------------------------------------------------------ */
/* Screens                                                                   */
/* ------------------------------------------------------------------------ */

type Draw = (p: Painter, W: number, H: number) => void;

const chrome = (p: Painter, W: number, label: string) => {
  p.dot(18, 17, 5, "ink", 0.3);
  p.dot(34, 17, 5, "ink", 0.22);
  p.dot(50, 17, 5, "ink", 0.16);
  p.bar(W * 0.3, 8, W * 0.4, 18, "fill", 1);
  p.text(label, W * 0.5, 21, 10, "ink", 0.42, { mono: true, align: "center" });
  p.bar(0, 34, W, 1.5, "ink", 0.1, 0);
};

const wave = (x0: number, x1: number, yMid: number, amp: number, seed: number, n = 24) => {
  const rng = makeRng(seed);
  const pts: [number, number][] = [];
  let v = 0;
  for (let i = 0; i <= n; i++) {
    v = v * 0.55 + (rng() - 0.5) * 1.4;
    const t = i / n;
    pts.push([x0 + (x1 - x0) * t, yMid - (Math.sin(t * 3.2 + seed) * 0.45 + v * 0.35 + t * 0.6) * amp]);
  }
  return pts;
};

const DRAW: Record<BaseKind, Draw> = {
  browser: (p, W) => {
    chrome(p, W, "studio.app");
    p.bar(28, 52, 70, 13, "ink", 0.85, 3);
    for (let i = 0; i < 4; i++) p.bar(W - 370 + i * 64, 56, 44, 7, "ink", 0.32);
    p.bar(W - 112, 47, 84, 26, "accent", 1, 13);
    p.knock(() => p.bar(W - 95, 57, 50, 6, "ink", 1));

    p.bar(28, 112, 300, 28, "ink", 0.9, 6);
    p.bar(28, 148, 244, 28, "ink", 0.9, 6);
    p.bar(28, 194, 280, 8, "ink", 0.32);
    p.bar(28, 210, 244, 8, "ink", 0.32);
    p.bar(28, 226, 188, 8, "ink", 0.32);
    p.bar(28, 256, 112, 34, "accent", 1, 17);
    p.knock(() => p.bar(50, 270, 68, 6, "ink", 1));
    p.box(152, 256, 112, 34, "ink", 0.35, 17);
    p.bar(174, 270, 68, 6, "ink", 0.45);

    const ix = W * 0.52;
    const iw = W * 0.44;
    p.bar(ix, 94, iw, 202, "fill", 1, 14);
    p.dot(ix + iw * 0.66, 168, 58, "accent", 0.55);
    p.area(wave(ix, ix + iw, 262, 34, 3), 296, "accent", 0.3);
    p.area(wave(ix, ix + iw, 280, 22, 9), 296, "ink", 0.12);

    const cw = (W - 56 - 32) / 3;
    for (let i = 0; i < 3; i++) {
      const x = 28 + i * (cw + 16);
      p.bar(x, 320, cw, 106, "fill", 0.7, 12);
      p.bar(x + 14, 336, 30, 30, "accent", i === 1 ? 1 : 0.55, 9);
      p.bar(x + 56, 340, cw * 0.46, 8, "ink", 0.75);
      p.bar(x + 56, 354, cw * 0.3, 6, "ink", 0.3);
      p.bar(x + 14, 384, cw - 28, 6, "ink", 0.22);
      p.bar(x + 14, 398, cw * 0.62, 6, "ink", 0.22);
    }
  },

  dashboard: (p, W, H) => {
    p.bar(0, 0, 150, H, "fill", 0.55, 0);
    p.bar(18, 22, 62, 12, "ink", 0.85, 3);
    for (let i = 0; i < 7; i++) {
      const y = 66 + i * 32;
      if (i === 1) p.bar(10, y - 9, 130, 26, "accent", 0.2, 8);
      p.dot(27, y + 4, 5, i === 1 ? "accent" : "ink", i === 1 ? 1 : 0.32);
      p.bar(40, y, 70 - (i % 3) * 12, 8, i === 1 ? "accent" : "ink", i === 1 ? 0.9 : 0.32);
    }

    p.bar(172, 22, 150, 14, "ink", 0.85, 4);
    p.bar(W - 226, 15, 150, 28, "fill", 0.9);
    p.dot(W - 40, 29, 13, "accent", 0.7);

    const tw = (W - 172 - 20 - 24) / 3;
    const nums = ["12.4k", "98.2%", "3.1s"];
    for (let i = 0; i < 3; i++) {
      const x = 172 + i * (tw + 12);
      p.bar(x, 62, tw, 80, "fill", 0.6, 12);
      p.bar(x + 14, 76, 60, 7, "ink", 0.32);
      p.text(nums[i], x + 14, 124, 26, "ink", 0.9, { weight: 600 });
      p.bar(x + tw - 58, 72, 44, 16, "accent", 0.85);
    }

    const cx = 172;
    const cy = 158;
    const cw = W - 172 - 20 - 206;
    const ch = 268;
    p.bar(cx, cy, cw, ch, "fill", 0.42, 12);
    for (let i = 1; i < 5; i++) p.bar(cx + 16, cy + i * 52, cw - 32, 1.2, "ink", 0.08, 0);
    const pts = wave(cx + 18, cx + cw - 18, cy + ch - 60, 120, 21, 28);
    p.area(pts, cy + ch - 18, "accent", 0.16);
    p.line(pts, "accent", 1, 3);
    const last = pts[pts.length - 1];
    p.dot(last[0], last[1], 6, "accent", 1);

    const bx = W - 206;
    p.bar(bx, cy, 186, ch, "fill", 0.42, 12);
    p.bar(bx + 16, cy + 18, 70, 8, "ink", 0.4);
    const rng = makeRng(5);
    for (let i = 0; i < 7; i++) {
      const h = 50 + rng() * 150;
      const on = i === 4;
      p.bar(bx + 18 + i * 23, cy + ch - 20 - h, 14, h, on ? "accent" : "ink", on ? 1 : 0.4, 4);
    }
  },

  terminal: (p, W) => {
    p.dot(18, 17, 5, "ink", 0.3);
    p.dot(34, 17, 5, "ink", 0.22);
    p.dot(50, 17, 5, "ink", 0.16);
    p.text("zsh — deploy", W / 2, 22, 11, "ink", 0.4, { mono: true, align: "center" });
    p.bar(0, 34, W, 1.5, "ink", 0.1, 0);
    const L = 15;
    const y0 = 66;
    const lh = 34;
    p.runs([["$ ", "accent", 1], ["npm run build", "ink", 0.88]], 22, y0, L);
    p.runs([["  ▲ Next.js · compiling…", "ink", 0.42]], 22, y0 + lh, L);
    p.runs([["  ✓ ", "accent", 1], ["Compiled in 3.7s", "ink", 0.7]], 22, y0 + lh * 2, L);
    p.runs([["  ✓ ", "accent", 1], ["42 routes · 0 errors", "ink", 0.7]], 22, y0 + lh * 3, L);
    p.runs([["$ ", "accent", 1], ["git push origin main", "ink", 0.88]], 22, y0 + lh * 4, L);
    p.runs([["  → ", "accent", 1], ["deployed to production", "ink", 0.7]], 22, y0 + lh * 5, L);
    const end = p.runs([["$ ", "accent", 1]], 22, y0 + lh * 6, L);
    p.bar(end + 2, y0 + lh * 6 - 15, 9, 19, "caret", 1, 1);
  },

  code: (p, W) => {
    p.bar(12, 8, 104, 26, "fill", 0.7, 7);
    p.text("launch.ts", 26, 26, 11, "ink", 0.72, { mono: true });
    p.text("design.ts", 138, 26, 11, "ink", 0.32, { mono: true });
    p.bar(0, 40, W, 1.5, "ink", 0.1, 0);

    const KW = new Set(["import", "from", "export", "async", "function", "const", "await", "return", "true"]);
    const lines = [
      'import { createApp } from "./core";',
      "",
      "export async function launch(brief) {",
      "  const product = await design(brief);",
      "  const build = await engineer(product, {",
      '    scale: "global",',
      "    secure: true,",
      "  });",
      "  return ship(build);",
      "}",
    ];
    const lh = 30;
    const y0 = 70;
    p.bar(0, y0 + lh * 4 - 20, W, 28, "fill", 0.55, 0);
    lines.forEach((ln, i) => {
      const y = y0 + i * lh;
      p.text(String(i + 1), 34, y, 12, "ink", 0.22, { mono: true, align: "right" });
      const parts: [string, Ch, number][] = [];
      for (const tok of ln.split(/(\s+|"[^"]*"|[{}(),;.:])/).filter(Boolean)) {
        if (KW.has(tok)) parts.push([tok, "accent", 1]);
        else if (tok.startsWith('"')) parts.push([tok, "ink", 0.45]);
        else parts.push([tok, "ink", 0.86]);
      }
      const end = p.runs(parts, 50, y, 13.5);
      if (i === 8) p.bar(end + 3, y - 14, 2.5, 18, "caret", 1, 0);
    });
  },

  design: (p, W, H) => {
    p.bar(0, 0, W, 34, "fill", 0.5, 0);
    for (let i = 0; i < 6; i++) {
      p.bar(14 + i * 26, 10, 14, 14, i === 1 ? "accent" : "ink", i === 1 ? 1 : 0.32, 4);
    }
    p.bar(0, 34, 104, H - 34, "fill", 0.32, 0);
    for (let i = 0; i < 8; i++) {
      const y = 52 + i * 26;
      if (i === 3) p.bar(6, y - 8, 92, 22, "accent", 0.18, 5);
      p.bar(14 + (i % 3 === 2 ? 12 : 0), y, 56 - (i % 2) * 14, 6, i === 3 ? "accent" : "ink", i === 3 ? 0.9 : 0.3);
    }
    p.bar(W - 104, 34, 104, H - 34, "fill", 0.32, 0);
    ["accent", "ink", "fill"].forEach((c, i) => p.dot(W - 84 + i * 26, 60, 9, c as Ch, c === "fill" ? 1 : 0.85));
    for (let i = 0; i < 5; i++) p.bar(W - 88, 90 + i * 22, 70 - (i % 2) * 22, 6, "ink", 0.28);

    const fx = 136;
    const fy = 64;
    p.text("Frame · Home", fx, fy - 8, 10, "ink", 0.4, { mono: true });
    p.box(fx, fy, 240, 292, "ink", 0.22, 6);
    p.bar(fx + 18, fy + 22, 124, 14, "ink", 0.82, 4);
    p.bar(fx + 18, fy + 44, 92, 8, "ink", 0.3);
    p.bar(fx + 18, fy + 64, 204, 100, "fill", 0.85, 10);
    p.dot(fx + 160, fy + 106, 30, "accent", 0.5);
    p.area(wave(fx + 18, fx + 222, fy + 146, 18, 4), fy + 164, "accent", 0.3);
    p.bar(fx + 18, fy + 184, 84, 24, "accent", 1, 12);
    p.box(fx + 112, fy + 184, 84, 24, "ink", 0.35, 12);
    p.bar(fx + 18, fy + 226, 204, 6, "ink", 0.2);
    p.bar(fx + 18, fy + 240, 160, 6, "ink", 0.2);

    // Selection on the image block, with handles and a size readout.
    const sx = fx + 16;
    const sy = fy + 62;
    const sw = 208;
    const sh = 104;
    p.box(sx, sy, sw, sh, "accent", 1, 0, 1.6);
    for (const [hx, hy] of [
      [sx, sy], [sx + sw / 2, sy], [sx + sw, sy],
      [sx, sy + sh / 2], [sx + sw, sy + sh / 2],
      [sx, sy + sh], [sx + sw / 2, sy + sh], [sx + sw, sy + sh],
    ]) {
      p.knock(() => p.bar(hx - 4, hy - 4, 8, 8, "ink", 1, 1));
      p.box(hx - 4.5, hy - 4.5, 9, 9, "accent", 1, 1, 1.4);
    }
    p.bar(sx + sw / 2 - 32, sy + sh + 10, 64, 17, "accent", 1, 8);
    p.knock(() => p.text("208 × 104", sx + sw / 2, sy + sh + 22, 9, "ink", 1, { mono: true, align: "center" }));

    const cx = sx + sw - 30;
    const cy = sy + sh - 22;
    p.poly([[cx, cy], [cx, cy + 22], [cx + 6, cy + 16], [cx + 11, cy + 26], [cx + 15, cy + 24], [cx + 10, cy + 14], [cx + 18, cy + 14]], "ink", 0.92);
  },

  image: (p, W, H) => {
    p.bar(0, 0, W, H, "fill", 1, 0);
    p.dot(W * 0.66, H * 0.36, 62, "accent", 0.6);
    p.area(wave(0, W, H * 0.72, 46, 12), H, "accent", 0.32);
    p.area(wave(0, W, H * 0.84, 30, 17), H, "ink", 0.14);
    p.dot(W * 0.22, H * 0.28, 10, "ink", 0.18);
  },

  card: (p, W) => {
    p.dot(42, 44, 20, "accent", 0.85);
    p.knock(() => p.text("AK", 42, 50, 15, "ink", 1, { weight: 700, align: "center" }));
    p.bar(74, 32, 120, 12, "ink", 0.85, 4);
    p.bar(74, 51, 80, 8, "ink", 0.32);
    for (let i = 0; i < 3; i++) p.dot(W - 44 + i * 10, 42, 2.6, "ink", 0.4);
    p.bar(22, 90, 330, 7, "ink", 0.26);
    p.bar(22, 106, 300, 7, "ink", 0.26);
    p.bar(22, 122, 210, 7, "ink", 0.26);
    p.bar(22, 146, W - 44, 80, "fill", 0.7, 10);
    p.area(wave(22, W - 22, 204, 26, 31), 226, "accent", 0.35);
    p.bar(22, 244, 98, 28, "accent", 1, 14);
    p.knock(() => p.bar(42, 255, 58, 6, "ink", 1));
    p.dot(W - 80, 258, 9, "ink", 0.3);
    p.dot(W - 50, 258, 9, "ink", 0.3);
  },

  chart: (p, W, H) => {
    p.bar(22, 26, 92, 8, "ink", 0.4);
    p.text("$84.2k", 22, 84, 40, "ink", 0.92, { weight: 600 });
    p.bar(W - 112, 52, 90, 26, "accent", 1, 13);
    p.knock(() => p.text("+12.4%", W - 67, 70, 13, "ink", 1, { weight: 600, align: "center" }));
    const pts = wave(22, W - 22, H - 60, 88, 44, 26);
    p.area(pts, H - 22, "accent", 0.16);
    p.line(pts, "accent", 1, 3);
    for (let i = 0; i < 6; i++) p.bar(22 + i * ((W - 44) / 5) - 1, H - 16, 2, 6, "ink", 0.2, 0);
  },

  table: (p, W) => {
    p.bar(14, 16, W - 28, 30, "fill", 0.6, 8);
    [26, 128, 210, 290].forEach((x, i) => p.bar(x, 28, [52, 40, 36, 42][i], 7, "ink", 0.42));
    for (let r = 0; r < 6; r++) {
      const y = 60 + r * 37;
      const on = r === 1 || r === 4;
      p.dot(34, y + 12, 6, on ? "accent" : "ink", on ? 1 : 0.28);
      p.bar(50, y + 8, 64, 8, "ink", 0.75);
      p.bar(128, y + 8, 56, 8, "ink", 0.32);
      p.bar(210, y + 4, 54, 16, on ? "accent" : "fill", on ? 0.3 : 0.9);
      p.bar(290, y + 8, 60, 8, "ink", 0.28);
      p.bar(14, y + 30, W - 28, 1.2, "ink", 0.07, 0);
    }
  },

  form: (p, W) => {
    p.bar(22, 28, 140, 14, "ink", 0.85, 4);
    p.bar(22, 50, 190, 8, "ink", 0.3);
    for (let i = 0; i < 3; i++) {
      const y = 84 + i * 62;
      p.bar(22, y, 62, 7, "ink", 0.45);
      p.box(22, y + 14, W - 44, 36, "ink", 0.25, 9);
      p.bar(36, y + 29, 112 - i * 22, 7, "ink", 0.2);
    }
    p.bar(22, 284, 120, 8, "ink", 0.45);
    p.bar(W - 78, 274, 56, 28, "accent", 1, 14);
    p.knock(() => p.dot(W - 36, 288, 10, "ink", 1));
    p.bar(22, 322, W - 44, 42, "accent", 1, 11);
    p.knock(() => p.text("Continue", W / 2, 348, 15, "ink", 1, { weight: 600, align: "center" }));
  },

  phone: (p, W) => {
    p.text("9:41", 22, 28, 13, "ink", 0.85, { weight: 600 });
    p.bar(W - 64, 19, 18, 8, "ink", 0.6, 2);
    p.bar(W - 40, 19, 20, 8, "ink", 0.6, 2);
    p.bar(20, 58, 112, 16, "ink", 0.9, 4);
    p.bar(20, 82, 150, 8, "ink", 0.3);
    p.bar(20, 104, W - 40, 32, "fill", 0.85);
    p.dot(38, 120, 6, "ink", 0.3);
    p.bar(20, 150, W - 40, 132, "accent", 1, 18);
    p.knock(() => {
      p.bar(36, 168, 92, 10, "ink", 1);
      p.bar(36, 186, 60, 7, "ink", 1);
      p.line(wave(36, W - 36, 258, 30, 7, 16), "ink", 1, 2.5);
    });
    for (let i = 0; i < 3; i++) {
      const y = 300 + i * 54;
      p.dot(40, y + 18, 16, "fill", 1);
      p.dot(40, y + 18, 6, i === 0 ? "accent" : "ink", i === 0 ? 1 : 0.3);
      p.bar(66, y + 10, 100 - i * 14, 9, "ink", 0.8);
      p.bar(66, y + 26, 70, 7, "ink", 0.3);
      p.bar(W - 52, y + 12, 32, 9, "ink", 0.5);
    }
    p.bar(0, 470, W, 1.2, "ink", 0.08, 0);
    for (let i = 0; i < 4; i++) {
      p.bar(30 + i * 52, 484, 20, 20, i === 0 ? "accent" : "ink", i === 0 ? 1 : 0.32, 6);
    }
  },

  phone2: (p, W) => {
    p.text("9:41", 22, 28, 13, "ink", 0.85, { weight: 600 });
    p.bar(W - 40, 19, 20, 8, "ink", 0.6, 2);
    p.bar(20, 58, 96, 16, "ink", 0.9, 4);
    p.ring(W / 2, 184, 64, 13, "ink", 0.1);
    p.ring(W / 2, 184, 64, 13, "accent", 1, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.82);
    p.text("82%", W / 2, 197, 36, "ink", 0.92, { weight: 600, align: "center" });
    p.bar(W / 2 - 50, 272, 100, 8, "ink", 0.35);
    for (let i = 0; i < 2; i++) {
      const x = 20 + i * ((W - 52) / 2 + 12);
      const w = (W - 52) / 2;
      p.bar(x, 300, w, 92, "fill", 0.7, 12);
      p.bar(x + 12, 314, 40, 7, "ink", 0.35);
      p.text(i ? "4.9" : "12k", x + 12, 356, 24, "ink", 0.88, { weight: 600 });
      p.bar(x + 12, 370, w - 40, 6, i ? "accent" : "ink", i ? 0.8 : 0.25);
    }
    p.bar(20, 420, W - 40, 44, "accent", 1, 12);
    p.knock(() => p.bar(W / 2 - 36, 439, 72, 7, "ink", 1));
    p.bar(W / 2 - 40, 484, 80, 7, "ink", 0.3);
  },

  toast: (p, W) => {
    p.bar(20, 26, 76, 76, "accent", 1, 20);
    p.knock(() => p.line([[42, 64], [54, 76], [76, 52]], "ink", 1, 6));
    p.text("Deployment complete", 114, 56, 17, "ink", 0.88, { weight: 600 });
    p.text("production · 2m ago", 114, 82, 12, "ink", 0.42, { mono: true });
    p.dot(W - 30, 38, 5, "accent", 0.8);
  },

  palette: (p) => {
    const sw: [Ch, number, string][] = [
      ["accent", 1, "#2854DB"],
      ["accent", 0.55, "#567CEC"],
      ["ink", 0.9, "#090C16"],
      ["ink", 0.45, "#687084"],
      ["fill", 1, "#EEF1F6"],
    ];
    sw.forEach(([c, a, hex], i) => {
      const x = 18 + i * 72;
      p.bar(x, 22, 60, 108, c, a, 10);
      p.text(hex, x + 30, 152, 10, "ink", 0.45, { mono: true, align: "center" });
    });
    p.text("Color tokens", 18, 192, 13, "ink", 0.7);
  },

  type: (p) => {
    p.text("Aa", 18, 128, 100, "ink", 0.9, { weight: 500 });
    p.text("Archivo", 170, 58, 17, "ink", 0.8, { weight: 600 });
    [0.2, 0.35, 0.55, 0.8].forEach((a, i) => p.bar(170, 80 + i * 18, 92, 8, "ink", a));
    p.text("Display · 72 / 80", 18, 190, 10, "ink", 0.4, { mono: true });
  },

  buttons: (p, W) => {
    p.bar(20, 22, 122, 38, "accent", 1, 19);
    p.knock(() => p.text("Primary", 81, 46, 14, "ink", 1, { weight: 600, align: "center" }));
    p.box(154, 22, 122, 38, "ink", 0.42, 19);
    p.text("Secondary", 215, 46, 14, "ink", 0.75, { weight: 600, align: "center" });
    p.ring(W - 58, 41, 18, 1.5, "ink", 0.35);
    p.bar(W - 65, 40, 14, 2, "ink", 0.6, 0);
    p.bar(W - 59, 34, 2, 14, "ink", 0.6, 0);

    p.bar(20, 84, 58, 30, "accent", 1, 15);
    p.knock(() => p.dot(63, 99, 10, "ink", 1));
    p.bar(92, 84, 58, 30, "fill", 1, 15);
    p.dot(107, 99, 10, "ink", 0.3);
    p.bar(170, 86, 26, 26, "accent", 1, 7);
    p.knock(() => p.line([[176, 99], [182, 105], [191, 93]], "ink", 1, 3));
    p.ring(228, 99, 12, 1.6, "ink", 0.4);
    p.dot(228, 99, 6, "accent", 1);

    p.bar(20, 150, W - 40, 6, "fill", 1);
    p.bar(20, 150, 212, 6, "accent", 1);
    p.knock(() => p.dot(232, 153, 11, "ink", 1));
    p.ring(232, 153, 11, 2, "accent", 1);
    p.text("Components", 20, 196, 10, "ink", 0.4, { mono: true });
  },

  input: (p, W) => {
    p.bar(16, 30, W - 120, 100, "fill", 0.55, 50);
    p.box(16, 30, W - 120, 100, "ink", 0.2, 50);
    const w = p.text("Tell us about your project", 56, 92, 30, "ink", 0.78, { weight: 500 });
    p.bar(56 + w + 6, 62, 3, 40, "caret", 1, 0);
    p.dot(W - 52, 80, 44, "accent", 1);
    p.knock(() => {
      p.line([[W - 72, 80], [W - 34, 80]], "ink", 1, 4.5);
      p.line([[W - 50, 64], [W - 34, 80], [W - 50, 96]], "ink", 1, 4.5);
    });
  },
};

const CHIP_MARK: Record<string, string> = {
  nextjs: "N",
  react: "R",
  typescript: "TS",
  node: "JS",
  python: "Py",
  postgres: "Pg",
  mongodb: "M",
  aws: "A",
  docker: "D",
  github: "G",
};

function drawChip(p: Painter, W: number, index: number) {
  const tech = TECHNOLOGIES[index];
  p.bar(16, 22, 56, 56, "accent", 0.92, 13);
  const mark = CHIP_MARK[tech.id] ?? tech.name[0];
  p.knock(() => p.text(mark, 44, 60, mark.length > 1 ? 20 : 26, "ink", 1, { weight: 700, align: "center" }));
  p.text(tech.name, 88, 52, 24, "ink", 0.92, { weight: 600 });
  p.text(CATEGORY_LABEL[tech.category].toUpperCase(), 88, 78, 11, "ink", 0.42, {
    mono: true,
    spacing: 1.5,
  });
  p.dot(W - 22, 28, 5, "accent", 0.85);
}

function drawLayer(p: Painter, W: number, H: number, index: number) {
  for (let y = 60; y < H - 14; y += 24) {
    for (let x = 22; x < W - 14; x += 24) p.dot(x, y, 1.6, "ink", 0.14);
  }
  p.box(10, 10, W - 20, H - 20, "ink", 0.16, 14);
  p.text(`0${index + 1}`, 28, 40, 13, "accent", 1, { mono: true, weight: 500 });
  p.text(TECH_LAYERS[index].name.toUpperCase(), 58, 40, 13, "ink", 0.62, {
    mono: true,
    spacing: 2,
  });
  p.bar(W - 64, 30, 36, 12, "accent", 0.35);
}

/* ------------------------------------------------------------------------ */

function readFonts(): Fonts {
  const s = getComputedStyle(document.documentElement);
  const sans = s.getPropertyValue("--font-archivo").trim() || "Archivo, system-ui, sans-serif";
  const mono = s.getPropertyValue("--font-jetbrains").trim() || "ui-monospace, monospace";
  return { sans, mono };
}

export interface InterfaceAtlas {
  canvas: HTMLCanvasElement;
  rects: Map<PanelKind, AtlasRect>;
  /** Repaint in place — call once web fonts have arrived. */
  redraw: () => void;
}

export function createAtlas(kinds: PanelKind[]): InterfaceAtlas {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_SIZE;
  canvas.height = ATLAS_SIZE;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const placed = pack(Array.from(new Set(kinds)));

  const rects = new Map<PanelKind, AtlasRect>();
  for (const pl of placed) {
    rects.set(pl.kind, {
      u: pl.x / ATLAS_SIZE,
      v: 1 - (pl.y + pl.h) / ATLAS_SIZE,
      w: pl.w / ATLAS_SIZE,
      h: pl.h / ATLAS_SIZE,
    });
  }

  const redraw = () => {
    const painter = new Painter(ctx, readFonts());
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
    ctx.globalCompositeOperation = "lighter";

    for (const pl of placed) {
      ctx.save();
      ctx.translate(pl.x, pl.y);
      ctx.beginPath();
      ctx.rect(0, 0, pl.w, pl.h);
      ctx.clip();
      if (pl.kind.startsWith("chip")) drawChip(painter, pl.w, Number(pl.kind.slice(4)));
      else if (pl.kind.startsWith("layer")) drawLayer(painter, pl.w, pl.h, Number(pl.kind.slice(5)));
      else DRAW[pl.kind as BaseKind](painter, pl.w, pl.h);
      ctx.restore();
    }
  };

  redraw();
  return { canvas, rects, redraw };
}
