"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad } from "@/lib/utils";
import { SectionHead, SectionLabel } from "@/components/ui/Section";

const DEVICES = [
  { id: "desktop", label: "Desktop", note: "Room for the full story: wide layouts, side-by-side media, everything visible." },
  { id: "tablet", label: "Tablet", note: "Columns regroup and touch targets grow; nothing important is hidden." },
  { id: "phone", label: "Phone", note: "One column, a thumb-reachable menu and the call to action always in reach." },
] as const;

/**
 * Not a picture of a responsive site — a responsive site. The mock below is
 * laid out with container queries, so it genuinely reflows as the frame
 * changes width.
 */
export function DeviceSwitcher() {
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");
  const current = DEVICES.find((d) => d.id === device)!;

  return (
    <section className="section section-paper">
      <div className="shell">
        <SectionHead
          title={
            <>
              One site.
              <br />
              Every screen.
            </>
          }
          lead="Layouts are designed for each breakpoint — not squeezed. Switch devices and watch the same page reflow."
        />
        <div className="dv" data-anim="up">
          <div className="dv-tabs" role="tablist" aria-label="Preview device">
            {DEVICES.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={device === d.id}
                className="chip"
                aria-pressed={device === d.id}
                onClick={() => setDevice(d.id)}
              >
                {d.label}
              </button>
            ))}
            <p className="dv-note" aria-live="polite">
              {current.note}
            </p>
          </div>
          <div className="dv-stage" data-theme="dark">
            <div className="dv-frame" data-device={device}>
              <div className="dv-chrome">
                <i />
                <i />
                <i />
                <span>yourbrand.com</span>
              </div>
              <div className="dv-site">
                <div className="dv-nav">
                  <span className="dv-logo" />
                  <span className="dv-links">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="dv-burger" />
                </div>
                <div className="dv-hero">
                  <div className="dv-copy">
                    <span className="dv-k" />
                    <span className="dv-h" />
                    <span className="dv-h dv-short" />
                    <span className="dv-p" />
                    <span className="dv-btn" />
                  </div>
                  <span className="dv-media" />
                </div>
                <div className="dv-cards">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ANATOMY = [
  { id: "nav", title: "Navigation", body: "Clear paths to what visitors came for — in two clicks, not five." },
  { id: "hero", title: "The first screen", body: "Say what you do in one line, show it, and offer one obvious next step." },
  { id: "proof", title: "Proof", body: "Real work, real clients and specifics that earn trust faster than adjectives." },
  { id: "convert", title: "Conversion", body: "Forms and calls to action placed where intent peaks, with as few fields as possible." },
  { id: "foot", title: "Footer & SEO", body: "Structured data, sitemaps and metadata — the details search engines actually read." },
];

/** A page, taken apart: each region lights up as you read about it. */
export function PageAnatomy() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const triggers: ScrollTrigger[] = [];
    const off = onReady(() => {
      list.querySelectorAll<HTMLElement>("li").forEach((li, i) => {
        triggers.push(ScrollTrigger.create({ trigger: li, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i) }));
      });
    });
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <h2 className="t-h2" data-anim="lines">
              Every part
              <br />
              has a job.
            </h2>
            <div className="an-page mt-10" data-theme="dark" aria-hidden>
              {ANATOMY.map((a, i) => (
                <div key={a.id} className={`an-region an-${a.id}`} data-active={i === active}>
                  <span className="an-tag t-label">
                    {pad(i + 1)} {a.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ol ref={listRef} className="an-list lg:col-span-6 lg:col-start-7">
          {ANATOMY.map((a, i) => (
            <li key={a.id} data-active={i === active}>
              <span className="t-label text-cyan">{pad(i + 1)}</span>
              <h3 className="t-h3 mt-3">{a.title}</h3>
              <p className="t-lead mt-3">{a.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
