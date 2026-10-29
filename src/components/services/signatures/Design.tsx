"use client";

import { useState, type CSSProperties } from "react";
import { SectionHead } from "@/components/ui/Section";
import { CompareSlider } from "../CompareSlider";

const ACCENTS = [
  { id: "blue", hex: "#2453e8" },
  { id: "cyan", hex: "#0a7cc2" },
  { id: "violet", hex: "#6d4ae8" },
  { id: "green", hex: "#14915f" },
];
const RADII = [0, 6, 16];
const DENSITY = ["compact", "comfortable"] as const;

/**
 * A design system in miniature: change a token and every component follows,
 * the same way a real one keeps a product consistent.
 */
export function DesignPlayground() {
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [radius, setRadius] = useState(6);
  const [density, setDensity] = useState<(typeof DENSITY)[number]>("comfortable");
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(true);
  const pad = density === "compact" ? 12 : 18;

  const vars = {
    "--pg-accent": accent.hex,
    "--pg-radius": `${radius}px`,
    "--pg-pad": `${pad}px`,
  } as CSSProperties;

  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              Change a token.
              <br />
              Watch it ripple.
            </>
          }
          lead="A design system is a set of decisions made once. Adjust them here and every component follows — exactly how we keep products consistent as they grow."
        />
        <div className="pg" data-anim="up">
          <div className="pg-controls">
            <fieldset>
              <legend className="t-label text-dim">Accent</legend>
              <div className="pg-row">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className="pg-swatch"
                    style={{ background: a.hex }}
                    aria-pressed={accent.id === a.id}
                    aria-label={`${a.id} accent`}
                    onClick={() => setAccent(a)}
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="t-label text-dim">Corner radius</legend>
              <div className="pg-row">
                {RADII.map((r) => (
                  <button key={r} type="button" className="chip chip-plain" aria-pressed={radius === r} onClick={() => setRadius(r)}>
                    {r}px
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="t-label text-dim">Density</legend>
              <div className="pg-row">
                {DENSITY.map((d) => (
                  <button key={d} type="button" className="chip chip-plain" aria-pressed={density === d} onClick={() => setDensity(d)}>
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="t-label text-dim">Theme</legend>
              <div className="pg-row">
                <button type="button" className="chip chip-plain" aria-pressed={!dark} onClick={() => setDark(false)}>
                  light
                </button>
                <button type="button" className="chip chip-plain" aria-pressed={dark} onClick={() => setDark(true)}>
                  dark
                </button>
              </div>
            </fieldset>
            <pre className="pg-tokens" data-theme="dark" aria-label="Current design tokens">
              <span className="k">tokens</span> = {"{"}
              {"\n"}  accent: <span className="s">&quot;{accent.hex}&quot;</span>,
              {"\n"}  radius: <span className="s">{radius}</span>,
              {"\n"}  space: <span className="s">{pad}</span>,
              {"\n"}  theme: <span className="s">&quot;{dark ? "dark" : "light"}&quot;</span>
              {"\n"}
              {"}"}
            </pre>
          </div>
          <div className="pg-preview" data-theme={dark ? "dark" : "light"} style={vars}>
            <div className="pg-card">
              <span className="pg-img" />
              <div className="pg-body">
                <span className="pg-tag">New</span>
                <p className="pg-title">Weekly planner</p>
                <p className="pg-text">Plan the week in minutes, share it with your team.</p>
                <div className="pg-actions">
                  <button type="button" className="pg-btn">
                    Get started
                  </button>
                  <button type="button" className="pg-btn pg-btn-ghost">
                    Preview
                  </button>
                </div>
              </div>
            </div>
            <div className="pg-form">
              <label className="pg-field">
                <span>Email</span>
                <span className="pg-input">you@company.com</span>
              </label>
              <button type="button" className="pg-switch" role="switch" aria-checked={toggle} onClick={() => setToggle(!toggle)}>
                <i />
                Email me updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Wire() {
  return (
    <div className="wf" aria-hidden>
      <div className="wf-nav">
        <span />
        <span className="wf-links" />
      </div>
      <div className="wf-hero">
        <div>
          <span className="wf-h" />
          <span className="wf-h wf-s" />
          <span className="wf-p" />
          <span className="wf-btn" />
        </div>
        <span className="wf-img">image</span>
      </div>
      <div className="wf-cards">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function Final() {
  return (
    <div className="fn" aria-hidden>
      <div className="fn-nav">
        <span className="fn-logo" />
        <span className="fn-links">
          <i />
          <i />
          <i />
        </span>
        <span className="fn-cta" />
      </div>
      <div className="fn-hero">
        <div>
          <span className="fn-k">Planning, simplified</span>
          <span className="fn-h">Your week,</span>
          <span className="fn-h">sorted.</span>
          <span className="fn-p" />
          <span className="fn-btn">Get started</span>
        </div>
        <span className="fn-img" />
      </div>
      <div className="fn-cards">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function WireToFinal() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHead
          title={
            <>
              Structure first.
              <br />
              Polish second.
            </>
          }
          lead="We settle what goes where in wireframes, then design the finish. Drag to see both."
        />
        <div data-anim="up">
          <CompareSlider before={<Wire />} after={<Final />} beforeLabel="Wireframe" afterLabel="Final UI" start={50} />
        </div>
      </div>
    </section>
  );
}
