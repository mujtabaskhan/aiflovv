import type { ReactNode } from "react";

/**
 * A template (unlike a layout) mounts a fresh instance on every navigation.
 * The animation engine splits and rewrites text nodes, so each route must get
 * brand-new DOM — including hops between two pages of the same dynamic route.
 */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
