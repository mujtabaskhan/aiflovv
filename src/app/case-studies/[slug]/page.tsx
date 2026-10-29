import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { WORK, workBySlug } from "@/content/work";
import { SERVICES } from "@/content/services";
import { BreadcrumbLd } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/Section";
import { PixelArrow } from "@/components/ui/Pixels";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { PixelField } from "@/components/visuals/PixelField";
import { TiltPoster } from "@/components/work/TiltPoster";
import { TLink } from "@/components/shell/TLink";
import { pad } from "@/lib/utils";
import { pageMeta } from "@/lib/meta";
import { fitStyle } from "@/lib/fit";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = workBySlug(slug);
  if (!w) return {};
  return pageMeta({
    title: `${w.name} — ${w.industry} case study`,
    shareTitle: `${w.name} — ${w.industry} case study by AiFlovv`,
    description: `${w.summary} ${w.kind} by AiFlovv.`,
    path: `/case-studies/${w.slug}`,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const w = workBySlug(slug);
  if (!w) notFound();
  const i = WORK.indexOf(w);
  const next = WORK[(i + 1) % WORK.length];
  const services = w.services.map((s) => SERVICES.find((x) => x.slug === s)!).filter(Boolean);

  return (
    <div style={{ "--accent": w.accent } as CSSProperties}>
      <section className="page-hero compact">
        <PixelField accent={w.accent} />
        <div className="page-hero-fade" aria-hidden />
        <BreadcrumbLd items={[{ label: "Case studies", href: "/case-studies" }, { label: w.name }]} />
        <div className="shell relative">
          <div className="page-hero-title fit-box">
            <h1 className="t-mega fit" style={fitStyle(w.name)} data-anim="chars">
              {w.name}
            </h1>
          </div>
          <p className="t-lead mt-8 max-w-2xl" data-anim="up" data-delay="0.3">
            {w.summary}
          </p>
        </div>
      </section>

      <div className="shell">
        <dl className="case-meta" data-anim="up">
          <div>
            <dt className="t-label text-dim">Industry</dt>
            <dd className="mt-2">{w.industry}</dd>
          </div>
          <div>
            <dt className="t-label text-dim">Platforms</dt>
            <dd className="mt-2">{w.platforms.join(" · ")}</dd>
          </div>
          <div>
            <dt className="t-label text-dim">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {services.map((s) => (
                <TLink key={s.slug} href={`/services/${s.slug}`} className="link-px hover:text-cyan">
                  {s.short}
                </TLink>
              ))}
            </dd>
          </div>
          <div>
            <dt className="t-label text-dim">Stack</dt>
            <dd className="mt-2">{w.stack.slice(0, 4).join(" · ")}</dd>
          </div>
        </dl>
      </div>

      <section className="section">
        <div className="shell">
          <div className="case-stage">
            <TiltPoster src={w.image} alt={`${w.name} — project overview poster`} />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <p className="manifesto" data-anim="words">
              {w.overview}
            </p>
            <div className="mt-16 grid gap-6 md:grid-cols-[12rem_1fr]">
              <p className="t-label case-accent" data-anim="fade">
                The brief
              </p>
              <p className="t-lead" data-anim="up">
                {w.brief}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2" data-anim="lines">
              Inside the
              <br />
              product.
            </h2>
          </div>
          <ol className="case-built lg:col-span-8" data-anim="stagger">
            {w.built.map((b, k) => (
              <li key={b.title}>
                <span className="num">{pad(k + 1)}</span>
                <h3 className="t-h3 text-[1.35rem]">{b.title}</h3>
                <p className="text-soft md:col-start-3">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Stack</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-2" data-anim="stagger" data-stagger="0.05">
              {w.stack.map((s) => (
                <li key={s} className="chip" style={{ "--chip-dot": w.accent } as CSSProperties}>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted" data-anim="fade">
              Shipped for {w.platforms.join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
          </div>
        </div>
      </section>

      <TLink href={`/case-studies/${next.slug}`} className="next-link group" data-cursor="Next" style={{ "--accent": next.accent } as CSSProperties}>
        <div className="shell flex items-center justify-between gap-10">
          <span className="t-mega block">{next.name}</span>
          <div className="hidden w-40 shrink-0 overflow-hidden shadow-[0_0_0_1px_var(--color-line)] transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105 md:block">
            <Image src={next.image} alt="" width={360} height={509} sizes="160px" />
          </div>
        </div>
        <div className="shell mt-6 flex items-center gap-3 text-cyan">
          <span className="t-label">
            Next project · {next.kind} · {next.industry}
          </span>
          <PixelArrow size={14} className="next-arrow" />
        </div>
      </TLink>

      <CtaBlock
        title={
          <>
            Let&apos;s build
            <br />
            yours.
          </>
        }
      />
    </div>
  );
}
