import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import AdultsClientPage from "@/app/adults/adults-client";

export const metadata: Metadata = {
  ...getSeoMetadata("adults"),
  alternates: {
    canonical: "https://thechessmate.org/chess-classes-for-adults",
  },
};

export default function ChessClassesForAdultsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Chess Classes for Adults - Online 1-on-1 Coaching",
    "description":
      "Personalized 1-on-1 online chess coaching for adults. Flexible scheduling, personalized game analysis, and custom study plans.",
    "provider": {
      "@type": "SportsOrganization",
      "name": "Chessmate Academy",
      "sameAs": "https://thechessmate.org"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AdultsClientPage />
    </>
  );
}
