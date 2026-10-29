"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/content/process";
import { ScrollTrigger } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { SectionLabel } from "@/components/ui/Section";

type Status = "done" | "running" | "queued";

/**
 * The process, run like a CI pipeline: as you read each stage, the job list
 * on the left ticks it off and starts the next.
 */
export function Pipeline() {
  const [active, setActive] = useState(-1);
  const stepsRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;
    const triggers: ScrollTrigger[] = [];
    const off = onReady(() => {
      list.querySelectorAll<HTMLElement>("[data-step]").forEach((el, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 62%",
            end: "bottom 62%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
            onLeaveBack: () => i === 0 && setActive(-1),
          }),
        );
      });
    });
    return () => {
      off();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const status = (i: number): Status => (i < active ? "done" : i === active ? "running" : "queued");
  const progress = Math.max(0, (active + 1) / PROCESS.length);

  return (
    <section className="section" id="process">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="pipe-sticky">
            <h2 className="t-h2" data-anim="lines">
              How we ship.
            </h2>
            <div className="pipe-console mt-10" data-anim="up">
              <div className="pipe-cmd t-label">
                <span className="text-cyan">$</span> aiflovv ship --project=yours
              </div>
              <ol className="pipe-jobs">
                {PROCESS.map((s, i) => (
                  <li key={s.id} className="pipe-job" data-status={status(i)}>
                    <span className="pipe-dot" aria-hidden />
                    <span className="pipe-name">{s.title}</span>
                    <span className="pipe-state t-label">
                      {status(i) === "done" ? "passed" : status(i) === "running" ? "running" : "queued"}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="pipe-bar" aria-hidden>
                <i style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>
          </div>
        </div>

        <ol ref={stepsRef} className="lg:col-span-7">
          {PROCESS.map((s, i) => (
            <li key={s.id} data-step className="pipe-step" data-active={i === active}>
              <span className="pipe-num">{s.index}</span>
              <h3 className="t-h2 mt-4">{s.title}</h3>
              <p className="t-lead mt-5 max-w-xl">{s.body}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {s.outputs.map((o) => (
                  <li key={o} className="chip">
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
