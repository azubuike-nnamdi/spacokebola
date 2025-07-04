

import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { CreateUserCard } from "@/components/admin/settings/create-user-card"


export default function CreateUserPage() {


  return (
    <DashboardShell>
      <DashboardHeader heading="User Management" text="Create and manage user accounts" />
      <CreateUserCard />

    </DashboardShell>
  )
}