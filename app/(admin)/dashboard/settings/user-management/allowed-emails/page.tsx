
import { AllowedEmailsCard } from "@/components/admin/settings/allowed-emails-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allowed Emails",
  description: "Manage authorized email addresses for CMS access",
};

export default function AllowedEmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Allowed Emails</h1>
        <p className="text-muted-foreground">
          Manage which email addresses can access the CMS dashboard.
        </p>
      </div>
      <AllowedEmailsCard />
    </div>
  );
} 