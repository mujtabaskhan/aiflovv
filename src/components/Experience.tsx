"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { useIsomorphicLayoutEffect } from "@/lib/gsap";
import { supportsWebGL } from "@/lib/webgl";
import { detectTier, prefersReducedMotion } from "@/lib/quality";
import { journey } from "@/lib/journey";
import { useAppStore } from "@/store/useAppStore";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeDriver } from "@/components/providers/ThemeDriver";
import { Preloader } from "@/components/ui/Preloader";
import { Nav } from "@/components/ui/Nav";
import { Cursor } from "@/components/ui/Cursor";
import { Grain, ScrollHUD, StaticBackdrop } from "@/components/ui/Overlays";

import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Technology } from "@/components/sections/Technology";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Insights } from "@/components/sections/Insights";
import { Clients } from "@/components/sections/Clients";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

// The WebGL bundle is the heaviest thing on the page and is useless on the
// server, so it loads on the client only, after capability detection.
const SceneCanvas = dynamic(() => import("@/components/canvas/SceneCanvas"), {
  ssr: false,
});

export function Experience() {
  const [booted, setBooted] = useState(false);
  const webgl = useAppStore((s) => s.webgl);
  const setEnvironment = useAppStore((s) => s.setEnvironment);
  const setReady = useAppStore((s) => s.setReady);

  // Detect once, before the canvas mounts, so the renderer is created with the
  // right pixel ratio and never has to be torn down and rebuilt.
  useIsomorphicLayoutEffect(() => {
    const supported = supportsWebGL();
    setEnvironment({
      webgl: supported,
      reducedMotion: prefersReducedMotion(),
      tier: detectTier(),
    });
    setBooted(true);

    if (!supported) {
      journey.intro = 1;
      setReady(true);
    }
  }, [setEnvironment, setReady]);

  return (
    <>
      <ThemeDriver />
      <Preloader />
      <Cursor />

      {booted && (webgl ? <SceneCanvas /> : <StaticBackdrop />)}

      <Grain />
      <ScrollHUD />
      <Nav />

      <SmoothScroll>
        <main className="relative z-10">
          <Hero />
          <Clients />
          <Manifesto />
          <Services />
          <Technology />
          <Work />
          <Process />
          <About />
          <Insights />
          <CTA />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
