import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import AboutBanner from "@/components/ui/AboutBanner";
import AboutSection from "@/components/ui/AboutSection";
import FaqSection from "@/components/stats-section";
import AchievementsSection from "@/components/ui/achievements";
import TeamSection from "@/components/ui/team-section";
import DemoBookingCTA from "@/components/demo-booking-cta";
import TestimonialsSection from "@/components/testimonials-section";
import MissionVision from "@/components/ui/mission";
import PlatformSection from "@/components/platform";

export const metadata: Metadata = getSeoMetadata("about");

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <AboutBanner />
      <AboutSection />
      <MissionVision/>
      
      <TeamSection />
      <PlatformSection/>
      <AchievementsSection />
      <TestimonialsSection />
      <FaqSection />
      <DemoBookingCTA />
    </div>
  );
}
