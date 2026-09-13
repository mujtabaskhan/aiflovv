"use client";

import { useRef, type ComponentType, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useIsomorphicLayoutEffect, resolveTrigger, EASE } from "@/lib/gsap";

/** Polymorphic `as` with a ref is not expressible cleanly in TSX; this narrows
 *  the tag to the only shape these components actually use. */
type Polymorphic = ComponentType<{
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
}>;

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the block as one. */
  stagger?: number;
  start?: string;
}

/** Scroll-triggered entrance for blocks of copy and UI. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  y = 26,
  stagger,
  start = "top 84%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: EASE.expo,
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: resolveTrigger(el), start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger, start]);

  const Comp = Tag as unknown as Polymorphic;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

interface HeadingProps {
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Skip the ScrollTrigger and play immediately (used by the hero). */
  immediate?: boolean;
  play?: boolean;
}

/**
 * Clip-reveal headline. Lines are authored by hand rather than measured —
 * where a display headline breaks is an art-direction decision.
 */
export function Heading({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
  immediate = false,
  play = true,
}: HeadingProps) {
  const ref = useRef<HTMLElement>(null);

  // One effect owns the line transform for the whole lifecycle. Splitting the
  // "park it below the mask" set from the reveal tween gives two owners for the
  // same property, and a ScrollTrigger refresh then restores the parked state
  // over a reveal that has already played.
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!play) {
        // Waiting on the preloader — hold the lines under the mask so they
        // never flash un-animated as the curtain lifts.
        gsap.set(".reveal-line > span", { yPercent: 118 });
        return;
      }

      gsap.fromTo(
        ".reveal-line > span",
        { yPercent: 118 },
        {
          yPercent: 0,
          duration: 1.25,
          ease: EASE.expo,
          delay,
          stagger: 0.085,
          scrollTrigger: immediate
            ? undefined
            : { trigger: resolveTrigger(el), start: "top 78%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, immediate, play]);

  const Comp = Tag as unknown as Polymorphic;
  return (
    <Comp ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span>{line}</span>
        </span>
      ))}
    </Comp>
  );
}

export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && <span className="eyebrow text-ion">{index}</span>}
      <span className="h-px w-8 bg-hairline-strong" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
