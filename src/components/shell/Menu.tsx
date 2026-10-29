"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE, mailHref, telHref } from "@/content/site";
import { SERVICES } from "@/content/services";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, scroller } from "@/lib/utils";
import { ServiceGlyph } from "@/components/ui/Pixels";
import { TLink } from "./TLink";
import { useUi } from "./Providers";

export function Menu() {
  const { menuOpen, setMenuOpen } = useUi();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [svcOpen, setSvcOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const q = gsap.utils.selector(el);
    if (menuOpen) {
      scroller.lenis?.stop();
      setSvcOpen(pathname.startsWith("/services/"));
      gsap
        .timeline()
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "snap" })
        .fromTo(q(".menu-link"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.06 }, 0.25)
        .fromTo(q(".menu-foot > *"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 }, 0.45);
      q<HTMLAnchorElement>(".menu-link")[0]?.focus({ preventScroll: true });
    } else {
      scroller.lenis?.start();
      gsap
        .timeline()
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "snap" })
        .set(el, { visibility: "hidden" });
    }
  }, [menuOpen, pathname]);

  // The services list unfolds under its heading.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const fast = prefersReducedMotion();
    gsap.to(list, { height: svcOpen ? "auto" : 0, duration: fast ? 0 : 0.55, ease: "flow" });
    if (svcOpen) {
      gsap.fromTo(list.querySelectorAll("a"), { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: fast ? 0 : 0.5, stagger: 0.035, delay: 0.08 });
    }
  }, [svcOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <div ref={ref} id="site-menu" className="menu" aria-hidden={!menuOpen} inert={!menuOpen} data-lenis-prevent>
      <div className="shell flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        <nav aria-label="Menu" className="grid">
          <TLink href="/" className="menu-link" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </TLink>
          {NAV.map((l) =>
            l.href === "/services" ? (
              <div key={l.href}>
                <button
                  type="button"
                  className="menu-link menu-svc-toggle"
                  aria-expanded={svcOpen}
                  aria-controls="menu-services"
                  onClick={() => setSvcOpen((o) => !o)}
                >
                  {l.label}
                  <span className="menu-plus" aria-hidden />
                </button>
                <div ref={listRef} id="menu-services" className="menu-svc-list" inert={!svcOpen}>
                  <TLink href="/services" className="t-label" aria-current={pathname === "/services" ? "page" : undefined}>
                    All services →
                  </TLink>
                  {SERVICES.map((s) => (
                    <TLink
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      aria-current={pathname === `/services/${s.slug}` ? "page" : undefined}
                    >
                      <span className="glyph">
                        <ServiceGlyph slug={s.slug} size={15} />
                      </span>
                      {s.title}
                    </TLink>
                  ))}
                </div>
              </div>
            ) : (
              <TLink key={l.href} href={l.href} className="menu-link" aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
                {l.label}
              </TLink>
            ),
          )}
        </nav>
        <div className="menu-foot mt-auto grid gap-6 pt-10">
          <div className="grid content-start gap-2">
            <p className="t-label text-muted">Say hello</p>
            <a href={mailHref} className="text-soft hover:text-ink">
              {SITE.email}
            </a>
            <a href={telHref} className="text-soft hover:text-ink">
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
