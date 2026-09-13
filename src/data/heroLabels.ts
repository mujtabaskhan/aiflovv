/**
 * What each layer of the hero's exploded product is — shown in a small label
 * when a visitor hovers it. Keyed by atlas kind so the DOM label never has to
 * import the 3D layer.
 */
export const HERO_LABELS: Record<string, [title: string, tag: string]> = {
  browser: ["Marketing site", "Web · Next.js"],
  dashboard: ["Admin dashboard", "Software"],
  code: ["Typed, tested code", "Engineering"],
  image: ["Art direction", "Design"],
  card: ["Design system", "UI / UX"],
  form: ["Checkout flow", "Conversion"],
  chart: ["Live analytics", "Data"],
  toast: ["Automated deploys", "CI / CD"],
  buttons: ["Component library", "UI"],
  phone: ["Mobile app", "iOS · Android"],
};
