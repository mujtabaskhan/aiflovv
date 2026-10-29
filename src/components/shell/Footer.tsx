import Image from "next/image";
import { NAV, SITE, mailHref, telHref } from "@/content/site";
import { SERVICES } from "@/content/services";
import { TLink } from "./TLink";
import { LocalTime, BackToTop, CopyEmail } from "./FooterParts";
import { Signature } from "./Signature";

export function Footer() {
  return (
    <footer id="footer" className="footer relative overflow-hidden border-t hairline bg-void">
      <div className="shell pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <TLink href="/" aria-label="AiFlovv — home" className="inline-block">
              <Image src="/brand/aiflovv-logo-on-dark.png" alt="AiFlovv — AI-Driven. Developed. Worldwide." width={278} height={44} className="h-9 w-auto sm:h-11" />
            </TLink>
            <p className="t-lead mt-8 max-w-md" data-anim="up">
              {SITE.descriptor}. Websites, apps, AI and software for companies that treat technology as leverage.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pt-3" data-anim="stagger">
            <div className="grid content-start gap-3">
              <p className="t-label text-dim">Pages</p>
              <TLink href="/" className="link-px w-fit text-soft hover:text-ink">
                Home
              </TLink>
              {NAV.map((l) => (
                <TLink key={l.href} href={l.href} className="link-px w-fit text-soft hover:text-ink">
                  {l.label}
                </TLink>
              ))}
            </div>
            <div className="grid content-start gap-3">
              <p className="t-label text-dim">Services</p>
              {SERVICES.map((s) => (
                <TLink key={s.slug} href={`/services/${s.slug}`} className="link-px w-fit text-soft hover:text-ink">
                  {s.slug === "ui-ux-design" ? "UI/UX Design" : s.title}
                </TLink>
              ))}
            </div>
            <div className="col-span-2 grid content-start gap-3 sm:col-span-1">
              <p className="t-label text-dim">Studio</p>
              <CopyEmail email={SITE.email} href={mailHref} />
              <a href={telHref} className="link-px w-fit text-soft hover:text-ink">
                {SITE.phone}
              </a>
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-px w-fit text-soft hover:text-ink"
              >
                Instagram {SITE.instagram.handle}
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[16rem] text-sm leading-relaxed text-muted hover:text-soft"
              >
                {SITE.address}
              </a>
            </div>
          </div>
        </div>

        <Signature />

        <div className="flex flex-col gap-6 border-t hairline py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Image
              src="/brand/aiflovv-wordmark-on-dark.png"
              alt="AiFlovv"
              width={135}
              height={14}
              className="h-3.5 w-auto"
            />
            <span className="t-label text-dim">© {new Date().getFullYear()}</span>
            <TLink href="/privacy" className="hit t-label link-px text-dim hover:text-ink">
              Privacy Policy
            </TLink>
          </div>
          <p className="t-label text-dim">{SITE.tagline}</p>
          <div className="flex items-center gap-6">
            <LocalTime />
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
