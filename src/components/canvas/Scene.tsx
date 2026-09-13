"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";
import { Rig } from "./Rig";
import { Atmosphere } from "./Atmosphere";
import { Interface } from "./Interface";
import { HeroGlow } from "./HeroGlow";
import { Portal } from "./Portal";
import { Effects } from "./Effects";

/**
 * The scene graph. Everything section-specific fades itself in and out
 * against the journey stage rather than mounting and unmounting, so nothing
 * is ever created mid-scroll.
 */
export function Scene() {
  const downgrade = useAppStore((s) => s.downgrade);
  const entered = useAppStore((s) => s.entered);
  const enteredAt = useRef(0);

  useEffect(() => {
    if (entered) enteredAt.current = performance.now();
  }, [entered]);

  return (
    <>
      <PerformanceMonitor
        // Drop a tier whenever the frame rate settles well under the display's
        // — but not during the preloader and intro, when shader compilation
        // and the entrance make the numbers meaningless.
        bounds={(refresh) => (refresh > 90 ? [60, 90] : [42, 58])}
        onDecline={() => {
          if (!enteredAt.current || performance.now() - enteredAt.current < 4000) return;
          downgrade();
        }}
      />

      {/* The dome covers the frame; this is only what shows if it ever does not. */}
      <color attach="background" args={["#04050a"]} />

      <Rig />
      <Atmosphere />
      <HeroGlow />
      <Interface />
      <Portal />
      <Effects />
      <Warmup />
    </>
  );
}

/**
 * Compiles every material in the scene — including the ones that stay hidden
 * until their section — behind the preloader, then lets it lift. Left to the
 * first frame each is seen, the work portal alone stalled the page for over
 * two seconds on Windows, where shaders go through a slow translation layer.
 * Web fonts are awaited too, so the interface atlas is painted in its final
 * faces before anyone sees it.
 */
function Warmup() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const setReady = useAppStore((s) => s.setReady);

  useEffect(() => {
    let alive = true;
    const fonts = document.fonts?.ready ?? Promise.resolve();

    // `compile` starts every program (in parallel where the driver supports
    // it); readiness is then polled here rather than through `compileAsync`,
    // whose poll throws if a material is disposed mid-wait — which React's
    // development double-mount does.
    const materials = gl.compile(scene, camera);
    const compiled = new Promise<void>((resolve) => {
      const check = () => {
        if (!alive) return resolve();
        for (const m of materials) {
          const props = gl.properties.get(m) as { currentProgram?: { isReady?: () => boolean } };
          if (props.currentProgram?.isReady && !props.currentProgram.isReady()) {
            setTimeout(check, 16);
            return;
          }
        }
        resolve();
      };
      check();
    });

    // Never hold the preloader indefinitely on a driver that misreports.
    const cap = new Promise((resolve) => setTimeout(resolve, 8000));
    Promise.race([Promise.all([compiled, fonts]), cap])
      .catch(() => undefined)
      .then(() => {
        if (!alive) return;
        // One frame of headroom so the first render is never the intro frame.
        requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
      });
    return () => {
      alive = false;
    };
  }, [gl, scene, camera, setReady]);

  return null;
}
