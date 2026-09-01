import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
      {
        userAgent: "Googlebot-Image",
        disallow: "/assets/people/",
      },
    ],
    sitemap: "https://nullk.us/sitemap.xml",
    host: "https://nullk.us",
  };
}
