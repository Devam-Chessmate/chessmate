import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import PlatformClientPage from "./platform-client";

export const metadata: Metadata = getSeoMetadata("platform");

export default function PlatformPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChessMate 24/7 Training Platform",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web, iOS, Android",
    "description":
      "Continuous chess training ecosystem providing personalized assignments, 10,000+ tactical calculation puzzles, personal game analysis, and gamified progress tracking.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "description": "Included free with ChessMate coaching subscriptions"
    },
    "provider": {
      "@type": "SportsOrganization",
      "name": "Chessmate Academy",
      "url": "https://thechessmate.org"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlatformClientPage />
    </>
  );
}
