import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

/** Installed-app details: the name, icons and colours a phone uses for a
 *  home-screen shortcut. The colours match the page's opening (light) ground. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY.name} — ${COMPANY.descriptor}`,
    short_name: COMPANY.name,
    description: COMPANY.summary,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f5f8",
    theme_color: "#f4f5f8",
    lang: "en",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
