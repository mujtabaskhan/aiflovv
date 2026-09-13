import { simplex3d, fbm3d } from "./chunks/noise";

/**
 * Sky dome. Everything the camera flies through sits inside this: a graded
 * volume with a slow nebula so the "background" has depth instead of being a
 * flat gradient behind the geometry.
 */

export const atmosphereVertex = /* glsl */ `
varying vec3 vDir;

void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragment = /* glsl */ `
precision highp float;

uniform vec3 uVoid;
uniform vec3 uHorizon;
uniform vec3 uZenith;
uniform vec3 uGlow;
uniform float uTime;
uniform float uGlowStrength;
uniform float uStage;
uniform float uLight;

varying vec3 vDir;

${simplex3d}
${fbm3d}

void main() {
  vec3 d = normalize(vDir);
  float h = d.y * 0.5 + 0.5;

  vec3 col = mix(uVoid, uHorizon, smoothstep(0.0, 0.62, h));
  col = mix(col, uZenith, smoothstep(0.5, 1.0, h));

  // Drifting volumetric haze. One octave: this shader runs over every pixel
  // on screen, and extra octaves cost real frame time on integrated GPUs for
  // a detail nobody can consciously see.
  // On paper the haze is held so faint it cannot be seen, so the noise — the
  // costliest thing in this full-screen pass — is skipped there entirely. The
  // branch is on a uniform, so every pixel takes the same path.
  float n = uGlowStrength > 0.06
    ? fbm(d * 1.9 + vec3(uTime * 0.006, uTime * 0.004, 0.0), 1, 2.1, 0.55)
    : 0.5;
  float haze = smoothstep(0.05, 0.85, n);
  col += uGlow * haze * uGlowStrength * (0.45 + 0.55 * (1.0 - abs(d.y)));

  // A single soft light source that swings across the journey. It only makes
  // sense against black — on paper the same term is just a smudge on the print.
  vec3 sunDir = normalize(vec3(sin(uStage * 0.55) * 0.8, 0.35, cos(uStage * 0.55) * 0.8));
  float sun = pow(clamp(dot(d, sunDir), 0.0, 1.0), 12.0);
  col += uGlow * sun * 0.22 * uGlowStrength * (1.0 - uLight);

  gl_FragColor = vec4(col, 1.0);
}
`;

/** Additive radial bloom card behind the centre of frame (dark acts only). */
export const glowVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const glowFragment = /* glsl */ `
precision highp float;

uniform vec3 uColor;
uniform float uIntensity;
uniform float uTime;
uniform float uFalloff;

varying vec2 vUv;

void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv) * 2.0;
  float a = pow(clamp(1.0 - r, 0.0, 1.0), uFalloff);
  a *= 0.9 + sin(uTime * 0.6) * 0.1;
  if (a < 0.002) discard;
  gl_FragColor = vec4(uColor * a * uIntensity, a);
}
`;
