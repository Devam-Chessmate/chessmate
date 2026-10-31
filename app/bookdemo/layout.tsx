import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("bookDemo");

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
