import { SITE, mailHref } from "@/content/site";
import { h2, type Block } from "@/content/postTypes";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "What AiFlovv collects through this website, why, and how to ask us to see or delete it.",
  path: "/privacy",
});

const UPDATED = "24 October 2026";

/*
 * Describes what this site actually does: no cookies, no analytics or ads,
 * one session flag for the intro animation, and the contact form's email.
 * Review with your own adviser before launch and keep it in step with any
 * tools you add later (analytics, chat, embeds).
 */
const BODY: Block[] = [
  {
    type: "p",
    text: `This page explains what ${SITE.name} (“we”) collects when you use aiflovv.com, why, and what you can ask us to do with it. We've kept it short because we collect very little.`,
  },
  h2("What we collect"),
  {
    type: "list",
    items: [
      "What you send through the contact form: your name, email address, company (optional), the services and timeline you pick, and your message.",
      "What you send us directly by email, phone or Instagram.",
      "Basic technical information our hosting provider records for every website request (such as your IP address, browser and the page requested), used to keep the site secure and working.",
    ],
  },
  h2("Cookies and tracking"),
  {
    type: "p",
    text: "This site sets no cookies and uses no analytics, advertising or tracking tools. It stores one small flag in your browser for the length of your visit so the intro animation is shorter on later pages; it never leaves your device and disappears when you close the tab.",
  },
  h2("How we use your information"),
  {
    type: "list",
    items: [
      "To reply to your enquiry and talk about your project.",
      "To prepare proposals and, if we work together, to run the project.",
      "To protect the contact form from spam and abuse, for example by briefly limiting how many messages one connection can send.",
    ],
  },
  {
    type: "p",
    text: "We don't sell your information, and we don't add you to a mailing list.",
  },
  h2("Who handles it"),
  {
    type: "p",
    text: "Contact-form messages are delivered to our inbox through our email provider, and the website runs on a hosting provider. They process the information only to provide those services to us. If you choose to receive a copy of your brief, it is sent to the email address you entered.",
  },
  h2("How long we keep it"),
  {
    type: "p",
    text: "We keep enquiries for as long as we need them to respond and follow up, and project correspondence for as long as the work and any legal or accounting obligations require. You can ask us to delete your information sooner.",
  },
  h2("Your choices"),
  {
    type: "p",
    text: `You can ask to see the information we hold about you, correct it, or have it deleted, by emailing ${SITE.email}. We'll respond as soon as we can.`,
  },
  h2("Contact"),
  {
    type: "p",
    text: `${SITE.name} · ${SITE.address} · ${SITE.email} · ${SITE.phone}`,
  },
  {
    type: "callout",
    title: "Changes",
    text: `If we change how the site handles information — for example, by adding analytics — we'll update this page and the date below. Last updated ${UPDATED}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Privacy Policy" }]}
        title={
          <>
            Privacy
            <br />
            Policy.
          </>
        }
        lead={
          <>
            We collect very little and use it only to reply to you. Questions?{" "}
            <a href={mailHref} className="link-px text-ink">
              {SITE.email}
            </a>
          </>
        }
      />
      <section className="section">
        <div className="shell grid lg:grid-cols-12">
          <article className="lg:col-span-8 lg:col-start-3" data-anim="up">
            <ArticleBody blocks={BODY} />
          </article>
        </div>
      </section>
    </>
  );
}
