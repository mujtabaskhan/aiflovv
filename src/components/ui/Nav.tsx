"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { journey, SECTION_IDS } from "@/lib/journey";
import { COMPANY, NAV_LINKS } from "@/data/company";
import { useAppStore } from "@/store/useAppStore";
import { scrollToSection, stopScroll } from "@/components/providers/SmoothScroll";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { InstagramLink } from "./Instagram";

export function Nav() {
  const entered = useAppStore((s) => s.entered);
  const menuOpen = useAppStore((s) => s.menuOpen);
  const setMenuOpen = useAppStore((s) => s.setMenuOpen);

  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState<string>("hero");

  // Poll the journey model rather than subscribing to scroll — this changes at
  // most a handful of times per page, so a rAF diff is cheaper than a store.
  useEffect(() => {
    let id = 0;
    let lastActive = "hero";
    let lastCondensed = false;

    const tick = () => {
      const idx = Math.min(SECTION_IDS.length - 1, Math.floor(journey.stage));
      const id2 = SECTION_IDS[idx];
      if (id2 !== lastActive) {
        lastActive = id2;
        setActive(id2);
      }
      const c = journey.stage > 0.35;
      if (c !== lastCondensed) {
        lastCondensed = c;
        setCondensed(c);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!entered || !bar.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-nav-item]",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: EASE.expo, stagger: 0.06, delay: 0.35 },
      );
    }, bar);
    return () => ctx.revert();
  }, [entered]);

  useIsomorphicLayoutEffect(() => {
    if (!menu.current) return;
    stopScroll(menuOpen);
    const items = menu.current.querySelectorAll("[data-menu-item]");
    if (menuOpen) {
      gsap.set(menu.current, { pointerEvents: "auto" });
      gsap
        .timeline()
        .to(menu.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
        .fromTo(
          items,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: EASE.expo, stagger: 0.05 },
          "-=0.45",
        );
    } else {
      gsap
        .timeline()
        .to(items, { y: -24, opacity: 0, duration: 0.35, ease: "power2.in", stagger: 0.02 })
        .to(
          menu.current,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.65, ease: "expo.inOut" },
          "-=0.15",
        )
        .set(menu.current, { pointerEvents: "none" });
    }
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(href), menuOpen ? 350 : 0);
  };

  return (
    <>
      <header
        ref={bar}
        data-chrome
        // Above the mobile menu overlay: the close button lives in here.
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          condensed ? "py-3" : "py-5 md:py-7"
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              condensed
                ? "glass px-4 py-2.5 md:px-5"
                : "border border-transparent px-0 py-1"
            }`}
          >
            <a
              href="#hero"
              data-nav-item
              data-cursor="hover"
              onClick={(e) => {
                e.preventDefault();
                go("#hero");
              }}
              className="group flex items-center"
              aria-label={`${COMPANY.name} — home`}
            >
              <Logo className="h-[22px] md:h-[26px]" />
            </a>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    data-nav-item
                    data-cursor="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.href);
                    }}
                    className="group relative px-3.5 py-2 text-[0.8125rem] tracking-[-0.01em] transition-colors duration-300"
                  >
                    <span
                      className={
                        isActive ? "text-chalk" : "text-mist group-hover:text-chalk"
                      }
                    >
                      {link.label}
                    </span>
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-ion transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2" data-nav-item>
              <div className="hidden sm:block">
                <Button href="#cta" variant="ghost" size="md" magnetic={false}>
                  Start a Project
                </Button>
              </div>
              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                data-cursor="hover"
                onClick={() => setMenuOpen(!menuOpen)}
                className="grid h-11 w-11 place-items-center rounded-full border border-hairline-strong text-chalk transition-colors hover:border-ion lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                      menuOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-full bg-current transition-all duration-400 ${
                      menuOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        data-chrome
        className="pointer-events-none fixed inset-0 z-[95] flex flex-col justify-center bg-void/95 pt-24 md:backdrop-blur-2xl"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav className="shell flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-menu-item
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              className="group flex items-baseline gap-5 border-b border-hairline py-5"
            >
              <span className="font-mono text-[0.7rem] text-mist">{link.index}</span>
              <span className="display-md text-chalk transition-colors group-hover:text-ion">
                {link.label}
              </span>
            </a>
          ))}
          <div data-menu-item className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <Button href="#cta" variant="primary" size="lg" magnetic={false}>
              Start a Project
            </Button>
            <InstagramLink className="font-mono text-[0.75rem] tracking-[0.06em] text-fog transition-colors hover:text-chalk" />
          </div>
        </nav>
      </div>
    </>
  );
}

