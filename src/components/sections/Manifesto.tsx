"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal, Eyebrow } from "@/components/ui/Reveal";
import { gsap, useIsomorphicLayoutEffect, splitWords, EASE } from "@/lib/gsap";

/**
 * The bridge out of the hero. A single statement, revealed word by word, while
 * the exploded interface behind it pulls further apart.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-manifesto]");
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = splitWords(el);
      gsap.fromTo(
        words,
        { opacity: 0.08, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.expo,
          stagger: 0.028,
          scrollTrigger: {
            trigger: el,
            start: "top 78%",
            end: "bottom 55%",
            scrub: 0.8,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="manifesto" className="py-[12vh] md:py-[15vh]" label="Position">
      <div ref={ref} className="shell">
        <Eyebrow index="00">Position</Eyebrow>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <p
            data-manifesto
            className="display-md col-span-full max-w-[20ch] font-display font-normal text-chalk lg:col-span-7"
          >
            We turn ambitious ideas into intelligent digital products, powerful
            brands, and technology built for measurable growth.
          </p>

          <Reveal
            className="col-span-full flex max-w-[52ch] flex-col gap-6 self-end lg:col-span-4"
            stagger={0.08}
          >
            <p className="lede">
              From strategy to launch, we combine design, software development,
              and technology to create digital experiences that perform.
            </p>
            <p className="lede">
              We work with startups and established companies to solve complex
              problems, unlock opportunities, and build for what comes next.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
