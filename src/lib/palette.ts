import { Color } from "three";

/**
 * Single source of truth for scene colour. `new Color(hex)` converts sRGB hex
 * into the renderer's linear working space, and the composer handles the
 * conversion back on output — so these stay in step with the CSS tokens.
 */
export const PALETTE = {
  void: "#04050a",
  ink: "#070911",
  carbon: "#0b0e18",
  ion: "#6e9bff",
  ionSoft: "#a8c2ff",
  ionDeep: "#2b47c9",
  ember: "#ff8a5b",
  aqua: "#74e0ff",
  chalk: "#e9ecf5",
} as const;

export const color = (hex: string) => new Color(hex);

export const C = {
  void: color(PALETTE.void),
  ink: color(PALETTE.ink),
  carbon: color(PALETTE.carbon),
  ion: color(PALETTE.ion),
  ionSoft: color(PALETTE.ionSoft),
  ionDeep: color(PALETTE.ionDeep),
  ember: color(PALETTE.ember),
  aqua: color(PALETTE.aqua),
  chalk: color(PALETTE.chalk),
};

/**
 * Light-environment counterparts.
 *
 * The light acts grade linearly (see GradeEffect), so these are display
 * values: the paper renders as its hex colour.
 */
export const C_LIGHT = {
  /** Sky gradient, bottom → top. Kept close together: a strong gradient on
   *  paper reads as a dirty print rather than a lit room. */
  skyLow: color("#eceef2"),
  skyMid: color("#f3f4f7"),
  skyHigh: color("#f8f9fb"),
  skyGlow: color("#b9c8e6"),

  ionSoft: color("#567cec"),
};

/**
 * Interface panels, per environment. The light values are display colours
 * (linear grade); the dark ones are scene-referred and go through AgX, so the
 * accent sits above 1.0 there to catch the bloom.
 */
export const C_PANEL = {
  surfaceL: color("#ffffff"),
  fillL: color("#e8ecf4"),
  inkL: color("#0b1222"),
  accentL: color("#2854db"),
  shadowL: color("#0b1530"),
  edgeL: color("#0b1530"),

  surfaceD: color("#0b1020"),
  fillD: color("#1a2340").multiplyScalar(1.3),
  inkD: color("#cfd8f0").multiplyScalar(0.5),
  accentD: color("#6e9bff").multiplyScalar(1.8),
  haloD: color("#3a5bd9"),
  edgeD: color("#6e9bff").multiplyScalar(0.8),
};

/** Lerp `a`→`b` into `out` without allocating. */
export function mixColor(out: Color, a: Color, b: Color, t: number) {
  out.copy(a).lerp(b, t);
  return out;
}
