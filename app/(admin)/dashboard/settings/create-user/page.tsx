import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"

export default function CreateUserPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create User" text="Create a new user" />

    </DashboardShell>
  )
}