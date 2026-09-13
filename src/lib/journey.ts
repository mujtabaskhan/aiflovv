/**
 * The journey model.
 *
 * The page is one continuous camera move, not a stack of independent blocks.
 * Every section registers its DOM element here; from the raw scroll offset we
 * derive a single continuous `stage` float (2.4 == 40% of the way through
 * section index 2). The 3D layer keys everything — camera, layouts,
 * lighting, post FX — off that one number.
 *
 * This deliberately lives outside React: it is written every frame and must
 * never trigger a re-render.
 */

export const SECTION_IDS = [
  "hero",
  "clients",
  "manifesto",
  "services",
  "technology",
  "work",
  "process",
  "about",
  "insights",
  "cta",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const STAGE_COUNT = SECTION_IDS.length;

/**
 * Stage index of a section, by name. Use this rather than a literal number:
 * inserting a section shifts every index after it, and hardcoded stage numbers
 * silently point one section early.
 */
export const stageOf = (id: SectionId) => SECTION_IDS.indexOf(id);

export interface JourneyState {
  /** Continuous position through the journey, 0 .. STAGE_COUNT - 1. */
  stage: number;
  /** Whole-document scroll progress, 0 .. 1. */
  progress: number;
  /** Scroll velocity in px/frame, smoothed. */
  velocity: number;
  /** Per-section progress, 0 .. 1. */
  sections: Record<SectionId, number>;
  /** Index of the section currently occupying the viewport centre. */
  activeIndex: number;
  /** Normalised pointer, -1 .. 1 on both axes (raw + smoothed). */
  pointer: { x: number; y: number };
  smoothPointer: { x: number; y: number };
  /** Viewport metrics, refreshed on resize. */
  viewport: { width: number; height: number; aspect: number };
  /** 0 while the preloader is up, 1 once the intro has played. */
  intro: number;
}

const emptySections = () =>
  SECTION_IDS.reduce(
    (acc, id) => {
      acc[id] = 0;
      return acc;
    },
    {} as Record<SectionId, number>,
  );

export const journey: JourneyState = {
  stage: 0,
  progress: 0,
  velocity: 0,
  sections: emptySections(),
  activeIndex: 0,
  pointer: { x: 0, y: 0 },
  smoothPointer: { x: 0, y: 0 },
  viewport: { width: 1920, height: 1080, aspect: 1.777 },
  intro: 0,
};

interface Measured {
  id: SectionId;
  top: number;
  height: number;
}

const elements = new Map<SectionId, HTMLElement>();
let measured: Measured[] = [];

export function registerSection(id: SectionId, el: HTMLElement | null) {
  if (el) elements.set(id, el);
  else elements.delete(id);
  measure();
}

export function measure() {
  if (typeof window === "undefined") return;

  journey.viewport.width = window.innerWidth;
  journey.viewport.height = window.innerHeight;
  journey.viewport.aspect = window.innerWidth / Math.max(1, window.innerHeight);

  const next: Measured[] = [];
  for (const id of SECTION_IDS) {
    const el = elements.get(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    next.push({
      id,
      top: rect.top + window.scrollY,
      height: Math.max(1, rect.height),
    });
  }
  next.sort((a, b) => a.top - b.top);
  measured = next;
}

/**
 * Resolve `stage` from a scroll offset.
 *
 * A section's stage window runs from "its top reaches the viewport top" to
 * "the next section's top reaches the viewport top", which keeps the mapping
 * continuous even when sections have wildly different heights.
 */
export function update(scrollY: number, velocity: number) {
  const vh = journey.viewport.height;
  const docHeight = Math.max(
    1,
    document.documentElement.scrollHeight - vh,
  );

  journey.progress = Math.min(1, Math.max(0, scrollY / docHeight));
  journey.velocity = velocity;

  if (measured.length === 0) return;

  // Per-section progress: 0 as the section enters, 1 as it leaves.
  for (const m of measured) {
    const span = m.height;
    const local = (scrollY - m.top + vh * 0.5) / span;
    journey.sections[m.id] = Math.min(1, Math.max(0, local));
  }

  // Continuous stage using the ordered section list.
  const anchor = scrollY + vh * 0.001;
  let index = 0;
  for (let i = 0; i < measured.length; i++) {
    if (anchor >= measured[i].top) index = i;
  }

  const current = measured[index];
  const nextTop =
    index + 1 < measured.length
      ? measured[index + 1].top
      : current.top + current.height;
  const span = Math.max(1, nextTop - current.top);
  const local = Math.min(1, Math.max(0, (anchor - current.top) / span));

  // Map back through SECTION_IDS so a missing section never shifts the timeline.
  const stageIndex = SECTION_IDS.indexOf(current.id);
  journey.stage = stageIndex + local;
  journey.activeIndex = local > 0.55 ? Math.min(STAGE_COUNT - 1, stageIndex + 1) : stageIndex;
}

export function setPointer(x: number, y: number) {
  journey.pointer.x = x;
  journey.pointer.y = y;
}

/** Distance-from-stage weight, used to fade section-local 3D props in and out. */
export function stageWeight(target: number, falloff = 1) {
  const d = Math.abs(journey.stage - target) / falloff;
  return d >= 1 ? 0 : 1 - d * d * (3 - 2 * d);
}
