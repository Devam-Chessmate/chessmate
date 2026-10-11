import { PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../app/blog/blog-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding blog posts to Neon database...");
  const count = await prisma.blogPost.count();
  if (count > 0) {
    console.log(`Database already contains ${count} blog posts. Skipping seed.`);
    return;
  }

  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        desc: post.desc,
        category: post.category || "General",
        date: post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        author: post.author || "ChessMate Academy",
        image: post.image || "/benefit.png",
        color: post.color || "bg-white",
        shadow: post.shadow || "shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]",
        metaTitle: post.metaTitle || null,
        metaDescription: post.metaDescription || null,
        targetKeywords: post.targetKeywords || [],
        content: post.content || {},
        published: true,
      },
    });
  }

  console.log(`Successfully seeded ${BLOG_POSTS.length} blog posts!`);
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
