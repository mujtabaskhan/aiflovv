import { Euler, Quaternion, Vector3 } from "three";
import { clamp, lerp, makeRng, smoothstep, smootherstep } from "@/lib/math";
import { TECHNOLOGIES } from "@/data/technologies";
import { TECH_LAYERS, kindPixels, type PanelKind } from "@/lib/interfaceAtlas";
import { stageOf, type SectionId } from "@/lib/journey";

/**
 * The exploded interface.
 *
 * One fixed roster of UI screens — a website, a dashboard, phones, a code
 * editor, a design board, the ten technologies as chips — that every section
 * rearranges. Each section is a layout function; the scene blends between the
 * current section's layout and the next one's as the page scrolls, so the same
 * screens assemble into a product, split into four services, stack into an
 * architecture, line a corridor and fold into a tunnel.
 */

export const P = {
  browser: 0,
  dashboard: 1,
  terminal: 2,
  code: 3,
  design: 4,
  image: 5,
  card: 6,
  chart: 7,
  table: 8,
  form: 9,
  phone: 10,
  phone2: 11,
  toast: 12,
  palette: 13,
  type: 14,
  buttons: 15,
  chip0: 16,
  layer0: 26,
  input: 30,
} as const;

export interface PanelSpec {
  kind: PanelKind;
  /** World size before the pose scale. */
  w: number;
  h: number;
  /** Corner radius, world units. */
  r: number;
}

const spec = (kind: PanelKind, w: number, r = 0.055): PanelSpec => {
  const [pw, ph] = kindPixels(kind);
  return { kind, w, h: (w * ph) / pw, r };
};

export const ROSTER: PanelSpec[] = [
  spec("browser", 2.4, 0.07),
  spec("dashboard", 2.4, 0.07),
  spec("terminal", 1.6, 0.06),
  spec("code", 1.4, 0.06),
  spec("design", 1.6, 0.06),
  spec("image", 1.2),
  spec("card", 0.96),
  spec("chart", 0.96),
  spec("table", 1.04),
  spec("form", 0.72),
  spec("phone", 0.6, 0.085),
  spec("phone2", 0.6, 0.085),
  spec("toast", 0.96, 0.07),
  spec("palette", 0.96),
  spec("type", 0.72),
  spec("buttons", 0.96),
  ...TECHNOLOGIES.map((_, i) => spec(`chip${i}`, 0.96, 0.06)),
  ...TECH_LAYERS.map((_, i) => spec(`layer${i}`, 2.6, 0.07)),
  spec("input", 2.2, 0.08),
];

export const PANEL_COUNT = ROSTER.length;

/* ------------------------------------------------------------------------ */
/* Pose buffers                                                              */
/* ------------------------------------------------------------------------ */

/** px py pz · qx qy qz qw · scale · opacity · fill · glow */
export const STRIDE = 11;
const O = 8;
const F = 9;
const GL = 10;

export type PoseBuf = Float32Array;
export const makeBuf = (): PoseBuf => new Float32Array(PANEL_COUNT * STRIDE);

export interface LayoutCtx {
  t: number;
  /** The journey stage. */
  stage: number;
  portrait: boolean;
  /** Damped 0..1 focus weight per service cluster, in SERVICES order. */
  service: Float32Array;
  /** Damped 0..1 focus weight per technology chip. */
  tech: Float32Array;
  /** Damped 0..1 focus weight per studio pillar. */
  pillar: Float32Array;
  /** Damped, continuous process step, 0..5. */
  step: number;
  /** 0..1 through the pinned work section. */
  work: number;
  /** 0..1 pointer over the CTA. */
  ctaHover: number;
  /** 0..1 as the preloader hands off; the hero assembles on it. */
  intro: number;
  /** Smoothed pointer, -1..1 on both axes. */
  pointer: { x: number; y: number };
  /** Damped 0..1 — the pointer is working the hero product. */
  engage: number;
  /** Damped 0..1 hover weight per panel, and the largest of them. */
  hover: Float32Array;
  hoverAny: number;
}

const _e = new Euler(0, 0, 0, "YXZ");
const _q = new Quaternion();
const _v = new Vector3();

/** A local frame: yaw, then pitch, then roll — how you would aim a camera. */
class Frame {
  pos = new Vector3();
  quat = new Quaternion();
  scale = 1;

