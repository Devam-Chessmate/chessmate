import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import AdultsClientPage from "./adults-client";

export const metadata: Metadata = getSeoMetadata("adults");

export default function AdultsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Personalized Online Chess Classes for Adults",
    "description":
      "Personalized 1-on-1 online chess classes for adult improvers, beginners, and tournament players with flexible timing, personalized game analysis, and custom study plans.",
    "provider": {
      "@type": "SportsOrganization",
      "name": "Chessmate Academy",
      "sameAs": "https://thechessmate.org"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT1H"
    },
    "offers": {
      "@type": "Offer",
      "category": "Custom 1-on-1 Coaching Plans",
      "availability": "https://schema.org/InStock"
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
