import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Manage your events",
}

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Events" text="Manage your events" />
      <div>Events</div>
    </DashboardShell>
  );
}