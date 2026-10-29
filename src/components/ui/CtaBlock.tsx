import type { ReactNode } from "react";
import { SITE, mailHref } from "@/content/site";
import { hashString, mulberry32 } from "@/lib/utils";
import { Button } from "./Button";
import { fitStyle } from "@/lib/fit";

/** Pixels that blink on the blue field — placed deterministically. */
function Twinkle() {
  const rand = mulberry32(hashString("cta"));
  const cells = Array.from({ length: 46 }, () => ({
    x: Math.floor(rand() * 24),
    y: Math.floor(rand() * 12),
    d: rand() * 6,
    t: 2.4 + rand() * 3,
  }));
  return (
    <svg className="cta-twinkle" viewBox="0 0 24 12" preserveAspectRatio="xMaxYMid slice" aria-hidden>
      {cells.map((c, i) => (
        <rect
          key={i}
          x={c.x + 0.1}
          y={c.y + 0.1}
          width={0.8}
          height={0.8}
          style={{ animationDelay: `${c.d.toFixed(2)}s`, animationDuration: `${c.t.toFixed(2)}s` }}
        />
      ))}
    </svg>
  );
}

export function CtaBlock({
  title = (
    <>
      Let&apos;s build
      <br />
      what&apos;s next.
    </>
  ),
  body = "Have an idea, a challenge or an ambitious project? Tell us about it — we'll help you turn it into a product built for real impact.",
  children,
}: {
  title?: ReactNode;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="cta" aria-label="Start a project">
      <Twinkle />
      <div className="shell relative">
        <div className="fit-box">
          <h2 className="cta-title fit" style={fitStyle(title)} data-anim="chars">
            {title}
          </h2>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="cta-body lg:col-span-5" data-anim="up">
            {body}
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-7 lg:justify-end" data-anim="up" data-delay="0.1">
            {children ?? (
              <>
                <Button href="/contact" variant="light" magnetic>
                  Start a project
                </Button>
                <a href={mailHref} className="cta-mail link-px">
                  {SITE.email}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
