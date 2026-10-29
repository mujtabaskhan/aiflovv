"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { SHAPES } from "@/lib/shapes";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { prefersReducedMotion } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PixelArrow } from "@/components/ui/Pixels";
import { PixelEdge } from "@/components/ui/PixelEdge";
import { TLink } from "@/components/shell/TLink";
import { MORPH, type FlowFieldHandle } from "./FlowField";
import { RollingText } from "./RollingText";

const FlowField = dynamic(() => import("./FlowField"), { ssr: false });

/** What each hero shape stands for: the brand first, then every service. */
const SLIDES = SHAPES.map((sh) => {
  const svc = SERVICES.find((s) => s.slug === sh.id);
  return svc
    ? { id: sh.id, noun: svc.noun, title: svc.title, blurb: svc.blurb, href: `/services/${svc.slug}`, hold: sh.hold }
    : { id: sh.id, noun: "Products", title: SITE.name, blurb: SITE.tagline, href: "/services", hold: sh.hold };
});

/**
 * "Ideas in. Products out." — the headline is also the diagram. Loose pixels
 * stream in from the left and lock into whatever the studio builds; the word
 * in the headline and the ticker beside it change with every shape.
 */
export function HomeHero() {
  const [slide, setSlide] = useState(0);
  const [noGL, setNoGL] = useState(false);
  const [paused, setPaused] = useState(false);
  const control = useRef<FlowFieldHandle | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const s = SLIDES[slide];

  // The headline's own entrance (it can't use the split-text engine: the
  // rolling word owns its letters).
  useEffect(() => {
    const el = titleRef.current;
    if (!el || prefersReducedMotion()) return;
    const parts = el.querySelectorAll(".ht-part");
    gsap.set(parts, { yPercent: 110 });
    return onReady(() => {
      gsap.to(parts, { yPercent: 0, duration: 1.3, ease: "flow", stagger: 0.12, delay: 0.1 });
    });
  }, []);

  // Without WebGL, the copy still rotates on its own.
  useEffect(() => {
    if (!noGL || paused || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setSlide((i) => (i + 1) % SLIDES.length), (MORPH + SLIDES[slide].hold) * 1000);
    return () => window.clearTimeout(id);
  }, [noGL, paused, slide]);

  const pause = (p: boolean) => {
    setPaused(p);
    control.current?.setPaused(p);
  };
  const go = (i: number) => {
    if (noGL) setSlide(i);
    else control.current?.goTo(i);
  };

  const unsupported = useCallback(() => setNoGL(true), []);
  const duration = MORPH + s.hold;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden />
      {noGL ? <div className="hero-fallback" aria-hidden /> : <FlowField onShape={setSlide} controlRef={control} onUnsupported={unsupported} />}
      <div className="hero-fade" aria-hidden />

      <div className="shell hero-content">
        <div className="hero-copy">
          <h1 id="hero-title" ref={titleRef} className="hero-title">
            <span className="sr-only">Ideas in. Products out. {SITE.name} builds websites, apps, AI and software.</span>
            <span className="ht-line" aria-hidden>
              <span className="ht-part">Ideas in.</span>
            </span>
            <span className="ht-line" aria-hidden>
              <span className="ht-part">
                <RollingText text={s.noun} className="ht-word" /> out.
              </span>
            </span>
          </h1>
          <p className="t-lead mt-7 max-w-[34rem]" data-anim="up" data-delay="0.55">
            AiFlovv designs and builds websites, apps, AI features and custom software for ambitious businesses — from
            Lahore, for the world.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-anim="up" data-delay="0.7">
            <Button href="/contact" magnetic>
              Start a project
            </Button>
            <Button href="/services" variant="ghost">
              Explore services
            </Button>
          </div>
        </div>

        <div
          className="ticker"
          data-anim="fade"
          data-delay="0.9"
          data-paused={paused}
          onPointerEnter={(e) => e.pointerType === "mouse" && pause(true)}
          onPointerLeave={() => pause(false)}
          onFocus={() => pause(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && pause(false)}
        >
          <TLink href={s.href} className="ticker-title group" aria-live="off">
            <RollingText text={s.title} fit />
            <PixelArrow size={13} className="ticker-arrow" />
          </TLink>
          <p key={s.id} className="ticker-blurb">
            {s.blurb}
          </p>
          <div className="ticker-steps" role="group" aria-label="Choose a service to preview">
            {SLIDES.map((sl, i) => (
              <button
                key={sl.id}
                type="button"
                aria-label={sl.title}
                aria-pressed={i === slide}
                data-brand={i === 0 || undefined}
                onClick={() => go(i)}
              >
                {i === slide && <i key={`${sl.id}-${slide}`} style={{ "--d": `${duration}s` } as CSSProperties} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PixelEdge seed="home" />
    </section>
  );
}
