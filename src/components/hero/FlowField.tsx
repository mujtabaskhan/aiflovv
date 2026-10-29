"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { SHAPES, sampleShape } from "@/lib/shapes";
import { onRevealed } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";

/* ----------------------------------------------------------------
   Shaders
   Every particle is a square point (gl.POINTS are square by nature —
   the brand's pixel, for free). Positions are computed statelessly in
   the vertex shader from time + attributes, so the CPU only swaps two
   target buffers when the shape changes.
   ---------------------------------------------------------------- */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const VERT = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uExit;
uniform float uIntro;
uniform float uScale;
uniform float uCell;
uniform float uSize;
uniform vec2 uCenter;
uniform vec2 uSpawn;
uniform vec2 uSpread;
uniform vec3 uPointer;
uniform float uPointerStr;
uniform vec3 uBurst;
uniform float uBurstT;
uniform vec3 uColA;
uniform vec3 uColB;

attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec4 aSeed;

varying vec3 vColor;
varying float vAlpha;
varying float vHollow;

${NOISE}

vec3 grad(float x){ return mix(uColA, uColB, clamp(x * .5 + .5, 0., 1.)); }

vec3 structurePos(vec4 t){
  vec3 p = vec3(uCenter + t.xy * uSize, t.z * uSize);
  p.z += sin(uTime * 1.1 + t.x * 2.4 + t.y * 1.3) * .035 + sin(uTime * .7 + aSeed.x * 6.283) * .012;
  return p;
}

vec3 streamPos(vec3 target, float life, vec3 spawn, vec3 fl){
  float ex = life;
  float ey = smoothstep(.2, 1., life);
  float ez = smoothstep(.3, 1., life);
  vec3 p = vec3(mix(spawn.x, target.x, ex), mix(spawn.y, target.y, ey), mix(spawn.z, target.z, ez));
  p += fl * (1. - smoothstep(.55, 1., life)) * 1.1;
  return p;
}

