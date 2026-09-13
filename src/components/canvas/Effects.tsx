"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import {
  BlendFunction,
  KernelSize,
  type BloomEffect,
  type ChromaticAberrationEffect,
} from "postprocessing";
import { GradeEffect } from "./GradeEffect";
import { useAppStore } from "@/store/useAppStore";
import { journey, stageOf } from "@/lib/journey";
import { interaction } from "@/lib/interaction";
import { themeAt } from "@/lib/theme";
import { clamp, damp, lerp } from "@/lib/math";

/**
 * Post chain. Tone mapping runs here rather than on the renderer so every
 * shader goes through exactly the same curve, and the grade reacts to the
 * scene: bloom lifts at the hero and the closing CTA, aberration spikes while
 * the interface reorganises, and the curve itself changes with the act (see
 * GradeEffect).
 *
 * No depth of field: the glass panels are translucent and do not write depth,
 * so a depth-based blur would read them as background and soften every screen.
 */
export function Effects() {
  const quality = useAppStore((s) => s.quality);

  const bloom = useRef<BloomEffect>(null);
  const vignette = useRef<{ darkness: number } | null>(null);
  const chroma = useRef<ChromaticAberrationEffect>(null);
  const grade = useMemo(() => new GradeEffect(), []);

  useFrame((_, dt) => {
    const d = Math.min(dt, 1 / 30);
    const stage = journey.stage;

    const climax = Math.max(
      1 - clamp(Math.abs(stage - stageOf("hero")) / 1.3),
      1 - clamp(Math.abs(stage - stageOf("cta")) / 1.1),
    );

    // Bloom, aberration and a heavy vignette are all dark-environment devices.
    // On paper they read as haze and dirt, so the grade opens right up — bloom
    // goes to nothing, since on a white card it only fogs the text.
    const theme = themeAt(stage);
    grade.linear = theme;

    if (bloom.current) {
      const dark = (0.34 + climax * 0.2 + interaction.energy * 0.35) * journey.intro;
      bloom.current.intensity = damp(bloom.current.intensity, lerp(dark, 0, theme), 3, d);
    }

    if (vignette.current) {
      vignette.current.darkness = damp(vignette.current.darkness, lerp(0.82, 0.16, theme), 3, d);
    }

    if (chroma.current) {
      // Radial modulation keeps the centre of frame clean and pushes the
      // fringing to the edges, which is where a real lens puts it.
      chroma.current.radialModulation = true;
      chroma.current.modulationOffset = 0.3;
      const o = (0.00035 + interaction.energy * 0.0038) * lerp(1, 0.15, theme);
      chroma.current.offset.set(o, o * 0.62);
    }
  });

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      {/* The costliest pass in the dark acts; the low tier drops it rather
          than drop frames. */}
      {quality.bloom ? (
        <Bloom
          ref={bloom}
          intensity={0.4}
          luminanceThreshold={0.32}
          luminanceSmoothing={0.35}
          kernelSize={KernelSize.MEDIUM}
          mipmapBlur
          levels={6}
          radius={0.72}
        />
      ) : (
        <></>
      )}

      {quality.chromaticAberration ? (
        <ChromaticAberration ref={chroma} offset={[0.0004, 0.00025]} />
      ) : (
        <></>
      )}

      <Vignette
        ref={vignette as never}
        offset={0.24}
        darkness={0.82}
        blendFunction={BlendFunction.NORMAL}
      />

      <primitive object={grade} />
    </EffectComposer>
  );
}
