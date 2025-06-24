import { CreateAnnouncement } from "@/components/admin/create-announcement"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Announcements",
  description: "Manage your announcements",
}

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Announcements" text="Manage your announcements" />
      <CreateAnnouncement />
    </DashboardShell>
  )
}