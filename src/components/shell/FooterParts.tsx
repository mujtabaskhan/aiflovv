"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { scrollToTop } from "@/lib/utils";
import { PixelArrow } from "@/components/ui/Pixels";

/** The studio's local time — a quiet reminder there are people in Lahore. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: SITE.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="t-label inline-flex items-center gap-2 text-dim">
      <span className="inline-block h-1.5 w-1.5 animate-pulse bg-cyan" aria-hidden />
      {SITE.city} <span className="text-soft tabular-nums">{time ?? "--:--"}</span> PKT
    </span>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTop(false)}
      className="hit t-label group flex items-center gap-2 text-soft hover:text-ink"
    >
      Top
      <PixelArrow size={10} className="-rotate-90 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}

export function CopyEmail({ email, href }: { email: string; href: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="flex items-center gap-3">
      <a href={href} className="link-px w-fit text-soft hover:text-ink">
        {email}
      </a>
      <button
        type="button"
        className="hit t-label text-dim transition-colors hover:text-cyan"
        onClick={() =>
          navigator.clipboard?.writeText(email).then(() => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          })
        }
        aria-live="polite"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
