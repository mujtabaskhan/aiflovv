"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { journey, measure, setPointer, update } from "@/lib/journey";
import { useAppStore } from "@/store/useAppStore";

let lenisInstance: Lenis | null = null;

/** Programmatic scrolling for nav links and CTAs. */
export function scrollToSection(target: string | HTMLElement, offset = 0) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.6 });
    return;
  }
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}

export function stopScroll(stop: boolean) {
  if (!lenisInstance) return;
  if (stop) lenisInstance.stop();
  else lenisInstance.start();
}

/**
 * Owns the scroll loop.
 *
 * Lenis drives native scroll, GSAP's ticker drives Lenis, and every scroll tick
 * updates both ScrollTrigger and the journey model. One clock, no drift between
 * the DOM animations and the 3D camera.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useAppStore((s) => s.reducedMotion);

  useEffect(() => {
    const lenis = new Lenis({
      duration: reducedMotion ? 0.4 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reducedMotion,
      touchMultiplier: 1.8,
      wheelMultiplier: 1,
      lerp: undefined,
    });
    lenisInstance = lenis;

    if (process.env.NODE_ENV === "development") {
      // Lenis owns the scroll position; window.scrollTo gets overwritten on the
      // next frame. Expose the instance so tooling can drive it properly.
      (window as unknown as Record<string, unknown>).__lenis = lenis;
      (window as unknown as Record<string, unknown>).__journey = journey;
    }

    // The preloader owns the scroll lock until the intro has played.
    if (!useAppStore.getState().entered) lenis.stop();

    const onScroll = (e: { scroll: number; velocity: number }) => {
      update(e.scroll, e.velocity);
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Measure once now, again after fonts settle, and on every resize.
    measure();
    const remeasure = () => {
      measure();
      ScrollTrigger.refresh();
    };
    const t1 = window.setTimeout(remeasure, 120);
    const t2 = window.setTimeout(remeasure, 600);
    if (document.fonts?.ready) void document.fonts.ready.then(remeasure);

    // A mobile toolbar sliding in or out changes only the visible height, and
    // nothing is laid out against that (sections use vh/svh, which hold
    // still) — so it gets the new viewport metrics, not a full re-measure
    // and trigger refresh on every frame of the slide.
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeRaf = 0;
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const toolbar =
        ScrollTrigger.isTouch === 1 && w === lastWidth && Math.abs(h - lastHeight) < h * 0.25;
      cancelAnimationFrame(resizeRaf);
      if (toolbar) {
        journey.viewport.height = h;
        journey.viewport.aspect = w / Math.max(1, h);
        return;
      }
      lastWidth = w;
      lastHeight = h;
      resizeRaf = requestAnimationFrame(remeasure);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Devices without a pointer get a gentle automatic drift instead — until
    // a mouse or pen actually moves. Hybrids (a Surface with its cover, a
    // tablet with a trackpad) report a coarse primary pointer but have both.
    let driftId = 0;

    // Pointer feeds the camera parallax and the interface's response.
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "touch" && driftId) {
        cancelAnimationFrame(driftId);
        driftId = 0;
      }
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      const drift = () => {
        const t = performance.now() * 0.0002;
        setPointer(Math.sin(t) * 0.35, Math.cos(t * 0.8) * 0.25);
        driftId = requestAnimationFrame(drift);
      };
      driftId = requestAnimationFrame(drift);
    }

    // Seed the model with the current position (handles reloads mid-page).
    update(window.scrollY, 0);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(driftId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

export { journey };
