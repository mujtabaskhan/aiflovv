import { clamp, lerp, smootherstep } from "@/lib/math";

/**
 * Light / dark environment as a function of the journey.
 *
 * The page is light by default and drops into dark only where dark genuinely
 * buys something: the technology stack, whose lit edges read as architecture
 * against black; the work portal, which is a lit screen and wants a dark
 * surround; and the closing CTA, where the contrast against everything before
 * it is the point. Which act you are in is derived from the same `stage` float
 * that drives the camera and the interface layouts, so the environment change
 * is part of the journey rather than a separate theme toggle.
 *
 *   0 = dark    1 = light
 */
const STAGE_LIGHT = [
  1, // hero        — the product, exploded, on paper
  1, // clients     — the cards carry it; nothing behind them
  1, // manifesto   — bridge
  1, // services    — editorial
  0, // technology  — the stack reads as lit architecture against black
  0, // work        — the portal is a lit screen; screens want a dark surround
  1, // process     — a blueprint
  1, // studio      — editorial
  1, // insights    — editorial
  0, // cta         — climax
];

/**
 * The environment holds for most of a section and then crosses over late.
 *
 * The window is deliberately placed after a pinned section releases, so the
 * content is already travelling off screen while the world changes around it —
 * and it is kept short, because the midpoint of any dark-to-light crossfade is
 * mid-grey and there is nothing to be gained by lingering there.
 */
const CROSS_START = 0.78;
const CROSS_END = 0.97;

export function themeAt(stage: number): number {
  const last = STAGE_LIGHT.length - 1;
  const s = clamp(stage, 0, last);
  if (s >= last) return STAGE_LIGHT[last];
  const i = Math.min(last - 1, Math.floor(s));
  return lerp(
    STAGE_LIGHT[i],
    STAGE_LIGHT[i + 1],
    smootherstep(CROSS_START, CROSS_END, s - i),
  );
}

/**
 * 1 at the exact midpoint of an environment change, 0 once settled.
 *
 * Foreground and background cannot both travel through mid-grey at the same
 * time — contrast would collapse to nothing. So the swap is staged instead: the
 * DOM content dips out, the world inverts, the content comes back. This value
 * drives that dip, and the interface's own dip, so the whole thing reads
 * as one deliberate beat.
 */
export function swapAt(theme: number): number {
  return smootherstep(0.42, 0.02, Math.abs(theme - 0.5));
}

/** Content opacity through an environment change — see `swapAt`. */
export const swapOpacity = (t: number) => 1 - swapAt(t) * 0.94;