  set(x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, s = 1) {
    this.pos.set(x, y, z);
    this.quat.setFromEuler(_e.set(rx, ry, rz, "YXZ"));
    this.scale = s;
    return this;
  }
}

const WORLD = new Frame();
const G = new Frame();

function hideAll(out: PoseBuf) {
  for (let i = 0; i < PANEL_COUNT; i++) {
    const b = i * STRIDE;
    out[b + 3] = 0;
    out[b + 4] = 0;
    out[b + 5] = 0;
    out[b + 6] = 1;
    out[b + 7] = 1;
    out[b + O] = 0;
  }
}

function put(
  out: PoseBuf,
  i: number,
  g: Frame,
  lx: number,
  ly: number,
  lz: number,
  rx: number,
  ry: number,
  rz: number,
  s: number,
  o: number,
  fill = 1,
  glow = 0,
) {
  _v.set(lx, ly, lz).multiplyScalar(g.scale).applyQuaternion(g.quat).add(g.pos);
  _q.setFromEuler(_e.set(rx, ry, rz, "YXZ")).premultiply(g.quat);
  const b = i * STRIDE;
  out[b] = _v.x;
  out[b + 1] = _v.y;
  out[b + 2] = _v.z;
  out[b + 3] = _q.x;
  out[b + 4] = _q.y;
  out[b + 5] = _q.z;
  out[b + 6] = _q.w;
  out[b + 7] = s * g.scale;
  out[b + O] = o;
  out[b + F] = fill;
  out[b + GL] = glow;
}

/* ------------------------------------------------------------------------ */
/* Blending                                                                  */
/* ------------------------------------------------------------------------ */

const rng = makeRng(0x1f00d);
/** Per-panel start offset, so a reorganisation cascades instead of snapping. */
export const STAGGER = Float32Array.from({ length: PANEL_COUNT }, () => rng() * 0.32);
const STAGGER_MAX = 0.32;

const _qa = new Quaternion();
const _qb = new Quaternion();

/**
 * Blend two layouts into `out`. A panel hidden on one side takes the other
 * side's pose, set back a little and scaled down — so it materialises where it
 * is needed rather than flying in from wherever it was parked.
 */
export function blend(out: PoseBuf, a: PoseBuf, b: PoseBuf, k: number, pop = 0) {
  for (let i = 0; i < PANEL_COUNT; i++) {
    const base = i * STRIDE;
    const oa = a[base + O];
    const ob = b[base + O];

    const ki = smootherstep(0, 1, clamp((k - STAGGER[i]) / (1 - STAGGER_MAX)));

    if (oa < 0.004 && ob < 0.004) {
      for (let c = 0; c < STRIDE; c++) out[base + c] = b[base + c];
      out[base + O] = 0;
      continue;
    }

    const src = oa < 0.004 ? b : a;
    const dst = ob < 0.004 ? a : b;
    const ghostA = oa < 0.004;
    const ghostB = ob < 0.004;

    const ax = src[base];
    const ay = src[base + 1];
    const az = src[base + 2] - (ghostA ? 1.1 : 0);
    const bx = dst[base];
    const by = dst[base + 1];
    const bz = dst[base + 2] - (ghostB ? 1.1 : 0);

    // Panels lift toward the viewer mid-move: the layout visibly comes apart
    // and resettles, which is what makes it read as an exploded view.
    const lift = ghostA || ghostB ? 0 : Math.sin(ki * Math.PI) * pop;

    out[base] = lerp(ax, bx, ki);
    out[base + 1] = lerp(ay, by, ki);
    out[base + 2] = lerp(az, bz, ki) + lift;

    _qa.set(src[base + 3], src[base + 4], src[base + 5], src[base + 6]);
    _qb.set(dst[base + 3], dst[base + 4], dst[base + 5], dst[base + 6]);
    _qa.slerp(_qb, ki);
    out[base + 3] = _qa.x;
    out[base + 4] = _qa.y;
    out[base + 5] = _qa.z;
    out[base + 6] = _qa.w;

    const sa = src[base + 7] * (ghostA ? 0.84 : 1);
    const sb = dst[base + 7] * (ghostB ? 0.84 : 1);
    out[base + 7] = lerp(sa, sb, ki);
    out[base + O] = lerp(oa, ob, ki);
    out[base + F] = lerp(src[base + F], dst[base + F], ki);
    out[base + GL] = lerp(src[base + GL], dst[base + GL], ki);
  }
}

