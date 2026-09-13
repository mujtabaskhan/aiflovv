import { lerp, smootherstep, clamp } from "@/lib/math";
import { STAGE_COUNT } from "@/lib/journey";

/**
 * Camera choreography, one keyframe per journey stage.
 *
 * Per-axis keyframes rather than a spline: a spline through these points
 * overshoots badly on the big z swings (the work section flies inside the
 * corridor, the next pulls right back out), and monotonic interpolation is
 * far easier to art-direct.
 */

//              hero clients manifesto services tech  work  process about insights cta
const POS_X = [0.0, 0.0, 1.15, 0.0, -0.45, 0.0, 0.15, -0.7, 0.5, 0.0];
const POS_Y = [0.0, 0.3, 0.55, 0.8, 0.1, 0.05, 1.05, 0.25, 0.5, 0.0];
const POS_Z = [7.4, 9.5, 8.7, 8.4, 7.1, 4.1, 10.4, 8.5, 9.4, 6.35];

// Framing is set by the look target, not the camera position: with lookAt
// pinned to the subject, moving the camera only changes the angle. Pushing the
// target left slides the subject to the right of frame, which is how the
// manifesto and studio beats clear space for left-aligned copy. The work and
// CTA targets sit deep in -z: both look down a corridor of screens.
const LOOK_X = [0.0, 0.0, -1.95, 0.0, 0.0, 0.0, 0.0, -1.15, 0.0, 0.0];
const LOOK_Y = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6, 0.0, 0.0, -0.2];
const LOOK_Z = [0.0, 0.0, 0.0, 0.0, 0.0, -7.0, 0.0, 0.0, 0.0, -6.0];

const FOV = [42, 42, 44, 46, 42, 58, 45, 42, 43, 40];
const ROLL = [0, 0, 0.012, -0.01, 0.008, 0, -0.012, 0.01, -0.006, 0];

/** How much of a section holds its pose before easing to the next. */
const CAMERA_HOLD = 0.14;

function sampleHeld(table: readonly number[], stage: number, hold: number) {
  const last = table.length - 1;
  const s = clamp(stage, 0, last);
  const i = Math.min(last - 1, Math.floor(s));
  if (s >= last) return table[last];
  const local = s - i;
  return lerp(table[i], table[i + 1], smootherstep(hold, 1, local));
}

export interface CameraPose {
  px: number;
  py: number;
  pz: number;
  lx: number;
  ly: number;
  lz: number;
  fov: number;
  roll: number;
}

export function poseAt(stage: number, out: CameraPose): CameraPose {
  out.px = sampleHeld(POS_X, stage, CAMERA_HOLD);
  out.py = sampleHeld(POS_Y, stage, CAMERA_HOLD);
  out.pz = sampleHeld(POS_Z, stage, CAMERA_HOLD);
  out.lx = sampleHeld(LOOK_X, stage, CAMERA_HOLD);
  out.ly = sampleHeld(LOOK_Y, stage, CAMERA_HOLD);
  out.lz = sampleHeld(LOOK_Z, stage, CAMERA_HOLD);
  out.fov = sampleHeld(FOV, stage, CAMERA_HOLD);
  out.roll = sampleHeld(ROLL, stage, CAMERA_HOLD);
  return out;
}

export { STAGE_COUNT };
