import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PixelField } from "@/components/visuals/PixelField";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-hero">
      <PixelField />
      <div className="page-hero-fade" aria-hidden />
      <div className="shell relative">
        <h1 className="page-hero-title t-mega glitch" data-text="404">
          404
        </h1>
        <p className="t-lead mt-8 max-w-xl">
          This page didn&apos;t compile. It may have moved, or the link may be mistyped — try{" "}
          <kbd className="t-label bg-raised px-1.5 py-0.5 text-soft">⌘K</kbd> to jump anywhere.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/case-studies" variant="ghost">
            See the work
          </Button>
        </div>
      </div>
    </section>
  );
}
