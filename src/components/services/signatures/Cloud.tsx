"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { SectionHead } from "@/components/ui/Section";

const STAGES = [
  { id: "commit", label: "Commit", log: "main ← feature/checkout-v2 merged" },
  { id: "build", label: "Build", log: "docker build · image tagged" },
  { id: "test", label: "Test", log: "unit + integration suites passed" },
  { id: "scan", label: "Security scan", log: "dependencies scanned · no known critical issues" },
  { id: "deploy", label: "Deploy", log: "rolling update · new containers healthy" },
  { id: "health", label: "Health check", log: "smoke tests passed · old version retired" },
];

type Status = "idle" | "running" | "done";

/**
 * A deploy you can press. This is the rhythm we set up for every product:
 * merge, and the pipeline builds, tests, scans and ships — no evenings of
 * manual steps. (A simulation; nothing is actually deployed.)
 */
export function DeployConsole() {
  const [stage, setStage] = useState(-1);
  const [status, setStatus] = useState<Status>("idle");
  const timers = useRef<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const run = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    const step = prefersReducedMotion() ? 0 : 650;
    setStatus("running");
    setStage(0);
    STAGES.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(window.setTimeout(() => setStage(i), i * step));
    });
    timers.current.push(window.setTimeout(() => setStatus("done"), STAGES.length * step));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let st: ScrollTrigger | undefined;
    const off = onReady(() => {
      st = ScrollTrigger.create({ trigger: el, start: "top 65%", once: true, onEnter: run });
    });
    return () => {
      off();
      st?.kill();
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, [run]);

  const state = (i: number) => (status === "done" || i < stage ? "done" : i === stage && status === "running" ? "running" : "queued");

  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              Merge.
              <br />
              It ships itself.
            </>
          }
          lead="Every product we run gets a pipeline like this one. Press deploy."
        />
        <div ref={ref} className="dc" data-theme="dark" data-anim="up">
          <div className="dc-head">
            <span className="t-label text-muted">
              <span className="text-cyan">$</span> pipeline · production
            </span>
            <button type="button" className="btn btn-primary btn-sm" onClick={run} disabled={status === "running"}>
              <span>{status === "running" ? "Deploying…" : status === "done" ? "Deploy again" : "Deploy"}</span>
            </button>
          </div>
          <ol className="dc-stages">
            {STAGES.map((s, i) => (
              <li key={s.id} data-state={state(i)}>
                <span className="dc-dot" aria-hidden />
                <span className="dc-name">{s.label}</span>
                <span className="t-label dc-state">{state(i) === "done" ? "passed" : state(i)}</span>
              </li>
            ))}
          </ol>
          <div className="dc-log" aria-live="polite">
            {STAGES.slice(0, status === "done" ? STAGES.length : Math.max(0, stage + 1)).map((s, i) => (
              <p key={s.id}>
                <span className="text-dim">{pad(i + 1)}</span> <b>✓</b> {s.log}
              </p>
            ))}
            {status === "done" && (
              <p className="dc-live">
                <i /> live on production
              </p>
            )}
            {status === "idle" && <p className="text-dim">waiting for a merge…</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
