"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Heading, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useIsomorphicLayoutEffect, gsap, EASE } from "@/lib/gsap";
import { interaction } from "@/lib/interaction";
import { COMPANY } from "@/data/company";
import { scrimStop } from "@/components/ui/Overlays";
import { InstagramLink } from "@/components/ui/Instagram";

/**
 * The closing shot. Every screen folds into a tunnel converging on a single
 * waiting input behind this frame, and bloom lifts to its second peak.
 */
export function CTA() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cta-item]",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: EASE.expo,
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 65%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const enter = () => {
      interaction.ctaHover = 1;
    };
    const leave = () => {
      interaction.ctaHover = 0;
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      interaction.ctaHover = 0;
    };
  }, []);

  return (
    <Section id="cta" className="h-[130vh]" label="Contact">
      <div ref={root} className="h-full">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden [contain:layout_paint]">
          {/* The tunnel converges right behind this copy, so it needs its own
              ground — same treatment as the hero. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                `radial-gradient(48% 42% at 50% 50%, ${scrimStop(0.9, 0.86)} 0%,` +
                ` ${scrimStop(0.62, 0.86)} 46%, ${scrimStop(0.16, 0.86)} 76%,` +
                ` ${scrimStop(0, 0)} 100%)`,
            }}
          />

          <div className="relative z-10 shell flex flex-col items-center text-center">
            <div data-cta-item className="eyebrow opacity-0">
              Next
            </div>

            <Heading
              as="h2"
              className="display-xl mt-7 max-w-[14ch] font-display font-medium text-chalk"
              lines={[
                <>Let&rsquo;s Build What&rsquo;s</>,
                <>
                  <span className="serif-accent text-ion">Next</span> For You
                </>,
              ]}
            />

            <p
              data-cta-item
              className="lede mt-8 max-w-[46ch] text-balance text-fog opacity-0 text-shadow-scrim"
            >
              Have an idea, challenge, or ambitious digital project? Let&rsquo;s
              turn it into a scalable product built for real impact.
            </p>

            <div
              data-cta-item
              className="mt-11 flex flex-col items-center gap-3 opacity-0 sm:flex-row"
            >
              <Button href={`mailto:${COMPANY.email}`} variant="primary" size="lg">
                Start a Conversation
              </Button>
              <Button href="#services" variant="ghost" size="lg">
                View Our Services
              </Button>
            </div>

            <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3" delay={0.2}>
              <a
                href={`mailto:${COMPANY.email}`}
                data-cursor="hover"
                className="group font-mono text-[0.75rem] tracking-[0.06em] text-fog transition-colors text-shadow-scrim hover:text-chalk"
              >
                {COMPANY.email}
                <span className="mt-0.5 block h-px w-full origin-left scale-x-0 bg-ion transition-transform duration-500 group-hover:scale-x-100" />
              </a>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                data-cursor="hover"
                className="group font-mono text-[0.75rem] tracking-[0.06em] text-fog transition-colors text-shadow-scrim hover:text-chalk"
              >
                {COMPANY.phone}
                <span className="mt-0.5 block h-px w-full origin-left scale-x-0 bg-ion transition-transform duration-500 group-hover:scale-x-100" />
              </a>
              <span className="group font-mono text-[0.75rem] tracking-[0.06em] text-fog transition-colors text-shadow-scrim hover:text-chalk">
                <InstagramLink />
                <span className="mt-0.5 block h-px w-full origin-left scale-x-0 bg-ion transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <span className="font-mono text-[0.75rem] tracking-[0.06em] text-fog text-shadow-scrim">
                {COMPANY.address}
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
