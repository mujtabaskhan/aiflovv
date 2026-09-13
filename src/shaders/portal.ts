import { simplex3d, fbm3d, helpers } from "./chunks/noise";

/**
 * The work-section portal.
 *
 * Each case study gets a generated visual rather than a screenshot or stock
 * photo — five procedural systems, each chosen to say something about the
 * project it fronts (a ledger topography for financial infrastructure, a vitals
 * radial for healthcare, advected flow lines for logistics, and so on).
 *
 * Switching projects warps the surface and cross-dissolves between the outgoing
 * and incoming visual, so the transition is part of the material rather than a
 * CSS fade layered on top.
 */

export const portalVertex = /* glsl */ `
uniform float uTime;
uniform float uTransition;
uniform float uHover;

varying vec2 vUv;
varying vec3 vViewDir;

${simplex3d}

void main() {
  vUv = uv;

  vec3 p = position;

  // The plane flexes while a project changes, and leans toward the pointer.
  float w = snoise(vec3(uv * 2.4, uTime * 0.25));
  p.z += w * uTransition * 0.42;
  p.z += sin(uv.x * 3.1415) * sin(uv.y * 3.1415) * (0.06 + uHover * 0.1);

  vec4 world = modelMatrix * vec4(p, 1.0);
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

export const portalFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uVariant;
uniform float uPrevVariant;
uniform float uTransition;
uniform float uHover;
uniform float uOpacity;
uniform float uAspect;
uniform vec2  uPointer;

uniform vec3 uInk;
uniform vec3 uIon;
uniform vec3 uIonSoft;
uniform vec3 uEmber;

varying vec2 vUv;
varying vec3 vViewDir;

${simplex3d}
${fbm3d}
${helpers}

/* ---------- 0 · Ledger topography — financial infrastructure ---------- */
vec3 vizLedger(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);
  float n = fbm(vec3(p * 2.1, t * 0.035), 2, 2.05, 0.52);

  float contour = abs(fract(n * 8.0) - 0.5);
  float line = smoothstep(0.055, 0.0, contour);
  float major = smoothstep(0.02, 0.0, abs(fract(n * 2.0) - 0.5));

  vec3 col = uInk * 0.55;
  col += uIon * line * 0.55;
  col += uIonSoft * major * 0.9;

  // Settlement ticks running along one contour.
  float run = exp(-pow((fract(n * 2.0) - 0.5) * 26.0, 2.0));
  float tick = step(0.72, fract(p.x * 42.0 - t * 0.5));
  col += uEmber * run * tick * 0.55;

  return col;
}

/* ---------- 1 · Vitals radial — healthcare ---------- */
vec3 vizVitals(vec2 uv, float t) {
  vec2 c = (uv - 0.5) * vec2(uAspect, 1.0);
  float r = length(c) * 2.0;
  float a = atan(c.y, c.x);

  vec3 col = uInk * 0.5;

  float rings = smoothstep(0.014, 0.0, abs(fract(r * 4.5 - t * 0.08) - 0.5) - 0.485);
  col += uIon * rings * 0.7;

  // Rotating acquisition sweep with a decaying tail.
  float sweep = fract((a / 6.2831853) + t * 0.06);
  float tail = pow(1.0 - sweep, 5.0);
  col += uIonSoft * tail * smoothstep(1.35, 0.1, r) * 0.85;

  // Trace: a single vital line crossing the frame.
  float wave =
    sin(uv.x * 26.0 + t * 1.1) * 0.035 +
    exp(-pow((fract(uv.x * 1.6 - t * 0.11) - 0.5) * 12.0, 2.0)) * 0.16;
  float trace = smoothstep(0.007, 0.0, abs(uv.y - 0.5 - wave));
  col += uEmber * trace * 1.15;

  float dot_ = exp(-pow((r - 0.06) * 22.0, 2.0));
  col += uIonSoft * dot_ * 0.8;

  return col;
}

/* ---------- 2 · Advected flow — logistics ---------- */
vec3 vizFlow(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);
  vec3 col = uInk * 0.5;

  // Trace a handful of streamlines through a noise field.
  vec2 q = p;
  float acc = 0.0;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float n = snoise(vec3(q * 1.7 + fi * 3.1, t * 0.07));
    q += vec2(cos(n * 3.1415), sin(n * 3.1415)) * 0.06;
    float lane = abs(fract(q.y * 7.0 + n * 0.6 - t * 0.12) - 0.5);
    acc += smoothstep(0.07, 0.0, lane) * (0.38 - fi * 0.06);
  }

  col += mix(uIon, uIonSoft, acc) * acc * 0.95;

  // Node beacons along the busiest lane.
  float beacon = exp(-pow((fract(p.x * 1.2 - t * 0.09) - 0.5) * 16.0, 2.0));
  col += uEmber * beacon * acc * 0.7;

  return col;
}

/* ---------- 3 · Silk drape — luxury retail ---------- */
vec3 vizSilk(vec2 uv, float t) {
  vec2 p = uv * vec2(uAspect, 1.0);

  // Directional drape: warp a vertical band field rather than using isotropic
  // noise, which reads as blotches instead of fabric.
  float w = fbm(vec3(p.x * 1.5, p.y * 0.5, t * 0.045), 2, 2.1, 0.52);
  float fold = 0.5 + 0.5 * sin((p.x * 5.6 + w * 2.4) * 3.14159265);

  vec3 col = mix(uInk * 0.9, uIon * 0.38, fold);

  // Specular running along the crest of each fold.
  col += uIonSoft * pow(fold, 12.0) * 0.85;
  col += uEmber * pow(fold, 44.0) * 0.45;

  // Fine weave under the sheen.
  col += uIonSoft * smoothstep(0.88, 1.0, sin(p.x * 250.0) * 0.5 + 0.5) * 0.03;

  // The drape falls into shadow toward the bottom of the frame.
  col *= 0.42 + 0.72 * smoothstep(0.0, 0.62, uv.y);
  return col;
}

/* ---------- 4 · Data field — analytics ---------- */
vec3 vizBars(vec2 uv, float t) {
  vec3 col = uInk * 0.5;

  float cols = 54.0;
  float ix = floor(uv.x * cols);
  float fx = fract(uv.x * cols);

  float h = 0.18 + (snoise(vec3(ix * 0.16, t * 0.22, 0.0)) * 0.5 + 0.5) * 0.62;
  float bar = step(uv.y, h) * smoothstep(0.0, 0.12, fx) * smoothstep(1.0, 0.88, fx);

  float grad = smoothstep(0.0, h, uv.y);
  col += mix(uIon * 0.5, uIonSoft, grad) * bar * 0.85;

  // Cap highlight.
  col += uIonSoft * smoothstep(h - 0.008, h, uv.y) * step(uv.y, h) * bar * 2.2;

  // Query sweep passing across the field.
  float sweep = exp(-pow((uv.x - fract(t * 0.07)) * 9.0, 2.0));
  col += uEmber * sweep * bar * 0.9;

  // Baseline grid.
  float grid = smoothstep(0.985, 1.0, sin(uv.y * 62.8) * 0.5 + 0.5) * 0.05;
  col += uIon * grid;

  return col;
}

vec3 vizFor(int id, vec2 uv, float t) {
  if (id == 0) return vizLedger(uv, t);
  if (id == 1) return vizVitals(uv, t);
  if (id == 2) return vizFlow(uv, t);
  if (id == 3) return vizSilk(uv, t);
  return vizBars(uv, t);
}

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, vec2(0.0))) - r;
}

void main() {
  float t = uTime;
  float tr = uTransition;

  vec2 uv = vUv;

  // Displacement while switching, plus a gentle lens toward the pointer.
  float warp = snoise(vec3(uv * 3.4, t * 0.4));
  uv += vec2(warp, -warp * 0.6) * tr * 0.075;

  vec2 c = uv - 0.5;
  uv += c * dot(c, c) * (0.1 + uHover * 0.22);
  uv += uPointer * 0.014 * uHover;

  vec3 col = vizFor(int(uVariant + 0.5), uv, t);

  if (tr > 0.002) {
    vec3 prev = vizFor(int(uPrevVariant + 0.5), uv + vec2(tr * 0.05, 0.0), t);
    col = mix(col, prev, tr);
    col += uIonSoft * tr * 0.12;
  }

  // Bring the plate into the scene's register. A gamma push rather than a flat
  // scale: it crushes the midtones toward black so the plate reads as a lit
  // screen instead of a translucent card, while highlights survive for bloom.
  col = pow(max(col, vec3(0.0)), vec3(1.95)) * 1.45;

  // Depth: darken the edges, lift the centre.
  vec2 vc = (vUv - 0.5) * vec2(1.25, 1.0);
  float vign = smoothstep(0.9, 0.1, length(vc));
  col *= mix(0.1, 1.0, vign);

  // Screen-door shimmer, very faint.
  col += uIon * 0.018 * step(0.5, fract(vUv.y * 420.0));

  // Grain keeps the gradients from banding.
  float g = hash22(vUv * vec2(1600.0, 900.0) + fract(t) * 91.0).x;
  col += (g - 0.5) * 0.03;

  // Rounded frame with a lit edge.
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float d = roundedBox(p, vec2(uAspect * 0.5, 0.5) - 0.004, 0.045);
  float inside = smoothstep(0.004, 0.0, d);
  float edge = smoothstep(0.012, 0.0, abs(d + 0.006));
  col += mix(uIon, uIonSoft, uHover) * edge * (0.5 + uHover * 0.9);

  float alpha = inside * uOpacity;
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(col, alpha);
}
`;
