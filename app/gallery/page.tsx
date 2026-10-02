import type { Metadata } from "next";
import { getSeoMetadata } from "@/config/seo";
import GalleryBanner from "@/components/ui/GalleryBanner";
import GallerySection from "@/components/ui/GallerySection";

export const metadata: Metadata = getSeoMetadata("gallery");

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-14">
      <GalleryBanner />
      <GallerySection/>
    </div>
  );
}
