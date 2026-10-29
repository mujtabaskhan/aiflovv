import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A small label that heads a list on its own ("Stack", "Keep reading") — decodes from glyphs. */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("t-label label-px text-muted", className)} data-anim="scramble">
      {children}
    </p>
  );
}

export function SectionHead({ title, lead, className }: { title: ReactNode; lead?: ReactNode; className?: string }) {
  return (
    <div className={cn("section-head", className)}>
      <h2 className="t-h2" data-anim="lines">
        {title}
      </h2>
      {lead && (
        <p className="t-lead" data-anim="up" data-delay="0.15">
          {lead}
        </p>
      )}
    </div>
  );
}
