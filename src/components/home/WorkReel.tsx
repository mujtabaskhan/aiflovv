"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FEATURED, WORK } from "@/content/work";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { isMouse, pad, prefersReducedMotion } from "@/lib/utils";
import { TLink } from "@/components/shell/TLink";
import { PixelArrow } from "@/components/ui/Pixels";
import { SectionLabel } from "@/components/ui/Section";

/**
 * Selected work as a reel: on wide screens the section pins and vertical
 * scrolling drives the posters sideways. On touch it's a native swipe.
 */
export function WorkReel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    // Pin an inner wrapper, never the component's root: ScrollTrigger wraps
    // the pinned node in a spacer, and React must still find the root where
    // it left it when the page unmounts.
    const inner = sec?.querySelector<HTMLElement>(".reel-inner");
    if (!sec || !tr || !inner) return;
    let mm: gsap.MatchMedia | undefined;
    const off = onReady(() => {
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          const distance = () => tr.scrollWidth - window.innerWidth;
          const tween = gsap.to(tr, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: inner,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: inner,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => setIndex(Math.min(FEATURED.length - 1, Math.floor(self.progress * FEATURED.length))),
            },
          });
          // Posters lean into the direction of travel.
          const cards = gsap.utils.toArray<HTMLElement>(".reel-card", tr);
          cards.forEach((card) => {
            gsap.fromTo(
              card.querySelector(".reel-poster"),
              { rotateY: -18, scale: 0.92 },
              {
                rotateY: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tween,
                  start: "left right",
                  end: "center 60%",
                  scrub: true,
                },
              },
            );
          });
        });
      ScrollTrigger.refresh();
    });

    // Tilt toward the pointer.
    const cleanups: (() => void)[] = [];
    if (!prefersReducedMotion()) {
      tr.querySelectorAll<HTMLElement>(".reel-tilt").forEach((el) => {
        const move = (e: PointerEvent) => {
          if (!isMouse(e)) return;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 14}deg`);
          el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 14}deg`);
        };
        const leave = () => {
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      off();
      mm?.revert();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <section ref={section} className="reel" id="work" aria-labelledby="work-title">
      <div className="reel-inner">
        <div className="shell reel-head">
          <div>
            <h2 id="work-title" className="t-h2" data-anim="lines">
              Shipped, not
              <br />
              just designed.
            </h2>
          </div>
          <div className="hidden items-end gap-8 lg:flex">
            <p className="reel-count" aria-hidden>
              <span>{pad(index + 1)}</span>
              <span className="text-dim">/{pad(FEATURED.length)}</span>
            </p>
          </div>
        </div>

        <div className="reel-scroller" data-lenis-prevent-touch>
          <div ref={track} className="reel-track">
            {FEATURED.map((w, i) => (
              <article key={w.slug} className="reel-card" style={{ "--c": w.accent } as CSSProperties}>
                <TLink href={`/case-studies/${w.slug}`} className="block" data-cursor="View">
                  <div className="reel-tilt">
                    <div className="reel-poster">
                      <Image
                        src={w.image}
                        alt={`${w.name} — ${w.kind.toLowerCase()} for ${w.industry.toLowerCase()}`}
                        width={360}
                        height={509}
                        sizes="(min-width: 1024px) 360px, 72vw"
                      />
                      <span className="reel-glare" aria-hidden />
                    </div>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="t-label text-dim">
                        {pad(i + 1)} · {w.kind}
                      </p>
                      <h3 className="t-h3 mt-2">{w.name}</h3>
                      <p className="mt-2 max-w-[22rem] text-sm text-muted">{w.summary}</p>
                    </div>
                    <span className="reel-go" aria-hidden>
                      <PixelArrow size={12} />
                    </span>
                  </div>
                </TLink>
              </article>
            ))}
            <TLink href="/case-studies" className="reel-all" data-cursor="Open">
              <span className="t-label text-muted">Archive</span>
              <span className="t-h2">
                All {WORK.length}
                <br />
                projects
              </span>
              <PixelArrow size={22} className="text-cyan" />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
