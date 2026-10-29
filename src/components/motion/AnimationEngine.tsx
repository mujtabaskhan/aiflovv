"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, GLYPHS } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { isMouse, prefersReducedMotion } from "@/lib/utils";

declare global {
  interface Window {
    __aiflovvAnim?: boolean;
  }
}

/**
 * One engine animates every page. Server components opt in with attributes,
 * so no page needs its own client wrapper:
 *
 *   data-anim="up | fade | lines | chars | words | scramble | clip | pixel | stagger | rule"
 *   data-delay="0.2"   data-start="top 80%"   data-speed="0.15" (parallax)
 *   data-magnetic       (pulls toward the pointer)
 *
 * It waits for the page to be visible (`onReady`) and rebuilds on every route.
 */
export function AnimationEngine() {
  const pathname = usePathname();

  useEffect(() => {
    window.__aiflovvAnim = true;
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove("anim");
      return;
    }
    let ctx: gsap.Context | undefined;
    let raf = 0;
    const off = onReady(() => {
      raf = requestAnimationFrame(() => {
        ctx = gsap.context(() => setup());
        ScrollTrigger.refresh();
      });
    });
    return () => {
      off();
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [pathname]);

  // Pointer-driven effects are global and cheap: one listener for every card.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isMouse(e)) return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}

const ROOTS = ["#main", "#footer"];

function select(sel: string) {
  return gsap.utils.toArray<HTMLElement>(ROOTS.map((r) => `${r} ${sel}`).join(","));
}

const num = (v: string | undefined, d = 0) => (v === undefined || v === "" ? d : parseFloat(v));
const startOf = (el: HTMLElement) => el.dataset.start || "top 88%";

function shuffle<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function setup() {
  const cleanups: (() => void)[] = [];

  select('[data-anim="up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 46 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.25,
        delay: num(el.dataset.delay),
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  select('[data-anim="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1.4,
        ease: "power2.out",
        delay: num(el.dataset.delay),
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  select('[data-anim="stagger"]').forEach((el) => {
    const kids = Array.from(el.children) as HTMLElement[];
    gsap.fromTo(
      kids,
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        stagger: num(el.dataset.stagger, 0.08),
        delay: num(el.dataset.delay),
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  // Lines rise out of masks, then the split is undone so text reflows naturally.
  select('[data-anim="lines"]').forEach((el) => {
    const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(split.lines, {
      yPercent: 108,
      duration: 1.3,
      stagger: 0.1,
      delay: num(el.dataset.delay),
      scrollTrigger: { trigger: el, start: startOf(el), once: true },
      onComplete: () => split.revert(),
    });
  });

  select('[data-anim="chars"]').forEach((el) => {
    const split = SplitText.create(el, { type: "lines,chars", mask: "lines", linesClass: "split-line" });
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(split.chars, {
      yPercent: 115,
      rotate: 6,
      duration: 1.15,
      stagger: { each: 0.022 },
      delay: num(el.dataset.delay),
      scrollTrigger: { trigger: el, start: startOf(el), once: true },
      onComplete: () => split.revert(),
    });
  });

  // Words light up as they cross the viewport — scrubbed, so reading pace drives it.
  select('[data-anim="words"]').forEach((el) => {
    const split = SplitText.create(el, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 52%", scrub: true },
      },
    );
  });

  // Labels decode from glyphs. The original text is kept in a data attribute
  // because the footer persists across routes and is set up more than once.
  select('[data-anim="scramble"]').forEach((el) => {
    const text = (el.dataset.text ??= el.textContent ?? "");
    gsap.set(el, { autoAlpha: 1 });
    gsap.fromTo(
      el,
      { scrambleText: { text: " ", chars: GLYPHS } },
      {
        duration: 1.2,
        delay: num(el.dataset.delay),
        scrambleText: { text, chars: GLYPHS, speed: 0.55, revealDelay: 0.15 },
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  select('[data-anim="clip"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "snap",
        delay: num(el.dataset.delay),
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  select('[data-anim="rule"]').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "snap",
        delay: num(el.dataset.delay),
        scrollTrigger: { trigger: el, start: startOf(el), once: true },
      },
    );
  });

  // Media dissolves out of brand pixels.
  select('[data-anim="pixel"]').forEach((el) => {
    const content = Array.from(el.children) as HTMLElement[];
    const rect = el.getBoundingClientRect();
    const cols = Math.max(3, Math.round(num(el.dataset.cols, 7)));
    const size = (rect.width || 320) / cols;
    const rows = Math.max(1, Math.ceil((rect.height || size) / size));

    const overlay = document.createElement("div");
    overlay.className = "px-reveal";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    overlay.style.gridAutoRows = `${size}px`;
    const cells: HTMLElement[] = [];
    for (let i = 0; i < cols * rows; i++) {
      const c = document.createElement("i");
      overlay.appendChild(c);
      cells.push(c);
    }
    el.appendChild(overlay);
    cleanups.push(() => overlay.remove());
    gsap.set(content, { autoAlpha: 1 });

    const order = shuffle([...cells]);
    const each = 0.55 / order.length;
    const tl = gsap.timeline({
      delay: num(el.dataset.delay),
      scrollTrigger: { trigger: el, start: startOf(el), once: true },
      onComplete: () => overlay.remove(),
    });
    tl.to(order, {
      backgroundColor: (i: number) => (i % 4 === 0 ? "#3cc8ff" : "#4f7cff"),
      duration: 0.16,
      ease: "none",
      stagger: each,
    })
      .to(order, { scale: 0, duration: 0.3, ease: "power2.in", stagger: each }, 0.12)
      .from(content, { scale: 1.14, duration: 1.6, ease: "flow" }, 0.1);
  });

  // Parallax drift.
  select("[data-speed]").forEach((el) => {
    const speed = num(el.dataset.speed);
    gsap.fromTo(
      el,
      { yPercent: speed * 50 },
      {
        yPercent: speed * -50,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  // Looping illustrations only run while on screen.
  const vis = select(".vis");
  if (vis.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => ((e.target as HTMLElement).dataset.paused = e.isIntersecting ? "false" : "true"));
    });
    vis.forEach((v) => io.observe(v));
    cleanups.push(() => io.disconnect());
  }

  // Magnetic elements lean toward the pointer.
  {
    select("[data-magnetic]").forEach((el) => {
      const strength = num(el.dataset.magnetic, 0.3);
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        if (!isMouse(e)) return;
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
