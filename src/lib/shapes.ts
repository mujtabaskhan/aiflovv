/**
 * Target shapes for the hero's pixel field. Each shape is drawn once into an
 * offscreen canvas and sampled on a square grid, so particles lock into crisp
 * rows and columns like an LED display rather than a fuzzy cloud.
 *
 * The first shape is the AiFlovv wordmark; the rest follow the service list.
 */

import { WORDMARK } from "./pixelFont";

export interface ShapeDef {
  /** "brand" or a service slug. */
  id: string;
  /** Output scale — wide shapes may spill past the unit box. */
  scale?: number;
  /** Extrusion depth in layers. */
  layers?: number;
  /** Seconds the finished shape holds before the next one starts. */
  hold: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const S = 512;

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

const SERVICE_HOLD = 1.45;

export const SHAPES: ShapeDef[] = [
  {
    id: "brand",
    scale: 1.04,
    layers: 5,
    hold: 2.6,
    draw(ctx) {
      // The AiFlovv wordmark, in the same pixel letters as the footer sign.
      const u = Math.floor(S / WORDMARK.cols);
      const ox = Math.round((S - WORDMARK.cols * u) / 2);
      const oy = Math.round((S - 7 * u) / 2);
      for (const c of WORDMARK.cells) ctx.fillRect(ox + c.x * u, oy + c.y * u, u, u);
    },
  },
  {
    id: "web-development",
    hold: SERVICE_HOLD,
    draw(ctx) {
      ctx.lineWidth = 13;
      rr(ctx, 30, 80, 452, 352, 20);
      ctx.stroke();
      ctx.fillRect(30, 128, 452, 12);
      for (const x of [66, 96, 126]) {
        ctx.beginPath();
        ctx.arc(x, 104, 9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 6;
      rr(ctx, 168, 94, 250, 22, 11);
      ctx.stroke();
      ctx.fillRect(70, 172, 214, 24);
      ctx.fillRect(70, 208, 150, 24);
      ctx.fillRect(70, 252, 96, 30);
      ctx.fillRect(316, 168, 126, 116);
      ctx.lineWidth = 8;
      for (const x of [70, 196, 322]) ctx.strokeRect(x, 316, 112, 82);
    },
  },
  {
    id: "mobile-applications",
    hold: SERVICE_HOLD,
    draw(ctx) {
      ctx.lineWidth = 13;
      rr(ctx, 150, 34, 186, 444, 34);
      ctx.stroke();
      ctx.fillRect(212, 56, 62, 12);
      ctx.fillRect(176, 94, 120, 16);
      ctx.fillRect(176, 126, 134, 92);
      ctx.lineWidth = 6;
      for (const y of [236, 276, 316, 356]) ctx.strokeRect(176, y, 134, 28);
      for (const x of [180, 214, 248, 282]) ctx.fillRect(x, 410, 22, 22);
      // A notification popping out of the screen.
      rr(ctx, 290, 150, 196, 58, 12);
      ctx.fill();
    },
  },
  {
    id: "ai-solutions",
    hold: SERVICE_HOLD,
    draw(ctx) {
      const layers = [
        { x: 92, n: 4 },
        { x: 256, n: 5 },
        { x: 420, n: 3 },
      ];
      const nodes = layers.map((l) => Array.from({ length: l.n }, (_, i) => ({ x: l.x, y: 256 + (i - (l.n - 1) / 2) * 92 })));
      ctx.lineWidth = 6;
      for (let a = 0; a < nodes.length - 1; a++) {
        for (const p of nodes[a])
          for (const q of nodes[a + 1]) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
      }
      for (const layer of nodes)
        for (const p of layer) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 25, 0, Math.PI * 2);
          ctx.fill();
        }
    },
  },
  {
    id: "software-development",
    hold: SERVICE_HOLD,
    draw(ctx) {
      ctx.lineWidth = 36;
      ctx.lineCap = "square";
      ctx.lineJoin = "miter";
      ctx.beginPath();
      ctx.moveTo(156, 146);
      ctx.lineTo(64, 256);
      ctx.lineTo(156, 366);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(356, 146);
      ctx.lineTo(448, 256);
      ctx.lineTo(356, 366);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(292, 112);
      ctx.lineTo(220, 400);
      ctx.stroke();
    },
  },
  {
    id: "saas-development",
    hold: SERVICE_HOLD,
    draw(ctx) {
      // A dashboard: sidebar, KPI tiles and a rising chart.
      ctx.lineWidth = 12;
      rr(ctx, 30, 70, 452, 372, 18);
      ctx.stroke();
      ctx.fillRect(30, 70, 70, 372);
      ctx.fillRect(126, 100, 96, 52);
      ctx.fillRect(238, 100, 96, 52);
      ctx.fillRect(350, 100, 96, 52);
      const bars = [50, 80, 64, 110, 96, 140, 124, 176];
      bars.forEach((h, i) => ctx.fillRect(130 + i * 40, 410 - h, 26, h));
    },
  },
  {
    id: "ecommerce-development",
    hold: SERVICE_HOLD,
    draw(ctx) {
      // A shopping bag with a price tag.
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(256, 168, 64, Math.PI, 0);
      ctx.stroke();
      rr(ctx, 120, 168, 272, 270, 16);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      rr(ctx, 150, 200, 212, 206, 8);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(176, 236, 160, 22);
      ctx.fillRect(176, 278, 110, 22);
      // tag
      ctx.beginPath();
      ctx.moveTo(330, 300);
      ctx.lineTo(470, 300);
      ctx.lineTo(470, 380);
      ctx.lineTo(330, 380);
      ctx.lineTo(300, 340);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    id: "ui-ux-design",
    hold: SERVICE_HOLD,
    draw(ctx) {
      ctx.lineWidth = 13;
      ctx.beginPath();
      ctx.arc(190, 214, 112, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeRect(232, 222, 196, 196);
      for (const [x, y] of [
        [232, 222],
        [428, 222],
        [232, 418],
        [428, 418],
      ]) {
        ctx.fillRect(x - 15, y - 15, 30, 30);
      }
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(48, 470);
      ctx.bezierCurveTo(140, 360, 250, 520, 486, 300);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(380, 70);
      ctx.lineTo(380, 160);
      ctx.lineTo(404, 136);
      ctx.lineTo(424, 172);
      ctx.lineTo(440, 164);
      ctx.lineTo(420, 128);
      ctx.lineTo(452, 126);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    id: "cloud-devops",
    hold: SERVICE_HOLD,
    draw(ctx) {
      // A cloud over a rack of servers.
      ctx.beginPath();
      ctx.arc(190, 170, 70, Math.PI * 0.95, Math.PI * 1.95);
      ctx.arc(290, 140, 92, Math.PI * 1.1, Math.PI * 1.98);
      ctx.arc(380, 196, 64, Math.PI * 1.5, Math.PI * 0.5);
      ctx.lineTo(150, 260);
      ctx.arc(150, 214, 46, Math.PI * 0.5, Math.PI * 1.5);
      ctx.closePath();
      ctx.lineWidth = 14;
      ctx.stroke();
      ctx.lineWidth = 10;
      for (const y of [306, 360, 414]) {
        rr(ctx, 120, y, 272, 40, 6);
        ctx.stroke();
        ctx.fillRect(140, y + 14, 14, 12);
        ctx.fillRect(166, y + 14, 14, 12);
        ctx.fillRect(318, y + 16, 54, 8);
      }
      ctx.fillRect(250, 262, 12, 44);
    },
  },
];

/**
 * Sample a shape into exactly `count` targets, as xyz in roughly [-1, 1] plus
 * a role in w:
 *   w > 0   part of the structure (w is its brightness — deeper layers dimmer)
 *   w = 0   flowing in from the stream (xyz is where it is absorbed)
 *   w < 0   parked, invisible — shapes with few pixels don't need everyone
 */
export function sampleShape(shape: ShapeDef, count: number, gridN: number, seed: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  shape.draw(ctx);
  const data = ctx.getImageData(0, 0, S, S).data;

  const step = S / gridN;
  const cells: [number, number][] = [];
  for (let gy = 0; gy < gridN; gy++) {
    for (let gx = 0; gx < gridN; gx++) {
      const px = Math.floor((gx + 0.5) * step);
      const py = Math.floor((gy + 0.5) * step);
      if (data[(py * S + px) * 4 + 3] > 120) cells.push([gx, gy]);
    }
  }

  let s = seed >>> 0;
  const rand = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const scale = shape.scale ?? 1;
  const layers = shape.layers ?? 3;
  const toUnit = (g: number) => ((g + 0.5) / gridN - 0.5) * 2 * scale;
  const out = new Float32Array(count * 4);
  const structure = Math.min(cells.length * layers, Math.floor(count * 0.74));
  const stream = Math.min(count - structure, Math.floor(count * 0.26));

  // Assign roles in a shuffled order so they are spread evenly through the
  // population, whatever the shape.
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  for (let k = 0; k < count; k++) {
    const i = order[k];
    if (k < structure) {
      const cell = cells[k % cells.length];
      const layer = Math.floor(k / cells.length);
      out[i * 4] = toUnit(cell[0]);
      out[i * 4 + 1] = -toUnit(cell[1]);
      out[i * 4 + 2] = -layer * 0.065;
      out[i * 4 + 3] = 1 - (layer / layers) * 0.78;
    } else {
      const cell = cells[Math.floor(rand() * cells.length)];
      out[i * 4] = toUnit(cell[0]);
      out[i * 4 + 1] = -toUnit(cell[1]);
      out[i * 4 + 2] = k < structure + stream ? 0 : -rand() * 0.3;
      out[i * 4 + 3] = k < structure + stream ? 0 : -1;
    }
  }
  return out;
}
