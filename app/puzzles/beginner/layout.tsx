import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("puzzlesBeginner");

export default function PuzzlesBeginnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
