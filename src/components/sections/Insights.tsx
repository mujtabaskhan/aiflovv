"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal, Eyebrow } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { InsightArt } from "@/components/ui/InsightArt";
import { scrimStop } from "@/components/ui/Overlays";
import { gsap, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { INSIGHTS } from "@/data/insights";
import { scrollToSection } from "@/components/providers/SmoothScroll";

const RATIO: Record<string, string> = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[5/4]",
};

export function Insights() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-insight]",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: EASE.expo,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="insights" className="py-[12vh] md:py-[14vh]" label="Featured insights">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `linear-gradient(90deg, ${scrimStop(0.9)} 0%, ${scrimStop(0.66)} 46%,` +
            ` ${scrimStop(0.34)} 78%, ${scrimStop(0.2)} 100%)`,
        }}
      />

      <div ref={root} className="relative z-10 shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Eyebrow index="06">Featured Insights</Eyebrow>
            <Heading
              className="display-section mt-7 font-display font-medium text-chalk"
              lines={[
                <>Stories From</>,
                <>Every Build</>,
                <>
                  We <span className="serif-accent text-ion">Ship</span>
                </>,
              ]}
            />
            <Reveal className="mt-6" delay={0.1}>
              <p className="lede max-w-[34ch]">From Concept to Completion</p>
            </Reveal>
            <Reveal className="mt-9" delay={0.18}>
              <Button href="#work" variant="primary" size="md">
                Explore More
              </Button>
            </Reveal>
          </div>

          {/* Real multi-column masonry rather than three fixed columns: it
              balances itself at every breakpoint, keeps the reading order when
              it collapses, and needs only one copy of each card in the DOM —
              which matters when every card carries its own canvas. The rhythm
              comes from the varied card proportions instead of offsets. */}
          <div className="lg:col-span-7 [column-gap:1.25rem] columns-1 sm:columns-2 lg:[column-gap:1rem] lg:columns-3">
            {INSIGHTS.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                data-insight
                data-cursor="hover"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`group relative mb-5 block break-inside-avoid overflow-hidden rounded-xl bg-ink shadow-[0_18px_40px_-24px_rgba(9,12,22,0.55)] ring-1 ring-black/5 lg:mb-4 ${RATIO[item.ratio]}`}
              >
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                      style={item.focus ? { objectPosition: item.focus } : undefined}
                    />
                  ) : (
                    <InsightArt variant={item.variant} seed={index * 131 + 7} />
                  )}
                </div>

                {/* Photography needs its own floor for the caption; the
                    generated plates already bake one in. */}
                {item.image && (
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[#060912]/92 via-[#060912]/25 to-transparent"
                  />
                )}

                {/* The plate is always dark, whichever act this sits in, so the
                    caption uses fixed light values rather than themed tokens. */}
                <div className="relative flex h-full flex-col justify-end p-4 md:p-5">
                  <span className="font-mono text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-white/65">
                    {item.kind}
                  </span>
                  <h3 className="mt-2 font-display text-[0.9375rem] font-medium leading-[1.25] tracking-[-0.02em] text-white md:text-[1rem]">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-3 block h-px w-8 bg-white/30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 group-hover:bg-ion-soft"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
