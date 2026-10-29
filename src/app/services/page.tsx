import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIndex } from "@/components/services/ServiceStack";
import { Pipeline } from "@/components/home/Pipeline";
import { Toolkit } from "@/components/home/Toolkit";
import { CtaBlock } from "@/components/ui/CtaBlock";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Web development, mobile apps, AI solutions, custom software, SaaS, e-commerce, UI/UX design and cloud & DevOps — end-to-end digital products from AiFlovv.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        title={
          <>
            What we
            <br />
            build.
          </>
        }
        lead="From high-converting websites to AI features, platforms and the cloud they run on — end-to-end digital products, designed for growth and built to last."
      />

      <section className="section">
        <div className="shell">
          <ServiceIndex />
        </div>
      </section>

      <Pipeline />
      <Toolkit />
      <CtaBlock
        title={
          <>
            Start with
            <br />a conversation.
          </>
        }
        body="Tell us what you're trying to achieve. We'll recommend the simplest thing that gets you there — website, platform, app, AI or all of them."
      />
    </>
  );
}
