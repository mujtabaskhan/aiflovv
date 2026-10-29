"use client";

import { useEffect, useRef, useState } from "react";
import { TECH, type Tech } from "@/content/tech";
import { gsap, ScrollTrigger, GLYPHS } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/Section";

/**
 * The stack as a keyboard. Press a key (or hover, or tab to it) and the
 * terminal explains what it's for. It types a few on its own the first time
 * it scrolls into view.
 */
export function Toolkit({ only }: { only?: string[] }) {
  const keys = only ? TECH.filter((t) => only.includes(t.id)) : TECH;
  const [down, setDown] = useState<string | null>(null);
  const [current, setCurrent] = useState<Tech>(keys[0]);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const cmdRef = useRef<HTMLSpanElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const userTouched = useRef(false);

  const press = (t: Tech, user = true) => {
    if (user) userTouched.current = true;
    setDown(t.id);
    window.setTimeout(() => setDown((d) => (d === t.id ? null : d)), 180);
    if (t.id === current.id) return;
    setCurrent(t);
  };

  useEffect(() => {
    if (!noteRef.current || !cmdRef.current) return;
    const tl = gsap.timeline();
    tl.to(cmdRef.current, { duration: 0.5, scrambleText: { text: current.name.toLowerCase(), chars: GLYPHS, speed: 0.8 } }).to(
      noteRef.current,
      { duration: 0.8, scrambleText: { text: current.note, chars: "▪▫", speed: 1.2, revealDelay: 0.1 } },
      0.1,
    );
    return () => {
      tl.kill();
    };
  }, [current]);

  // A short self-playing demo the first time the keyboard is seen.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || prefersReducedMotion()) return;
    let st: ScrollTrigger | undefined;
    const timers: number[] = [];
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: deck,
        start: "top 70%",
        once: true,
        onEnter: () => {
          keys.slice(1, 4).forEach((t, i) => {
            timers.push(
              window.setTimeout(() => {
                if (!userTouched.current) press(t, false);
              }, 500 + i * 1400),
            );
          });
        },
      });
    });
    return () => {
      off();
      st?.kill();
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section overflow-hidden" id="toolkit">
      <div className="shell grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="t-h2" data-anim="lines">
            Built on tools we trust.
          </h2>
          <p className="t-lead mt-6 max-w-md" data-anim="up">
            Modern, proven technology — chosen for each product, not out of habit. Press a key.
          </p>
          <div className="kb-term mt-10" data-anim="up" data-delay="0.1" aria-live="polite">
            <p className="t-label text-dim">
              <span className="text-cyan">$</span> aiflovv explain <span ref={cmdRef} className="text-ink">{current.name.toLowerCase()}</span>
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">
              <span className="mr-2 text-dim">→</span>
              <span className="text-ink">{current.name}</span>
              <span className="mx-2 text-dim">·</span>
              <span className="t-label text-cyan">{current.category}</span>
            </p>
            <p ref={noteRef} className="mt-2 min-h-[3.2em] text-[0.95rem] leading-relaxed text-muted">
              {current.note}
            </p>
          </div>
        </div>

        <div className="keyboard lg:col-span-7" data-anim="up" data-delay="0.15">
          <div ref={deckRef} className="keyboard-deck" role="group" aria-label="Technology keys">
            {keys.map((t) => (
              <button
                key={t.id}
                type="button"
                className="keycap"
                data-down={down === t.id || current.id === t.id}
                aria-pressed={current.id === t.id}
                onPointerDown={() => press(t)}
                onMouseEnter={() => press(t)}
                onFocus={() => press(t)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && press(t)}
              >
                <span className="k-legend">{t.key}</span>
                <span className="k-name">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
