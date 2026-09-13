"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import { journey } from "@/lib/journey";
import { color } from "@/lib/palette";
import { themeAt } from "@/lib/theme";
import { damp, smootherstep } from "@/lib/math";

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;

uniform vec3 uCore;
uniform vec3 uEdge;
uniform float uStrength;
uniform float uTime;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  p.y *= 1.35;
  float r = length(p);
  float a = pow(clamp(1.0 - r, 0.0, 1.0), 1.5);
  a *= 0.92 + 0.08 * sin(uTime * 0.45);
  vec3 col = mix(uEdge, uCore, smoothstep(0.15, 0.95, 1.0 - r));
  // Dither: a gradient this soft bands visibly in 8 bits.
  a = a * uStrength + (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  if (a <= 0.001) discard;
  gl_FragColor = vec4(col, a);
}
`;

/**
 * The hero's one saturated moment: a soft brand-blue light behind the product.
 * On paper everything else is white and ink, so a single field of colour gives
 * the eye somewhere to land. It lives in the scene, behind the screens, rather
 * than as a CSS gradient that would tint the glass in front of it.
 */
export function HeroGlow() {
  const size = useThree((s) => s.size);
  const mesh = useRef<Mesh>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        uniforms: {
          uCore: { value: color("#7d9cf2") },
          uEdge: { value: color("#2854db") },
          uStrength: { value: 0 },
          uTime: { value: 0 },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    const d = Math.min(dt, 1 / 30);
    const stage = journey.stage;
    const u = material.uniforms;

    // Hero only, light environment only, arriving with the product.
    const target = (1 - smootherstep(0.05, 0.4, stage)) * themeAt(stage) * journey.intro * 0.34;
    u.uStrength.value = damp(u.uStrength.value as number, target, 4, d);
    u.uTime.value = state.clock.elapsedTime;

    m.visible = (u.uStrength.value as number) > 0.002;
    if (!m.visible) return;

    const portrait = size.width < size.height * 0.9;
    m.position.set(
      (portrait ? 0.15 : 2.95) + journey.smoothPointer.x * 0.35,
      (portrait ? -2.55 : -0.1) + journey.smoothPointer.y * 0.2,
      -4.2,
    );
    m.scale.setScalar(portrait ? 0.7 : 1);
    m.quaternion.copy(state.camera.quaternion);
  });

  return (
    <mesh ref={mesh} material={material} renderOrder={0} frustumCulled={false}>
      <planeGeometry args={[22, 16]} />
    </mesh>
  );
}
