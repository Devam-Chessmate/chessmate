import type { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { BLOG_POSTS } from "../blog-data";
import PostDetailClient from "./PostDetailClient";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getPostBySlug(slug: string) {
  // 1. First check live Neon DB from admin panel
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (dbPost && dbPost.published) {
      return dbPost;
    }
  } catch (err) {
    console.error("Error fetching post from Neon DB:", err);
  }

  // 2. Always fallback to existing static blogs so they are permanently preserved
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  const slugs = new Set<string>();

  // Always include existing static blogs
  BLOG_POSTS.forEach((p) => slugs.add(p.slug));

  // Include all live blogs from Neon DB
  try {
    const dbPosts = await prisma.blogPost.findMany({
      select: { slug: true },
    });
    dbPosts.forEach((p) => slugs.add(p.slug));
  } catch (err) {
    console.error("generateStaticParams DB fallback", err);
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Article Not Found | ${SEO_CONFIG.site.siteName}`,
    };
  }

  const title = post.metaTitle || `${post.title} | ${SEO_CONFIG.site.siteName}`;
  const description = post.metaDescription || post.desc;
  const keywords = post.targetKeywords || SEO_CONFIG.site.defaultKeywords;
  const canonicalUrl = `${SEO_CONFIG.site.siteUrl}/blog/${post.slug}`;
  const ogImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SEO_CONFIG.site.siteUrl}${post.image}`
    : SEO_CONFIG.site.defaultOgImage;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SEO_CONFIG.site.siteName,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SEO_CONFIG.site.twitterHandle,
      images: [ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <PostDetailClient post={post} />;
}