import { COMPANY } from "@/data/company";

const ART = {
  wordmark: { file: "aiflovv-wordmark", w: 1195, h: 124 },
  full: { file: "aiflovv-logo", w: 1214, h: 192 },
} as const;

/**
 * The AiFlovv logo in both inks, stacked: navy for the light environment,
 * white wherever an ancestor carries `data-theme="dark"` — the ThemeDriver
 * marks the nav and footer as the page turns dark — so it always reads
 * against the ground, and the swap cross-fades. Size it by height; the width
 * follows the artwork.
 */
export function Logo({
  variant = "wordmark",
  className = "",
}: {
  variant?: keyof typeof ART;
  className?: string;
}) {
  const art = ART[variant];
  const ratio = `${art.w} / ${art.h}`;
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ aspectRatio: ratio }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand art, sized by CSS */}
      <img
        src={`/brand/${art.file}-on-light.png`}
        alt={COMPANY.name}
        width={art.w}
        height={art.h}
        draggable={false}
        className="logo-ink-light absolute inset-0 h-full w-full"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/brand/${art.file}-on-dark.png`}
        alt=""
        aria-hidden
        width={art.w}
        height={art.h}
        draggable={false}
        className="logo-ink-dark absolute inset-0 h-full w-full"
      />
    </span>
  );
}
