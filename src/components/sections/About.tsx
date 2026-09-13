"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal, Eyebrow } from "@/components/ui/Reveal";
import { gsap, useIsomorphicLayoutEffect, splitWords, EASE } from "@/lib/gsap";
import { PILLARS, COMPANY } from "@/data/company";
import { scrimStop } from "@/components/ui/Overlays";
import { useAppStore } from "@/store/useAppStore";

/**
 * The studio. The finished product turns slowly behind this frame — focusing
 * a pillar brings its screen forward (strategy → analytics, design → the design
 * board, engineering → code, partnership → the client card).
 */
export function About() {
  const root = useRef<HTMLDivElement>(null);
  const setPillar = useAppStore((s) => s.setActivePillar);
  const active = useAppStore((s) => s.activePillar);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const statement = el.querySelector<HTMLElement>("[data-about-statement]");
      if (statement) {
        const words = splitWords(statement);
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASE.expo,
            stagger: 0.025,
            scrollTrigger: {
              trigger: statement,
              start: "top 80%",
              end: "bottom 58%",
              scrub: 0.8,
            },
          },
        );
      }

      gsap.fromTo(
        "[data-pillar]",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: EASE.expo,
          stagger: 0.09,
          scrollTrigger: { trigger: "[data-pillars]", start: "top 78%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="about" className="py-[12vh] md:py-[14vh]" label="Studio">
      {/* This section flows rather than pinning, so the copy sits directly over
          the product for its whole height. The gradient keeps the right edge
          open where it reads best. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `linear-gradient(90deg, ${scrimStop(0.93)} 0%, ${scrimStop(0.74)} 42%,` +
            ` ${scrimStop(0.48)} 74%, ${scrimStop(0.28)} 100%)`,
        }}
      />

      <div ref={root} className="relative z-10 shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow index="05">Studio</Eyebrow>
            <Heading
              className="display-section mt-7 font-display font-medium text-chalk"
              lines={[
                <>A Studio Built</>,
                <>For Digital</>,
                <>
                  <span className="serif-accent text-ion">Progress</span>
                </>,
              ]}
            />
          </div>

          <div className="self-end lg:col-span-6 lg:col-start-7">
            <p
              data-about-statement
              className="font-display text-[clamp(1.15rem,1.9vw,1.65rem)] font-normal leading-[1.35] tracking-[-0.025em] text-fog"
            >
              We are a technology-driven digital studio built for companies that
              want more than a standard website or software solution. By combining
              strategy, design, and engineering, we create scalable digital
              products that solve real problems, create better experiences, and
              support meaningful growth.
            </p>
          </div>
        </div>

        {/* No boxes: hairline rules and space only, so the screens behind stay
            part of the composition instead of being covered by four cards. */}
        <div
          data-pillars
          className="mt-[8vh] grid sm:grid-cols-2 lg:grid-cols-4"
          onPointerLeave={() => setPillar(-1)}
        >
          {PILLARS.map((p, i) => (
            <article
              key={p.id}
              data-pillar
              data-cursor="hover"
              onPointerEnter={() => setPillar(i)}
              className="group relative flex flex-col justify-between py-8 pr-6 lg:min-h-[21rem] lg:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-hairline"
              />
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-px origin-left bg-ion transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active === i ? "scale-x-100" : "scale-x-0"
                }`}
              />
              <div>
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h3
                  className={`mt-5 font-display text-[1.5rem] font-medium tracking-[-0.035em] transition-colors duration-500 ${
                    active === i ? "text-ion" : "text-chalk"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed text-mist transition-colors duration-500 group-hover:text-fog">
                  {p.body}
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-[1.35rem] font-medium tracking-[-0.03em] text-chalk">
                  {p.metric}
                </p>
                <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">
                  {p.metricLabel}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </Section>
  );
}
