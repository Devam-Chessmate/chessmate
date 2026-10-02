import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import DemoBookingCTA from "@/components/demo-booking-cta";
import TestimonialsSection from "@/components/testimonials-section";
import Pricing from "@/components/ui/PricingBanner";
import PricingSection from "@/components/ui/PricingSection";

export const metadata: Metadata = getSeoMetadata("pricing");

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <Pricing />
      <PricingSection />
      <TestimonialsSection />
      <DemoBookingCTA />
    </div>
  );
}
