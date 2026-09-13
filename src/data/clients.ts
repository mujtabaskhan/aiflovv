export type ClientKind = "Website" | "Web & Mobile" | "Mobile App";

export interface Client {
  id: string;
  name: string;
  kind: ClientKind;
  industry: string;
  /** Generated card art, used only when there is no image. */
  variant: 0 | 1 | 2 | 3 | 4;
  /**
   * Card artwork — a portrait 60:85 image in `public/clients/`, e.g.
   * "/clients/ocean-cart.webp". Without one the card falls back to generated
   * art.
   */
  image?: string;
}

/**
 * The client arc, from the studio portfolio — weighted to
 * web work: nine of the eleven are websites or web platforms. The arc sweeps
 * in this order, so the strongest work leads. The cards use each project's
 * portfolio poster.
 */
export const CLIENTS: Client[] = [
  { id: "ocean-cart", name: "Ocean Cart", kind: "Website", industry: "E-commerce", variant: 3 },
  { id: "peervest", name: "Peervest", kind: "Website", industry: "Startup Funding", variant: 4 },
  { id: "aida-pro", name: "Aida Pro", kind: "Web & Mobile", industry: "Hiring & AI Talent", variant: 2 },
  { id: "abwa-pharmacy", name: "ABWA Pharmacy", kind: "Mobile App", industry: "Pharmacy", variant: 1 },
  { id: "frosted-oil", name: "Frosted Oil", kind: "Website", industry: "E-commerce", variant: 3 },
  { id: "pacex", name: "PaceX", kind: "Web & Mobile", industry: "Warehousing", variant: 2 },
  { id: "rlb-professionals", name: "RLB Professionals", kind: "Website", industry: "Recruitment", variant: 0 },
  { id: "sos-hr-suite", name: "SOS HR Suite", kind: "Website", industry: "HR Software", variant: 4 },
  { id: "vearrol", name: "VearRol", kind: "Website", industry: "Home Renovation", variant: 0 },
  { id: "influentem", name: "Influentem", kind: "Mobile App", industry: "Influencer Marketing", variant: 3 },
  { id: "go4sitch", name: "Go4Sitch", kind: "Website", industry: "Menswear", variant: 3 },
].map((c) => ({ ...c, image: `/clients/${c.id}.webp` })) as Client[];
