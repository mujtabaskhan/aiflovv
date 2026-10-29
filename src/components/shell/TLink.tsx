"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useTransition } from "./Transition";

type Props = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & { href: string };

/**
 * An internal link that travels behind the pixel transition. Modifier-clicks,
 * middle-clicks and "open in new tab" are left to the browser — `onNavigate`
 * only fires for ordinary client-side navigations.
 */
export function TLink({ href, ...rest }: Props) {
  const { navigate } = useTransition();
  return (
    <Link
      href={href}
      {...rest}
      onNavigate={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
