"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { WORK } from "@/content/work";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { TLink } from "@/components/shell/TLink";
import { PixelArrow } from "@/components/ui/Pixels";

/** Seconds for one full pass of the client list. */
const CYCLE = 55;

/**
 * Every client, on a loop. Scrolling pushes the marquee along — and scrolling
 * back up runs it backwards. On touch screens, where there's no hover to slow
 * it, arrows step it one client at a time.
 */
export function ClientsMarquee() {
  const track = useRef<HTMLDivElement>(null);
  const stepRef = useRef<(dir: 1 | -1) => void>(() => {});

  useEffect(() => {
    const el = track.current;
    const marquee = el?.parentElement;
    if (!el || !marquee) return;
    const reduced = prefersReducedMotion();
    const tween = gsap.to(el, { xPercent: -50, ease: "none", duration: CYCLE, repeat: -1, paused: reduced });
    // Start deep into the loop so stepping backwards never runs out of road.
    tween.totalTime(CYCLE * 40);

    let dir = 1;
    const st = reduced
      ? undefined
      : ScrollTrigger.create({
          onUpdate(self) {
            const v = self.getVelocity();
            if (Math.abs(v) < 5) return;
            dir = v > 0 ? 1 : -1;
            gsap.to(tween, { timeScale: dir * Math.min(1 + Math.abs(v) / 250, 6), duration: 0.25, overwrite: true });
            gsap.to(tween, { timeScale: dir, duration: 1.4, delay: 0.25 });
          },
        });
    const slow = () => gsap.to(tween, { timeScale: dir * 0.12, duration: 0.6, overwrite: true });
    const resume = () => gsap.to(tween, { timeScale: dir, duration: 0.8, overwrite: true });
    if (!reduced) {
      el.addEventListener("pointerenter", slow);
      el.addEventListener("pointerleave", resume);
    }

    // Arrows: glide the next (or previous) client to the front edge, light it
    // up in its brand colour, then let the loop carry on.
    let resumeTimer = 0;
    let lit: HTMLElement | null = null;
    stepRef.current = (d) => {
      const box = marquee.getBoundingClientRect();
      const edge = box.left + box.width * 0.08; // where the edge fade ends
      const chips = Array.from(el.children) as HTMLElement[];
      const lefts = chips.map((c) => c.getBoundingClientRect().left);
      let i = -1;
      if (d > 0) i = lefts.findIndex((l) => l > edge + 4);
      else for (let k = lefts.length - 1; k >= 0 && i < 0; k--) if (lefts[k] < edge - 4) i = k;
      if (i < 0) return;
      const distance = lefts[i] - edge;
      const pxPerSecond = el.getBoundingClientRect().width / 2 / CYCLE;
      tween.pause();
      window.clearTimeout(resumeTimer);
      lit?.removeAttribute("data-active");
      lit = chips[i];
      lit.dataset.active = "true";
      gsap.to(tween, {
        totalTime: tween.totalTime() + distance / pxPerSecond,
        duration: reduced ? 0 : 0.75,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => {
          resumeTimer = window.setTimeout(() => {
            lit?.removeAttribute("data-active");
            lit = null;
            if (!reduced) tween.play();
          }, 2600);
        },
      });
    };

    return () => {
      window.clearTimeout(resumeTimer);
      tween.kill();
      st?.kill();
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", resume);
    };
  }, []);

  const items = [...WORK, ...WORK];

  return (
    <section className="clients" aria-label="Clients">
      <div className="shell mb-8 flex items-end justify-between gap-6">
        <p className="t-label label-px text-muted" data-anim="scramble">
          Shipped for
        </p>
        <div className="flex items-center gap-6">
          <p className="t-label hidden text-dim sm:block" data-anim="fade">
            {WORK.length} products · Web · iOS · Android
          </p>
          <div className="mq-nav" role="group" aria-label="Scroll clients">
            <button type="button" className="mq-btn" aria-label="Previous client" onClick={() => stepRef.current(-1)}>
              <PixelArrow size={12} className="rotate-180" />
            </button>
            <button type="button" className="mq-btn" aria-label="Next client" onClick={() => stepRef.current(1)}>
              <PixelArrow size={12} />
            </button>
          </div>
        </div>
      </div>
      <div className="marquee" data-anim="fade" data-delay="0.1">
        <div ref={track} className="marquee-track">
          {items.map((w, i) => {
            const dupe = i >= WORK.length;
            return (
              <TLink
                key={`${w.slug}-${i}`}
                href={`/case-studies/${w.slug}`}
                className="client-chip"
                aria-hidden={dupe || undefined}
                tabIndex={dupe ? -1 : undefined}
                data-cursor="View"
                style={{ "--c": w.accent } as CSSProperties}
              >
                <span className="client-name">{w.name}</span>
                <span className="t-label client-meta">{w.industry}</span>
              </TLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
