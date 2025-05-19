import { Calendar, Home, ImageIcon, Info, MessageSquare } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PageStats() {
  const stats = [
    {
      title: "Home Page",
      description: "Last updated 2 days ago",
      icon: Home,
      value: "Published",
    },
    {
      title: "About Us",
      description: "Last updated 1 week ago",
      icon: Info,
      value: "Published",
    },
    {
      title: "Events",
      description: "5 upcoming events",
      icon: Calendar,
      value: "12 Total",
    },
    {
      title: "Announcements",
      description: "3 active announcements",
      icon: MessageSquare,
      value: "8 Total",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat?.icon === ImageIcon ? (
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
