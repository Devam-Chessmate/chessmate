import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("puzzlesIntermediate");

export default function PuzzlesIntermediateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
