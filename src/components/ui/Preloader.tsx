"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { journey } from "@/lib/journey";
import { useAppStore } from "@/store/useAppStore";
import { stopScroll } from "@/components/providers/SmoothScroll";
import { COMPANY } from "@/data/company";
import { Logo } from "@/components/ui/Logo";

const MIN_DURATION = 1500;

/**
 * Holds the page until the renderer is live, then hands off to the intro:
 * the curtain lifts, `journey.intro` tweens 0 → 1, and the camera and interface
 * field play their entrance off that single value.
 */
export function Preloader() {
  const ready = useAppStore((s) => s.ready);
  const setEntered = useAppStore((s) => s.setEntered);
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  const [gone, setGone] = useState(false);
  const started = useRef(Date.now());
  const playing = useRef(false);

  useIsomorphicLayoutEffect(() => {
    stopScroll(true);
    document.body.style.overflow = "hidden";
    // The intro is a one-shot sequence keyed to stage 0; restoring a mid-page
    // scroll position would drop the viewer into the middle of it.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mark.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1, ease: EASE.expo, delay: 0.1 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // `entered` is set from inside this timeline, so it must not be a
    // dependency — re-running the effect would kill the timeline mid-curtain.
    // The ref guard keeps it to one run while still surviving StrictMode's
    // mount/unmount/mount cycle in development.
    if (!ready || playing.current) return;
    playing.current = true;

    const wait = Math.max(0, MIN_DURATION - (Date.now() - started.current));
    const progress = { v: 0 };
    const intro = { v: 0 };

    const tl = gsap.timeline({ delay: wait / 1000 });

    tl.to(progress, {
      v: 100,
      duration: reducedMotion ? 0.2 : 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter.current) {
          counter.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
        }
        if (bar.current) {
          bar.current.style.transform = `scaleX(${progress.v / 100})`;
        }
      },
    })
      .to(
        [counter.current, mark.current],
        { opacity: 0, y: -12, duration: 0.5, ease: EASE.expo, stagger: 0.05 },
        "+=0.15",
      )
      .to(
        bar.current,
        { scaleX: 0, transformOrigin: "right center", duration: 0.45, ease: "power3.inOut" },
        "<",
      )
      .to(
        root.current,
        {
          yPercent: -100,
          duration: reducedMotion ? 0.3 : 1.15,
          ease: "expo.inOut",
          onStart: () => {
            document.body.style.overflow = "";
            stopScroll(false);
            setEntered(true);
          },
          onComplete: () => setGone(true),
        },
        "-=0.1",
      )
      // The scene entrance rides the same timeline as the curtain.
      .to(
        intro,
        {
          v: 1,
          duration: reducedMotion ? 0.4 : 2.6,
          ease: "power2.out",
          onUpdate: () => {
            journey.intro = intro.v;
          },
        },
        "<0.15",
      );

    return () => {
      playing.current = false;
      tl.kill();
    };
  }, [ready, reducedMotion, setEntered]);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[120] flex flex-col justify-between bg-void px-6 py-6 md:px-10 md:py-10"
    >
      <div ref={mark} className="flex items-center justify-between gap-6">
        <Logo variant="full" className="h-9 md:h-11" />
        <span className="eyebrow hidden sm:block">{COMPANY.descriptor}</span>
      </div>

      <div className="flex items-end justify-between gap-8">
        <span className="eyebrow max-w-[22ch] leading-relaxed">
          Compiling the experience — shaders, geometry, motion.
        </span>
        <span
          ref={counter}
          className="font-mono text-[clamp(2.5rem,9vw,7rem)] leading-none tracking-[-0.04em] text-chalk tabular-nums"
        >
          000
        </span>
      </div>

      <div className="relative mt-6 h-px w-full overflow-hidden bg-hairline">
        <span
          ref={bar}
          className="absolute inset-0 origin-left scale-x-0 bg-ion"
        />
      </div>
    </div>
  );
}
