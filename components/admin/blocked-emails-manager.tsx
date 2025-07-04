"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetFailedAttempts } from "@/hooks/query/useGetFailedAttempts";

import { Badge } from "@/components/ui/badge";
import useUnblockEmail from "@/hooks/mutation/useUnBlockEmail";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

// Define the type for a blocked attempt
export type BlockedAttempt = {
  _id: string;
  isPermanentlyBlocked?: boolean;
  count: number;
  blockedCount: number;
  lastAttempt: string | number | Date;
};

export default function BlockedEmailsManager() {
  const { data, isPending } = useGetFailedAttempts();
  const { handleUnblockEmail, isPending: isUnblocking } = useUnblockEmail();

  const handleUnblock = async (email: string) => {
    handleUnblockEmail(email);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const attempts: BlockedAttempt[] = data?.attempts || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Blocked Emails Manager
        </CardTitle>
        <CardDescription>
          View and manage blocked email addresses. Permanent blocks require manual removal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attempts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No blocked emails found
          </div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt: BlockedAttempt) => (
              <div
                key={attempt._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{attempt._id}</span>
                    {attempt.isPermanentlyBlocked ? (
                      <Badge variant="destructive">Permanent Block</Badge>
                    ) : (
                      <Badge variant="secondary">Temporary Block</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Total attempts: {attempt.count}</p>
                    <p>Blocked attempts: {attempt.blockedCount}</p>
                    <p>Last attempt: {new Date(attempt.lastAttempt).toLocaleString()}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUnblock(attempt._id)}
                  disabled={isUnblocking}
                  isLoading={isUnblocking}
                  loadingText="Unblocking..."
                >
                  <Trash2 className="h-4 w-4" />
                  Unblock
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 