"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Eyebrow } from "@/components/ui/Reveal";
import { SectionScrim } from "@/components/ui/Overlays";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { PROCESS } from "@/data/process";
import { useAppStore } from "@/store/useAppStore";

/**
 * Discover → Launch. The tracker below follows the same scroll that drives
 * the interface above it: loose wireframe notes line up, take on colour, get
 * built, tested across devices and shipped as the steps advance.
 */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const stepRef = useRef(0);

  const active = useAppStore((s) => s.activeStep);
  const setActive = useAppStore((s) => s.setActiveStep);
  const step = PROCESS[active];

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("process");
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (fill.current) {
          fill.current.style.transform = `scaleX(${self.progress})`;
        }
        const i = Math.max(
          0,
          Math.min(PROCESS.length - 1, Math.floor(self.progress * PROCESS.length)),
        );
        if (i !== stepRef.current) {
          stepRef.current = i;
          setActive(i);
        }
      },
    });

    return () => st.kill();
  }, [setActive]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          "[data-step-title] > span",
          { yPercent: 112 },
          { yPercent: 0, duration: 0.85, ease: EASE.expo },
        )
        .fromTo(
          "[data-step-body]",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: EASE.expo },
          0.06,
        )
        .fromTo(
          "[data-step-output]",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: EASE.expo, stagger: 0.05 },
          0.1,
        );
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    <Section id="process" className="h-[195vh]" label="Process">
      <div ref={root} className="h-full">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden py-24 md:py-28 [contain:layout_paint]">
          <SectionScrim />
          <div className="relative z-10 shell flex items-start justify-between gap-8">
            <div>
              <Eyebrow index="04">Process</Eyebrow>
              <Heading
                className="display-md mt-6 max-w-[16ch] font-display font-medium text-chalk"
                lines={[<>From First Thought</>, <>To Lasting Impact</>]}
              />
            </div>
            <span className="hidden shrink-0 font-mono text-[0.6875rem] tabular-nums tracking-[0.18em] text-mist md:block">
              {step.index}
              <span className="text-dim"> / 06</span>
            </span>
          </div>

          <div className="relative z-10 shell">
            <div className="grid grid-cols-12 items-end gap-6 lg:gap-10">
              <div className="col-span-12 lg:col-span-5">
                <h3
                  data-step-title
                  className="display-sm overflow-hidden font-display font-medium text-chalk"
                >
                  <span className="block">{step.title}</span>
                </h3>
                <p data-step-body className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-fog">
                  {step.body}
                </p>
              </div>

              <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 lg:col-span-5 lg:col-start-8 lg:justify-end">
                {step.outputs.map((o) => (
                  <li
                    key={o}
                    data-step-output
                    className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mist"
                  >
                    <span className="h-1 w-1 rounded-full bg-ion" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-10 md:mt-12">
              <span className="absolute inset-x-0 top-[7px] h-px bg-hairline" aria-hidden />
              <span
                ref={fill}
                className="absolute inset-x-0 top-[7px] h-px origin-left scale-x-0 bg-ion"
                aria-hidden
              />
              <ol className="relative grid grid-cols-6 gap-1">
                {PROCESS.map((p, i) => {
                  const done = i <= active;
                  return (
                    <li key={p.id} className="flex flex-col items-start gap-3">
                      <span
                        aria-hidden
                        className={`h-[15px] w-[15px] rounded-full border transition-all duration-500 ${
                          i === active
                            ? "scale-100 border-ion bg-ion shadow-[0_0_0_5px_rgba(110,155,255,0.14)]"
                            : done
                              ? "border-ion/70 bg-ion/50"
                              : "border-hairline-strong bg-void"
                        }`}
                      />
                      <span
                        className={`text-[0.6875rem] tracking-[0.02em] transition-colors duration-500 md:text-[0.8125rem] ${
                          i === active ? "text-chalk" : done ? "text-fog" : "text-dim"
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="hidden font-mono text-[0.625rem] text-dim md:block">
                        {p.duration}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
