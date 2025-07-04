import BlockedEmailsManager from "@/components/admin/blocked-emails-manager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked Users",
  description: "Manage blocked email addresses",
};

export default function BlockedUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Blocked Users</h1>
        <p className="text-muted-foreground">
          View and manage blocked email addresses. Permanent blocks require manual removal.
        </p>
      </div>

      <BlockedEmailsManager />
    </div>
  );
} 