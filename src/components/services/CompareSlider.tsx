"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Before / after, divided by a handle you drag (or move with the arrow keys —
 * it's a real range input underneath). It sweeps once on its own the first
 * time it's seen, so the trick is obvious.
 */
export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  start = 50,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  start?: number;
}) {
  const [pos, setPos] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 65%",
        once: true,
        onEnter: () => {
          const o = { v: 12 };
          gsap.to(o, {
            v: 88,
            duration: 1.6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onUpdate: () => !touched.current && setPos(o.v),
            onComplete: () => !touched.current && gsap.to(o, { v: start, duration: 0.8, onUpdate: () => !touched.current && setPos(o.v) }),
          });
        },
      });
    });
    return () => {
      off();
      st?.kill();
    };
  }, [start]);

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="cmp"
      onPointerDown={(e) => {
        dragging.current = true;
        touched.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      data-cursor="Drag"
    >
      <div className="cmp-layer">{before}</div>
      <div className="cmp-layer cmp-after" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {after}
      </div>
      <span className="cmp-tag cmp-tag-l t-label">{beforeLabel}</span>
      <span className="cmp-tag cmp-tag-r t-label">{afterLabel}</span>
      <div className="cmp-handle" style={{ left: `${pos}%` }} aria-hidden>
        <i />
      </div>
      <input
        className="cmp-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
      />
    </div>
  );
}
