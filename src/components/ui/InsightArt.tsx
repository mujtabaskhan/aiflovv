"use client";

import { useEffect, useRef } from "react";
import { makeRng } from "@/lib/math";

/**
 * Generated card plates.
 *
 * The site ships no photography, so insight cards get the same five motifs the
 * work portal renders in GLSL, redrawn here in 2D: contour topography, a vitals
 * radial, advected flow, a silk drape and a data field. Painted once to a
 * fixed-size buffer on mount — there is no animation loop and no resize
 * handling, the canvas just scales with CSS.
 */

const INK = "#0a0f1c";
const ION = "#2854db";
const ION_SOFT = "#567cec";
const EMBER = "#ce4e26";

const W = 520;
const H = 660;

/** Cheap 2D value noise: hashed lattice with smoothstep interpolation. */
function makeNoise(seed: number) {
  const rng = makeRng(seed);
  const table = new Float32Array(256 * 256);
  for (let i = 0; i < table.length; i++) table[i] = rng();

  const at = (x: number, y: number) =>
    table[((y & 255) << 8) + (x & 255)];

  return (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const u = xf * xf * (3 - 2 * xf);
    const v = yf * yf * (3 - 2 * yf);
    const a = at(xi, yi);
    const b = at(xi + 1, yi);
    const c = at(xi, yi + 1);
    const d = at(xi + 1, yi + 1);
    return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
  };
}

type Painter = (
  ctx: CanvasRenderingContext2D,
  noise: (x: number, y: number) => number,
  rng: () => number,
) => void;

