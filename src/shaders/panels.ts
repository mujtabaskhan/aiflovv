/**
 * Interface panels.
 *
 * One instanced quad per screen. The quad is a little larger than the panel so
 * the same fragment can draw the card, its soft shadow (light acts) or halo
 * (dark acts), and a lit edge — the panel shape itself is a rounded-rect SDF,
 * so corners stay crisp at any size.
 *
 * The atlas stores meaning, not colour (R ink, G accent, B fill; all three is a
 * caret), and is inked here per environment. `fill` runs 0 → 1 from a bare
 * wireframe to a finished, coloured screen, which is how the process section
 * shows a product being designed and built.
 */

export const panelVertex = /* glsl */ `
attribute vec4 aRect;
attribute vec2 aSize;
attribute vec4 aState;

uniform float uMargin;

varying vec2 vLocal;
varying vec2 vUv;
varying vec2 vSize;
varying vec4 vState;
varying vec3 vViewPos;
varying vec3 vViewNormal;

void main() {
  vec2 ext = aSize * 0.5 + uMargin;
  vec2 local = position.xy * 2.0 * ext;

  vLocal = local;
  vSize = aSize;
  vState = aState;
  vUv = aRect.xy + (local / aSize + 0.5) * aRect.zw;

  mat4 mv = modelViewMatrix * instanceMatrix;
  vec4 p = mv * vec4(local, 0.0, 1.0);
  vViewPos = p.xyz;
  vViewNormal = normalize(mat3(mv) * vec3(0.0, 0.0, 1.0));
  gl_Position = projectionMatrix * p;
}
`;

export const panelFragment = /* glsl */ `
precision highp float;

uniform sampler2D uAtlas;
uniform float uLight;
uniform float uTime;
uniform float uMargin;
uniform float uSweep;
uniform float uSweepGain;
uniform vec2 uViewport;

uniform vec3 uSurfaceL;
uniform vec3 uSurfaceD;
uniform vec3 uFillL;
uniform vec3 uFillD;
uniform vec3 uInkL;
uniform vec3 uInkD;
uniform vec3 uAccentL;
uniform vec3 uAccentD;
uniform vec3 uShadowL;
uniform vec3 uHaloD;
uniform vec3 uEdgeL;
uniform vec3 uEdgeD;

varying vec2 vLocal;
varying vec2 vUv;
varying vec2 vSize;
varying vec4 vState;
varying vec3 vViewPos;
varying vec3 vViewNormal;

float sdRound(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// Premultiplied "over".
void over(inout vec4 acc, vec3 c, float a) {
  acc.rgb = c * a + acc.rgb * (1.0 - a);
  acc.a = a + acc.a * (1.0 - a);
}

void main() {
  float opacity = vState.x;
  float fill = vState.y;
  float glow = vState.z;
  float radius = vState.w;
  float L = uLight;

  vec2 halfSize = vSize * 0.5;
  float d = sdRound(vLocal, halfSize, radius);
  float aa = max(fwidth(d), 1e-4);
  float body = 1.0 - smoothstep(-aa, aa, d);

  vec3 surface = mix(uSurfaceD, uSurfaceL, L);
  vec3 fillC = mix(uFillD, uFillL, L);
  vec3 ink = mix(uInkD, uInkL, L);
  vec3 accent = mix(uAccentD, uAccentL, L);
  vec3 edgeC = mix(uEdgeD, uEdgeL, L);

  vec4 acc = vec4(0.0);

  // Shadow on paper, halo in the dark — both outside the card only.
  float outside = 1.0 - body;
  float ds = sdRound(vLocal - vec2(0.0, -0.045), halfSize, radius);
  float shadow = exp(-max(ds, 0.0) * 11.0) * smoothstep(uMargin, 0.0, ds) * outside;
  float halo = exp(-max(d, 0.0) * 7.0) * smoothstep(uMargin, 0.0, d) * outside;
  over(acc, uShadowL, shadow * L * mix(0.1, 0.22, fill));
  over(acc, uHaloD, halo * (1.0 - L) * (0.05 + glow * 0.3) * fill);

  if (body > 0.0) {
    vec3 viewDir = normalize(-vViewPos);
    vec3 n = normalize(vViewNormal);
    float facing = abs(dot(n, viewDir));

    vec3 tex = gl_FrontFacing ? texture2D(uAtlas, vUv).rgb : vec3(0.0);
    float caret = min(tex.r, min(tex.g, tex.b));
    float blink = step(0.5, fract(uTime * 1.05));
    tex -= caret;

    // Glass: a soft top-lit gradient plus a specular sweep that moves as the
    // panel turns, so a static screen still catches the light.
    float grad = smoothstep(-halfSize.y, halfSize.y, vLocal.y);
    vec3 surf = surface * mix(0.965, 1.02, grad);
    vec3 r = reflect(-viewDir, gl_FrontFacing ? n : -n);
    float spec = pow(max(dot(r, normalize(vec3(-0.35, 0.8, 0.45))), 0.0), 18.0);
    surf += mix(vec3(0.35, 0.48, 0.9) * 0.22, vec3(1.0) * 1.2, L) * spec;

    // A light sweep across the glass, in screen space so it crosses the whole
    // composition as one band: pale blue on paper, a glint in the dark.
    vec2 sc = gl_FragCoord.xy / uViewport;
    float sweep = exp(-pow((sc.x * 0.85 + sc.y * 0.4 - uSweep) * 7.0, 2.0)) * uSweepGain;
    surf = mix(surf, mix(surf + accent * 0.5, vec3(0.8, 0.86, 1.0), L), sweep * 0.5);

    float surfA = mix(mix(0.0, 0.8, fill), mix(0.0, 0.97, fill), L);
    if (!gl_FrontFacing) surf *= mix(0.55, 0.92, L);
    over(acc, surf, body * surfA);

    // Content. A wireframe (fill 0) keeps only the drawn lines; colour and
    // secondary surfaces arrive with fill.
    // On paper the grade is linear, and dark-over-light coverage blended in
    // linear light reads far thinner than the same text in CSS (which blends
    // in sRGB). Lifting coverage by the display gamma restores the weight.
    float g = mix(1.0, 2.2, L);
    float a = tex.g;
    float inkA = 1.0 - pow(1.0 - clamp(tex.r, 0.0, 1.0), g);
    over(acc, fillC, body * tex.b * (1.0 - a) * fill);
    over(acc, accent, body * a * fill);
    over(acc, ink, body * a * (1.0 - fill) * 0.35);
    over(acc, ink, body * inkA * mix(0.7, 1.0, fill));
    over(acc, accent, body * caret * blink);

    // Edge: a hairline on paper, a lit rim in the dark. Stronger in wireframe,
    // where it is most of the drawing, and brighter at grazing angles.
    float rim = 1.0 - smoothstep(0.0, aa * 1.6, abs(d + aa * 0.8));
    float dash = mix(step(0.45, fract((vLocal.x + vLocal.y) * 9.0)), 1.0, fill);
    float edgeA = mix(0.55, mix(0.16, 0.42, 1.0 - L), fill) + (1.0 - facing) * 0.35;
    over(acc, mix(edgeC, accent, glow), rim * dash * clamp(edgeA + glow * 0.5, 0.0, 1.0));
    over(acc, accent, rim * sweep * 0.9);

    // Focus: a thin accent frame just inside the edge.
    float inner = 1.0 - smoothstep(0.0, aa * 1.4, abs(d + 0.018));
    over(acc, accent, inner * glow * 0.85 * fill);
  }

  acc *= opacity;
  if (acc.a < 0.002) discard;
  gl_FragColor = acc;
}
`;
