"use client";

import { useEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Reveal";
import { SectionScrim } from "@/components/ui/Overlays";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, EASE } from "@/lib/gsap";
import { PROJECTS } from "@/data/projects";
import { useAppStore } from "@/store/useAppStore";
import { interaction } from "@/lib/interaction";
import { scrollToSection } from "@/components/providers/SmoothScroll";

/**
 * Case studies framed by the 3D portal. Scroll walks the projects; the portal
 * warps and cross-dissolves its generated visual on every change, and the copy
 * cuts with it.
 */
export function Work() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);

  const active = useAppStore((s) => s.activeProject);
  const setActive = useAppStore((s) => s.setActiveProject);
  const project = PROJECTS[active];

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById("work");
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const i = Math.max(
          0,
          Math.min(PROJECTS.length - 1, Math.floor(self.progress * PROJECTS.length)),
        );
        if (i !== activeIndex.current) {
          activeIndex.current = i;
          setActive(i);
        }
      },
    });

    return () => st.kill();
  }, [setActive]);

  // Cut the copy in step with the portal's dissolve.
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        "[data-work-name] > span",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.95, ease: EASE.expo },
      )
        .fromTo(
          "[data-work-body]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: EASE.expo },
          0.08,
        )
        .fromTo(
          "[data-work-meta] > *",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: EASE.expo, stagger: 0.05 },
          0.12,
        )
        .fromTo(
          "[data-work-result]",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: EASE.expo, stagger: 0.06 },
          0.16,
        );
    }, el);

    return () => ctx.revert();
  }, [active]);

  // Pointer state feeds the portal shader.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const enter = () => {
      interaction.portalHover = 1;
    };
    const leave = () => {
      interaction.portalHover = 0;
      interaction.portalPointer.x = 0;
      interaction.portalPointer.y = 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      interaction.portalPointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      interaction.portalPointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointermove", move);
      interaction.portalHover = 0;
    };
  }, []);

  const goToProject = (i: number) => {
    const el = document.getElementById("work");
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    scrollToSection(el, span * ((i + 0.35) / PROJECTS.length));
  };

  return (
    <Section id="work" className="h-[220vh]" label="Selected work">
      <div ref={root} className="h-full">
        <div className="sticky top-0 h-[100svh] overflow-hidden [contain:layout_paint]">
          {/* Invisible hit area matching the 3D portal, so hover reads naturally. */}
          <div
            ref={stage}
            className="absolute left-1/2 top-1/2 hidden h-[46vh] w-[min(52vw,44rem)] -translate-x-1/2 -translate-y-1/2 lg:block"
            data-cursor="hover"
          />

          <SectionScrim />

          <div className="relative z-10 flex h-full flex-col justify-between py-24 md:py-28">
            <div className="shell">
              <div className="flex items-start justify-between">
                <Eyebrow index="03">Selected Work</Eyebrow>
                <span className="font-mono text-[0.6875rem] tabular-nums tracking-[0.18em] text-mist">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-dim"> / {String(PROJECTS.length).padStart(2, "0")}</span>
                </span>
              </div>

              {/* Below lg the portal owns the middle of the frame, so the index
                  lives up here rather than across it. */}
              <ul className="mt-5 flex gap-x-5 overflow-x-auto pb-1 lg:hidden">
                {PROJECTS.map((p, i) => (
                  <li key={p.id} className="shrink-0">
                    <ProjectTab
                      project={p}
                      index={i}
                      active={active === i}
                      onSelect={goToProject}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="shell grid flex-1 grid-cols-12 items-center gap-6 py-6">
              <ul className="col-span-3 hidden lg:flex lg:flex-col">
                {PROJECTS.map((p, i) => (
                  <li key={p.id} className="border-b border-hairline">
                    <ProjectTab
                      project={p}
                      index={i}
                      active={active === i}
                      onSelect={goToProject}
                      block
                    />
                  </li>
                ))}
              </ul>

              <div
                data-work-meta
                className="col-span-12 hidden flex-col gap-4 lg:col-span-3 lg:col-start-10 lg:flex lg:items-end lg:text-right"
              >
                <div>
                  <span className="eyebrow">Industry</span>
                  <p className="mt-1.5 text-[0.9375rem] text-chalk">{project.industry}</p>
                </div>
                <div>
                  <span className="eyebrow">Scope</span>
                  <p className="mt-1.5 text-[0.9375rem] text-chalk">{project.scope}</p>
                </div>
                <div>
                  <span className="eyebrow">Stack</span>
                  <ul className="mt-2 flex flex-wrap justify-end gap-1.5">
                    {project.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-hairline-strong px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.06em] text-fog"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="shell grid grid-cols-12 items-end gap-6 lg:gap-10">
              <div className="col-span-12 lg:col-span-5">
                <h3
                  data-work-name
                  className="display-md overflow-hidden font-display font-medium text-chalk"
                >
                  <span className="block">{project.name}</span>
                </h3>
                <p
                  data-work-body
                  className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-fog"
                >
                  {project.description}
                </p>

                {/* The lg meta column carries these; below lg they belong with
                    the description rather than disappearing. */}
                <ul className="mt-4 flex flex-wrap gap-1.5 lg:hidden">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-hairline-strong px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.06em] text-fog"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="col-span-12 grid grid-cols-3 gap-4 lg:col-span-6 lg:col-start-7 lg:gap-8">
                {project.results.map((r) => (
                  <div key={r.label} data-work-result className="border-t border-hairline pt-3">
                    <dt className="font-display text-[clamp(1.15rem,2vw,1.75rem)] font-medium tracking-[-0.035em] text-chalk">
                      {r.value}
                    </dt>
                    <dd className="mt-1 text-[0.75rem] leading-snug text-mist">{r.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProjectTab({
  project,
  index,
  active,
  onSelect,
  block = false,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  active: boolean;
  onSelect: (i: number) => void;
  block?: boolean;
}) {
  return (
    <button
      type="button"
      data-cursor="hover"
      onClick={() => onSelect(index)}
      className={`group flex items-center gap-3 ${block ? "w-full py-3" : "py-1.5"}`}
    >
      <span
        className={`font-mono text-[0.625rem] transition-colors duration-500 ${
          active ? "text-ion" : "text-dim"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`whitespace-nowrap text-[0.875rem] tracking-[-0.01em] transition-colors duration-500 ${
          active ? "text-chalk" : "text-mist group-hover:text-fog"
        }`}
      >
        {project.name}
      </span>
    </button>
  );
}
