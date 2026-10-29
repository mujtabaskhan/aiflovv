"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { SITE, mailHref, telHref } from "@/content/site";
import { SERVICES } from "@/content/services";
import { WORK } from "@/content/work";
import { POSTS } from "@/content/posts";
import { gsap } from "@/lib/gsap";
import { scroller } from "@/lib/utils";
import { PixelArrow } from "@/components/ui/Pixels";
import { useUi } from "./Providers";
import { useTransition } from "./Transition";

interface Item {
  id: string;
  group: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

/**
 * ⌘K / Ctrl K (or "/") — jump anywhere on the site from the keyboard.
 * A small thing, but it's the detail a developer notices first.
 */
export function CommandPalette() {
  const { paletteOpen: open, setPaletteOpen: setOpen } = useUi();
  const { navigate } = useTransition();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => {
      setOpen(false);
      navigate(href);
    };
    return [
      { id: "home", group: "Pages", label: "Home", hint: "/", keywords: "start index", run: go("/") },
      { id: "services", group: "Pages", label: "Services", hint: "/services", keywords: "what we do", run: go("/services") },
      { id: "work", group: "Pages", label: "Case Studies", hint: "/case-studies", keywords: "work portfolio projects", run: go("/case-studies") },
      { id: "blogs", group: "Pages", label: "Blogs", hint: "/blogs", keywords: "articles notes insights", run: go("/blogs") },
      { id: "contact", group: "Pages", label: "Contact", hint: "/contact", keywords: "talk hire project brief", run: go("/contact") },
      ...SERVICES.map((s) => ({
        id: s.slug,
        group: "Services",
        label: s.title,
        hint: s.group,
        keywords: s.capabilities.map((c) => c.title).join(" "),
        run: go(`/services/${s.slug}`),
      })),
      ...WORK.map((w) => ({
        id: w.slug,
        group: "Case studies",
        label: w.name,
        hint: w.industry,
        keywords: `${w.kind} ${w.stack.join(" ")}`,
        run: go(`/case-studies/${w.slug}`),
      })),
      ...POSTS.map((p) => ({
        id: p.slug,
        group: "Articles",
        label: p.title,
        hint: p.category,
        keywords: p.excerpt,
        run: go(`/blogs/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: copied ? "Copied!" : `Copy email — ${SITE.email}`,
        hint: "clipboard",
        keywords: "mail address",
        run: () => {
          navigator.clipboard?.writeText(SITE.email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          });
        },
      },
      { id: "email", group: "Actions", label: "Write an email", hint: "mail", keywords: "contact", run: () => (window.location.href = mailHref) },
      { id: "call", group: "Actions", label: `Call ${SITE.phone}`, hint: "phone", keywords: "telephone", run: () => (window.location.href = telHref) },
      {
        id: "instagram",
        group: "Actions",
        label: `Instagram ${SITE.instagram.handle}`,
        hint: "social",
        keywords: "social",
        run: () => window.open(SITE.instagram.url, "_blank", "noopener"),
      },
    ];
  }, [copied, navigate, setOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const words = q.split(/\s+/);
    return items.filter((it) => {
      const hay = `${it.label} ${it.group} ${it.hint} ${it.keywords}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [items, query]);

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, [contenteditable]");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      setQuery("");
      setActive(0);
      scroller.lenis?.stop();
      if (panelRef.current) {
        gsap.fromTo(panelRef.current, { y: 14, opacity: 0, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.45 });
      }
    } else if (returnFocus.current) {
      scroller.lenis?.start();
      returnFocus.current.focus?.({ preventScroll: true });
      returnFocus.current = null;
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <>
      <div className="palette-backdrop" onClick={() => setOpen(false)} aria-hidden />
      <div
        ref={panelRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onKeyDown={onKeyDown}
      >
        <div className="relative">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cyan">
            <PixelArrow size={12} />
          </span>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, services, projects, articles…"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `pi-${results[active].id}` : undefined}
            aria-autocomplete="list"
            spellCheck={false}
          />
        </div>
        <div ref={listRef} id="palette-list" className="palette-list" role="listbox" data-lenis-prevent>
          {results.length === 0 && <p className="px-3 py-6 text-sm text-muted">Nothing matches “{query}”.</p>}
          {results.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <div key={it.id}>
                {header && <p className="palette-group t-label">{header}</p>}
                <button
                  type="button"
                  id={`pi-${it.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className="palette-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => it.run()}
                  tabIndex={-1}
                >
                  <span className="truncate">{it.label}</span>
                  <span className="hint">{it.hint}</span>
                </button>
              </div>
            );
          })}
        </div>
        <div className="palette-foot t-label">
          <span>
            <kbd>↑↓</kbd>move
          </span>
          <span>
            <kbd>↵</kbd>open
          </span>
          <span>
            <kbd>esc</kbd>close
          </span>
        </div>
      </div>
    </>
  );
}
