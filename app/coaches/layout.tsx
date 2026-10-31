import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("coaches");

export default function CoachesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
