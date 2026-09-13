"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { gsap, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { interaction } from "@/lib/interaction";
import { useAppStore } from "@/store/useAppStore";
import { HERO_LABELS } from "@/data/heroLabels";
import { scrimStop } from "@/components/ui/Overlays";

/**
 * Headline on the left, the product on the right. The 3D product assembles
 * itself as the curtain lifts, and the right half of the frame is left open
 * for it — the copy never sits over it.
 */
export function Hero() {
  const entered = useAppStore((s) => s.entered);
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!entered || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.25 });

      tl.fromTo(
        "[data-hero-lede]",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: EASE.expo },
        0.85,
      ).fromTo(
        "[data-hero-cta] > *",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: EASE.expo, stagger: 0.08 },
        1.0,
      );

      // The whole hero drifts up and dims as the journey starts moving.
      gsap.to("[data-hero-inner]", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [entered]);

  return (
    <Section id="hero" className="h-[100svh] min-h-[640px]" label="Introduction">
      <div ref={root} className="absolute inset-0">
        {/* Ground under the copy only: the product on the right stays clear. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              `linear-gradient(90deg, ${scrimStop(0.9, 0.62)} 0%, ${scrimStop(0.72, 0.62)} 34%,` +
              ` ${scrimStop(0.16, 0.7)} 56%, ${scrimStop(0, 0)} 72%)`,
          }}
        />

        <div
          data-hero-inner
          className="shell relative grid h-full content-start pt-28 sm:pt-32 lg:grid-cols-12 lg:content-center lg:pt-16"
        >
          <div className="lg:col-span-7">
            <Heading
              as="h1"
              immediate
              play={entered}
              delay={0.35}
              className="display-hero font-display font-medium text-chalk"
              lines={[
                <>We Build Digital</>,
                <>
                  Products That{" "}
                  <span className="serif-accent text-ion">Move</span>
                </>,
                <>Businesses Forward</>,
              ]}
            />

            <p
              data-hero-lede
              className="lede mt-7 max-w-[44ch] text-pretty text-fog opacity-0 text-shadow-scrim"
            >
              We design and develop high-performance websites, custom software,
              mobile apps, and digital experiences built to scale.
            </p>

            <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-3">
              <div className="opacity-0">
                <Button href="#cta" variant="primary" size="lg">
                  Start a Project
                </Button>
              </div>
              <div className="opacity-0">
                <Button href="#work" variant="ghost" size="lg">
                  Explore Our Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroProbe />
    </Section>
  );
}

/**
 * The label that names whichever layer of the 3D product is under the pointer.
 * The scene writes its anchor into `interaction.heroProbe` every frame; this
 * follows it by writing to the DOM directly, so hovering never re-renders.
 */
function HeroProbe() {
  const el = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Always running: it stays at zero opacity unless a mouse is hovering.
    let raf = 0;
    let shown = "";

    const tick = () => {
      const p = interaction.heroProbe;
      const node = el.current;
      if (node) {
        if (p.kind && p.kind !== shown) {
          shown = p.kind;
          const [t, g] = HERO_LABELS[p.kind] ?? ["", ""];
          if (title.current) title.current.textContent = t;
          if (tag.current) tag.current.textContent = g;
        }
        node.style.opacity = p.active.toFixed(3);
        node.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-4px, calc(-100% - 10px)) scale(${(0.94 + p.active * 0.06).toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65] origin-bottom-left opacity-0 will-change-transform"
    >
      <div className="glass flex items-center gap-2.5 whitespace-nowrap rounded-full px-3.5 py-2 shadow-[0_12px_32px_-14px_rgba(9,12,22,0.45)]">
        <span className="h-1.5 w-1.5 rounded-full bg-ion" />
        <span ref={title} className="text-[0.8125rem] font-medium tracking-[-0.01em] text-chalk" />
        <span ref={tag} className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mist" />
      </div>
    </div>
  );
}
