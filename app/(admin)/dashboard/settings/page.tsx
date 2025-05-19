import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { SettingsCards } from "@/components/admin/settings/settings-card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
}

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your settings" />
      <SettingsCards />

    </DashboardShell>
  )
}