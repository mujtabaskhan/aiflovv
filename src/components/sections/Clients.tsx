"use client";

import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import IntroAnimation, { type MorphItem } from "@/components/ui/scroll-morph-hero";
import { Section } from "@/components/ui/Section";
import { plateDataUrl } from "@/components/ui/InsightArt";
import { ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { CLIENTS } from "@/data/clients";

const toItems = (withArt: boolean): MorphItem[] =>
  CLIENTS.map((c, i) => ({
    src: c.image ?? (withArt ? plateDataUrl(c.variant, i * 97 + 11) : undefined),
    title: c.name,
    subtitle: `${c.kind} · ${c.industry}`,
  }));

/**
 * The client roster as the scroll-morph arc, straight after the hero. The
 * section hands its scroll progress to the component, which runs every phase
 * off it: the cards gather into a line and a ring as the section scrolls in,
 * hold while it settles, then open into the arc and sweep past one client at a
 * time. No wheel capture — it works the same with Lenis, touch, keyboard and
 * the scrollbar.
 */
export function Clients() {
  const progress = useMotionValue(0);

  // Generated art needs a canvas, so it is painted after mount; real images
  // are available immediately.
  const [items, setItems] = useState<MorphItem[]>(() => toItems(false));
  useEffect(() => {
    setItems(toItems(true));
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("clients");
    if (!el) return;
    // Progress starts while the section is still scrolling in, so the cards
    // gather into the ring on the way and hold as it settles into place.
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      end: "bottom bottom",
      onUpdate: (self) => progress.set(self.progress),
    });
    return () => st.kill();
  }, [progress]);

  return (
    <Section id="clients" className="h-[260vh]" label="Clients">
      <div className="h-full">
        <div className="sticky top-0 h-[100svh] overflow-hidden [contain:layout_paint]">
          <IntroAnimation
            items={items}
            progress={progress}
            background="transparent"
            introTitle="Built for Ambitious Teams"
            introHint="SCROLL TO EXPLORE"
            title="Our Clients"
            description="From e-commerce and logistics to healthcare, hiring and HR — the websites and apps we have designed, built and shipped."
          />
        </div>
      </div>
    </Section>
  );
}
