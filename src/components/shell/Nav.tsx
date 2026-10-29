"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { onReady } from "@/lib/ready";
import { scroller } from "@/lib/utils";
import { TLink } from "./TLink";
import { useUi } from "./Providers";
import { Menu } from "./Menu";
import { ServicesMenu } from "./ServicesMenu";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** Sections the nav should turn light-on-dark over. */
const DARK_SECTIONS = '.hero, .page-hero, .footer, .cta, [data-nav="dark"]';

export function Nav() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen, setPaletteOpen } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const [hover, setHover] = useState<string | null>(null);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const linksRef = useRef<HTMLElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Which ground is under the bar? Sample just below it.
  const sampleTone = useCallback(() => {
    const y = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) * 16 || 72;
    const stack = document.elementsFromPoint(window.innerWidth / 2, y + 2);
    const under = stack.find((el) => !el.closest(".nav, .sm, .px-cover, .cursor, .menu, .palette"));
    setTone(under?.closest(DARK_SECTIONS) ? "dark" : "light");
  }, []);

  // Hide on the way down, return on the way up — never while a menu is open.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const y = scroller.lenis ? scroller.lenis.scroll : window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sampleTone);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sampleTone]);

  useEffect(() => {
    setHidden(false);
    setMenuOpen(false);
    setSvcOpen(false);
    return onReady(() => requestAnimationFrame(sampleTone));
  }, [pathname, setMenuOpen, sampleTone]);

  // Close the services menu on Escape or a click elsewhere.
  useEffect(() => {
    if (!svcOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element;
      if (!t.closest(".sm, .nav-svc")) setSvcOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSvcOpen(false);
        triggerRef.current?.focus();
      }
    };
    // Below the desktop nav the trigger is hidden; the mobile menu takes over.
    const onResize = () => {
      if (!triggerRef.current?.offsetParent) setSvcOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [svcOpen]);

  // A mouse opens the menu on hover, so a click that lands right after the
  // hover must not toggle it shut again.
  const openSvc = () => {
    window.clearTimeout(closeTimer.current);
    if (!svcOpen) openedAt.current = performance.now();
    setSvcOpen(true);
  };
  const toggleSvc = () => {
    if (svcOpen && performance.now() - openedAt.current > 450) setSvcOpen(false);
    else openSvc();
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setSvcOpen(false), 180);
  };

  // The logo's i-dot glides to whichever link is hovered, or rests on the active one.
  useLayoutEffect(() => {
    const nav = linksRef.current;
    const dot = dotRef.current;
    if (!nav || !dot) return;
    const target = hover ?? (svcOpen ? "/services" : null) ?? NAV.find((l) => isActive(pathname, l.href))?.href ?? null;
    const link = target ? nav.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    if (!link) {
      dot.style.opacity = "0";
      return;
    }
    dot.style.opacity = "1";
    dot.style.transform = `translateX(${link.offsetLeft + link.offsetWidth / 2 - 3}px)`;
  }, [hover, pathname, svcOpen]);

  const solid = scrolled || menuOpen || svcOpen;
  const theme = menuOpen ? "dark" : svcOpen ? "light" : tone;

  return (
    <>
      <header
        className="nav"
        data-theme={theme}
        data-scrolled={solid}
        data-open={svcOpen}
        data-hidden={hidden && !menuOpen && !svcOpen}
      >
        <div className="shell nav-inner">
          <TLink href="/" className="nav-logo hit" aria-label="AiFlovv — home">
            <Image className="logo-on-dark" src="/brand/aiflovv-wordmark-on-dark.png" alt="AiFlovv" width={164} height={17} priority />
            <Image className="logo-on-light" src="/brand/aiflovv-wordmark-on-light.png" alt="AiFlovv" width={164} height={17} priority />
          </TLink>

          <nav ref={linksRef} className="nav-links" aria-label="Primary" onMouseLeave={() => setHover(null)}>
            {NAV.map((l) =>
              l.href === "/services" ? (
                <button
                  key={l.href}
                  ref={triggerRef}
                  type="button"
                  data-href={l.href}
                  className="nav-link nav-svc"
                  aria-expanded={svcOpen}
                  aria-controls="services-menu"
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  onPointerEnter={(e) => {
                    setHover(l.href);
                    if (e.pointerType === "mouse") openSvc();
                  }}
                  onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                  onFocus={() => setHover(l.href)}
                  onClick={toggleSvc}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      openSvc();
                      window.setTimeout(() => document.querySelector<HTMLElement>(".sm-item")?.focus(), 60);
                    }
                  }}
                >
                  {l.label}
                  <svg className="nav-caret" viewBox="0 0 5 3" width="9" height="6" aria-hidden shapeRendering="crispEdges">
                    <rect x="0" y="0" width="1" height="1" fill="currentColor" />
                    <rect x="4" y="0" width="1" height="1" fill="currentColor" />
                    <rect x="1" y="1" width="1" height="1" fill="currentColor" />
                    <rect x="3" y="1" width="1" height="1" fill="currentColor" />
                    <rect x="2" y="2" width="1" height="1" fill="currentColor" />
                  </svg>
                </button>
              ) : (
                <TLink
                  key={l.href}
                  href={l.href}
                  data-href={l.href}
                  className="nav-link"
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  onMouseEnter={() => setHover(l.href)}
                  onFocus={() => setHover(l.href)}
                >
                  {l.label}
                </TLink>
              ),
            )}
            <span ref={dotRef} className="nav-indicator" aria-hidden />
          </nav>

          <div className="nav-actions">
            <button type="button" className="nav-cmd" onClick={() => setPaletteOpen(true)} aria-label="Open quick navigation">
              <span>Jump to</span>
              <kbd>{mac ? "⌘" : "Ctrl"} K</kbd>
            </button>
            <Button href="/contact" size="sm" className="nav-cta">
              Start a project
            </Button>
            <button
              type="button"
              className="nav-burger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <ServicesMenu
        open={svcOpen}
        onClose={(refocus) => {
          setSvcOpen(false);
          if (refocus) triggerRef.current?.focus();
        }}
        onPointerEnter={openSvc}
        onPointerLeave={scheduleClose}
      />
      <Menu />
    </>
  );
}
