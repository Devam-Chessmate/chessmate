import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import prisma from "@/lib/prisma";
import { BLOG_POSTS } from "./blog-data";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = getSeoMetadata("blog");

async function getPublishedPosts() {
  let dbPosts: any[] = [];
  try {
    const records = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    if (records) {
      dbPosts = records.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
    }
  } catch (err) {
    console.error("Error fetching published posts from Neon DB:", err);
  }

  // Keep all existing static blogs from blog-data.ts
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const remainingStaticPosts = BLOG_POSTS.filter(
    (post) => !dbSlugs.has(post.slug)
  );

  // Return live admin posts from Neon DB first, along with all existing static blogs
  return [...dbPosts, ...remainingStaticPosts];
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogListClient initialPosts={posts} />;
}