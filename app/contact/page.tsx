import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import BranchesSection from "@/components/branches";
import DemoBookingCTA from "@/components/demo-booking-cta";
import TestimonialsSection from "@/components/testimonials-section";
import FaqSection from "@/components/stats-section";
import ContactBanner from "@/components/ui/ContactBanner";
import ContactSection from "@/components/ui/ContactSection";

export const metadata: Metadata = getSeoMetadata("contact");

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <ContactBanner />
      <ContactSection />
      <TestimonialsSection />
      <FaqSection />
      <DemoBookingCTA />
    </div>
  );
}
