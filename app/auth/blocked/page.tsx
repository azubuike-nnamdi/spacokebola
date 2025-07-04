import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ban, ShieldX } from "lucide-react";
import Link from "next/link";

export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Ban className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Blocked
          </CardTitle>
          <CardDescription className="text-gray-600">
            Too many failed access attempts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500">
            <p>
              Your account has been blocked due to multiple failed access attempts.
              This block requires administrator intervention to remove.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center text-sm text-red-800">
              <ShieldX className="h-4 w-4 mr-2" />
              <span>Permanent security block - Contact administrator</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Link href="/">
              <Button className="w-full" variant="outline">
                Return to Homepage
              </Button>
            </Link>
            <div className="text-center text-xs text-gray-400">
              <p>Contact the administrator to request unblocking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 