void main(){
  float speed = .045 + aSeed.w * .05;
  float life = fract(uTime * speed + aSeed.x * 7.13);
  vec3 spawn = vec3(uSpawn + (aSeed.yz - .5) * 2. * uSpread, (aSeed.w - .6) * 2.6);
  vec3 fl = vec3(
    snoise(spawn * .45 + vec3(0., uTime * .09, life * 1.7)),
    snoise(spawn * .45 + vec3(17.3, uTime * .09, life * 1.7)),
    snoise(spawn * .45 + vec3(5.1, 9.2, uTime * .09 + life * 1.7))
  );

  // w > 0 structure, w = 0 stream, w < 0 parked (held in place, invisible).
  float roleA = step(.01, aFrom.w) + step(aFrom.w, -.5);
  float roleB = step(.01, aTo.w) + step(aTo.w, -.5);

  vec3 sA = structurePos(aFrom);
  vec3 sB = structurePos(aTo);
  vec3 tA = vec3(uCenter + aFrom.xy * uSize, 0.);
  vec3 tB = vec3(uCenter + aTo.xy * uSize, 0.);
  vec3 pA = mix(streamPos(tA, life, spawn, fl), sA, roleA);
  vec3 pB = mix(streamPos(tB, life, spawn, fl), sB, roleB);

  float delay = aSeed.y * .32 + (aTo.x * .5 + .5) * .22;
  float m = clamp((uMorph - delay) / .46, 0., 1.);
  float me = m * m * (3. - 2. * m);
  vec3 p = mix(pA, pB, me);
  float arc = sin(me * 3.14159);
  p += fl * arc * .55 * roleA * roleB;
  p.z += arc * (aSeed.z - .35) * 1.4 * roleA * roleB;

  float streamA = smoothstep(0., .12, life) * (1. - smoothstep(.84, 1., life));
  float alphaA = mix(streamA * (.2 + aSeed.z * .3), max(aFrom.w, 0.), roleA);
  float alphaB = mix(streamA * (.2 + aSeed.z * .3), max(aTo.w, 0.), roleB);
  float alpha = mix(alphaA, alphaB, me);

  // Pointer: a soft field that pushes pixels aside and lifts them forward.
  float glow = 0.;
  vec2 d = p.xy - uPointer.xy;
  float f = exp(-dot(d, d) / .32) * uPointerStr;
  p.xy += normalize(d + 1e-4) * f * .42;
  p.z += f * .55;
  glow += f;

  // Click: a ring shockwave.
  float bt = uTime - uBurstT;
  if (bt > 0. && bt < 2.5) {
    vec2 bd = p.xy - uBurst.xy;
    float bl = length(bd);
    float wave = exp(-pow(bl - bt * 3.6, 2.) * 3.) * exp(-bt * 1.4);
    p.xy += normalize(bd + 1e-4) * wave * .38;
    p.z += wave * .7;
    glow += wave * 1.6;
  }

  // Leaving the hero: the product breaks back into pixels and drifts off.
  vec3 scatter = (aSeed.xyz - .5) * vec3(7., 6., 5.);
  p += scatter * uExit * uExit;
  p.y += uExit * 1.6;
  alpha *= 1. - uExit;
  alpha *= uIntro;

  // Greyscale: the product is white and steps back to grey with depth (each
  // layer behind the front one is dimmer); loose stream pixels are mid-grey,
  // and a few catch the light as pure white.
  float depthA = clamp(-aFrom.z / .2, 0., 1.);
  float depthB = clamp(-aTo.z / .2, 0., 1.);
  vec3 colA = mix(vec3(.66), grad(aFrom.x) * (1. - depthA * .38), roleA);
  vec3 colB = mix(vec3(.66), grad(aTo.x) * (1. - depthB * .38), roleB);
  vec3 col = mix(colA, colB, me);
  col = mix(col, vec3(1.), step(.972, aSeed.y) * .8);
  col += vec3(.55) * glow;

  float sizeS = uCell * .82;
  float sizeF = uCell * (.32 + aSeed.w * .72);
  float size = mix(mix(sizeF, sizeS, roleA), mix(sizeF, sizeS, roleB), me);
  vHollow = step(.955, aSeed.w) * (1. - mix(roleA, roleB, me));
  size *= 1. + vHollow * 1.25 + glow * .5;

  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = max(1., size * uScale / -mv.z);
  vColor = col;
  vAlpha = clamp(alpha * (1. + glow * .6), 0., 1.);
}
`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vHollow;
void main(){
  vec2 c = abs(gl_PointCoord - .5);
  if (vHollow > .5 && max(c.x, c.y) < .32) discard;
  gl_FragColor = vec4(vColor, vAlpha);
}
`;

/* ---------------------------------------------------------------- */

function tier() {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  if (w < 700 || cores <= 4 || mem <= 4) return { count: 7000, grid: 92 };
  if (w < 1200) return { count: 11000, grid: 112 };
  return { count: 15000, grid: 124 };
}

export interface FlowFieldHandle {
  goTo: (i: number) => void;
  /** Holds the current shape (the hero pauses while you read the caption). */
  setPaused: (paused: boolean) => void;
}

interface Props {
  onShape?: (index: number) => void;
  /** Lets the caption jump to a shape on hover/click. */
  controlRef?: RefObject<FlowFieldHandle | null>;
  onUnsupported?: () => void;
}

/** Seconds a morph takes; each shape's own `hold` follows it. */
export const MORPH = 1.2;

