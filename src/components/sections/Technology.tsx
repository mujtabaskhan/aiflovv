"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal, Eyebrow } from "@/components/ui/Reveal";
import { SectionScrim } from "@/components/ui/Overlays";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { TECHNOLOGIES, CATEGORY_LABEL } from "@/data/technologies";
import { useAppStore } from "@/store/useAppStore";

/**
 * The stack, built in 3D behind this frame as four floors of architecture
 * with each technology standing on its layer. The list is the control surface:
 * focusing a row lifts and lights the matching chip.
 */
export function Technology() {
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const active = useAppStore((s) => s.activeTech);
  const setActive = useAppStore((s) => s.setActiveTech);

  const focused = active >= 0 ? TECHNOLOGIES[active] : null;

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Pinned, the list is on screen as soon as the frame is; flowing (below
      // lg) it sits under the copy, so it waits until it is actually in view.
      const flowing = !window.matchMedia("(min-width: 1024px)").matches;
      gsap.fromTo(
        "[data-tech-row]",
        { opacity: 0, x: 18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: flowing
            ? { trigger: list.current, start: "top 88%", once: true }
            : { trigger: el, start: "top 60%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // A tap is not a hover: on touch, pointerleave follows every pointerup and
  // would clear the selection the tap just made.
  const hover = (e: React.PointerEvent, i: number) => {
    if (e.pointerType !== "touch") setActive(i);
  };

  return (
    <Section id="technology" className="lg:h-[140vh]" label="Technology">
      {/* Pinned from lg only — see Services: a phone screen cannot hold the
          copy, the focus panel and the list at once without clipping them. */}
      <div ref={root} className="lg:h-full">
        <div className="relative flex flex-col justify-center py-28 [contain:layout_paint] md:py-36 lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden lg:py-0">
          <SectionScrim />
          <SectionScrim variant="left" />
          <div className="relative z-10 shell grid w-full gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Eyebrow index="02">Technology</Eyebrow>
              <Heading
                className="display-section mt-7 font-display font-medium text-chalk"
                lines={[<>Technology Without</>, <>The Limits</>]}
              />
              <Reveal className="mt-7 max-w-[36ch]" delay={0.1}>
                <p className="lede">
                  We select modern, reliable technologies that help us build
                  secure, scalable, and high-performing digital products.
                </p>
              </Reveal>

              {/* min-height, not a fixed height: the longest notes run to three lines and
                  a hard height clipped them. The floor stops the panel jumping
                  as you move between technologies. */}
              <div className="glass mt-10 min-h-[12rem] max-w-[40ch] rounded-xl border-l-2 border-l-ion/70 px-5 py-4 sm:min-h-[10.5rem]">
                {focused ? (
                  <div key={focused.id} className="animate-[fadein_0.5s_ease-out]">
                    <span className="eyebrow text-ion">
                      {CATEGORY_LABEL[focused.category]}
                    </span>
                    <p className="mt-2 font-display text-[1.35rem] font-medium tracking-[-0.03em] text-chalk">
                      {focused.name}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-fog">
                      {focused.note}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="eyebrow">10 core technologies</span>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">
                      Select a technology to explore how it fits into our
                      development ecosystem.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <ul
                ref={list}
                className="grid grid-cols-2 gap-x-6 gap-y-0 lg:grid-cols-1"
                onPointerLeave={(e) => hover(e, -1)}
              >
                {TECHNOLOGIES.map((tech, i) => {
                  const isActive = active === i;
                  return (
                    <li key={tech.id} data-tech-row>
                      <button
                        type="button"
                        data-cursor="hover"
                        onPointerEnter={(e) => hover(e, i)}
                        onClick={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onBlur={() => setActive(-1)}
                        className="group flex w-full items-center gap-3 border-b border-hairline py-3 text-left lg:gap-4 lg:py-3.5"
                      >
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 ${
                            isActive ? "scale-125 bg-ion" : "bg-dim"
                          }`}
                        />
                        <span
                          className={`font-display text-[0.95rem] font-medium tracking-[-0.02em] transition-colors duration-400 lg:text-[1.05rem] ${
                            isActive ? "text-chalk" : "text-fog group-hover:text-chalk"
                          }`}
                        >
                          {tech.name}
                        </span>
                        {/* The focused-node panel already names the category;
                            at 375px this chip only crowds the name. */}
                        <span
                          className={`ml-auto hidden whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-colors duration-400 sm:inline ${
                            isActive ? "text-ion" : "text-dim"
                          }`}
                        >
                          {CATEGORY_LABEL[tech.category]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
