import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { BLOG_POSTS } from "./blog/blog-data";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.site.siteUrl;
  const lastModified = new Date();

  // Core Landing Pages with high priority
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, priority: 1.0, changeFrequency: "weekly" },
    { url: `${baseUrl}/courses`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${baseUrl}/online-coaching`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${baseUrl}/chess-classes-for-adults`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${baseUrl}/platform`, lastModified, priority: 0.95, changeFrequency: "weekly" },
    { url: `${baseUrl}/training-platform`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/curriculum`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${baseUrl}/coaches`, lastModified, priority: 0.9, changeFrequency: "monthly" },
    { url: `${baseUrl}/bookdemo`, lastModified, priority: 0.9, changeFrequency: "weekly" },
    { url: `${baseUrl}/fcs`, lastModified, priority: 0.85, changeFrequency: "monthly" },
    { url: `${baseUrl}/training-camps`, lastModified, priority: 0.85, changeFrequency: "monthly" },
    { url: `${baseUrl}/puzzles`, lastModified, priority: 0.9, changeFrequency: "daily" },
    { url: `${baseUrl}/puzzles/beginner`, lastModified, priority: 0.85, changeFrequency: "daily" },
    { url: `${baseUrl}/puzzles/intermediate`, lastModified, priority: 0.85, changeFrequency: "daily" },
    { url: `${baseUrl}/puzzles/advanced`, lastModified, priority: 0.85, changeFrequency: "daily" },
    { url: `${baseUrl}/about`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/achievements`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${baseUrl}/events`, lastModified, priority: 0.8, changeFrequency: "weekly" },
    { url: `${baseUrl}/gallery`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${baseUrl}/blog`, lastModified, priority: 0.85, changeFrequency: "daily" },
    { url: `${baseUrl}/contact`, lastModified, priority: 0.75, changeFrequency: "monthly" },
    { url: `${baseUrl}/terms`, lastModified, priority: 0.3, changeFrequency: "yearly" },
  ];

  // Dynamic Blog Post Routes (static fallback + live published Neon DB posts)
  const blogRouteMap = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const post of BLOG_POSTS) {
    blogRouteMap.set(post.slug, {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });
    for (const post of posts) {
      blogRouteMap.set(post.slug, {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (e) {
    // Fallback to static blog posts when DB is unreachable
    console.error("sitemap DB lookup fallback:", e);
  }

  return [...staticRoutes, ...Array.from(blogRouteMap.values())];
}
