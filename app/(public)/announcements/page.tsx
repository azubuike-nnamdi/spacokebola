import AnnouncementLanding from "@/components/announcement/announcement-landing";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcements",
  description: "Stay informed about what's happening in the church",
}

export default function Announcement() {
  return (
    <PageTransition>
      <AnnouncementLanding />
    </PageTransition>
  )
}