import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";

export const metadata: Metadata = getSeoMetadata("onlineCoaching");

export default function OnlineCoachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
