import { Children, isValidElement, type CSSProperties, type ReactNode } from "react";

/** The plain text of a title, with `<br />` read as a space. */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) {
    if (node.type === "br") return " ";
    return Children.toArray((node.props as { children?: ReactNode }).children).map(textOf).join("");
  }
  return "";
}

const NARROW = /[iljtfrI.,:;'’!|-]/;
const WIDE = /[mwMW@&]/;

/**
 * The longest word of a title in average-letter units (narrow letters count
 * less, wide ones more). Display titles use it to cap their size so that
 * word always fits the column — they shrink instead of splitting "Developm/ent".
 */
export function fitChars(text: string) {
  const words = text.split(/\s+/).filter(Boolean);
  const widest = Math.max(1, ...words.map((w) => [...w].reduce((n, ch) => n + (NARROW.test(ch) ? 0.55 : WIDE.test(ch) ? 1.3 : 1), 0)));
  return Math.round(widest * 100) / 100;
}

/** A whole single line in the same average-letter units (spaces count less). */
export function lineChars(text: string) {
  const units = [...text].reduce((n, ch) => n + (ch === " " ? 0.42 : NARROW.test(ch) ? 0.55 : WIDE.test(ch) ? 1.3 : 1), 0);
  return Math.round(units * 100) / 100;
}

/** Style for a `.fit` title inside a `.fit-box`. */
export const fitStyle = (title: ReactNode) => ({ "--fit-chars": fitChars(textOf(title)) }) as CSSProperties;
