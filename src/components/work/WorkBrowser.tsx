"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { WORK, WORK_KINDS, type WorkKind } from "@/content/work";
import { SERVICES } from "@/content/services";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import { isMouse, pad, prefersReducedMotion } from "@/lib/utils";
import { TLink } from "@/components/shell/TLink";
import { PixelArrow } from "@/components/ui/Pixels";
import { useBatchReveal } from "@/components/motion/useBatchReveal";
import { WorkCard } from "./WorkCard";

type Filter = "all" | WorkKind;
type View = "grid" | "list";

export function WorkBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const [peek, setPeek] = useState<string | null>(null);

  useBatchReveal(gridRef, "[data-flip]");

  const items = WORK.filter((w) => filter === "all" || w.kind === filter);
  const count = (k: Filter) => (k === "all" ? WORK.length : WORK.filter((w) => w.kind === k).length);

  const capture = () => {
    if (gridRef.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip]"));
    }
  };

  // Animate from the captured layout to the new one.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !gridRef.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: gridRef.current.querySelectorAll("[data-flip]"),
      duration: 0.8,
      ease: "flow",
      stagger: 0.03,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter, view]);

  // A poster that trails the pointer over list rows.
  useEffect(() => {
    const el = peekRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      if (!isMouse(e)) return;
      xTo(e.clientX + 24);
      yTo(e.clientY - 120);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const el = peekRef.current;
    if (!el) return;
    gsap.to(el, { opacity: peek ? 1 : 0, scale: peek ? 1 : 0.9, duration: 0.35, ease: "power2.out" });
  }, [peek]);

  const peekWork = WORK.find((w) => w.slug === peek);

  return (
    <div>
      <div className="mb-14 flex flex-wrap items-center justify-between gap-6" data-anim="up">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {WORK_KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              className="chip"
              aria-pressed={filter === k.id}
              onClick={() => {
                if (filter === k.id) return;
                capture();
                setFilter(k.id);
              }}
            >
              {k.label}
              <span className="opacity-60">{pad(count(k.id))}</span>
            </button>
          ))}
        </div>
        <div className="toggle" role="group" aria-label="Layout">
          {(["grid", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => {
                if (view === v) return;
                capture();
                setView(v);
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "project" : "projects"}
      </p>

      <div ref={gridRef}>
        {view === "grid" ? (
          <div className="work-grid pb-20">
            {items.map((w) => (
              <div key={w.slug} data-flip data-flip-id={w.slug}>
                <WorkCard work={w} index={WORK.indexOf(w)} reveal={false} />
              </div>
            ))}
          </div>
        ) : (
          <ol className="work-list" onMouseLeave={() => setPeek(null)}>
            {items.map((w) => (
              <li key={w.slug} data-flip data-flip-id={w.slug}>
                <TLink
                  href={`/case-studies/${w.slug}`}
                  className="work-row"
                  style={{ "--c": w.accent } as CSSProperties}
                  onPointerEnter={(e) => isMouse(e.nativeEvent) && setPeek(w.slug)}
                >
                  <span className="t-label text-dim">{pad(WORK.indexOf(w) + 1)}</span>
                  <span className="work-row-name">{w.name}</span>
                  <span className="hidden text-sm text-muted lg:block">{w.industry}</span>
                  <span className="hidden flex-wrap gap-1.5 lg:flex">
                    {w.services.slice(0, 2).map((s) => (
                      <span key={s} className="chip chip-plain">
                        {SERVICES.find((x) => x.slug === s)?.short}
                      </span>
                    ))}
                  </span>
                  <span className="reel-go justify-self-end" aria-hidden>
                    <PixelArrow size={12} />
                  </span>
                </TLink>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div ref={peekRef} className="work-peek" aria-hidden>
        {peekWork && <Image src={peekWork.image} alt="" width={360} height={509} sizes="240px" />}
      </div>
    </div>
  );
}
