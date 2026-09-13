"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal, Eyebrow } from "@/components/ui/Reveal";
import { SectionScrim } from "@/components/ui/Overlays";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { SERVICES } from "@/data/services";
import { useAppStore } from "@/store/useAppStore";

const DESKTOP = "(min-width: 1024px)";
const MOBILE = "(max-width: 1023.98px)";

/**
 * Four services, one sticky frame. Scroll steps through them and the interface
 * behind splits into four product groups — the active row brings its group
 * forward.
 *
 * Below lg the frame is not pinned: a phone screen is too short to hold the
 * heading and an open row, and a pinned frame clips whatever does not fit. The
 * section flows instead, every row open, and the row crossing the middle of
 * the screen is the active one.
 */
export function Services() {
  const root = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0);

  const active = useAppStore((s) => s.activeService);
  const setActive = useAppStore((s) => s.setActiveService);

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("services");
    if (!el) return;

    const pick = (i: number) => {
      if (i === scrollIndex.current) return;
      scrollIndex.current = i;
      setActive(i);
    };

    const mm = gsap.matchMedia();
    mm.add(DESKTOP, () => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          pick(Math.max(0, Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length))));
        },
      });
    });
    mm.add(MOBILE, () => {
      el.querySelectorAll("[data-service-row]").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && pick(i),
        });
      });
    });

    return () => mm.revert();
  }, [setActive]);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const from = { opacity: 0, y: 24 };
    const to = { opacity: 1, y: 0, duration: 1, ease: "expo.out" };

    const mm = gsap.matchMedia(el);
    mm.add(DESKTOP, () => {
      gsap.fromTo("[data-service-row]", from, {
        ...to,
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 62%", once: true },
      });
    });
    // Flowing, the rows arrive one at a time — keyed to the whole list, the
    // lower ones would play out below the fold.
    mm.add(MOBILE, () => {
      gsap.utils.toArray<HTMLElement>("[data-service-row]").forEach((row) => {
        gsap.fromTo(row, from, {
          ...to,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  // A tap is not a hover: on touch, pointerleave follows every pointerup and
  // would snap the row straight back to the scroll position's.
  const hover = (e: React.PointerEvent, i: number) => {
    if (e.pointerType !== "touch") setActive(i);
  };

  return (
    <Section
      id="services"
      className="lg:h-[170vh]"
      label="Services"
    >
      {/* From lg, h-full is load-bearing: without it this wrapper collapses to
          the height of its sticky child and the pin has nothing to travel over. */}
      <div ref={root} className="lg:h-full">
        <div className="relative py-28 [contain:layout_paint] md:py-36 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden lg:py-0">
          <SectionScrim />
          <div className="relative z-10 shell grid w-full items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow index="01">Services</Eyebrow>
              <Heading
                className="display-section mt-7 font-display font-medium text-chalk"
                lines={[<>Digital Solutions</>, <>Built Around</>, <>What Matters</>]}
              />
              <Reveal className="mt-7 max-w-[38ch]" delay={0.15}>
                <p className="lede">
                  From high-converting websites to scalable software and mobile
                  applications, we provide end-to-end digital solutions designed
                  for growth, performance, and long-term impact.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul
                className="flex flex-col"
                onPointerLeave={(e) => hover(e, scrollIndex.current)}
              >
                {SERVICES.map((service, i) => {
                  const isActive = active === i;
                  return (
                    <li key={service.id} data-service-row>
                      <button
                        type="button"
                        data-cursor="hover"
                        onPointerEnter={(e) => hover(e, i)}
                        onClick={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        aria-expanded={isActive}
                        className="w-full border-t border-hairline py-4 text-left transition-colors duration-500 md:py-6"
                      >
                        <div className="flex items-baseline gap-4 md:gap-6">
                          <span
                            className={`eyebrow transition-colors duration-500 ${
                              isActive ? "text-ion" : ""
                            }`}
                          >
                            {service.index}
                          </span>
                          <h3
                            className={`display-sm font-display font-medium transition-colors duration-500 ${
                              isActive ? "text-chalk" : "text-chalk lg:text-mist"
                            }`}
                          >
                            {service.title}
                          </h3>
                          <span
                            aria-hidden
                            className={`ml-auto h-px flex-1 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isActive ? "scale-x-100 bg-ion" : "scale-x-0 bg-hairline-strong"
                            }`}
                          />
                        </div>

                        {/* Open below lg regardless; from lg only the active row. */}
                        <div
                          data-open={isActive}
                          className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:data-[open=true]:grid-rows-[1fr]"
                        >
                          <div className="overflow-hidden">
                            <div
                              data-open={isActive}
                              className="pl-0 pt-5 opacity-100 transition-opacity duration-500 md:pl-[calc(2ch+1.5rem)] lg:opacity-0 lg:data-[open=true]:opacity-100"
                            >
                              <p className="lede max-w-[46ch]">{service.summary}</p>
                              <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 md:mt-5 md:gap-x-8 md:gap-y-2.5">
                                {service.capabilities.map((cap) => (
                                  <li
                                    key={cap}
                                    className="flex items-center gap-3 text-[0.875rem] text-fog"
                                  >
                                    <span className="h-1 w-1 rounded-full bg-ion" aria-hidden />
                                    {cap}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
                <li className="border-t border-hairline" aria-hidden />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
