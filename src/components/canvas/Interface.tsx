"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  CanvasTexture,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedMesh,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  NormalBlending,
  PlaneGeometry,
  Quaternion,
  Raycaster,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { panelVertex, panelFragment } from "@/shaders/panels";
import { createAtlas } from "@/lib/interfaceAtlas";
import {
  DEFAULT_HOLD,
  HERO_MEMBERS,
  LAYOUT_HOLD,
  LAYOUTS,
  PANEL_COUNT,
  ROSTER,
  STRIDE,
  blend,
  makeBuf,
  type LayoutCtx,
} from "@/lib/panels";
import { journey, SECTION_IDS, stageOf } from "@/lib/journey";
import { interaction } from "@/lib/interaction";
import { useAppStore } from "@/store/useAppStore";
import { C_PANEL } from "@/lib/palette";
import { swapAt, themeAt } from "@/lib/theme";
import { clamp, damp, smoothstep, smootherstep } from "@/lib/math";

/** Room around each card for its shadow / halo, world units. */
const MARGIN = 0.22;

/**
 * The exploded interface: every screen in one instanced draw. Layouts are
 * evaluated for the current and next section and blended per frame; panels are
 * then depth-sorted so the translucent glass composites correctly.
 */
export function Interface() {
  const size = useThree((s) => s.size);
  const gl = useThree((s) => s.gl);
  const anisotropy = useAppStore((s) => s.quality.anisotropy);
  const mesh = useRef<InstancedMesh>(null);

  const atlas = useMemo(() => createAtlas(ROSTER.map((r) => r.kind)), []);

  const texture = useMemo(() => {
    const t = new CanvasTexture(atlas.canvas);
    t.generateMipmaps = true;
    t.minFilter = LinearMipmapLinearFilter;
    t.magFilter = LinearFilter;
    return t;
  }, [atlas]);

  useEffect(() => {
    texture.anisotropy = Math.min(anisotropy, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
  }, [texture, anisotropy, gl]);

  // The first paint may use fallback faces; repaint once the web fonts land.
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      atlas.redraw();
      texture.needsUpdate = true;
    });
    return () => {
      alive = false;
    };
  }, [atlas, texture]);

  const geometry = useMemo(() => {
    const g = new PlaneGeometry(1, 1);
    const attr = (n: number) => {
      const a = new InstancedBufferAttribute(new Float32Array(PANEL_COUNT * n), n);
      a.setUsage(DynamicDrawUsage);
      return a;
    };
    g.setAttribute("aRect", attr(4));
    g.setAttribute("aSize", attr(2));
    g.setAttribute("aState", attr(4));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: panelVertex,
        fragmentShader: panelFragment,
        transparent: true,
        premultipliedAlpha: true,
        blending: NormalBlending,
        depthWrite: false,
        depthTest: true,
        uniforms: {
          uAtlas: { value: texture },
          uLight: { value: 1 },
          uTime: { value: 0 },
          uMargin: { value: MARGIN },
          uSweep: { value: -2 },
          uSweepGain: { value: 0 },
          uViewport: { value: new Vector2(1, 1) },
          uSurfaceL: { value: C_PANEL.surfaceL },
          uSurfaceD: { value: C_PANEL.surfaceD },
          uFillL: { value: C_PANEL.fillL },
          uFillD: { value: C_PANEL.fillD },
          uInkL: { value: C_PANEL.inkL },
          uInkD: { value: C_PANEL.inkD },
          uAccentL: { value: C_PANEL.accentL },
          uAccentD: { value: C_PANEL.accentD },
          uShadowL: { value: C_PANEL.shadowL },
          uHaloD: { value: C_PANEL.haloD },
          uEdgeL: { value: C_PANEL.edgeL },
          uEdgeD: { value: C_PANEL.edgeD },
        },
      }),
    [texture],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      texture.dispose();
    },
    [geometry, material, texture],
  );

  // Frame-loop scratch — allocated once.
  const scratch = useMemo(() => {
    const ctx: LayoutCtx = {
      t: 0,
      stage: 0,
      portrait: false,
      service: new Float32Array(4),
      tech: new Float32Array(10),
      pillar: new Float32Array(4),
      step: 0,
      work: 0,
      ctaHover: 0,
      intro: 0,
      pointer: journey.smoothPointer,
      engage: 0,
      hover: new Float32Array(PANEL_COUNT),
      hoverAny: 0,
    };
    const depth = new Float32Array(PANEL_COUNT);
    return {
      ctx,
      a: makeBuf(),
      b: makeBuf(),
      out: makeBuf(),
      depth,
      order: Array.from({ length: PANEL_COUNT }, (_, i) => i),
      // Hoisted so sorting allocates nothing per frame.
      farFirst: (x: number, y: number) => depth[y] - depth[x],
      m: new Matrix4(),
      q: new Quaternion(),
      p: new Vector3(),
      s: new Vector3(),
      fwd: new Vector3(),
      prevK: 0,
      prevStage: 0,
      energy: 0,
      // Hover picking against the drawn panels.
      mats: Array.from({ length: PANEL_COUNT }, () => new Matrix4()),
      vis: new Float32Array(PANEL_COUNT),
      inv: new Matrix4(),
      ray: new Raycaster(),
      ndc: new Vector2(),
      ro: new Vector3(),
      rd: new Vector3(),
      anchor: new Vector3(),
      hovered: -1,
      probe: -1,
      pointerSeen: false,
      // Light sweep: first pass as the product lands, then every few seconds.
      introAt: -1,
      viewport: new Vector2(),
    };
  }, []);

  // Hover only means something with a real mouse or pen, and only once it has
  // actually moved — until then it sits at the centre of the frame. Keyed off
  // the input itself rather than a media query, so hybrids get it too.
  useEffect(() => {
    const seen = (e: PointerEvent) => {
      scratch.pointerSeen = e.pointerType !== "touch";
    };
    const gone = () => {
      scratch.pointerSeen = false;
    };
    window.addEventListener("pointermove", seen, { passive: true });
    document.documentElement.addEventListener("pointerleave", gone);
    return () => {
      window.removeEventListener("pointermove", seen);
      document.documentElement.removeEventListener("pointerleave", gone);
      interaction.cursorHover = 0;
      interaction.heroProbe.active = 0;
    };
  }, [scratch]);

  useFrame((state, dt) => {
    const im = mesh.current;
    if (!im) return;
    const d = Math.min(dt, 1 / 30);
    const S = scratch;
    const ctx = S.ctx;
    const stage = journey.stage;
    const t = state.clock.elapsedTime;

    // Focus state, read transiently so highlighting never re-renders React.
    const app = useAppStore.getState();
    for (let i = 0; i < 4; i++) {
      ctx.service[i] = damp(ctx.service[i], app.activeService === i ? 1 : 0, 4.5, d);
      ctx.pillar[i] = damp(ctx.pillar[i], app.activePillar === i ? 1 : 0, 5, d);
    }
    for (let i = 0; i < 10; i++) {
      ctx.tech[i] = damp(ctx.tech[i], app.activeTech === i ? 1 : 0, 6, d);
    }
    ctx.step = damp(ctx.step, app.activeStep, 3.2, d);
    ctx.work = clamp(stage - stageOf("work"));
    ctx.ctaHover = damp(ctx.ctaHover, interaction.ctaHover, 4, d);
    ctx.t = t;
    ctx.stage = stage;
    ctx.portrait = size.width < size.height * 0.9;
    ctx.intro = journey.intro;

    // The hero product responds to the pointer only while the hero is on
    // screen: its layers spread as the pointer moves over the right half.
    const heroW = 1 - smootherstep(0.25, 0.7, stage);
    const live = S.pointerSeen && heroW > 0.5;
    ctx.engage = damp(ctx.engage, live ? smoothstep(-0.2, 0.3, journey.pointer.x) : 0, 3, d);
    let hoverAny = 0;
    for (const id of HERO_MEMBERS) {
      ctx.hover[id] = damp(ctx.hover[id], live && id === S.hovered ? 1 : 0, 8, d);
      hoverAny = Math.max(hoverAny, ctx.hover[id]);
    }
    ctx.hoverAny = hoverAny;

    // Current section's layout → next section's, held for the first part of
    // the section and then reorganised.
    const last = SECTION_IDS.length - 1;
    const st = clamp(stage, 0, last);
    const i = Math.min(last - 1, Math.floor(st));
    const idA = SECTION_IDS[i];
    const idB = SECTION_IDS[i + 1];
    LAYOUTS[idA](S.a, ctx);
    LAYOUTS[idB](S.b, ctx);
    const hold = LAYOUT_HOLD[idA] ?? DEFAULT_HOLD;
    const k = clamp((st - i - hold) / (1 - hold));
    blend(S.out, S.a, S.b, k, 0.6);

    // The post chain reacts while the interface is reorganising.
    const rate = i === Math.floor(S.prevStage) ? Math.abs(k - S.prevK) / Math.max(d, 1e-4) : 0;
    S.prevK = k;
    S.prevStage = st;
    S.energy = damp(S.energy, clamp(rate * 0.3 + Math.abs(journey.velocity) * 0.0005), 5, d);
    interaction.energy = S.energy;

    // Environment: the whole interface dips out through the midpoint of a
    // light/dark swap, exactly as the DOM does.
    const theme = themeAt(stage);
    const swap = swapAt(theme);
    // The hero stages its own entrance from `intro`; nothing else is on
    // screen while it runs.
    const master = 1 - swap * 0.9;
    material.uniforms.uLight.value = theme;
    material.uniforms.uTime.value = t;

    if (S.introAt < 0 && journey.intro > 0.6) S.introAt = t;
    let sweep = -2;
    let sweepGain = 0;
    if (S.introAt >= 0) {
      const since = t - S.introAt;
      const cycle = since < 7 ? since : (since - 7) % 8;
      sweep = -0.35 + cycle * 0.8;
      sweepGain = (since < 7 ? 1 : 0.6) * heroW;
    }
    material.uniforms.uSweep.value = sweep;
    material.uniforms.uSweepGain.value = sweepGain;
    (material.uniforms.uViewport.value as Vector2).copy(state.gl.getDrawingBufferSize(S.viewport));

    // Depth sort, far to near, so the glass composites in order.
    const cam = state.camera;
    cam.getWorldDirection(S.fwd);
    const out = S.out;
    for (let n = 0; n < PANEL_COUNT; n++) {
      const b = n * STRIDE;
      S.depth[n] =
        (out[b] - cam.position.x) * S.fwd.x +
        (out[b + 1] - cam.position.y) * S.fwd.y +
        (out[b + 2] - cam.position.z) * S.fwd.z;
    }
    S.order.sort(S.farFirst);

    const rect = geometry.getAttribute("aRect") as InstancedBufferAttribute;
    const sz = geometry.getAttribute("aSize") as InstancedBufferAttribute;
    const stt = geometry.getAttribute("aState") as InstancedBufferAttribute;
    const R = rect.array as Float32Array;
    const Z = sz.array as Float32Array;
    const A = stt.array as Float32Array;

    S.vis.fill(0);
    let count = 0;
    for (const n of S.order) {
      const b = n * STRIDE;
      const o = out[b + 8] * master;
      if (o < 0.003 || S.depth[n] < 0.3) continue;
      S.vis[n] = o;

      // Idle float keeps a held layout breathing.
      S.p.set(out[b], out[b + 1] + Math.sin(t * 0.55 + n * 1.3) * 0.028, out[b + 2]);
      S.q.set(out[b + 3], out[b + 4], out[b + 5], out[b + 6]);
      const sc = out[b + 7];
      S.s.set(sc, sc, sc);
      S.m.compose(S.p, S.q, S.s);
      im.setMatrixAt(count, S.m);
      S.mats[n].copy(S.m);

      const spec = ROSTER[n];
      const r = atlas.rects.get(spec.kind)!;
      R[count * 4] = r.u;
      R[count * 4 + 1] = r.v;
      R[count * 4 + 2] = r.w;
      R[count * 4 + 3] = r.h;
      Z[count * 2] = spec.w;
      Z[count * 2 + 1] = spec.h;
      A[count * 4] = o;
      A[count * 4 + 1] = out[b + 9];
      A[count * 4 + 2] = out[b + 10];
      A[count * 4 + 3] = spec.r;
      count++;
    }

    im.count = count;
    im.instanceMatrix.needsUpdate = true;
    rect.needsUpdate = true;
    sz.needsUpdate = true;
    stt.needsUpdate = true;

    // Hover: cast the pointer against each hero layer's plane, nearest wins.
    S.hovered = -1;
    if (live) {
      S.ndc.set(journey.pointer.x, journey.pointer.y);
      S.ray.setFromCamera(S.ndc, cam);
      let bestT = Infinity;
      for (const id of HERO_MEMBERS) {
        if (S.vis[id] < 0.35) continue;
        S.inv.copy(S.mats[id]).invert();
        S.ro.copy(S.ray.ray.origin).applyMatrix4(S.inv);
        S.rd.copy(S.ray.ray.origin).add(S.ray.ray.direction).applyMatrix4(S.inv).sub(S.ro);
        if (Math.abs(S.rd.z) < 1e-6) continue;
        const hitT = -S.ro.z / S.rd.z;
        if (hitT <= 0 || hitT >= bestT) continue;
        const spec = ROSTER[id];
        const hx = S.ro.x + S.rd.x * hitT;
        const hy = S.ro.y + S.rd.y * hitT;
        if (Math.abs(hx) <= spec.w / 2 && Math.abs(hy) <= spec.h / 2) {
          S.hovered = id;
          bestT = hitT;
        }
      }
    }
    interaction.cursorHover = S.hovered >= 0 ? 1 : 0;

    // Label anchor: the hovered layer's top-left corner, in CSS pixels. The
    // last layer is kept while the label fades out.
    if (S.hovered >= 0) S.probe = S.hovered;
    const probe = interaction.heroProbe;
    probe.active = damp(probe.active, S.hovered >= 0 ? 1 : 0, 10, d);
    if (S.probe >= 0 && probe.active > 0.002) {
      const spec = ROSTER[S.probe];
      S.anchor.set(-spec.w / 2, spec.h / 2, 0).applyMatrix4(S.mats[S.probe]).project(cam);
      probe.kind = spec.kind;
      probe.x = (S.anchor.x * 0.5 + 0.5) * size.width;
      probe.y = (-S.anchor.y * 0.5 + 0.5) * size.height;
    }
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, PANEL_COUNT]}
      frustumCulled={false}
      renderOrder={1}
    />
  );
}
