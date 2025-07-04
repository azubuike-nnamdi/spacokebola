import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldX, UserPlus, Users } from "lucide-react";
import Link from "next/link";

const userManagementCards = [
  {
    title: "Allowed Emails",
    description: "View, add, update, or delete allowed email addresses.",
    icon: <Users className="w-6 h-6" />,
    href: "/dashboard/settings/user-management/allowed-emails",
  },
  {
    title: "Blocked Users",
    description: "View and unblock blocked email addresses.",
    icon: <ShieldX className="w-6 h-6" />,
    href: "/dashboard/settings/user-management/blocked-users",
  },
  {
    title: "Create User",
    description: "Add a new allowed email/user.",
    icon: <UserPlus className="w-6 h-6" />,
    href: "/dashboard/settings/user-management/create-user",
  },
];

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage allowed emails, blocked users, and create new users from one place.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {userManagementCards.map((card) => (
          <Link href={card.href} key={card.title} className="block h-full">
            <Card className="hover:shadow-md transition-shadow duration-200 border border-gray-100 h-full min-h-[120px] flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-lg">{card.icon}</div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{card.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-1">{card.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 