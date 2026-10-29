import type Lenis from "lenis";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Pointer effects key off the input actually being used, not media queries:
 * hybrid devices (a Surface with its cover, a touch laptop) report
 * `hover: none` even while a mouse or trackpad is in hand.
 */
export function isMouse(e: PointerEvent) {
  return e.pointerType === "mouse" || e.pointerType === "pen";
}

/** The live Lenis instance, when smooth scrolling is on. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToTop(immediate = true) {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { immediate, force: true });
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" });
}

/** Deterministic PRNG, so generated art is identical on server and client. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const pad = (n: number, len = 2) => String(n).padStart(len, "0");
