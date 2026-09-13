/**
 * Small, allocation-free math helpers shared by the animation and 3D layers.
 * Everything here runs inside `useFrame`, so it must stay cheap.
 */

export const clamp = (v: number, min = 0, max = 1) =>
  v < min ? min : v > max ? max : v;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const invLerp = (a: number, b: number, v: number) =>
  a === b ? 0 : (v - a) / (b - a);

export const mapRange = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  clamped = true,
) => {
  const t = invLerp(inMin, inMax, v);
  return lerp(outMin, outMax, clamped ? clamp(t) : t);
};

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp(invLerp(edge0, edge1, x));
  return t * t * (3 - 2 * t);
};

export const smootherstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp(invLerp(edge0, edge1, x));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/**
 * Frame-rate independent exponential smoothing.
 * `lambda` is roughly "how many e-foldings per second".
 */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

/** Deterministic PRNG so every reload produces the identical scene. */
export function makeRng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Evenly distributed point `i` of `n` on a unit sphere. */
export function fibonacciSphere(i: number, n: number, out: [number, number, number]) {
  const y = 1 - (i / Math.max(1, n - 1)) * 2;
  const radius = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * i;
  out[0] = Math.cos(theta) * radius;
  out[1] = y;
  out[2] = Math.sin(theta) * radius;
  return out;
}

/**
 * Interpolate a keyframe table at a continuous index (e.g. 2.4 → 40% between
 * entry 2 and 3), easing the transition so section changes feel intentional.
 */
export function sampleKeyframes(table: readonly number[], index: number) {
  const last = table.length - 1;
  if (index <= 0) return table[0];
  if (index >= last) return table[last];
  const i = Math.floor(index);
  const t = smootherstep(0, 1, index - i);
  return lerp(table[i], table[i + 1], t);
}
