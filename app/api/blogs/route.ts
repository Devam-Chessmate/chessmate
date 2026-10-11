import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Helper to generate a clean URL slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const publishedOnly = searchParams.get("published") === "true";

    const whereClause: any = {};

    if (publishedOnly) {
      whereClause.published = true;
    }

    if (category && category !== "All") {
      whereClause.category = category;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { desc: { contains: search, mode: "insensitive" } },
        { author: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs from database", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
      desc,
      category,
      date,
      author,
      image,
      color,
      shadow,
      metaTitle,
      metaDescription,
      targetKeywords,
      content,
      published = true,
      isFeatured = false,
    } = body;

    if (!title || !desc || !image) {
      return NextResponse.json(
        { error: "Title, description, and featured image are required" },
        { status: 400 }
      );
    }

    // Determine slug
    let slug = customSlug ? generateSlug(customSlug) : generateSlug(title);
    if (!slug) {
      slug = `blog-${Date.now()}`;
    }

    // Check if slug exists, if so append unique suffix
    const existing = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const formattedDate =
      date ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    // Ensure content has structured object format
    const structuredContent =
      typeof content === "object" && content !== null
        ? content
        : {
            intro: typeof content === "string" ? content : "",
            sections: [],
            conclusion: "",
          };

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        desc,
        category: category || "Chess Insights",
        date: formattedDate,
        author: author || "ChessMate Academy",
        image,
        color: color || "bg-white",
        shadow: shadow || "shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]",
        metaTitle: metaTitle || `${title} | ChessMate Academy`,
        metaDescription: metaDescription || desc,
        targetKeywords: Array.isArray(targetKeywords)
          ? targetKeywords
          : typeof targetKeywords === "string"
          ? targetKeywords.split(",").map((k) => k.trim()).filter(Boolean)
          : [],
        content: structuredContent,
        published: Boolean(published),
        isFeatured: Boolean(isFeatured),
      },
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog post", details: error?.message },
      { status: 500 }
    );
  }
}
