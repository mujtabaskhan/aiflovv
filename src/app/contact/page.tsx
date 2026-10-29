import { PageHero } from "@/components/ui/PageHero";
import { BriefForm } from "@/components/contact/BriefForm";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Start a project with AiFlovv. Tell us about your website, app, AI, software or design project — from Lahore, working worldwide.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        className="compact"
        crumbs={[{ label: "Contact" }]}
        title={
          <>
            Let&apos;s
            <br />
            talk.
          </>
        }
        lead="Tell us what you're building. A few details now means a more useful first conversation."
      />
      <section className="pb-28 pt-4 lg:pb-40">
        <div className="shell">
          <BriefForm />
        </div>
      </section>
    </>
  );
}
