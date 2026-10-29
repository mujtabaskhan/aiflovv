import type { ReactNode } from "react";
import { SERVICES, type Service } from "@/content/services";
import { WORK } from "@/content/work";
import { BreadcrumbLd } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHead, SectionLabel } from "@/components/ui/Section";
import { PixelArrow, PixelIdenticon, ServiceGlyph } from "@/components/ui/Pixels";
import { PixelEdge } from "@/components/ui/PixelEdge";
import { Faq } from "@/components/ui/Faq";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { PixelField } from "@/components/visuals/PixelField";
import { WorkCard } from "@/components/work/WorkCard";
import { TLink } from "@/components/shell/TLink";
import { cn, pad } from "@/lib/utils";
import { fitStyle } from "@/lib/fit";
import { ApproachCycle, ApproachTimeline } from "./Approach";

/* ------------------------------------------------------------------ Hero */

/**
 * Three hero compositions, so service pages don't all open the same way:
 *   split   — title and copy left, the service's visual right
 *   stacked — a huge title across the page, copy and visual beneath
 *   center  — centred title; the visual straddles the edge into the page
 */
export function ServiceHero({
  service,
  variant = "split",
  visual,
}: {
  service: Service;
  variant?: "split" | "stacked" | "center";
  visual?: ReactNode;
}) {
  const art = visual ?? <ServiceVisual slug={service.slug} className="svc-hero-vis" />;
  const trail = <BreadcrumbLd items={[{ label: "Services", href: "/services" }, { label: service.title }]} />;
  const ctas = (
    <div className="mt-9 flex flex-wrap gap-3" data-anim="up" data-delay="0.4">
      <Button href="/contact" magnetic>
        Start a project
      </Button>
      <Button href="#overview" variant="ghost">
        How it works
      </Button>
    </div>
  );

  if (variant === "center") {
    return (
      <section className="page-hero compact sh sh-center">
        <PixelField />
        <div className="page-hero-fade" aria-hidden />
        {trail}
        <div className="shell relative">
          <div className="sh-center-copy">
            <div className="fit-box">
              <h1 className="t-display fit" style={fitStyle(service.title)} data-anim="chars">
                {service.title}
              </h1>
            </div>
            <p className="t-lead mx-auto mt-7 max-w-2xl" data-anim="up" data-delay="0.3">
              {service.tagline}
            </p>
            <div className="flex justify-center">{ctas}</div>
          </div>
          <div className="sh-straddle" data-anim="up" data-delay="0.2">
            {art}
          </div>
        </div>
        <PixelEdge seed={service.slug} />
      </section>
    );
  }

  return (
    <section className={cn("page-hero compact sh", variant === "stacked" ? "sh-stacked" : "sh-split")}>
      <PixelField />
      <div className="page-hero-fade" aria-hidden />
      {trail}
      <div className="shell relative">
        {variant === "stacked" ? (
          <>
            <div className="page-hero-title fit-box">
              <h1 className="t-mega fit max-w-[16ch]" style={fitStyle(service.title)} data-anim="chars">
                {service.title}
              </h1>
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="t-lead" data-anim="up" data-delay="0.3">
                  {service.tagline}
                </p>
                {ctas}
              </div>
              <div className="lg:col-span-6 lg:col-start-7" data-anim="up" data-delay="0.2">
                {art}
              </div>
            </div>
          </>
        ) : (
          <div className="page-hero-title grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="fit-box">
                <h1 className="t-display fit" style={fitStyle(service.title)} data-anim="chars">
                  {service.title}
                </h1>
              </div>
              <p className="t-lead mt-7 max-w-xl" data-anim="up" data-delay="0.3">
                {service.tagline}
              </p>
              {ctas}
            </div>
            <div className="lg:col-span-6" data-anim="up" data-delay="0.2">
              {art}
            </div>
          </div>
        )}
      </div>
      <PixelEdge seed={service.slug} />
    </section>
  );
}

/* ------------------------------------------------------------------ Intro */

