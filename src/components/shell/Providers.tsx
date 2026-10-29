"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, scroller } from "@/lib/utils";
import { WORDMARK, WORDMARK_ROWS } from "@/lib/pixelFont";
import { SITE } from "@/content/site";
import { TransitionProvider } from "./Transition";

interface UiState {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

const UiContext = createContext<UiState | null>(null);

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside <Providers>");
  return ctx;
}

function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
    scroller.lenis = lenis;
    // QA hook: Lenis owns the scroll position, so window.scrollTo is overwritten.
    if (process.env.NODE_ENV !== "production") (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (document.documentElement.classList.contains("preload")) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);
}

/** A sign-off for the developers who open the console: the pixel wordmark and a hello. */
function useConsoleSignature() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const rows = Array.from({ length: WORDMARK_ROWS }, () => Array(WORDMARK.cols).fill(" "));
    WORDMARK.cells.forEach((c) => (rows[c.y][c.x] = "█"));
    console.log(
      `%c${rows.map((r) => r.join("")).join("\n")}\n%c${SITE.tagline}\n%cLike how this was built? We'd love to hear what you're making — ${SITE.email}`,
      "color:#4f7cff;font:10px/1 monospace",
      "color:#3cc8ff;font:600 11px/2 monospace;letter-spacing:2px",
      "color:#8691ae;font:12px/1.6 system-ui,sans-serif",
    );
  }, []);
}

export function Providers({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useSmoothScroll();
  useConsoleSignature();

  const ui = useMemo(
    () => ({ menuOpen, setMenuOpen, paletteOpen, setPaletteOpen }),
    [menuOpen, paletteOpen],
  );

  return (
    <UiContext.Provider value={ui}>
      <TransitionProvider>{children}</TransitionProvider>
    </UiContext.Provider>
  );
}
