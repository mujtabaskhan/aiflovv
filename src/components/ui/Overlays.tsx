"use client";

import { useEffect, useRef } from "react";
import { journey, SECTION_IDS } from "@/lib/journey";

const GRAIN =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="220" height="220" filter="url(#n)" opacity="0.5"/>
    </svg>`,
  );

/**
 * Film grain + a soft radial lift behind the centre of the frame.
 *
 * No grain on phones: a blend mode on a full-screen layer makes the browser
 * composite the entire page underneath it again on every frame of scroll —
 * a real cost on a mobile GPU for texture that small a screen barely shows.
 */
export function Grain() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70] opacity-[0.055] mix-blend-overlay max-md:hidden"
        style={{
          backgroundImage: `url("${GRAIN}")`,
          backgroundSize: "220px 220px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[8]"
        style={{
          background:
            `radial-gradient(120% 85% at 50% 42%, ${scrimStop(0, 0)} 42%,` +
            ` ${scrimStop(0.5, 0.78)} 78%, ${scrimStop(0.85, 0.78)} 100%)`,
        }}
      />
    </>
  );
}

/**
 * Scrims are sized for the dark acts, where the 3D is luminous and copy needs
 * ground under it, and eased off as the page turns light — on paper the type
 * already has all the contrast it needs and a full-strength scrim just hazes.
 */
export const scrimStop = (dark: number, ease = 0.62) =>
  `rgb(var(--scrim-rgb) / calc(${dark} - var(--theme) * ${(dark * ease).toFixed(3)}))`;

const T = scrimStop;

const SCRIMS = {
  vertical:
    `linear-gradient(180deg, ${T(0.88)} 0%, ${T(0.42)} 24%, ${T(0.04)} 44%,` +
    ` ${T(0.12)} 54%, ${T(0.62)} 78%, ${T(0.93)} 100%)`,
  left: `linear-gradient(90deg, ${T(0.92)} 0%, ${T(0.72)} 28%, ${T(0.2)} 48%, ${T(0)} 66%)`,
} as const;

/**
 * Vertical scrim for pinned sections: the 3D sits mid-frame, the copy sits top
 * and bottom, so a little ground at both edges keeps the type crisp without
 * flattening the scene behind it.
 */
export function SectionScrim({
  variant = "vertical",
}: {
  variant?: keyof typeof SCRIMS;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background: SCRIMS[variant] }}
    />
  );
}

const LABELS: Record<string, string> = {
  hero: "Intro",
  manifesto: "Position",
  services: "Services",
  technology: "Stack",
  work: "Work",
  process: "Process",
  about: "Studio",
  insights: "Insights",
  clients: "Clients",
  cta: "Contact",
};

/**
 * Thin journey read-out on the right edge. Updates by writing to the DOM
 * directly so scrolling never triggers a React render.
 */
export function ScrollHUD() {
  const fill = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const value = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let lastLabel = "";

    const tick = () => {
      const p = journey.progress;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      if (value.current) {
        value.current.textContent = String(Math.round(p * 100)).padStart(2, "0");
      }
      const idx = Math.min(SECTION_IDS.length - 1, Math.floor(journey.stage));
      const next = LABELS[SECTION_IDS[idx]] ?? "";
      if (label.current && next !== lastLabel) {
        lastLabel = next;
        label.current.textContent = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      data-chrome
      className="pointer-events-none fixed right-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      <span
        ref={label}
        className="font-mono text-[0.625rem] uppercase tracking-[0.24em] text-mist [writing-mode:vertical-rl]"
      >
        Intro
      </span>
      <span className="relative block h-32 w-px bg-hairline-strong">
        <span
          ref={fill}
          className="absolute inset-0 origin-top scale-y-0 bg-ion"
        />
      </span>
      <span
        ref={value}
        className="font-mono text-[0.625rem] tabular-nums text-mist"
      >
        00
      </span>
    </div>
  );
}

/** Static markup shown when WebGL is unavailable or refused. */
export function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 28%, rgba(40,84,219,0.12) 0%, rgba(244,245,248,0) 64%)," +
            "radial-gradient(60% 50% at 18% 82%, rgba(206,78,38,0.06) 0%, rgba(244,245,248,0) 60%)," +
            "linear-gradient(180deg, #ffffff 0%, #eef1f6 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(40,84,219,0.16) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(40,84,219,0.16) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(70% 55% at 50% 45%, #000 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
