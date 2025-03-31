import EventDashboard from "@/components/event/event-dashboard";
import { PageTransition } from "@/components/ui/page-transition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "View our events and activities",
}

export default function Events() {
  return (
    <PageTransition>
      <EventDashboard />
    </PageTransition>
  )
}