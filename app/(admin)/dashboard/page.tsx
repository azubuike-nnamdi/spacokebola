import { DashboardHeader } from "@/components/admin/dashboard-header";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { RecentActivity } from "@/components/admin/recent-activity";
import { PageStats } from "@/components/admin/stats";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function Page() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome to your dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PageStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentActivity className="col-span-4" />
        <div className="col-span-3 rounded-lg border shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium">Quick Actions</h3>
            <div className="mt-4 grid gap-3">
              <a href="/admin/pages/home" className="flex items-center rounded-md bg-muted p-3 hover:bg-muted/80">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Edit Home Page</h4>
                  <p className="text-xs text-muted-foreground">Update your church&apos;s home page content</p>
                </div>
              </a>
              <a href="/admin/events/new" className="flex items-center rounded-md bg-muted p-3 hover:bg-muted/80">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Add New Event</h4>
                  <p className="text-xs text-muted-foreground">Create a new event for your church</p>
                </div>
              </a>
              <a
                href="/admin/announcements/new"
                className="flex items-center rounded-md bg-muted p-3 hover:bg-muted/80"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium">Create Announcement</h4>
                  <p className="text-xs text-muted-foreground">Share important news with your congregation</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}