"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useEffect } from "react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  registered = true;

  if (process.env.NODE_ENV === "development") {
    // Handy for inspecting trigger positions from the console.
    (window as unknown as Record<string, unknown>).__gsap = { gsap, ScrollTrigger };
  }
}

/** Avoids the SSR useLayoutEffect warning without losing pre-paint timing. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };

/** House easing curves, mirrored from the CSS tokens. */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power2.inOut",
  soft: "power2.out",
} as const;

/**
 * Wrap each word of an element in an inline-block span so GSAP can stagger it.
 * Headlines use hand-set `.reveal-line` markup instead — line breaks in display
 * type are an art-direction decision, not something to leave to measurement.
 */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const existing = el.querySelectorAll<HTMLElement>("[data-word]");
  if (existing.length) return Array.from(existing);

  const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
  el.textContent = "";

  return words.map((word, i) => {
    const span = document.createElement("span");
    span.setAttribute("data-word", "");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    return span;
  });
}

/**
 * Pick a stable ScrollTrigger trigger for `el`.
 *
 * An element inside a `position: sticky` container has no fixed document
 * position — its bounding rect slides as the parent pins — so ScrollTrigger
 * computes a start point that is wrong the moment you scroll. When we detect a
 * sticky ancestor we key the animation to the enclosing section instead, which
 * never moves.
 */
export function resolveTrigger(el: HTMLElement): HTMLElement {
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    if (getComputedStyle(node).position === "sticky") {
      return node.closest<HTMLElement>("[data-section]") ?? el;
    }
    node = node.parentElement;
  }
  return el;
}

/** Standard clip-reveal for `.reveal-line > span` markup. */
export function revealLines(
  scope: HTMLElement,
  vars: { delay?: number; stagger?: number; trigger?: Element } = {},
) {
  const inners = scope.querySelectorAll<HTMLElement>(".reveal-line > span");
  if (!inners.length) return;

  gsap.fromTo(
    inners,
    { yPercent: 115, rotate: 1.5 },
    {
      yPercent: 0,
      rotate: 0,
      duration: 1.15,
      ease: EASE.expo,
      delay: vars.delay ?? 0,
      stagger: vars.stagger ?? 0.075,
      scrollTrigger: vars.trigger
        ? { trigger: vars.trigger, start: "top 82%", once: true }
        : undefined,
    },
  );
}
