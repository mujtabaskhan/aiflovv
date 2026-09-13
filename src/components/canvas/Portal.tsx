"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector2 } from "three";
import { portalVertex, portalFragment } from "@/shaders/portal";
import { PROJECTS } from "@/data/projects";
import { journey, stageOf } from "@/lib/journey";
import { interaction } from "@/lib/interaction";
import { useAppStore } from "@/store/useAppStore";
import { C } from "@/lib/palette";
import { clamp, damp, mapRange, smootherstep } from "@/lib/math";

const WIDTH = 6.2;
const HEIGHT = 3.5;

/**
 * The work-section portal: one plane whose material generates a distinct
 * visual per case study and warps between them on change.
 */
export function Portal() {
  const mesh = useRef<Mesh>(null);
  const size = useThree((s) => s.size);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: portalVertex,
        fragmentShader: portalFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          // Seeded from the first project, not hard-coded to 0: the change
          // handler below only fires on a *change*, so project 0 would
          // otherwise render whatever variant this was initialised to.
          uVariant: { value: PROJECTS[0].variant },
          uPrevVariant: { value: PROJECTS[0].variant },
          uTransition: { value: 0 },
          uHover: { value: 0 },
          uOpacity: { value: 0 },
          uAspect: { value: WIDTH / HEIGHT },
          uPointer: { value: new Vector2() },
          uInk: { value: C.carbon.clone() },
          uIon: { value: C.ion.clone() },
          uIonSoft: { value: C.ionSoft.clone() },
          uEmber: { value: C.ember.clone() },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  const shown = useRef(0);
  const lastProject = useRef(0);

  useFrame((state, dt) => {
    const d = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    const stage = journey.stage;
    const u = material.uniforms;

    u.uTime.value = t;

    const w = stageOf("work");
    const target =
      smootherstep(w - 0.55, w + 0.02, stage) * (1 - smootherstep(w + 0.72, w + 1.15, stage));
    shown.current = damp(shown.current, target, 4.5, d);
    u.uOpacity.value = shown.current;

    const m = mesh.current;
    if (m) {
      // Drawn (invisibly, and tiny) while the preloader is up. On Windows the
      // graphics layer finishes a shader on its first real draw, not when it
      // is compiled, so without this the first sight of the portal hitches.
      if (!useAppStore.getState().entered) {
        m.visible = true;
        m.scale.setScalar(0.02);
        return;
      }
      m.visible = shown.current > 0.005;
      if (!m.visible) return;
      // Slight lean toward the pointer keeps the plane from feeling like a slide.
      m.rotation.y = damp(m.rotation.y, journey.smoothPointer.x * 0.1, 3, d);
      m.rotation.x = damp(m.rotation.x, -journey.smoothPointer.y * 0.07, 3, d);

      // A 16:9 plane is wider than a portrait frame. Scale it to a screen the
      // viewport can actually contain, and lift it clear of the copy below.
      const aspect = size.width / Math.max(1, size.height);
      const fit = clamp(mapRange(aspect, 0.5, 1.35, 0.6, 1), 0.55, 1);
      m.scale.setScalar(fit);
      m.position.y = damp(m.position.y, (1 - fit) * 3.4, 3, d);
    }

    const active = useAppStore.getState().activeProject;
    if (active !== lastProject.current) {
      u.uPrevVariant.value = PROJECTS[lastProject.current].variant;
      u.uVariant.value = PROJECTS[active].variant;
      u.uTransition.value = 1;
      lastProject.current = active;
    }
    u.uTransition.value = damp(u.uTransition.value as number, 0, 3.4, d);

    u.uHover.value = damp(u.uHover.value as number, interaction.portalHover, 6, d);
    (u.uPointer.value as Vector2).set(
      damp((u.uPointer.value as Vector2).x, interaction.portalPointer.x, 5, d),
      damp((u.uPointer.value as Vector2).y, interaction.portalPointer.y, 5, d),
    );
  });

  return (
    <mesh ref={mesh} material={material} position={[0, 0, -3.1]} renderOrder={2}>
      <planeGeometry args={[WIDTH, HEIGHT, 48, 28]} />
    </mesh>
  );
}
