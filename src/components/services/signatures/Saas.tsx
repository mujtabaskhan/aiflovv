"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { SectionHead, SectionLabel } from "@/components/ui/Section";

const MODULES = [
  { id: "auth", label: "Accounts & roles", note: "Sign-up, teams, invitations and permissions." },
  { id: "billing", label: "Billing & plans", note: "Trials, upgrades, invoices and dunning." },
  { id: "tenancy", label: "Multi-tenancy", note: "Each customer's data separated and secure." },
  { id: "admin", label: "Admin console", note: "Support customers and manage the product." },
  { id: "analytics", label: "Usage analytics", note: "See which features earn their keep." },
  { id: "api", label: "Public API", note: "Let customers connect your product to theirs." },
];

/** A SaaS, assembled: switch modules on and off and watch the product take shape. */
export function SaasBlocks() {
  const [on, setOn] = useState<string[]>(MODULES.map((m) => m.id));
  const ready = Math.round((on.length / MODULES.length) * 100);
  const toggle = (id: string) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              Everything around
              <br />
              the core feature.
            </>
          }
          lead="Your idea is the core. These are the parts every SaaS needs around it — switch them off to see what's missing."
        />
        <div className="sb" data-anim="up">
          <ul className="sb-list">
            {MODULES.map((m, i) => {
              const active = on.includes(m.id);
              return (
                <li key={m.id}>
                  <button type="button" className="sb-toggle" role="switch" aria-checked={active} onClick={() => toggle(m.id)}>
                    <span className="sb-switch" aria-hidden>
                      <i />
                    </span>
                    <span className="min-w-0">
                      <span className="sb-label">
                        <span className="t-label mr-2 text-dim">{pad(i + 1)}</span>
                        {m.label}
                      </span>
                      <span className="sb-note">{m.note}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="sb-diagram" data-theme="dark" aria-hidden>
            <div className="sb-core">
              <span className="t-label text-dim">your product</span>
              <span className="sb-core-title">Core feature</span>
            </div>
            {MODULES.map((m, i) => (
              <span key={m.id} className={`sb-mod sb-m${i}`} data-on={on.includes(m.id)}>
                {m.label}
              </span>
            ))}
            <div className="sb-meter">
              <span className="t-label">Launch readiness</span>
              <span className="sb-bar">
                <i style={{ transform: `scaleX(${ready / 100})` }} />
              </span>
              <span className="t-label tabular-nums">{ready}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STAGES = [
  {
    title: "MVP",
    when: "Prove it works",
    items: ["One customer type", "The core job, done properly", "Sign-up and basic billing", "Feedback loop with first users"],
  },
  {
    title: "Launch",
    when: "Ready for strangers",
    items: ["Onboarding that teaches itself", "Plans, trials and invoices", "Admin console for support", "Monitoring and backups"],
  },
  {
    title: "Scale",
    when: "Growing on purpose",
    items: ["Teams, roles and audit trails", "Public API and integrations", "Performance and cost tuning", "New plans and markets"],
  },
];

/** MVP → Launch → Scale, with a line that fills as you scroll. */
export function SaasRoadmap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      const bar = el.querySelector(".rm-fill");
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 60%",
        onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }),
      });
    });
    return () => {
      off();
      st?.kill();
    };
  }, []);

  return (
    <section className="section">
      <div className="shell">
        <h2 className="t-h2" data-anim="lines">
          From first version
          <br />
          to platform.
        </h2>
        <div ref={ref} className="rm mt-16">
          <div className="rm-track" aria-hidden>
            <i className="rm-fill" />
          </div>
          <ol className="rm-stages" data-anim="stagger" data-stagger="0.12">
            {STAGES.map((s, i) => (
              <li key={s.title}>
                <span className="rm-node" aria-hidden />
                <p className="t-label text-cyan">
                  Stage {pad(i + 1)} · {s.when}
                </p>
                <h3 className="t-h2 mt-4">{s.title}</h3>
                <ul className="deliver mt-6">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
