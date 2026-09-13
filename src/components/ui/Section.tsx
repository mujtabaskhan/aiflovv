"use client";

import { useRef, type ReactNode } from "react";
import { registerSection, type SectionId } from "@/lib/journey";
import { useIsomorphicLayoutEffect } from "@/lib/gsap";

interface SectionProps {
  id: SectionId;
  className?: string;
  children: ReactNode;
  /** Rendered as the scroll spacer; content is usually sticky inside it. */
  label?: string;
}

/**
 * Registers itself with the journey model so the 3D layer knows exactly where
 * it sits in the scroll. Sections never set their own background — the canvas
 * behind them is the background.
 */
export function Section({ id, className = "", children, label }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerSection(id, ref.current);
    return () => registerSection(id, null);
  }, [id]);

  return (
    <section
      ref={ref}
      id={id}
      data-section={id}
      aria-label={label}
      className={`relative ${className}`}
    >
      {children}
    </section>
  );
}
