"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/Section";

type Step = { title: string; body: string };

/** Steps down the page; a line draws through them as you scroll. */
export function ApproachTimeline({ steps, title }: { steps: Step[]; title: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    const triggers: ScrollTrigger[] = [];
    const off = onReady(() => {
      const line = list.querySelector<HTMLElement>(".tl-progress");
      if (line && !prefersReducedMotion()) {
        triggers.push(
          ScrollTrigger.create({
            trigger: list,
            start: "top 65%",
            end: "bottom 65%",
            onUpdate: (self) => gsap.set(line, { scaleY: self.progress }),
          }),
        );
      }
      list.querySelectorAll<HTMLElement>("li").forEach((li, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: li,
            start: "top 65%",
            onEnter: () => setActive(i),
            onLeaveBack: () => setActive(i - 1),
          }),
        );
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
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)]">
            <h2 className="t-h2" data-anim="lines">
              {title}
            </h2>
          </div>
        </div>
        <ol ref={ref} className="tl lg:col-span-7 lg:col-start-6">
          <span className="tl-track" aria-hidden>
            <i className="tl-progress" />
          </span>
          {steps.map((s, i) => (
            <li key={s.title} data-active={i <= active}>
              <span className="tl-dot" aria-hidden />
              <p className="t-label text-dim">Step {pad(i + 1)}</p>
              <h3 className="t-h3 mt-3">{s.title}</h3>
              <p className="t-lead mt-3 max-w-lg">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** For iterative work: the steps sit on a loop and the active one travels round. */
export function ApproachCycle({ steps, title }: { steps: Step[]; title: ReactNode }) {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    if (prefersReducedMotion()) return () => io.disconnect();
    const id = window.setInterval(() => {
      if (visible.current && !hold) setActive((a) => (a + 1) % steps.length);
    }, 2600);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [hold, steps.length]);

  const n = steps.length;
  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <h2 className="t-h2" data-anim="lines">
              {title}
            </h2>
          </div>
          <p className="t-lead" data-anim="up">
            It doesn&apos;t end at launch. Each turn of the loop uses what real usage taught us.
          </p>
        </div>
        <div ref={ref} className="cycle" data-anim="up" onPointerLeave={() => setHold(false)}>
          <div className="cycle-ring" aria-hidden>
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="84" className="cycle-track" />
              <circle
                cx="100"
                cy="100"
                r="84"
                className="cycle-arc"
                style={{ strokeDashoffset: 528 - (528 * (active + 1)) / n }}
              />
            </svg>
            {steps.map((s, i) => {
              const a = (i / n) * Math.PI * 2 - Math.PI / 2;
              return (
                <span
                  key={s.title}
                  className="cycle-node"
                  data-active={i === active}
                  style={{ left: `${50 + Math.cos(a) * 42}%`, top: `${50 + Math.sin(a) * 42}%` }}
                />
              );
            })}
            <div className="cycle-core">
              <span className="t-label text-dim">Step {pad(active + 1)}</span>
              <span className="cycle-word">{steps[active].title}</span>
            </div>
          </div>
          <ol className="cycle-list">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => {
                    setActive(i);
                    setHold(true);
                  }}
                  onPointerEnter={() => {
                    setActive(i);
                    setHold(true);
                  }}
                >
                  <span className="t-label text-cyan">{pad(i + 1)}</span>
                  <span className="cycle-title">{s.title}</span>
                  <span className="cycle-body">{s.body}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
