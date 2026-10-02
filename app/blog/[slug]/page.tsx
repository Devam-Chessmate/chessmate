import type { Metadata } from "next";
import { SEO_CONFIG } from "@/config/seo";
import { BLOG_POSTS } from "../blog-data";
import PostDetailClient from "./PostDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <PostDetailClient post={post} />;
}