import type { MetadataRoute } from "next";

const BASE_URL = "https://evaVoc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/security`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), priority: 0.8 },
  ];
}
