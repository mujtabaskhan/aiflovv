/**
 * Continuous interaction values written by DOM handlers and read inside
 * `useFrame`. Kept out of React for the same reason as `journey`: these change
 * on pointer move and must not re-render anything.
 */
export const interaction = {
  /** 0..1 — pointer is over the work portal. */
  portalHover: 0,
  /** Pointer position within the work portal, -1..1. */
  portalPointer: { x: 0, y: 0 },
  /** 0..1 — pointer is over the closing CTA. */
  ctaHover: 0,
  /** 0..1 — how hard the interface is currently reorganising. Drives
   *  the chromatic aberration and bloom lift so the post chain reacts to the
   *  scene instead of running at a fixed strength. */
  energy: 0,
  /** 1 while the pointer is over a 3D screen, so the cursor swells as it
   *  does over DOM links. */
  cursorHover: 0,
  /** The hero layer under the pointer, for its DOM label: atlas kind, the
   *  label anchor in CSS pixels, and a 0..1 fade. */
  heroProbe: { kind: "", x: 0, y: 0, active: 0 },
};