export default function FlowField({ onShape, controlRef, onUnsupported }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const onShapeRef = useRef(onShape);
  onShapeRef.current = onShape;

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      onUnsupported?.();
      return;
    }
    const reduced = prefersReducedMotion();
    const { count, grid } = tier();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 11);

    // Pre-sample every shape once; morphs then only copy arrays.
    const targets = SHAPES.map((s, i) => sampleShape(s, count, grid, 1013 + i * 7919));
    const intro = new Float32Array(targets[0]);
    for (let i = 0; i < count; i++) if (intro[i * 4 + 3] > 0) intro[i * 4 + 3] = 0;

    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();

    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3));
    const fromAttr = new BufferAttribute(new Float32Array(intro), 4);
    const toAttr = new BufferAttribute(new Float32Array(targets[0]), 4);
    geo.setAttribute("aFrom", fromAttr);
    geo.setAttribute("aTo", toAttr);
    geo.setAttribute("aSeed", new BufferAttribute(seeds, 4));

    const uniforms = {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uExit: { value: 0 },
      uIntro: { value: 0 },
      uScale: { value: 1 },
      uCell: { value: 0.03 },
      uSize: { value: 2 },
      uCenter: { value: new Vector2() },
      uSpawn: { value: new Vector2() },
      uSpread: { value: new Vector2() },
      uPointer: { value: new Vector3(99, 99, 0) },
      uPointerStr: { value: 0 },
      uBurst: { value: new Vector3() },
      uBurstT: { value: -10 },
      uColA: { value: new Color("#b9bcc4") },
      uColB: { value: new Color("#ffffff") },
    };
    const mat = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const points = new Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    // Layout: product on the right on wide screens, above the copy on phones.
    const view = { w: 1, h: 1, H: 1, W: 1, wide: true };
    const lookAt = new Vector3();
    const copy = el.parentElement?.querySelector<HTMLElement>(".hero-copy") ?? null;
    const resize = () => {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const H = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      const W = H * camera.aspect;
      const wide = w >= 900;
      Object.assign(view, { w, h, H, W, wide });
      if (wide) {
        uniforms.uCenter.value.set(W * 0.272, H * 0.07);
        uniforms.uSize.value = Math.min(W * 0.19, H * 0.34);
        uniforms.uSpawn.value.set(-W * 0.6, H * 0.02);
        uniforms.uSpread.value.set(0.4, H * 0.5);
      } else {
        // Fit the product into the free band between the nav and the copy, so
        // it never sits behind the headline.
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const top = 4.5 * rem + 8;
        const bottom = copy ? copy.getBoundingClientRect().top - el.getBoundingClientRect().top - 8 : h * 0.42;
        const band = Math.max(bottom - top, 130);
        const centerPx = top + band / 2;
        uniforms.uCenter.value.set(0, (0.5 - centerPx / h) * H);
        uniforms.uSize.value = Math.min(W * 0.4, ((band * 0.46) / h) * H);
        uniforms.uSpawn.value.set(-W * 0.2, H * 0.62);
        uniforms.uSpread.value.set(W * 0.5, 0.35);
      }
      uniforms.uCell.value = (uniforms.uSize.value * 2) / grid;
      uniforms.uScale.value = (h * renderer.getPixelRatio()) / (2 * Math.tan((camera.fov * Math.PI) / 360));
      // A slight look toward the product adds depth on wide screens; on phones
      // the camera looks straight ahead so the product lands exactly in its band.
      const k = wide ? 0.35 : 0;
      lookAt.set(uniforms.uCenter.value.x * k, uniforms.uCenter.value.y * k, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    // Web fonts and wrapping change where the copy starts.
    if (copy) ro.observe(copy);

    // Pointer, in world space on the z = 0 plane.
    const ndc = new Vector2(0, 0);
    const ndcSmooth = new Vector2(0, 0);
    const world = new Vector3(99, 99, 0);
    let pointerActive = 0;
    const toWorld = (cx: number, cy: number, out: Vector3) => {
      const r = el.getBoundingClientRect();
      const v = new Vector3(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1, 0.5).unproject(camera);
      const dir = v.sub(camera.position).normalize();
      const t = -camera.position.z / dir.z;
      return out.copy(camera.position).addScaledVector(dir, t);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientY > r.bottom) return;
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      toWorld(e.clientX, e.clientY, world);
      pointerActive = 1;
    };
    const onLeave = () => {
      pointerActive = 0;
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button")) return;
      const r = el.getBoundingClientRect();
      if (e.clientY > r.bottom || e.clientY < r.top) return;
      toWorld(e.clientX, e.clientY, uniforms.uBurst.value);
      uniforms.uBurstT.value = uniforms.uTime.value;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    // Shape sequencing. `from` always holds the shape on screen; a morph
    // fills `to` and runs uMorph 0 → 1, then commits `to` into `from`.
    let current = 0;
    let next = 0;
    // The clock time a morph began, or null between morphs. (Not a -1 sentinel:
    // the clock can legitimately be negative for the first frames.)
    let morphStart: number | null = null;
    let holdUntil = Infinity;
    let started = false;
    let queued = -1;
    let paused = false;
    const startMorph = (to: number, now: number) => {
      toAttr.array.set(targets[to]);
      toAttr.needsUpdate = true;
      next = to;
      morphStart = now;
      uniforms.uMorph.value = 0;
      onShapeRef.current?.(to);
    };
    if (controlRef) {
      controlRef.current = {
        goTo: (i: number) => {
          if (!started) return;
          if (morphStart !== null) {
            queued = i;
            return;
          }
          if (i !== current) startMorph(i, uniforms.uTime.value);
        },
        setPaused: (p: boolean) => {
          paused = p;
        },
      };
    }

    let running = true;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    let raf = 0;
    let last = performance.now();
    let time = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // A frame's timestamp can predate the moment setup finished; never let
      // the clock run backwards.
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      if (!running || !visible) return;
      time += reduced ? 0 : dt;
      uniforms.uTime.value = time;

      if (morphStart !== null) {
        const m = (time - morphStart) / MORPH;
        uniforms.uMorph.value = Math.min(1, m);
        if (m >= 1) {
          current = next;
          morphStart = null;
          fromAttr.array.set(targets[current]);
          fromAttr.needsUpdate = true;
          uniforms.uMorph.value = 0;
          holdUntil = time + SHAPES[current].hold;
          if (queued >= 0 && queued !== current) startMorph(queued, time);
          queued = -1;
        }
      } else if (paused) {
        holdUntil += dt;
      } else if (started && time > holdUntil && !reduced) {
        startMorph((current + 1) % SHAPES.length, time);
      }

      uniforms.uPointerStr.value += (pointerActive - uniforms.uPointerStr.value) * 0.06;
      uniforms.uPointer.value.lerp(world, 0.18);
      ndcSmooth.lerp(ndc, 0.04);

      const scrollY = window.scrollY;
      uniforms.uExit.value = Math.min(1, Math.max(0, scrollY / (view.h * 0.9)));

      camera.position.x = ndcSmooth.x * 0.45;
      camera.position.y = ndcSmooth.y * 0.28;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    // If the browser takes the GPU context away (memory pressure, too many
    // contexts), hand over to the text-only hero rather than freezing.
    const onLost = (e: Event) => {
      e.preventDefault();
      onUnsupported?.();
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);

    // The intro waits until the page is fully uncovered — after a client
    // navigation as well as on first load — so the assembly is always seen.
    let fadeRaf = 0;
    const offRevealed = onRevealed(() => {
      started = true;
      if (reduced) {
        fromAttr.array.set(targets[0]);
        fromAttr.needsUpdate = true;
        uniforms.uIntro.value = 1;
        uniforms.uMorph.value = 0;
        onShapeRef.current?.(0);
        return;
      }
      const t0 = performance.now();
      const fade = () => {
        const k = Math.min(1, (performance.now() - t0) / 900);
        uniforms.uIntro.value = k;
        if (k < 1) fadeRaf = requestAnimationFrame(fade);
      };
      fade();
      // The intro morph: free-flowing pixels assemble into the mark.
      fromAttr.array.set(intro);
      fromAttr.needsUpdate = true;
      toAttr.array.set(targets[0]);
      toAttr.needsUpdate = true;
      current = 0;
      next = 0;
      morphStart = uniforms.uTime.value;
      onShapeRef.current?.(0);
    });

    return () => {
      offRevealed();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeRaf);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      if (controlRef) controlRef.current = null;
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      // dispose() frees buffers but not the context itself; release it now so
      // repeat visits to home never pile up GPU contexts.
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [controlRef, onUnsupported]);

  return <div ref={host} className="absolute inset-0" aria-hidden />;
}
