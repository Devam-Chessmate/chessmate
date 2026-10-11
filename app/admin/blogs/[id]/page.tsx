import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const numId = parseInt(params.id, 10);
  if (isNaN(numId)) {
    notFound();
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: numId },
  });

  if (!post) {
    notFound();
  }

  // Convert dates or non-serializable fields if needed
  const serializedPost = {
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };

  return <BlogEditor initialData={serializedPost} isEditing={true} />;
}