/* ---------- 0 · Contour topography ---------- */
const contours: Painter = (ctx, noise) => {
  const cx = W * 0.5;
  const cy = H * 0.46;
  const maxR = Math.hypot(W, H) * 0.42;

  for (let ring = 1; ring <= 22; ring++) {
    const t = ring / 22;
    ctx.beginPath();
    for (let a = 0; a <= 72; a++) {
      const th = (a / 72) * Math.PI * 2;
      const n = noise(Math.cos(th) * 2.4 + ring * 0.35, Math.sin(th) * 2.4 + ring * 0.35);
      const r = maxR * t * (0.72 + n * 0.46);
      const x = cx + Math.cos(th) * r;
      const y = cy + Math.sin(th) * r * 0.86;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = ring % 5 === 0 ? ION_SOFT : ION;
    ctx.globalAlpha = ring % 5 === 0 ? 0.75 : 0.3;
    ctx.lineWidth = ring % 5 === 0 ? 1.6 : 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

/* ---------- 1 · Vitals radial ---------- */
const vitals: Painter = (ctx) => {
  const cx = W * 0.5;
  const cy = H * 0.46;

  const sweep = ctx.createConicGradient?.(-Math.PI / 2, cx, cy);
  if (sweep) {
    sweep.addColorStop(0, "rgba(86,124,236,0.5)");
    sweep.addColorStop(0.28, "rgba(86,124,236,0)");
    sweep.addColorStop(1, "rgba(86,124,236,0)");
    ctx.fillStyle = sweep;
    ctx.beginPath();
    ctx.arc(cx, cy, W * 0.62, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 1; i <= 7; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, (W * 0.075) * i, 0, Math.PI * 2);
    ctx.strokeStyle = ION;
    ctx.globalAlpha = 0.34;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.beginPath();
  for (let x = 0; x <= W; x += 3) {
    const p = x / W;
    const pulse = Math.exp(-Math.pow((p - 0.5) * 6, 2));
    const y = cy + Math.sin(p * 26) * 10 + pulse * Math.sin(p * 52) * 62;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = EMBER;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
};

/* ---------- 2 · Advected flow ---------- */
const flow: Painter = (ctx, noise, rng) => {
  for (let i = 0; i < 190; i++) {
    let x = rng() * W;
    let y = rng() * H;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < 46; s++) {
      const a = noise(x / 190, y / 190) * Math.PI * 3.2;
      x += Math.cos(a) * 7;
      y += Math.sin(a) * 7;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = i % 9 === 0 ? EMBER : ION_SOFT;
    ctx.globalAlpha = i % 9 === 0 ? 0.5 : 0.16 + rng() * 0.2;
    ctx.lineWidth = i % 9 === 0 ? 1.4 : 1;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
};

/* ---------- 3 · Silk drape ---------- */
const silk: Painter = (ctx, noise) => {
  for (let x = 0; x < W; x += 2) {
    const w = noise(x / 150, 1.7);
    const fold = 0.5 + 0.5 * Math.sin((x / W) * 11 + w * 3.4);
    const g = ctx.createLinearGradient(x, 0, x, H);
    g.addColorStop(0, `rgba(86,124,236,${0.06 + fold * 0.42})`);
    g.addColorStop(1, `rgba(10,15,28,${0.55 + (1 - fold) * 0.35})`);
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 3, H);

    if (fold > 0.965) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(x, 0, 1.4, H);
    }
  }
};

/* ---------- 4 · Data field ---------- */
const bars: Painter = (ctx, noise, rng) => {
  const cols = 46;
  const bw = W / cols;
  const sweepAt = 0.32 + rng() * 0.36;

  for (let i = 0; i < cols; i++) {
    const h = (0.16 + noise(i * 0.22, 4.1) * 0.66) * H;
    const x = i * bw;
    const y = H - h;
    const near = Math.exp(-Math.pow((i / cols - sweepAt) * 7, 2));

    const g = ctx.createLinearGradient(0, y, 0, H);
    g.addColorStop(0, near > 0.35 ? EMBER : ION_SOFT);
    g.addColorStop(1, "rgba(40,84,219,0.06)");
    ctx.fillStyle = g;
    ctx.globalAlpha = 0.42 + near * 0.5;
    ctx.fillRect(x + bw * 0.16, y, bw * 0.68, h);

    ctx.globalAlpha = 0.85 + near * 0.15;
    ctx.fillStyle = near > 0.35 ? "#ffffff" : ION_SOFT;
    ctx.fillRect(x + bw * 0.16, y, bw * 0.68, 2);
  }
  ctx.globalAlpha = 1;
};

const PAINTERS: Painter[] = [contours, vitals, flow, silk, bars];

/**
 * Paint one plate in W×H coordinate space. The caller owns the canvas size and
 * any scaling, so the same routine serves the full-size insight cards and the
 * small down-sampled images used elsewhere.
 */
function paintPlate(
  ctx: CanvasRenderingContext2D,
  variant: 0 | 1 | 2 | 3 | 4,
  seed: number,
  captionFloor: boolean,
) {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  PAINTERS[variant](ctx, makeNoise(seed), makeRng(seed * 977 + 13));
  ctx.restore();

  const grain = makeRng(seed + 7);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 2600; i++) {
    ctx.fillRect(grain() * W, grain() * H, 1, 1);
  }
  ctx.globalAlpha = 1;

  // A dark floor so an overlaid caption always has ground under it.
  if (captionFloor) {
    const floor = ctx.createLinearGradient(0, H * 0.3, 0, H);
    floor.addColorStop(0, "rgba(10,15,28,0)");
    floor.addColorStop(1, "rgba(6,9,18,0.94)");
    ctx.fillStyle = floor;
    ctx.fillRect(0, 0, W, H);
  }
}

const urlCache = new Map<string, string>();

/**
 * A plate as an image URL, for components that take an `src` rather than a
 * canvas. Painted once at reduced resolution and cached — at `scale` 0.45 each
 * decodes to ~0.3 MB instead of ~1.4 MB, which matters when a dozen are on
 * screen. Client-only: returns "" during SSR, where there is no canvas.
 */
export function plateDataUrl(variant: 0 | 1 | 2 | 3 | 4, seed: number, scale = 0.45) {
  if (typeof document === "undefined") return "";
  const key = `${variant}:${seed}:${scale}`;
  const cached = urlCache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.scale(scale, scale);
  paintPlate(ctx, variant, seed, false);

  const url = canvas.toDataURL("image/jpeg", 0.86);
  urlCache.set(key, url);
  return url;
}

export function InsightArt({
  variant,
  seed,
  className = "",
}: {
  variant: 0 | 1 | 2 | 3 | 4;
  seed: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;
    paintPlate(ctx, variant, seed, true);
  }, [variant, seed]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
