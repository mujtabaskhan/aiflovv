"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, GLYPHS } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { SectionHead } from "@/components/ui/Section";
import { PixelIdenticon } from "@/components/ui/Pixels";

const CASES = [
  {
    id: "support",
    label: "Support inbox",
    input: "“Hi — I was charged twice for order #4821. Can you refund one of them?”",
    understand: ["intent: refund", "order: #4821", "tone: polite", "priority: normal"],
    act: "Drafted a reply, attached the duplicate charge and queued a refund for approval.",
    review: "Agent approves the refund and sends the reply.",
  },
  {
    id: "invoice",
    label: "Invoice processing",
    input: "invoice_0427.pdf — 3 pages, scanned",
    understand: ["vendor: matched", "total: extracted", "due date: found", "PO: 1 line differs"],
    act: "Prepared the bill in accounting and flagged the line that doesn't match the purchase order.",
    review: "Finance checks the flagged line, then posts the bill.",
  },
  {
    id: "search",
    label: "Knowledge search",
    input: "“What's our refund window for annual plans?”",
    understand: ["topic: billing policy", "plan: annual", "sources: 2 documents"],
    act: "Answered in plain language and linked the two policy pages it used.",
    review: "The answer shows its sources — anyone can check them.",
  },
] as const;

const STAGES = ["Input", "Understand", "Act", "Review"];

/**
 * An illustrative walk through an AI workflow. Choose a use case and watch it
 * move from raw input to a human checkpoint. Nothing here is a live model —
 * it's the shape of the systems we build.
 */
export function AiDemo() {
  const [caseId, setCaseId] = useState<(typeof CASES)[number]["id"]>("support");
  const [stage, setStage] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const actRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  const c = CASES.find((x) => x.id === caseId)!;

  // Run through the stages whenever the case changes (once visible).
  useEffect(() => {
    if (!started.current) return;
    const reduced = prefersReducedMotion();
    setStage(reduced ? 3 : 0);
    if (reduced) return;
    const timers = [1, 2, 3].map((s) => window.setTimeout(() => setStage(s), s * 1100));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [caseId]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        once: true,
        onEnter: () => {
          started.current = true;
          setCaseId((id) => id);
          setStage(0);
          [1, 2, 3].forEach((s) => window.setTimeout(() => setStage(s), s * 1100));
        },
      });
    });
    return () => {
      off();
      st?.kill();
    };
  }, []);

  useEffect(() => {
    if (stage === 2 && actRef.current && !prefersReducedMotion()) {
      gsap.fromTo(actRef.current, { scrambleText: { text: " ", chars: GLYPHS } }, { duration: 0.9, scrambleText: { text: c.act, chars: GLYPHS, speed: 0.8 } });
    }
  }, [stage, c.act]);

  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              From inbox
              <br />
              to done.
            </>
          }
          lead="Pick a use case. Every system we build follows the same shape: understand the input, act on it, and hand anything consequential to a person."
        />
        <div ref={ref} className="ai" data-anim="up">
          <div className="ai-tabs" role="tablist" aria-label="Use case">
            {CASES.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={caseId === x.id}
                className="chip"
                aria-pressed={caseId === x.id}
                onClick={() => {
                  started.current = true;
                  setCaseId(x.id);
                }}
              >
                {x.label}
              </button>
            ))}
            <span className="t-label ml-auto hidden text-dim md:inline">Illustrative example</span>
          </div>
          <div className="ai-board" data-theme="dark">
            <div className="ai-rail" aria-hidden>
              {STAGES.map((s, i) => (
                <span key={s} data-on={i <= stage}>
                  {pad(i + 1)} {s}
                </span>
              ))}
              <i style={{ transform: `scaleX(${Math.max(0, (stage + 1) / STAGES.length)})` }} />
            </div>
            <div className="ai-cols">
              <div className="ai-col" data-on={stage >= 0}>
                <p className="t-label text-dim">Input</p>
                <p className="ai-input">{c.input}</p>
              </div>
              <div className="ai-col" data-on={stage >= 1}>
                <p className="t-label text-dim">Understand</p>
                <ul className="ai-tags">
                  {c.understand.map((u, i) => (
                    <li key={u} style={{ transitionDelay: `${i * 0.12}s` }}>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ai-col" data-on={stage >= 2}>
                <p className="t-label text-dim">Act</p>
                <p ref={actRef} className="ai-act">
                  {c.act}
                </p>
              </div>
              <div className="ai-col ai-review" data-on={stage >= 3}>
                <p className="t-label text-dim">Review</p>
                <p className="ai-act">{c.review}</p>
                <span className="ai-approve">
                  <i /> Human approves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const RULES = [
  { title: "Grounded in your data", body: "Answers come from your documents and records — with sources shown — not from the model's imagination." },
  { title: "A person where it matters", body: "Anything with money, legal or customer consequences waits for human approval." },
  { title: "Measured, not assumed", body: "Every feature ships with a test set, so we know how often it's right before and after changes." },
  { title: "Private by default", body: "Providers that don't train on your data, and sensitive fields kept out of prompts that don't need them." },
];

export function Guardrails() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHead
          title={
            <>
              Designed for the
              <br />
              wrong answer.
            </>
          }
          lead="Every model is sometimes wrong. The systems around it decide whether that's a shrug or a problem."
        />
        <ul className="rules" data-anim="stagger" data-stagger="0.1">
          {RULES.map((r, i) => (
            <li key={r.title} className="spot">
              <PixelIdenticon seed={r.title} size={40} />
              <span className="t-label mt-8 block text-dim">Rule {pad(i + 1)}</span>
              <h3 className="t-h3 mt-3">{r.title}</h3>
              <p className="mt-3 text-soft">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
