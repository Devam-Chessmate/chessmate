import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("quickPay");

export default function QuickPayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
