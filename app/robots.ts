import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/pay", "/quick-pay", "/api/"],
      },
      {
        userAgent: [
          "PetalBot",
          "Bytespider",
          "ClaudeBot",
          "anthropic-ai",
          "Cohere-ai",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: "https://thechessmate.org/sitemap.xml",
    host: "https://thechessmate.org",
  };
}
