import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idParam = params.id;
    const numId = parseInt(idParam, 10);

    const post = isNaN(numId)
      ? await prisma.blogPost.findUnique({ where: { slug: idParam } })
      : await prisma.blogPost.findUnique({ where: { id: numId } });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch post", details: error?.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

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
      published,
      isFeatured,
    } = body;

    const existingPost = await prisma.blogPost.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let slug = existingPost.slug;
    if (customSlug && customSlug !== existingPost.slug) {
      slug = generateSlug(customSlug);
      // Check for collision with other posts
      const conflict = await prisma.blogPost.findFirst({
        where: { slug, NOT: { id } },
      });
      if (conflict) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(desc !== undefined && { desc }),
        ...(category !== undefined && { category }),
        ...(date !== undefined && { date }),
        ...(author !== undefined && { author }),
        ...(image !== undefined && { image }),
        ...(color !== undefined && { color }),
        ...(shadow !== undefined && { shadow }),
        ...(metaTitle !== undefined && { metaTitle }),
        ...(metaDescription !== undefined && { metaDescription }),
        ...(targetKeywords !== undefined && {
          targetKeywords: Array.isArray(targetKeywords)
            ? targetKeywords
            : typeof targetKeywords === "string"
            ? targetKeywords.split(",").map((k) => k.trim()).filter(Boolean)
            : [],
        }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published: Boolean(published) }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
      },
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post", details: error?.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await request.json();
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to patch post", details: error?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post", details: error?.message },
      { status: 500 }
    );
  }
}
