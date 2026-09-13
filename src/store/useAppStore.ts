"use client";

import { create } from "zustand";
import type { QualityProfile, QualityTier } from "@/lib/quality";
import { profileFor } from "@/lib/quality";

/**
 * Low-frequency UI state only. Anything that changes per frame lives in
 * `lib/journey.ts` instead, so this store never causes render churn.
 */
interface AppState {
  /** Assets loaded + intro animation finished. */
  ready: boolean;
  /** Preloader curtain has lifted. */
  entered: boolean;
  webgl: boolean;
  reducedMotion: boolean;
  tier: QualityTier;
  quality: QualityProfile;
  /** Index of the highlighted service card, -1 for none. */
  activeService: number;
  /** Index of the project currently framed in the work scene. */
  activeProject: number;
  /** Hovered technology node, -1 for none. */
  activeTech: number;
  /** Current step in the process timeline. */
  activeStep: number;
  /** Hovered studio pillar, -1 for none. */
  activePillar: number;
  menuOpen: boolean;

  setReady: (v: boolean) => void;
  setEntered: (v: boolean) => void;
  setEnvironment: (env: {
    webgl: boolean;
    reducedMotion: boolean;
    tier: QualityTier;
  }) => void;
  setActiveService: (i: number) => void;
  setActiveProject: (i: number) => void;
  setActiveTech: (i: number) => void;
  setActiveStep: (i: number) => void;
  setActivePillar: (i: number) => void;
  setMenuOpen: (v: boolean) => void;
  downgrade: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  ready: false,
  entered: false,
  webgl: true,
  reducedMotion: false,
  tier: "high",
  quality: profileFor("high"),
  activeService: 0,
  activeProject: 0,
  activeTech: -1,
  activeStep: 0,
  activePillar: -1,
  menuOpen: false,

  setReady: (ready) => set({ ready }),
  setEntered: (entered) => set({ entered }),
  setEnvironment: ({ webgl, reducedMotion, tier }) =>
    set({ webgl, reducedMotion, tier, quality: profileFor(tier) }),
  setActiveService: (i) =>
    get().activeService === i ? undefined : set({ activeService: i }),
  setActiveProject: (i) =>
    get().activeProject === i ? undefined : set({ activeProject: i }),
  setActiveTech: (i) => (get().activeTech === i ? undefined : set({ activeTech: i })),
  setActiveStep: (i) => (get().activeStep === i ? undefined : set({ activeStep: i })),
  setActivePillar: (i) =>
    get().activePillar === i ? undefined : set({ activePillar: i }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),

  /** Called by the perf monitor when the frame budget is consistently blown. */
  downgrade: () => {
    const tier = get().tier;
    if (tier === "high") set({ tier: "mid", quality: profileFor("mid") });
    else if (tier === "mid") set({ tier: "low", quality: profileFor("low") });
  },
}));
