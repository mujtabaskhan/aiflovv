"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { markRevealed } from "@/lib/ready";
import { prefersReducedMotion, scroller } from "@/lib/utils";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { PixelWordmark } from "@/components/ui/Pixels";
import { useTransition } from "./Transition";

const LOG = [
  ["resolving flow field", "ok"],
  ["compiling interface", "ok"],
  [`linking ${SERVICES.length} services`, "ok"],
  ["ready", "→"],
];

/**
 * Plays on every full load: the AiFlovv wordmark assembles pixel by pixel,
 * letter by letter, while a short build log runs — then the screen hands
 * over to the transition pixels and dissolves into the page. Repeat visits in
 * the same session get a much shorter version.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  // Read through a ref: the effect must run once per page load, not again
  // whenever a resize gives the transition helpers a new identity.
  const transition = useTransition();
  const api = useRef(transition);
  api.current = transition;

  useEffect(() => {
    const { coverNow, reveal } = api.current;
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains("preload")) {
      markRevealed();
      return;
    }

    const finish = () => {
      try {
        sessionStorage.setItem("aiflovv:seen", "1");
      } catch {}
      coverNow();
      html.classList.remove("preload", "preload-fast");
      scroller.lenis?.start();
      reveal();
    };

    if (prefersReducedMotion()) {
      html.classList.remove("preload", "preload-fast");
      markRevealed();
      return;
    }

    const fast = html.classList.contains("preload-fast");
    const q = gsap.utils.selector(el);
    // Left to right, a column at a time, with a little scatter inside each.
    const cells = q(".pl-word rect").sort((a, b) => {
      const ax = Number(a.getAttribute("x")) + Math.random() * 1.5;
      const bx = Number(b.getAttribute("x")) + Math.random() * 1.5;
      return ax - bx;
    });
    const counter = { v: 0 };
    const countEl = q(".pl-count")[0];
    // Kept short: the hero headline (the page's largest paint) waits for it.
    const D = fast ? 0.6 : 1.2;

    const tl = gsap.timeline({ onComplete: finish });
    tl.to(q(".pl-bar i"), { scaleX: 1, duration: D, ease: "power2.inOut" }, 0)
      .to(
        counter,
        {
          v: 100,
          duration: D,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countEl) countEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0,
      )
      .fromTo(
        cells,
        { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)", stagger: (D * 0.62) / cells.length },
        0.05,
      )
      .to(q(".pl-tag"), { opacity: 1, duration: 0.6, ease: "power2.out" }, D * 0.6);

    if (!fast) {
      q(".pl-log li").forEach((li, i) => {
        tl.to(li, { opacity: 1, duration: 0.01 }, 0.15 + i * (D / LOG.length) * 0.85);
      });
    }
    tl.to(q(".pl-mark"), { scale: 1.04, opacity: 0, duration: 0.35, ease: "power2.in" }, D + 0.05);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="preloader" aria-hidden>
      <div className="pl-bar">
        <i />
      </div>
      <div className="pl-mark">
        <PixelWordmark className="pl-word" />
        <p className="pl-tag t-label">{SITE.tagline}</p>
      </div>
      <ol className="pl-log t-label">
        {LOG.map(([step, status]) => (
          <li key={step}>
            &gt; {step} <b>{status}</b>
          </li>
        ))}
      </ol>
      <div className="pl-count">000</div>
    </div>
  );
}
