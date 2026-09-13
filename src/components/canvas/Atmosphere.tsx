"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, AdditiveBlending, ShaderMaterial, Mesh, type Color } from "three";
import {
  atmosphereVertex,
  atmosphereFragment,
  glowVertex,
  glowFragment,
} from "@/shaders/atmosphere";
import { journey, stageOf } from "@/lib/journey";
import { C, C_LIGHT, mixColor } from "@/lib/palette";
import { themeAt } from "@/lib/theme";
import { clamp, damp, lerp } from "@/lib/math";

/** Dark-environment sky, held separately so the frame loop can lerp from it. */
const DARK_SKY = {
  low: C.void.clone(),
  mid: C.carbon.clone().multiplyScalar(1.5),
  high: C.ionDeep.clone().multiplyScalar(0.09),
  glow: C.ion.clone().multiplyScalar(0.06),
};

/**
 * The volume the whole journey happens inside. A graded dome with a slow
 * nebula, plus an additive card behind the centre that gives the dark acts
 * something to glow against. Its gradient is the page background, so it is
 * what actually turns the site light or dark.
 */
export function Atmosphere() {
  const domeMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        side: BackSide,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uTime: { value: 0 },
          uStage: { value: 0 },
          uLight: { value: 0 },
          uGlowStrength: { value: 0.5 },
          uVoid: { value: C.void.clone() },
          uHorizon: { value: C.carbon.clone().multiplyScalar(1.5) },
          uZenith: { value: C.ionDeep.clone().multiplyScalar(0.09) },
          uGlow: { value: C.ion.clone().multiplyScalar(0.06) },
        },
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: C.ion.clone() },
          uIntensity: { value: 0.1 },
          uFalloff: { value: 3.4 },
        },
      }),
    [],
  );

  useEffect(
    () => () => {
      domeMaterial.dispose();
      glowMaterial.dispose();
    },
    [domeMaterial, glowMaterial],
  );

  const glowRef = useRef<Mesh>(null);

  useFrame((state, dt) => {
    const d = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    const theme = themeAt(journey.stage);

    domeMaterial.uniforms.uTime.value = t;
    domeMaterial.uniforms.uStage.value = journey.stage;
    domeMaterial.uniforms.uLight.value = theme;
    glowMaterial.uniforms.uTime.value = t;

    // The dome is the page background. Everything else in the scene is graded
    // against whichever environment it resolves to.
    const u = domeMaterial.uniforms;
    mixColor(u.uVoid.value as Color, DARK_SKY.low, C_LIGHT.skyLow, theme);
    mixColor(u.uHorizon.value as Color, DARK_SKY.mid, C_LIGHT.skyMid, theme);
    mixColor(u.uZenith.value as Color, DARK_SKY.high, C_LIGHT.skyHigh, theme);
    mixColor(u.uGlow.value as Color, DARK_SKY.glow, C_LIGHT.skyGlow, theme);
    mixColor(glowMaterial.uniforms.uColor.value as Color, C.ion, C_LIGHT.ionSoft, theme);

    // The backdrop lifts at the two climaxes — the hero and the closing CTA.
    const heat =
      Math.max(
        1 - clamp(Math.abs(journey.stage - stageOf("hero")) / 1.4),
        1 - clamp(Math.abs(journey.stage - stageOf("cta")) / 1.2),
      ) * journey.intro;

    domeMaterial.uniforms.uGlowStrength.value = damp(
      domeMaterial.uniforms.uGlowStrength.value as number,
      lerp(0.42 + heat * 0.75, 0.035, theme),
      2,
      d,
    );

    glowMaterial.uniforms.uIntensity.value = damp(
      glowMaterial.uniforms.uIntensity.value as number,
      (0.04 + heat * 0.14) * journey.intro * (1 - theme),
      2.2,
      d,
    );

    // Keep the glow card facing the camera without a full Billboard component.
    if (glowRef.current) {
      glowRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <>
      <mesh material={domeMaterial} renderOrder={-100} frustumCulled={false}>
        <sphereGeometry args={[60, 32, 24]} />
      </mesh>

      <mesh
        ref={glowRef}
        material={glowMaterial}
        position={[0, 0, -3.2]}
        renderOrder={-50}
      >
        <planeGeometry args={[22, 22]} />
      </mesh>
    </>
  );
}
