import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("puzzlesAdvanced");

export default function PuzzlesAdvancedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
