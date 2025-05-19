import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type React from "react"

type RecentActivityProps = React.HTMLAttributes<HTMLDivElement>

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const activities = [
    {
      user: "Pastor John",
      action: "updated",
      target: "Home Page",
      time: "2 hours ago",
    },
    {
      user: "Sarah Admin",
      action: "created",
      target: "New Event: Sunday Service",
      time: "Yesterday",
    },
    {
      user: "Mark Editor",
      action: "published",
      target: "Weekly Announcement",
      time: "2 days ago",
    },
    {
      user: "Pastor John",
      action: "uploaded",
      target: "5 new photos to Gallery",
      time: "3 days ago",
    },
    {
      user: "Sarah Admin",
      action: "updated",
      target: "About Us Page",
      time: "1 week ago",
    },
  ]

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Recent content changes and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user} <span className="text-muted-foreground">{activity.action}</span> {activity.target}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
