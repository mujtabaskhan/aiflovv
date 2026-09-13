"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/components/providers/SmoothScroll";

type Variant = "primary" | "ghost" | "line";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  /** Pull toward the cursor on hover. Off for dense layouts. */
  magnetic?: boolean;
  size?: "md" | "lg";
  onClick?: () => void;
}

const BASE =
  "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-medium " +
  "transition-colors duration-500 will-change-transform select-none";

const SIZES = {
  md: "h-11 pl-6 pr-5 text-[0.8125rem]",
  lg: "h-14 pl-8 pr-6 text-[0.9375rem]",
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-chalk text-void hover:text-void",
  ghost:
    "border border-chalk/25 text-chalk transition-[border-color] hover:border-chalk/60 hover:text-void md:backdrop-blur-sm",
  line: "text-chalk hover:text-ion",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  magnetic = true,
  size = "md",
  onClick,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(ref.current, {
      x: x * 0.28,
      y: y * 0.36,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
    }
    if (fill.current) {
      gsap.to(fill.current, { yPercent: 101, duration: 0.45, ease: "power3.in" });
    }
  };

  const onEnter = () => {
    if (fill.current) {
      gsap.fromTo(
        fill.current,
        { yPercent: 101 },
        { yPercent: 0, duration: 0.55, ease: "power3.out" },
      );
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    }
    onClick?.();
  };

  const inner = (
    <>
      {variant !== "line" && (
        <span
          ref={fill}
          aria-hidden
          className={`absolute inset-0 translate-y-full ${
            variant === "primary" ? "bg-ion" : "bg-chalk"
          }`}
        />
      )}
      <span className="relative z-10 whitespace-nowrap tracking-[-0.01em]">
        {children}
      </span>
      <span
        aria-hidden
        className="relative z-10 grid h-6 w-6 place-items-center overflow-hidden"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:opacity-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          className="absolute h-3.5 w-3.5 -translate-x-4 opacity-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      </span>
    </>
  );

  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerEnter={onEnter}
        onClick={handleClick}
        data-cursor="hover"
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={onEnter}
      onClick={handleClick}
      data-cursor="hover"
    >
      {inner}
    </button>
  );
}
