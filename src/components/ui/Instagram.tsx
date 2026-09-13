import { COMPANY } from "@/data/company";

/** Instagram's glyph, drawn in the current text colour. */
export function InstagramGlyph({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The studio's Instagram, as an outbound link: glyph and handle. */
export function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={COMPANY.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      aria-label={`${COMPANY.name} on Instagram (${COMPANY.instagram.handle})`}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <InstagramGlyph />
      {COMPANY.instagram.handle}
    </a>
  );
}
