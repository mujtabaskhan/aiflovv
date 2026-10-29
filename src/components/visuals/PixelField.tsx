"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * An LED wall behind inner-page heroes: a grid of brand pixels that twinkle
 * on their own and light up around the pointer. 2D canvas, a few hundred
 * rects a frame, paused whenever it's off screen.
 */
export function PixelField({ cell = 26, accent }: { cell?: number; accent?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let energy = new Float32Array(0);
    const dpr = Math.min(window.devicePixelRatio, 2);

    const parse = (hex: string) => {
      const n = parseInt(hex.replace("#", ""), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const A = parse(accent ?? "#4f7cff");
    const B = parse(accent ? "#eef2ff" : "#3cc8ff");

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      energy = new Float32Array(cols * rows);
      // Seed a few lit pixels so the wall is never blank.
      for (let i = 0; i < energy.length; i++) if (Math.random() < 0.05) energy[i] = Math.random() * 0.6;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let px = -9999;
    let py = -9999;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const s = cell - 3;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const e = energy[y * cols + x];
          if (e < 0.02) continue;
          const t = x / cols;
          const r = A[0] + (B[0] - A[0]) * t;
          const g = A[1] + (B[1] - A[1]) * t;
          const b = A[2] + (B[2] - A[2]) * t;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(0.75, e * 0.7)})`;
          ctx.fillRect(x * cell + 1.5, y * cell + 1.5, s, s);
        }
      }
    };

    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < 33) return;
      last = now;
      for (let i = 0; i < energy.length; i++) energy[i] *= 0.955;
      for (let k = 0; k < Math.max(2, energy.length / 260); k++) {
        const i = (Math.random() * energy.length) | 0;
        energy[i] = Math.max(energy[i], 0.25 + Math.random() * 0.5);
      }
      if (px > -999) {
        const cx = Math.floor(px / cell);
        const cy = Math.floor(py / cell);
        const R = 4;
        for (let y = cy - R; y <= cy + R; y++) {
          if (y < 0 || y >= rows) continue;
          for (let x = cx - R; x <= cx + R; x++) {
            if (x < 0 || x >= cols) continue;
            const d = Math.hypot(x - cx, y - cy);
            if (d > R) continue;
            const i = y * cols + x;
            energy[i] = Math.max(energy[i], (1 - d / R) * 0.95);
          }
        }
      }
      draw();
    };
    if (reduced) draw();
    else raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [cell, accent]);

  return <canvas ref={ref} className="pixel-field" aria-hidden />;
}
