"use client";

import { useEffect, useRef } from "react";
import { damp } from "@/lib/math";
import { interaction } from "@/lib/interaction";

/**
 * Two-part cursor: an instant dot and a trailing ring that swells over
 * anything marked `data-cursor="hover"`. Fine pointers only — never shown on
 * touch, and never allowed to intercept a click.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      rx: window.innerWidth / 2,
      ry: window.innerHeight / 2,
      scale: 1,
      targetScale: 1,
      opacity: 0,
      targetOpacity: 0,
    };

    document.documentElement.classList.add("no-cursor");

    const onMove = (e: PointerEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
      state.targetOpacity = 1;

      const el = e.target as HTMLElement | null;
      const interactive = el?.closest?.(
        '[data-cursor="hover"], a, button, [role="button"]',
      );
      state.targetScale = interactive ? 2.4 : 1;
    };

    const onLeave = () => {
      state.targetOpacity = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      state.rx = damp(state.rx, state.x, 12, dt);
      state.ry = damp(state.ry, state.y, 12, dt);
      // The 3D layer has no DOM under the pointer, so it reports its own hover.
      const target = interaction.cursorHover ? 2.4 : state.targetScale;
      state.scale = damp(state.scale, target, 10, dt);
      state.opacity = damp(state.opacity, state.targetOpacity, 8, dt);

      if (dot.current) {
        dot.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
        dot.current.style.opacity = String(state.opacity);
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${state.rx}px, ${state.ry}px, 0) translate(-50%, -50%) scale(${state.scale})`;
        ring.current.style.opacity = String(state.opacity * (0.5 - (state.scale - 1) * 0.12));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  return (
    <div data-chrome className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-chalk/60 opacity-0 will-change-transform"
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-ion opacity-0 will-change-transform"
      />
    </div>
  );
}
