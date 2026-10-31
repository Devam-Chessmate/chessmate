import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("fcs");

export default function FcsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