/* ------------------------------------------------------------------------ */
/* Layouts                                                                   */
/* ------------------------------------------------------------------------ */

type Layout = (out: PoseBuf, ctx: LayoutCtx) => void;

/**
 * The product, exploded: one website pulled apart into its layers.
 * [panel, x, y, depth (in layer separations), yaw, scale, opacity], back to
 * front — which is also the order the layers arrive in on load, so the page
 * builds up the way a product is layered.
 */
const EXPLODED: [number, number, number, number, number, number, number][] = [
  [P.dashboard, -0.75, 0.5, -2.2, 0, 1.15, 0.5],
  [P.code, 1.3, 0.62, -1.15, 0, 0.95, 0.8],
  [P.browser, 0, 0, 0, 0, 1.55, 1],
  [P.image, 0.62, 0.2, 0.95, 0, 1.08, 1],
  [P.card, -1.0, -0.56, 1.4, 0, 1.0, 1],
  [P.form, 1.9, 0.28, 1.75, 0, 0.85, 1],
  [P.chart, 1.05, -0.72, 2.05, 0, 0.9, 1],
  [P.toast, -0.72, 0.74, 2.45, 0, 1.0, 1],
  [P.buttons, -1.58, 0.06, 2.85, 0, 0.8, 1],
  [P.phone, -2.45, -0.22, 1.25, 0.1, 1.1, 1],
];

/** The hero's hoverable layers. */
export const HERO_MEMBERS = EXPLODED.map(([id]) => id);

/** Where each layer flies in from, relative to its resting place. */
const arrivalRng = makeRng(0xa55e);
const ARRIVAL = EXPLODED.map(() => [
  (arrivalRng() - 0.5) * 9,
  (arrivalRng() - 0.5) * 6,
  2.5 + arrivalRng() * 3.5,
  (arrivalRng() - 0.5) * 1.6,
  (arrivalRng() - 0.5) * 1.6,
  (arrivalRng() - 0.5) * 1.0,
]);

/** Ease-out with a small overshoot, so each layer snaps into place. */
const snap = (t: number) => {
  const u = t - 1;
  return 1 + 2.25 * u * u * u + 1.25 * u * u;
};

/**
 * The hero: the product at full strength in the right half of the frame,
 * beside the headline. It assembles layer by layer as the preloader hands off,
 * tilts toward the pointer, spreads its layers while the pointer works it,
 * and lifts whichever layer is hovered.
 */
const hero: Layout = (out, ctx) => {
  hideAll(out);
  const portrait = ctx.portrait;
  // The client ring starts forming as soon as the hero scrolls, so the
  // product clears out over the first part of that scroll rather than the
  // whole of it.
  const leave = 1 - smoothstep(0.06, 0.4, ctx.stage - stageOf("hero"));
  const sep = 0.46 * (1 + 0.12 * Math.sin(ctx.t * 0.5)) * (1 + 0.5 * ctx.engage);
  G.set(
    portrait ? 0.15 : 2.85,
    portrait ? -2.5 : -0.12,
    portrait ? -2.2 : -1.8,
    -0.3 - ctx.pointer.y * 0.12,
    -0.58 + ctx.pointer.x * 0.15,
    0.05,
    portrait ? 0.68 : 1.04,
  );

  EXPLODED.forEach(([id, lx, ly, depth, ry, s, o], k) => {
    const arrive = clamp((ctx.intro - k * 0.05) / 0.5);
    const e = arrive >= 1 ? 1 : snap(arrive);
    const away = 1 - e;
    const [ax, ay, az, arx, ary, arz] = ARRIVAL[k];
    const h = ctx.hover[id];
    const focus = lerp(1, 0.7, ctx.hoverAny * (1 - h));
    put(
      out,
      id,
      G,
      lx + ax * away,
      ly + ay * away,
      depth * sep + h * 0.55 + az * away,
      arx * away,
      ry + ary * away,
      arz * away,
      s * (1 + 0.06 * h),
      o * smoothstep(0, 0.35, arrive) * focus * leave,
      1,
      h,
    );
  });
};

/** The client cards carry this section; the interface clears out behind them. */
const clients: Layout = (out) => hideAll(out);

/** Copy sits on both sides here, so the product returns as a backdrop, its
 *  layers pulled further apart. */
