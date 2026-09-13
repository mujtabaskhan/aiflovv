/**
 * Cheap one-shot WebGL probe. Runs before the Canvas mounts so a device that
 * cannot render the scene gets the static fallback instead of a black hole.
 */

let cached: boolean | null = null;

export function supportsWebGL(): boolean {
  if (cached !== null) return cached;
  if (typeof window === "undefined") return false;

  // QA override for the no-WebGL path: ?webgl=off
  if (new URLSearchParams(window.location.search).get("webgl") === "off") {
    cached = false;
    return cached;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      cached = false;
      return cached;
    }

    // Vertex texture/attribute budget matters: the morph field binds 8 attributes.
    const maxAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) as number;
    cached = maxAttribs >= 8;

    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cached = false;
  }

  return cached;
}
