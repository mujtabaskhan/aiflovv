"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, GLYPHS } from "@/lib/gsap";
import { markReady, markRevealed, resetReady } from "@/lib/ready";
import { prefersReducedMotion, scroller, scrollToTop } from "@/lib/utils";

type Phase = "idle" | "covering" | "covered" | "revealing";

interface TransitionApi {
  /** Navigate to an internal href behind the pixel cover. */
  navigate: (href: string) => void;
  /** Show the cover instantly (the preloader hands over to it). */
  coverNow: () => void;
  /** Clear the cover and mark the page ready. */
  reveal: () => void;
}

const TransitionContext = createContext<TransitionApi | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used inside <TransitionProvider>");
  return ctx;
}

const BLUE = [79, 124, 255];
const CYAN = [60, 200, 255];
const NIGHT = "#060914";
// Cells overlap a touch when closed so no sub-pixel seams show through.

function cellColor(col: number, cols: number, row: number) {
  const t = cols > 1 ? col / (cols - 1) : 0;
  // A few cells stay white-hot so the wavefront reads as pixels, not a gradient.
  if ((col * 7 + row * 13) % 11 === 0) return "#eaf2ff";
  const c = BLUE.map((b, i) => Math.round(b + (CYAN[i] - b) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

function labelFor(pathname: string) {
  if (pathname === "/") return "~/home";
  return `~${pathname}`;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const coverRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const phase = useRef<Phase>("idle");
  const fallback = useRef<number | undefined>(undefined);
  /** Where the current transition is heading — a click mid-transition retargets it. */
  const dest = useRef("");
  const revealTl = useRef<gsap.core.Timeline | null>(null);
  const [grid, setGrid] = useState({ cols: 14, rows: 9 });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const cols = w < 640 ? 6 : w < 1100 ? 10 : 14;
      const rows = Math.ceil(window.innerHeight / (w / cols));
      setGrid((g) => (g.cols === cols && g.rows === rows ? g : { cols, rows }));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const cells = useCallback(() => Array.from(coverRef.current?.children ?? []) as HTMLElement[], []);

  const colors = useMemo(() => {
    const out: string[] = [];
    for (let r = 0; r < grid.rows; r++) for (let c = 0; c < grid.cols; c++) out.push(cellColor(c, grid.cols, r));
    return out;
  }, [grid]);

  const stagger = useMemo(
    () => ({ grid: [grid.rows, grid.cols] as [number, number], from: "start" as const, amount: 0.42 }),
    [grid],
  );

  const reveal = useCallback(() => {
    const cover = coverRef.current;
    if (!cover) return;
    window.clearTimeout(fallback.current);
    phase.current = "revealing";
    scroller.lenis?.start();
    ScrollTrigger.refresh();

    const list = cells();
    gsap.killTweensOf(list);
    const tl = gsap.timeline({
      onComplete: () => {
        phase.current = "idle";
        cover.dataset.active = "false";
        revealTl.current = null;
        markRevealed();
      },
    });
    revealTl.current = tl;
    tl.call(markReady, [], 0.12)
      .to(labelRef.current, { autoAlpha: 0, duration: 0.25 }, 0)
      .to(list, { backgroundColor: (i: number) => colors[i] ?? NIGHT, duration: 0.18, ease: "none", stagger }, 0)
      .to(list, { scale: 0, duration: 0.42, ease: "power3.in", stagger }, 0.1);
  }, [cells, colors, stagger]);

  const coverNow = useCallback(() => {
    const cover = coverRef.current;
    if (!cover) return;
    cover.dataset.active = "true";
    phase.current = "covered";
    gsap.set(cells(), { scale: 1.04, backgroundColor: NIGHT });
  }, [cells]);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;

      // A click while a transition is still running is never dropped: before the
      // new page shows, it changes where the cover is heading (back to this page
      // cancels the trip); while the cover is clearing, it cuts the reveal short
      // and starts a fresh transition.
      if (phase.current === "covering") {
        dest.current = target;
        gsap.to(labelRef.current, { duration: 0.3, scrambleText: { text: `→ ${labelFor(url.pathname)}`, chars: GLYPHS, speed: 0.6 } });
        return;
      }
      if (phase.current === "covered") {
        dest.current = target;
        router.push(target, { scroll: false });
        return;
      }
      if (phase.current === "revealing") {
        revealTl.current?.progress(1);
      }

      const samePath = url.pathname === window.location.pathname;
      if (samePath && url.hash) {
        const el = document.querySelector(url.hash);
        if (el instanceof HTMLElement) {
          if (scroller.lenis) scroller.lenis.scrollTo(el, { offset: -80 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }
      if (samePath && url.search === window.location.search) {
        scrollToTop(false);
        return;
      }

      if (prefersReducedMotion()) {
        router.push(target);
        return;
      }

      const cover = coverRef.current;
      if (!cover) {
        router.push(href);
        return;
      }

      phase.current = "covering";
      dest.current = target;
      resetReady();
      cover.dataset.active = "true";
      const list = cells();
      const label = labelRef.current;

      gsap
        .timeline({
          onComplete: () => {
            phase.current = "covered";
            scroller.lenis?.stop();
            const to = new URL(dest.current, window.location.href);
            if (to.pathname === window.location.pathname && to.search === window.location.search) {
              // Retargeted back to the page we're on: nothing to load, just lift the cover.
              reveal();
              return;
            }
            router.push(dest.current, { scroll: false });
            // If the route never arrives (a failed fetch), don't leave the visitor stuck.
            fallback.current = window.setTimeout(() => {
              if (phase.current === "covered") reveal();
            }, 9000);
          },
        })
        .fromTo(
          list,
          { scale: 0, backgroundColor: (i: number) => colors[i] ?? NIGHT },
          { scale: 1.04, duration: 0.36, ease: "power2.out", stagger },
          0,
        )
        .to(list, { backgroundColor: NIGHT, duration: 0.3, ease: "none", stagger }, 0.16)
        .fromTo(
          label,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
            scrambleText: { text: `→ ${labelFor(url.pathname)}`, chars: GLYPHS, speed: 0.6 },
          },
          0.3,
        );
    },
    [cells, colors, reveal, router, stagger],
  );

  // The new route has rendered under the cover: reset scroll, then clear it.
  useEffect(() => {
    if (phase.current !== "covered") return;
    scrollToTop(true);
    const id = requestAnimationFrame(() => requestAnimationFrame(reveal));
    return () => cancelAnimationFrame(id);
  }, [pathname, reveal]);

  // Back/forward navigations skip the cover; make sure the page still animates in.
  useEffect(() => {
    const onPop = () => {
      if (phase.current === "idle") markRevealed();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const api = useMemo(() => ({ navigate, coverNow, reveal }), [navigate, coverNow, reveal]);

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div
        ref={coverRef}
        className="px-cover"
        aria-hidden
        data-active="false"
        style={{ gridTemplateColumns: `repeat(${grid.cols}, 1fr)`, gridAutoRows: `calc(100vw / ${grid.cols})` }}
      >
        {Array.from({ length: grid.cols * grid.rows }, (_, i) => (
          <div key={i} className="px-cell" />
        ))}
      </div>
      <div ref={labelRef} className="px-label t-label" aria-hidden />
    </TransitionContext.Provider>
  );
}
