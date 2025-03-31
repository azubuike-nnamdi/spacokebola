import GalleryDashboard from "@/components/gallery/gallery-dashboard";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "View our gallery of events and activities",
}

export default function Gallery() {
  return (
    <PageTransition>
      <GalleryDashboard />
    </PageTransition>
  )
}