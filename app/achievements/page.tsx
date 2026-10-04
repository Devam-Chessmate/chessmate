import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import AchievementGallery from "@/components/ach";
import AchievementsBanner from "@/components/ui/AchievementsBanner";
import AchievementsSection from "@/components/ui/AchievementsSection";
import TrainingApproach from "@/components/ui/training";
import TestimonialsSection from "@/components/testimonials-section";

export const metadata: Metadata = getSeoMetadata("achievements");

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <AchievementsBanner />
      <AchievementGallery/>
      <TrainingApproach/>
      <TestimonialsSection />
    </div>
  );
}