const manifesto: Layout = (out, ctx) => {
  hideAll(out);
  const sep = 0.95 * (1 + 0.14 * Math.sin(ctx.t * 0.5));
  G.set(1.0, -0.1, -2.6, -0.22, -0.95, 0.03, ctx.portrait ? 0.7 : 1.2);
  for (const [id, lx, ly, depth, ry, s, o] of EXPLODED) {
    put(out, id, G, lx, ly, depth * sep, 0, ry, 0, s, o * 0.45);
  }
};

/**
 * One product group per service (SERVICES order: web, software, mobile,
 * design), shown in the open quarter of the frame under the intro copy — the
 * heading and the list own the rest of it. Groups cross-fade in place as the
 * active service changes, rising in as they arrive and sinking as they leave.
 */
const services: Layout = (out, ctx) => {
  hideAll(out);
  const portrait = ctx.portrait;
  for (let c = 0; c < 4; c++) {
    const w = ctx.service[c];
    if (w < 0.005) continue;
    const settle = 1 - w;
    G.set(
      portrait ? 0 : -3.2,
      (portrait ? -2.6 : -2.15) - settle * 0.45,
      (portrait ? -3.2 : -0.6) - settle * 1.1,
      0.04,
      portrait ? 0 : 0.3,
      0,
      portrait ? 0.7 : 1.12,
    );
    // Below lg the list runs under the heading, so there is no open quarter:
    // the group drops to a backdrop behind it.
    const o = w * (portrait ? 0.3 : 1);
    const g = w * 0.6;
    const bob = Math.sin(ctx.t * 0.5 + c * 1.7) * 0.05;

    if (c === 0) {
      put(out, P.browser, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
      put(out, P.image, G, 0.98, -0.56 + bob, 0.45, 0, 0, 0, 0.7, o, 1, g * 0.5);
      put(out, P.form, G, -1.22, -0.34 + bob, 0.6, 0, 0, 0, 0.72, o, 1, g * 0.5);
      put(out, P.card, G, -0.72, 0.74 + bob, 0.36, 0, 0, 0, 0.68, o, 1, g * 0.5);
    } else if (c === 1) {
      put(out, P.dashboard, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
      put(out, P.terminal, G, -1.16, -0.56 + bob, 0.5, 0, 0, 0, 0.72, o, 1, g * 0.5);
      put(out, P.table, G, 1.16, -0.5 + bob, 0.44, 0, 0, 0, 0.74, o, 1, g * 0.5);
      put(out, P.code, G, 0.92, 0.72 + bob, 0.34, 0, 0, 0, 0.64, o, 1, g * 0.5);
      put(out, P.chart, G, -1.02, 0.74 + bob, 0.4, 0, 0, 0, 0.62, o, 1, g * 0.5);
    } else if (c === 2) {
      put(out, P.phone, G, -0.44, bob, 0.16, 0, 0.2, 0, 1.0, o, 1, g);
      put(out, P.phone2, G, 0.44, -bob, -0.1, 0, -0.2, 0, 1.0, o, 1, g);
      put(out, P.toast, G, 0.06, 0.92, 0.52, 0, 0, 0, 0.86, o, 1, g * 0.6);
    } else {
      put(out, P.design, G, 0, bob, 0, 0, 0, 0, 0.95, o, 1, g);
      put(out, P.palette, G, -1.06, -0.6 + bob, 0.46, 0, 0, 0, 0.74, o, 1, g * 0.5);
      put(out, P.type, G, 1.02, 0.62 + bob, 0.4, 0, 0, 0, 0.72, o, 1, g * 0.5);
      put(out, P.buttons, G, 0.96, -0.62 + bob, 0.5, 0, 0, 0, 0.72, o, 1, g * 0.5);
    }
  }
};

const TECH_INDEX = new Map(TECHNOLOGIES.map((t, i) => [t.id, i]));
const FLOORS = [1.3, 0.43, -0.43, -1.3];

/** The stack as architecture: four floors, the technologies standing on them. */
const technology: Layout = (out, ctx) => {
  hideAll(out);
  // Pitch the frame so the floors are seen from above; chips undo the pitch so
  // they stand upright and face the viewer.
  const pitch = -1.02;
  // Centred on the gutter between the focus panel and the list.
  G.set(-0.45, -0.25, -1.4, pitch, 0.52, 0, ctx.portrait ? 0.72 : 0.9);
  let anyFocus = 0;
  for (let i = 0; i < ctx.tech.length; i++) anyFocus = Math.max(anyFocus, ctx.tech[i]);

  FLOORS.forEach((fz, l) => {
    const z = fz + Math.sin(ctx.t * 0.4 + l) * 0.03;
    put(out, P.layer0 + l, G, 0, 0, z, 0, 0, 0, 1, 0.92, 1, 0.1);
    const ids = TECH_LAYERS[l].techs;
    const step = 0.98;
    ids.forEach((id, j) => {
      const ti = TECH_INDEX.get(id)!;
      const w = ctx.tech[ti];
      const x = (j - (ids.length - 1) / 2) * step;
      put(
        out,
        P.chip0 + ti,
        G,
        x,
        -0.28,
        z + 0.2 + w * 0.26,
        -pitch,
        0,
        0,
        0.92 + w * 0.16,
        lerp(1, 0.55, anyFocus * (1 - w)),
        1,
        w,
      );
    });
  });
};

/** Screens lining a corridor around the portal, drifting past as you scroll. */
const WALL_L = [P.browser, P.code, P.phone, P.chart, P.design, P.form, P.toast];
const WALL_R = [P.dashboard, P.image, P.terminal, P.phone2, P.table, P.card, P.buttons];

const work: Layout = (out, ctx) => {
  hideAll(out);
  const flow = ctx.work * 4.2;
  const x = ctx.portrait ? 2.6 : 4.9;
  // The project list and the meta column sit over the near ends of both
  // walls, so screens fade out as they approach and the corridor only reads
  // in depth, behind the portal's frame.
  const wall = (ids: number[], side: 1 | -1) =>
    ids.forEach((id, i) => {
      const z = -2.2 - i * 2.05 - (side > 0 ? 1.0 : 0) + flow;
      const y = (i % 2 ? 0.8 : -0.5) * (side > 0 ? -1 : 1) + Math.sin(ctx.t * 0.4 + i) * 0.05;
      const o = 0.42 * smootherstep(-2.6, -6.2, z) * smootherstep(-17, -13.5, z);
      put(out, id, WORLD, -side * x, y, z, 0, side * 1.22, 0, 1.05, o, 1, 0.1);
    });
  wall(WALL_L, 1);
  wall(WALL_R, -1);
};

/* Process: six sub-layouts, one per step, blended by the damped step value. */
const PROCESS_FRAMES: PoseBuf[] = Array.from({ length: 6 }, makeBuf);
const NOTES = [P.card, P.chart, P.table, P.form, P.toast, P.palette, P.type, P.buttons, P.image];
const noteRng = makeRng(77);
const NOTE_SCATTER = NOTES.map(() => [
  (noteRng() - 0.5) * 7.2,
  -0.2 + noteRng() * 2.7,
  (noteRng() - 0.5) * 2.4,
  (noteRng() - 0.5) * 0.5,
  (noteRng() - 0.5) * 0.6,
  (noteRng() - 0.5) * 0.4,
]);

function processStep(out: PoseBuf, step: number, ctx: LayoutCtx) {
  hideAll(out);
  // The heading owns the top left and the step copy the bottom, so the build
  // happens in the open upper right of the frame.
  G.set(ctx.portrait ? 0 : 1.75, ctx.portrait ? 1.3 : 1.65, 0, 0, 0, 0, ctx.portrait ? 0.55 : 1.0);
  const cy = 0;
  if (step === 0) {
    NOTES.forEach((id, i) => {
      const [x, y, z, rx, ry, rz] = NOTE_SCATTER[i];
      put(out, id, G, x, y - 1.05, z, rx, ry, rz, 0.9, 0.85, 0, 0);
    });
    return;
  }
  if (step === 1) {
    NOTES.forEach((id, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      put(out, id, G, (col - 1) * 2.25, 1.1 - row * 1.1, 0, 0, 0, 0, 0.84, 0.9, 0.14, 0);
    });
    return;
  }
  if (step === 2) {
    put(out, P.browser, G, 0, cy, -0.6, 0, 0, 0, 1.25, 0.9, 0.35, 0);
    put(out, P.design, G, -3.15, 0.15, 0.2, 0, 0.22, 0, 1.0, 1, 1, 0.35);
    put(out, P.palette, G, -3.2, -1.1, 0.5, 0, 0.22, 0, 0.8, 1, 1, 0);
    put(out, P.type, G, -2.2, 1.3, 0.6, 0, 0.18, 0, 0.75, 1, 1, 0);
    put(out, P.image, G, 0.55, 0.25, 0.25, 0, 0, 0, 0.9, 1, 0.6, 0);
    put(out, P.card, G, -0.9, -0.45, 0.35, 0, 0, 0, 0.8, 1, 0.6, 0);
    put(out, P.buttons, G, -0.7, 0.7, 0.3, 0, 0, 0, 0.75, 1, 0.6, 0);
    put(out, P.chart, G, 1.35, -0.5, 0.4, 0, 0, 0, 0.75, 1, 0.6, 0);
    return;
  }
  if (step === 3) {
    put(out, P.browser, G, -0.4, cy, -0.5, 0, 0, 0, 1.3, 1, 1, 0.15);
    put(out, P.image, G, 0.15, 0.2, -0.3, 0, 0, 0, 0.85, 1, 1, 0);
    put(out, P.card, G, -1.2, -0.5, -0.25, 0, 0, 0, 0.75, 1, 1, 0);
    put(out, P.chart, G, 0.9, -0.5, -0.25, 0, 0, 0, 0.72, 1, 1, 0);
    put(out, P.buttons, G, -1.15, 0.65, -0.3, 0, 0, 0, 0.7, 1, 1, 0);
    put(out, P.code, G, 2.9, 0.45, 0.3, 0, -0.25, 0, 0.95, 1, 1, 0.3);
    put(out, P.terminal, G, 3.0, -0.95, 0.5, 0, -0.25, 0, 0.8, 1, 1, 0.2);
    put(out, P.design, G, -3.3, 0.35, -0.8, 0, 0.3, 0, 0.8, 0.6, 1, 0);
    return;
  }
  if (step === 4) {
    put(out, P.browser, G, 0, cy, -0.4, 0, 0, 0, 1.3, 1, 1, 0.25);
    put(out, P.phone, G, 2.55, -0.15, 0.4, 0, -0.2, 0, 1.0, 1, 1, 0.2);
    put(out, P.phone2, G, -2.55, -0.15, 0.4, 0, 0.2, 0, 1.0, 1, 1, 0.2);
    put(out, P.table, G, 1.5, 1.35, 0.8, 0, -0.1, 0, 0.8, 1, 1, 0.4);
    put(out, P.terminal, G, 3.9, -1.2, -1.0, 0, -0.35, 0, 0.7, 0.5, 1, 0);
    return;
  }
  put(out, P.dashboard, G, 0.2, 0.3, -2.2, 0, 0, 0, 1.25, 0.7, 1, 0.2);
  put(out, P.browser, G, 0, cy, -0.4, 0, 0, 0, 1.35, 1, 1, 0.6);
  put(out, P.phone, G, 2.55, -0.15, 0.4, 0, -0.2, 0, 1.0, 1, 1, 0.4);
  put(out, P.phone2, G, -2.55, -0.15, 0.4, 0, 0.2, 0, 1.0, 1, 1, 0.4);
  put(out, P.chart, G, 2.2, -1.1, 1.0, 0, -0.1, 0, 0.8, 1, 1, 0.5);
  put(out, P.toast, G, -1.9, 1.35, 1.0, 0, 0.1, 0, 0.9, 1, 1, 0.8);
}

const processLayout: Layout = (out, ctx) => {
  const s = clamp(ctx.step, 0, 5);
  const i = Math.min(4, Math.floor(s));
  processStep(PROCESS_FRAMES[i], i, ctx);
  processStep(PROCESS_FRAMES[i + 1], i + 1, ctx);
  blend(out, PROCESS_FRAMES[i], PROCESS_FRAMES[i + 1], s - i, 0.35);
};

/** The finished product, turning slowly beside the studio copy. */
const PILLAR_PANELS: number[] = [P.chart, P.design, P.code, P.card];

const about: Layout = (out, ctx) => {
  hideAll(out);
  G.set(1.1, 0.25, -2.4, 0.06, -0.5 + Math.sin(ctx.t * 0.12) * 0.1, 0.02, ctx.portrait ? 0.62 : 1.1);
  // The statement and the pillar row cover the whole frame here, so the
  // product stays a quiet backdrop; a focused pillar still brings its screen
  // forward.
  const o = 0.3;
  const pw = (id: number) => {
    const k = PILLAR_PANELS.indexOf(id);
    return k < 0 ? 0 : ctx.pillar[k];
  };
  const place = (id: number, x: number, y: number, z: number, s: number, oo = o) => {
    const w = pw(id);
    put(out, id, G, x, y, z + w * 0.7, 0, 0, 0, s * (1 + 0.1 * w), lerp(oo, 0.75, w), 1, w);
  };
  place(P.dashboard, 0.9, 0.55, -1.0, 1.0, o * 0.65);
  place(P.design, -1.15, 0.95, -0.5, 0.75);
  place(P.browser, 0, 0, 0, 1.15);
  place(P.chart, 1.5, 1.05, 0.5, 0.7);
  place(P.code, 1.75, -0.6, 0.45, 0.8);
  place(P.phone, -1.6, -0.3, 0.7, 1.0);
  place(P.card, -0.2, -1.05, 0.8, 0.75);
  place(P.toast, 0.5, 1.4, 0.9, 0.8);
};

/** A faint wall of cards far behind the insights grid. */
const WALL = [
  P.card, P.chart, P.image, P.table,
  P.form, P.palette, P.type, P.buttons,
  P.toast, P.terminal, P.code, P.design,
];

const insights: Layout = (out, ctx) => {
  hideAll(out);
  G.set(1.4, 0.4, -7.5, -0.06, -0.38, 0, 1);
  WALL.forEach((id, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const spec = ROSTER[id];
    const fit = Math.min(1.7 / spec.w, 1.25 / spec.h);
    const y = (1 - row) * 1.55 + Math.sin(ctx.t * 0.3 + i) * 0.04;
    put(out, id, G, (col - 1.5) * 2.05, y, 0, 0, 0, 0, fit, 0.42);
  });
};

/** Everything folds into a tunnel converging on one waiting input. */
const TUNNEL = [
  P.browser, P.dashboard, P.code, P.terminal, P.design,
  P.image, P.card, P.chart, P.table, P.form,
  P.phone, P.phone2, P.toast, P.palette, P.type,
  P.buttons, P.chip0, P.chip0 + 3, P.chip0 + 5, P.chip0 + 7,
];

const cta: Layout = (out, ctx) => {
  hideAll(out);
  // Wide enough that the walls frame the copy rather than crowding it.
  const X = ctx.portrait ? 2.1 : 4.4;
  const Y = ctx.portrait ? 3.0 : 2.75;
  const span = 13;
  TUNNEL.forEach((id, i) => {
    const wall = i % 4;
    const phase = (i / TUNNEL.length + ctx.t * 0.035) % 1;
    const z = -1.2 - phase * span;
    const o = 0.7 * smootherstep(0, 0.12, phase) * smootherstep(1, 0.8, phase);
    const along = ((i * 0.37) % 1) - 0.5;
    const s = 0.95;
    if (wall === 0) put(out, id, WORLD, -X, along * Y * 1.2, z, 0, Math.PI / 2, 0, s, o, 1, 0.25);
    else if (wall === 1) put(out, id, WORLD, X, along * Y * 1.2, z, 0, -Math.PI / 2, 0, s, o, 1, 0.25);
    else if (wall === 2) put(out, id, WORLD, along * X * 1.4, Y, z, Math.PI / 2, 0, 0, s, o, 1, 0.25);
    else put(out, id, WORLD, along * X * 1.4, -Y, z, -Math.PI / 2, 0, 0, s, o, 1, 0.25);
  });
  put(out, P.input, WORLD, 0, -0.35, -9.5, 0, 0, 0, 1.35, 0.95, 1, 0.7 + ctx.ctaHover * 0.3);
};

export const LAYOUTS: Record<SectionId, Layout> = {
  clients,
  hero,
  manifesto,
  services,
  technology,
  work,
  process: processLayout,
  about,
  insights,
  cta,
};

/** How much of each section holds its layout before blending to the next. */
export const LAYOUT_HOLD: Partial<Record<SectionId, number>> = {
  // The arc sweeps until the pin releases (~62% of the section); the next
  // layout only starts to form once the cards are leaving.
  clients: 0.66,
};
export const DEFAULT_HOLD = 0.4;
