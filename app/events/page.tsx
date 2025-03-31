import EventDashboard from "@/components/event/event-dashboard";
import { PageTransition } from "@/components/ui/page-transition";

export default function Events() {
  return (
    <PageTransition>
      <EventDashboard />
    </PageTransition>
  )
}