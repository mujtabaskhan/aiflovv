"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal, Eyebrow } from "@/components/ui/Reveal";
import { SectionScrim } from "@/components/ui/Overlays";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { SERVICES } from "@/data/services";
import { useAppStore } from "@/store/useAppStore";

/**
 * Four services, one sticky frame. Scroll steps through them and the interface
 * behind splits into four product groups — the active row brings its group
 * forward.
 */
export function Services() {
  const root = useRef<HTMLDivElement>(null);
  const scrollIndex = useRef(0);

  const active = useAppStore((s) => s.activeService);
  const setActive = useAppStore((s) => s.setActiveService);

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("services");
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const i = Math.max(0, Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length)));
        if (i !== scrollIndex.current) {
          scrollIndex.current = i;
          setActive(i);
        }
      },
    });

    return () => st.kill();
  }, [setActive]);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-service-row]", { opacity: 0 });
      gsap.fromTo(
        "[data-service-row]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 62%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="services"
      className="h-[170vh]"
      label="Services"
    >
      {/* h-full is load-bearing: without it this wrapper collapses to the
          height of its sticky child and the pin has nothing to travel over. */}
      <div ref={root} className="h-full">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden [contain:layout_paint]">
          <SectionScrim />
          <div className="relative z-10 shell grid w-full items-start gap-8 pt-16 lg:grid-cols-12 lg:gap-16 lg:pt-0">
            <div className="lg:col-span-5">
              <Eyebrow index="01">Services</Eyebrow>
              <Heading
                className="display-section mt-7 font-display font-medium text-chalk"
                lines={[<>Digital Solutions</>, <>Built Around</>, <>What Matters</>]}
              />
              <Reveal className="mt-7 hidden max-w-[38ch] lg:block" delay={0.15}>
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
                onPointerLeave={() => setActive(scrollIndex.current)}
              >
                {SERVICES.map((service, i) => {
                  const isActive = active === i;
                  return (
                    <li key={service.id} data-service-row>
                      <button
                        type="button"
                        data-cursor="hover"
                        onPointerEnter={() => setActive(i)}
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
                              isActive ? "text-chalk" : "text-mist"
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

                        <div
                          className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={`pl-0 pt-5 transition-opacity duration-500 md:pl-[calc(2ch+1.5rem)] ${
                                isActive ? "opacity-100" : "opacity-0"
                              }`}
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
