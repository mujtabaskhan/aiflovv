import type { ReactNode } from "react";
import { TLink } from "@/components/shell/TLink";
import { cn } from "@/lib/utils";
import { PixelArrow } from "./Pixels";

type Variant = "primary" | "ghost" | "light";

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  className?: string;
  /** Opens outside the site (mail, phone, social). */
  external?: boolean;
  magnetic?: boolean;
}

function Inner({ children, external }: { children: ReactNode; external?: boolean }) {
  return (
    <>
      <span>{children}</span>
      <span className="btn-icon">
        <PixelArrow diagonal={external} size={12} />
        <PixelArrow diagonal={external} size={12} />
      </span>
    </>
  );
}

export function Button({ href, children, variant = "primary", size = "md", className, external, magnetic }: Props) {
  const cls = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
  const magnet = magnetic ? { "data-magnetic": "0.22" } : {};
  if (external || /^(mailto:|tel:|https?:)/.test(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...magnet}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Inner external>{children}</Inner>
      </a>
    );
  }
  return (
    <TLink href={href} className={cls} {...magnet}>
      <Inner>{children}</Inner>
    </TLink>
  );
}
