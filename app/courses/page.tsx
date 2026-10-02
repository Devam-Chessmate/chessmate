import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import DemoBookingCTA from "@/components/demo-booking-cta";
import CoursesSection from "@/components/events-preview";
import TestimonialsSection from "@/components/testimonials-section";
import Curriculum from "@/components/ui/CarriclulamBanner";
import DifferenceSection from "@/components/ui/diff";

export const metadata: Metadata = getSeoMetadata("courses");

export default function CarriculamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <Curriculum />
      <CoursesSection />
      <DifferenceSection/>
      <TestimonialsSection />
      <DemoBookingCTA />
    </div>
  );
}
