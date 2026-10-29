"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { isMouse, prefersReducedMotion } from "@/lib/utils";

/** The project poster on its stage, leaning toward the pointer. */
export function TiltPoster({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const stage = el?.closest<HTMLElement>(".case-stage");
    if (!el || !stage || prefersReducedMotion()) return;
    const move = (e: PointerEvent) => {
      if (!isMouse(e)) return;
      const r = stage.getBoundingClientRect();
      el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
      el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 12}deg`);
    };
    const leave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div className="case-poster" data-anim="up">
      <div ref={ref} className="case-poster-inner">
        <Image src={src} alt={alt} width={360} height={509} sizes="(min-width: 640px) 416px, 90vw" priority quality={90} />
      </div>
    </div>
  );
}
