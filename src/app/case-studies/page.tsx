import { PageHero } from "@/components/ui/PageHero";
import { CtaBlock } from "@/components/ui/CtaBlock";
import { WorkBrowser } from "@/components/work/WorkBrowser";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
    "Websites, platforms and mobile apps AiFlovv has designed and built — for e-commerce, warehousing, hiring, pharmacy, HR and more.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Case studies" }]}
        title={
          <>
            Work that
            <br />
            ships.
          </>
        }
        lead="Websites, platforms and mobile apps for e-commerce, warehousing, hiring, pharmacy, HR and more — designed, built and launched by one team."
      />
      <section className="pb-24 pt-6 lg:pb-40" aria-labelledby="all-projects">
        <div className="shell">
          <h2 id="all-projects" className="sr-only">
            All projects
          </h2>
          <WorkBrowser />
        </div>
      </section>
      <CtaBlock
        title={
          <>
            Add yours
            <br />
            to the list.
          </>
        }
      />
    </>
  );
}
