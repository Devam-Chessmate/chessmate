import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import ThankYouClient from "./thank-you-client";

export const metadata: Metadata = getSeoMetadata("thankYou");

export default function ThankYouPage() {
  return <ThankYouClient />;
}
