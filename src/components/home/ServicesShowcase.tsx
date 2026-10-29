"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/content/services";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { TLink } from "@/components/shell/TLink";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { PixelArrow } from "@/components/ui/Pixels";
import { SectionHead } from "@/components/ui/Section";

/**
 * Four services, one viewport. On wide screens a sticky preview shows the
 * service under the reader — chosen by scroll position, or by hovering a row.
 */
export function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const triggers: ScrollTrigger[] = [];
    const off = onReady(() => {
      list.querySelectorAll<HTMLElement>(".svc-row").forEach((row, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: row,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          }),
        );
      });
    });
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const current = SERVICES[active];

  return (
    <section className="section" id="services">
      <div className="shell">
        <SectionHead
          title={
            <>
              Eight services.
              <br />
              One team.
            </>
          }
          lead="Websites, apps, AI, platforms and the cloud they run on — end-to-end, designed for growth, performance and long-term impact."
        />

        <div className="svc-grid">
          <div className="svc-viewport">
            <div className="svc-frame" data-anim="clip">
              <div className="svc-frame-bar t-label">
                <span className="flex items-center gap-2">
                  <i className="svc-rec" aria-hidden />
                  preview://{current.slug}
                </span>
              </div>
              <div className="svc-stage">
                {SERVICES.map((s, i) => (
                  <div key={s.slug} className="svc-vis" data-on={i === active}>
                    <ServiceVisual slug={s.slug} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol ref={listRef} className="svc-list">
            {SERVICES.map((s, i) => (
              <li key={s.slug} className="svc-row" data-active={i === active} onMouseEnter={() => setActive(i)}>
                <TLink href={`/services/${s.slug}`} className="svc-link" data-cursor="Explore">
                  <h3 className="svc-title">{s.title}</h3>
                  <p className="svc-tagline">{s.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.capabilities.slice(0, 4).map((c) => (
                      <li key={c.title} className="chip">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <span className="svc-more t-label">
                    Explore {s.short}
                    <PixelArrow size={10} />
                  </span>
                </TLink>
                <div className="svc-inline">
                  <ServiceVisual slug={s.slug} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
