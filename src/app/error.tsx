"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PixelArrow } from "@/components/ui/Pixels";
import { PixelField } from "@/components/visuals/PixelField";
import { SITE, mailHref } from "@/content/site";

/** Shown if a page throws while rendering. The nav and footer stay in place. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-hero">
      <PixelField />
      <div className="page-hero-fade" aria-hidden />
      <div className="shell relative">
        <h1 className="page-hero-title t-mega glitch" data-text="Glitch.">
          Glitch.
        </h1>
        <p className="t-lead mt-8 max-w-xl">
          Something on this page broke while loading. Trying again usually fixes it — if it doesn&apos;t, tell us at{" "}
          <a href={mailHref} className="link-px text-ink">
            {SITE.email}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            <span>Try again</span>
            <span className="btn-icon">
              <PixelArrow size={12} />
              <PixelArrow size={12} />
            </span>
          </button>
          <Button href="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
