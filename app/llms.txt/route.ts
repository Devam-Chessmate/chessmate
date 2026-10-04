import { getLlmsTxt } from "@/config/seo";

export const dynamic = "force-static";

export function GET() {
  return new Response(getLlmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
