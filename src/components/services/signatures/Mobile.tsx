"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad } from "@/lib/utils";
import { SectionHead, SectionLabel } from "@/components/ui/Section";

const FEATURES = [
  { id: "onboard", title: "Onboarding", body: "Three screens, not ten. People reach the useful part of your app before they lose interest." },
  { id: "home", title: "A home that knows you", body: "Recent activity and the next likely action up front, so the app opens straight into value." },
  { id: "search", title: "Search & discovery", body: "Fast search, filters that respect the thumb, and results that load progressively." },
  { id: "pay", title: "Checkout & payments", body: "Saved details, wallet payments and clear totals — the shortest path from intent to done." },
  { id: "notify", title: "Notifications", body: "Messages that are timely and useful, with controls that stop them becoming noise." },
];

function Screen({ id }: { id: string }) {
  switch (id) {
    case "onboard":
      return (
        <div className="ps ps-onboard">
          <span className="ps-art" />
          <span className="ps-title" />
          <span className="ps-line" />
          <span className="ps-line ps-short" />
          <span className="ps-dots">
            <i className="on" />
            <i />
            <i />
          </span>
          <span className="ps-btn">Get started</span>
        </div>
      );
    case "home":
      return (
        <div className="ps">
          <span className="ps-hello">Good morning</span>
          <span className="ps-card ps-grad" />
          <span className="ps-row" />
          <span className="ps-row" />
          <span className="ps-row" />
          <span className="ps-tabs">
            <i className="on" />
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "search":
      return (
        <div className="ps">
          <span className="ps-search">Search…</span>
          <span className="ps-chips">
            <i className="on" />
            <i />
            <i />
          </span>
          <span className="ps-grid">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "pay":
      return (
        <div className="ps">
          <span className="ps-title" />
          <span className="ps-sum">
            <i />
            <i />
            <b />
          </span>
          <span className="ps-method on" />
          <span className="ps-method" />
          <span className="ps-btn">Pay now</span>
        </div>
      );
    default:
      return (
        <div className="ps ps-notify">
          <span className="ps-toast">Your order is on its way</span>
          <span className="ps-toast ps-t2">New message from support</span>
          <span className="ps-toast ps-t3">Weekly summary is ready</span>
        </div>
      );
  }
}

/** A phone that stays put while the features scroll past; its screen changes with them. */
export function PhoneTour() {
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
    <section className="section" id="overview">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:order-2 lg:col-start-8">
          <div className="pt-phone-wrap lg:sticky lg:top-[calc(var(--nav-h)+2rem)]" aria-hidden>
            <div className="pt-phone" data-theme="dark">
              <div className="pt-screen">
                <div className="pt-status">
                  <span>9:41</span>
                  <i />
                </div>
                {FEATURES.map((f, i) => (
                  <div key={f.id} className="pt-layer" data-active={i === active}>
                    <Screen id={f.id} />
                  </div>
                ))}
              </div>
            </div>
            <p className="t-label mt-6 text-center text-dim">
              {pad(active + 1)} / {pad(FEATURES.length)} · {FEATURES[active].title}
            </p>
          </div>
        </div>
        <div className="lg:col-span-6">
          <h2 className="t-h2" data-anim="lines">
            The parts people
            <br />
            touch every day.
          </h2>
          <ol ref={listRef} className="an-list mt-10">
            {FEATURES.map((f, i) => (
              <li key={f.id} data-active={i === active}>
                <span className="t-label text-cyan">{pad(i + 1)}</span>
                <h3 className="t-h3 mt-3">{f.title}</h3>
                <p className="t-lead mt-3">{f.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const PLATFORMS = [
  {
    id: "ios",
    label: "iOS",
    best: "Your audience is mostly on iPhone, or you need the deepest platform features first.",
    get: "A native iPhone experience, App Store submission and release support.",
    trade: "Android comes later, as a second build.",
  },
  {
    id: "android",
    label: "Android",
    best: "Your market is Android-first, or you need broad device coverage at launch.",
    get: "An app tuned for the devices your customers use, shipped to Google Play.",
    trade: "iPhone users wait for a second build.",
  },
  {
    id: "cross",
    label: "Cross-platform",
    best: "You need both stores at launch and a single team moving fast.",
    get: "One codebase for iOS and Android, with native modules where they matter.",
    trade: "A few platform-specific details take extra care.",
  },
] as const;

/** Native or cross-platform — an honest, side-by-side answer. */
export function PlatformPicker() {
  const [id, setId] = useState<(typeof PLATFORMS)[number]["id"]>("cross");
  const p = PLATFORMS.find((x) => x.id === id)!;
  return (
    <section className="section section-paper">
      <div className="shell">
        <SectionHead
          title={
            <>
              Native or
              <br />
              cross-platform?
            </>
          }
          lead="There's no single right answer. Here's how we decide with you."
        />
        <div className="pp" data-anim="up">
          <div className="pp-tabs" role="tablist" aria-label="Platform">
            {PLATFORMS.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={id === x.id} className="pp-tab" onClick={() => setId(x.id)}>
                <span className="pp-phones" aria-hidden data-which={x.id}>
                  <i />
                  <i />
                </span>
                {x.label}
              </button>
            ))}
          </div>
          <div className="pp-body" key={p.id}>
            <div>
              <p className="t-label text-dim">Best when</p>
              <p className="mt-3 text-lg leading-relaxed">{p.best}</p>
            </div>
            <div>
              <p className="t-label text-dim">What you get</p>
              <p className="mt-3 text-lg leading-relaxed">{p.get}</p>
            </div>
            <div>
              <p className="t-label text-dim">Trade-off</p>
              <p className="mt-3 text-lg leading-relaxed text-soft">{p.trade}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
