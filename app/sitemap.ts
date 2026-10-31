import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { BLOG_POSTS } from "./blog/blog-data";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.site.siteUrl;
  const lastModified = new Date();

  // Core Landing Pages with high priority
  const staticRoutes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/courses`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/online-coaching`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/chess-classes-for-adults`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/platform`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/training-platform`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/curriculum`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/coaches`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/bookdemo`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/fcs`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/training-camps`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/puzzles`, priority: 0.9, changeFrequency: "daily" as const },
    { url: `${baseUrl}/puzzles/beginner`, priority: 0.85, changeFrequency: "daily" as const },
    { url: `${baseUrl}/puzzles/intermediate`, priority: 0.85, changeFrequency: "daily" as const },
    { url: `${baseUrl}/puzzles/advanced`, priority: 0.85, changeFrequency: "daily" as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/achievements`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/events`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/gallery`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.85, changeFrequency: "daily" as const },
    { url: `${baseUrl}/contact`, priority: 0.75, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Dynamic Blog Post Routes (Neon DB + static fallback)
  const slugMap = new Map<string, { lastModified: Date }>();

  // Static posts first
  BLOG_POSTS.forEach((post) => {
    slugMap.set(post.slug, {
      lastModified: new Date(post.date || Date.now()),
    });
  });

  // DB posts from Neon (override or add)
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    dbPosts.forEach((post) => {
      slugMap.set(post.slug, {
        lastModified: new Date(post.updatedAt || Date.now()),
      });
    });
  } catch (err) {
    console.error("sitemap DB lookup fallback", err);
  }

  const blogRoutes = Array.from(slugMap.entries()).map(([slug, data]) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: data.lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes.map((route) => ({
      ...route,
      lastModified,
    })),
    ...blogRoutes,
  ];
}
