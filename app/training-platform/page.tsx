import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import PlatformClientPage from "@/app/platform/platform-client";

export const metadata: Metadata = {
  ...getSeoMetadata("platform"),
  alternates: {
    canonical: "https://thechessmate.org/training-platform",
  },
};

export default function TrainingPlatformAliasPage() {
  return <PlatformClientPage />;
}