export function ServiceIntro({
  service,
  id = "overview",
  aside,
}: {
  service: Service;
  id?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="section" id={id}>
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:col-start-5">
          <p className="manifesto" data-anim="words">
            {service.summary}
          </p>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <p className="t-label text-dim" data-anim="fade">
                What you get
              </p>
              <ul className="deliver mt-5" data-anim="stagger">
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
            {aside}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Capabilities */

export function Capabilities({
  service,
  variant = "grid",
  title,
  lead,
}: {
  service: Service;
  variant?: "grid" | "list" | "bento";
  title?: ReactNode;
  lead?: string;
}) {
  const heading = title ?? (
    <>
      What&apos;s
      <br />
      included.
    </>
  );

  if (variant === "list") {
    return (
      <section className="section">
        <div className="shell">
          <SectionHead title={heading} lead={lead} />
          <ol className="cap-list" data-anim="stagger" data-stagger="0.07">
            {service.capabilities.map((c, k) => (
              <li key={c.title}>
                <span className="t-label text-cyan">{pad(k + 1)}</span>
                <h3 className="cap-list-title">{c.title}</h3>
                <p className="text-soft">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (variant === "bento") {
    const [first, ...rest] = service.capabilities;
    return (
      <section className="section">
        <div className="shell">
          <SectionHead title={heading} lead={lead} />
          <div className="bento" data-anim="stagger" data-stagger="0.08">
            <div className="bento-hero" data-theme="dark">
              <ServiceGlyph slug={service.slug} size={56} className="text-cyan" />
              <div>
                <p className="t-label text-dim">01 · Core</p>
                <h3 className="t-h3 mt-3">{first.title}</h3>
                <p className="mt-3 max-w-md text-soft">{first.body}</p>
              </div>
            </div>
            {rest.map((c, k) => (
              <div key={c.title} className="bento-cell spot">
                <div className="flex items-start justify-between">
                  <PixelIdenticon seed={c.title} size={34} />
                  <span className="t-label text-dim">{pad(k + 2)}</span>
                </div>
                <h3 className="mt-auto pt-10 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="shell">
        <SectionHead title={heading} lead={lead} />
        <ul className={cn("cap-grid", service.capabilities.length % 3 === 0 && "cap-grid-3")} data-anim="stagger">
          {service.capabilities.map((c, k) => (
            <li key={c.title} className="spot">
              <div className="flex items-start justify-between">
                <PixelIdenticon seed={c.title} className="cap-ico" />
                <span className="t-label text-dim">{pad(k + 1)}</span>
              </div>
              <h3 className="t-h3 mt-auto pt-14">{c.title}</h3>
              <p className="mt-3 max-w-md text-soft">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Approach */

export function Approach({
  service,
  variant = "steps",
  title,
}: {
  service: Service;
  variant?: "steps" | "timeline" | "cycle";
  title?: ReactNode;
}) {
  const heading = title ?? (
    <>
      How it
      <br />
      comes together.
    </>
  );
  if (variant === "timeline") return <ApproachTimeline steps={service.approach} title={heading} />;
  if (variant === "cycle") return <ApproachCycle steps={service.approach} title={heading} />;
  return (
    <section className="section">
      <div className="shell">
        <SectionHead title={heading} lead="The same rhythm on every project — adapted to what this work needs." />
        <div className="approach-line hidden xl:block" data-anim="rule" aria-hidden />
        <ol className="approach" data-anim="stagger" data-stagger="0.12">
          {service.approach.map((a, k) => (
            <li key={a.title}>
              <p className="t-label text-cyan">Step {pad(k + 1)}</p>
              <h3 className="t-h3 mt-4">{a.title}</h3>
              <p className="mt-3 text-soft">{a.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Work, FAQ, next */

export function RelatedWork({ service, title }: { service: Service; title?: ReactNode }) {
  const work = service.work.map((w) => WORK.find((c) => c.slug === w)).filter((w): w is NonNullable<typeof w> => !!w);
  if (!work.length) return null;
  return (
    <section className="section section-paper" id="work">
      <div className="shell">
        <SectionHead
          title={
            title ?? (
              <>
                Built with
                <br />
                this service.
              </>
            )
          }
        />
        <div className={cn("work-grid", work.length === 2 && "work-grid-2")}>
          {work.slice(0, 3).map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>
        <div className="mt-24 lg:mt-32" data-anim="up">
          <Button href="/case-studies" variant="ghost">
            All case studies
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ServiceFaq({ service }: { service: Service }) {
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="t-h2" data-anim="lines">
            Good
            <br />
            questions.
          </h2>
        </div>
        <div className="lg:col-span-8" data-anim="up">
          <Faq items={service.faqs} />
        </div>
      </div>
    </section>
  );
}

export function NextService({ service }: { service: Service }) {
  const i = SERVICES.indexOf(service);
  const next = SERVICES[(i + 1) % SERVICES.length];
  return (
    <TLink href={`/services/${next.slug}`} className="next-link group" data-cursor="Next">
      <div className="shell">
        <div className="flex items-center justify-between gap-8">
          <span className="t-display">{next.title}</span>
          <span className="next-glyph hidden sm:grid">
            <ServiceGlyph slug={next.slug} size={44} />
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-3 text-cyan">
          <span className="t-label">Next service · {next.blurb}</span>
          <PixelArrow size={12} className="next-arrow" />
        </span>
      </div>
    </TLink>
  );
}

/** Small aside listing the other services, for intros. */
export function OtherServices({ service }: { service: Service }) {
  return (
    <div>
      <p className="t-label text-dim" data-anim="fade">
        Pairs well with
      </p>
      <ul className="mt-5 flex flex-wrap gap-2" data-anim="stagger">
        {SERVICES.filter((s) => s.slug !== service.slug)
          .slice(0, 5)
          .map((s) => (
            <li key={s.slug}>
              <TLink href={`/services/${s.slug}`} className="chip hover:text-ink">
                {s.short}
              </TLink>
            </li>
          ))}
      </ul>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Every discipline sits in one team, so strategy, design and engineering ship together.
      </p>
    </div>
  );
}
