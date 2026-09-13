/**
 * Device capability tiering.
 *
 * Everything expensive in the scene (pixel ratio, post-processing passes,
 * texture filtering) reads from a single resolved profile so we never have
 * per-component "is this mobile?" checks scattered around.
 */

export type QualityTier = "low" | "mid" | "high";

export interface QualityProfile {
  tier: QualityTier;
  /** [min, max] device pixel ratio handed to the renderer. */
  dpr: [number, number];
  /** Max anisotropic filtering for the interface atlas — keeps screens
   *  legible when they are seen at a steep angle down a corridor. */
  anisotropy: number;
  bloom: boolean;
  chromaticAberration: boolean;
  antialias: boolean;
}

const PROFILES: Record<QualityTier, QualityProfile> = {
  high: {
    tier: "high",
    dpr: [1, 1.6],
    anisotropy: 8,
    bloom: true,
    chromaticAberration: true,
    antialias: false, // post-processing chain handles edges
  },
  mid: {
    tier: "mid",
    dpr: [1, 1.3],
    anisotropy: 4,
    bloom: true,
    chromaticAberration: true,
    antialias: false,
  },
  low: {
    tier: "low",
    dpr: [1, 1.1],
    anisotropy: 2,
    bloom: false,
    chromaticAberration: false,
    antialias: false,
  },
};

function rendererString(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const info = ext
      ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    const lose = gl.getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return info.toLowerCase();
  } catch {
    return "";
  }
}

export function detectTier(): QualityTier {
  if (typeof window === "undefined") return "high";

  // Manual override for QA: ?q=low | ?q=mid | ?q=high
  const forced = new URLSearchParams(window.location.search).get("q");
  if (forced === "low" || forced === "mid" || forced === "high") return forced;

  const renderer = rendererString();
  if (/swiftshader|llvmpipe|software|basic render/.test(renderer)) return "low";

  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 900;

  if (coarse || narrow) return memory <= 4 || cores <= 4 ? "low" : "mid";
  if (cores <= 4 || memory <= 4) return "mid";
  return "high";
}

export function profileFor(tier: QualityTier): QualityProfile {
  return PROFILES[tier];
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
