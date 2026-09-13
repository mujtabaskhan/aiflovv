"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3, PerspectiveCamera } from "three";
import { journey, STAGE_COUNT } from "@/lib/journey";
import { poseAt, type CameraPose } from "@/lib/cameraPath";
import { damp, mapRange } from "@/lib/math";

/**
 * Drives the camera for the entire page. Nothing here touches React state —
 * it reads the journey model and writes straight to the camera each frame.
 */
export function Rig() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);

  const pose = useRef<CameraPose>({
    px: 0,
    py: 0,
    pz: 7.4,
    lx: 0,
    ly: 0,
    lz: 0,
    fov: 42,
    roll: 0,
  });

  const target = useMemo(() => new Vector3(), []);
  const lookAt = useMemo(() => new Vector3(), []);
  const smoothLook = useRef(new Vector3(0, 0, 0));
  const fovRef = useRef(42);

  useFrame((state, dt) => {
    const d = Math.min(dt, 1 / 30);

    // Smooth the pointer here so every consumer reads the same damped value.
    journey.smoothPointer.x = damp(journey.smoothPointer.x, journey.pointer.x, 3.2, d);
    journey.smoothPointer.y = damp(journey.smoothPointer.y, journey.pointer.y, 3.2, d);

    const p = poseAt(journey.stage, pose.current);

    // Portrait and small viewports need the camera further back to keep the
    // same composition — the scene is authored for a wide frame.
    const fit = mapRange(size.width / Math.max(1, size.height), 0.5, 1.8, 1.42, 1.0);

    target.set(p.px, p.py, p.pz * fit);

    // Pointer parallax, damped and scaled down on touch devices.
    target.x += journey.smoothPointer.x * 0.62;
    target.y += journey.smoothPointer.y * 0.4;

    // Idle drift so the frame is never completely static.
    const t = state.clock.elapsedTime;
    target.x += Math.sin(t * 0.17) * 0.06;
    target.y += Math.cos(t * 0.21) * 0.05;

    // Entrance: the camera pulls in from further out as the intro resolves.
    target.z += (1 - journey.intro) * 5.2;

    camera.position.lerp(target, 1 - Math.exp(-5.5 * d));

    lookAt.set(p.lx + journey.smoothPointer.x * 0.16, p.ly, p.lz);
    smoothLook.current.lerp(lookAt, 1 - Math.exp(-5 * d));
    camera.lookAt(smoothLook.current);
    camera.rotation.z += p.roll + Math.sin(t * 0.11) * 0.004;

    const targetFov = p.fov * mapRange(size.width / Math.max(1, size.height), 0.5, 1.8, 1.12, 1.0);
    const nextFov = damp(fovRef.current, targetFov, 4, d);
    if (Math.abs(nextFov - fovRef.current) > 0.0005) {
      fovRef.current = nextFov;
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  }, -1);

  return null;
}

export { STAGE_COUNT };
