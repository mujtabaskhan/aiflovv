import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

/** One page, one entry — stamped at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: COMPANY.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
