import type { ReactNode } from "react";
import { PixelField } from "@/components/visuals/PixelField";
import { PixelEdge } from "./PixelEdge";
import { cn } from "@/lib/utils";
import { fitStyle } from "@/lib/fit";
import { SITE } from "@/content/site";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * The page's place in the site, for search engines only (a BreadcrumbList, so
 * results can show "AiFlovv › Services › Web Development"). Not drawn on the page.
 */
export function BreadcrumbLd({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function PageHero({
  crumbs,
  title,
  lead,
  children,
  className,
  accent,
  titleClass = "t-mega",
}: {
  /** Where the page sits, for search engines (see BreadcrumbLd). */
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  accent?: string;
  titleClass?: string;
}) {
  return (
    <section className={cn("page-hero", className)}>
      <PixelField accent={accent} />
      <div className="page-hero-fade" aria-hidden />
      <BreadcrumbLd items={crumbs} />
      <div className="shell relative">
        <div className="fit-box">
          <h1 className={cn(titleClass, "page-hero-title fit")} style={fitStyle(title)} data-anim="chars">
            {title}
          </h1>
        </div>
        {(lead || children) && (
          <div className="page-hero-foot">
            {lead && (
              <p className="t-lead max-w-2xl" data-anim="up" data-delay="0.35">
                {lead}
              </p>
            )}
            {children && (
              <div data-anim="up" data-delay="0.45">
                {children}
              </div>
            )}
          </div>
        )}
      </div>
      <PixelEdge seed={typeof title === "string" ? title : crumbs.map((c) => c.label).join("/")} />
    </section>
  );
}
