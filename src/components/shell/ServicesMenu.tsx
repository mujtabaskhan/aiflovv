"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { SERVICES } from "@/content/services";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { PixelArrow, ServiceGlyph } from "@/components/ui/Pixels";
import { TLink } from "./TLink";

/**
 * The Services mega menu: every service with its pixel icon on the left, and
 * a live preview of whichever one you're pointing at on the right.
 */
export function ServicesMenu({
  open,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: {
  open: boolean;
  onClose: (refocus?: boolean) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) {
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const current = SERVICES[active];

  // Start the preview on the current service page, if we're on one.
  useEffect(() => {
    const i = SERVICES.findIndex((s) => pathname === `/services/${s.slug}`);
    if (i >= 0) setActive(i);
  }, [pathname]);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const fast = prefersReducedMotion();
    gsap.killTweensOf([el, ...q(".sm-item"), ...q(".sm-preview")]);
    if (open) {
      setMounted(true);
      gsap
        .timeline()
        .set(el, { visibility: "visible", pointerEvents: "auto" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: fast ? 0 : 0.55, ease: "snap" })
        .fromTo(q(".sm-item"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: fast ? 0 : 0.6, stagger: 0.035 }, 0.12)
        .fromTo(q(".sm-preview"), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: fast ? 0 : 0.7 }, 0.18);
    } else {
      gsap
        .timeline()
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: fast ? 0 : 0.35, ease: "power2.in" })
        .set(el, { visibility: "hidden", pointerEvents: "none" });
    }
  }, [open]);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    const items = Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>(".sm-item") ?? []);
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      onClose(true);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    }
  };

  return (
    <div
      ref={panel}
      id="services-menu"
      className="sm"
      data-theme="light"
      inert={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onKeyDown={onKeyDown}
    >
      <div className="shell">
        <div className="sm-inner">
          <div className="sm-list">
            <div className="sm-head">
              <p className="t-label text-muted">Services</p>
              <TLink href="/services" className="t-label link-px text-ink" onClick={() => onClose()}>
                All services <PixelArrow size={9} />
              </TLink>
            </div>
            <ul className="sm-grid">
              {SERVICES.map((s, i) => (
                <li key={s.slug}>
                  <TLink
                    href={`/services/${s.slug}`}
                    className="sm-item"
                    data-active={i === active}
                    aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => onClose()}
                  >
                    <span className="sm-glyph">
                      <ServiceGlyph slug={s.slug} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="sm-title">{s.title}</span>
                      <span className="sm-blurb">{s.blurb}</span>
                    </span>
                    <span className="sm-go" aria-hidden>
                      <PixelArrow size={10} />
                    </span>
                  </TLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm-preview" aria-hidden>
            <div className="sm-preview-vis">{mounted && <ServiceVisual key={current.slug} slug={current.slug} className="sm-vis" />}</div>
            <div className="sm-preview-copy" data-theme="dark">
              <p className="t-label text-cyan">{current.group}</p>
              <p className="sm-preview-title">{current.title}</p>
              <p className="sm-preview-tag">{current.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
