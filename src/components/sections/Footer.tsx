"use client";

import { COMPANY, NAV_LINKS } from "@/data/company";
import { scrollToSection } from "@/components/providers/SmoothScroll";
import { Logo } from "@/components/ui/Logo";
import { InstagramLink } from "@/components/ui/Instagram";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative z-10 border-t border-hairline bg-void/90 md:bg-void/70 md:backdrop-blur-xl">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo variant="full" className="h-11 md:h-12" />
            <p className="mt-6 max-w-[32ch] text-[0.9375rem] leading-relaxed text-mist">
              {COMPANY.descriptor}. Web platforms, mobile applications and custom
              software for companies that treat technology as leverage.
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
            <p className="eyebrow">Sections</p>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-cursor="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.href);
                    }}
                    className="text-[0.875rem] text-fog transition-colors hover:text-chalk"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  data-cursor="hover"
                  className="text-[0.875rem] text-fog transition-colors hover:text-chalk"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  data-cursor="hover"
                  className="text-[0.875rem] text-fog transition-colors hover:text-chalk"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <InstagramLink className="text-[0.875rem] text-fog transition-colors hover:text-chalk" />
              </li>
              <li className="mt-2 max-w-[26ch] text-[0.875rem] leading-relaxed text-mist">
                {COMPANY.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-dim">
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-dim">
            Built with Next.js, Three.js & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
