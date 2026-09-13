"use client";

import { Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useAppStore } from "@/store/useAppStore";
import { Scene } from "./Scene";

/**
 * Canvas host. It sits behind the document as a fixed layer and never takes
 * pointer events — every interaction is driven from the DOM, which keeps the
 * scroll surface unbroken and means the 3D layer costs nothing on touch.
 */
export default function SceneCanvas() {
  const dpr = useAppStore((s) => s.quality.dpr);
  const antialias = useAppStore((s) => s.quality.antialias);

  // Readiness is signalled by the scene once its shaders are compiled.
  const onCreated = useCallback((state: { gl: unknown; scene: unknown; camera: unknown }) => {
    if (process.env.NODE_ENV === "development") {
      (window as unknown as Record<string, unknown>).__three = state;
    }
  }, []);

  return (
    // Sized to the large viewport, not the visible one: a mobile browser's
    // toolbar resizes the visible viewport as it slides, and every resize
    // reallocates the drawing buffer and the whole post-processing chain.
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh"
      aria-hidden="true"
      data-canvas-root
    >
      <Canvas
        dpr={dpr}
        flat
        gl={{
          antialias,
          alpha: false,
          stencil: false,
          depth: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        camera={{ fov: 42, near: 0.1, far: 160, position: [0, 0, 13] }}
        onCreated={onCreated}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
