import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldX } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <ShieldX className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-600">
            You don&apos;t have permission to access this area
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-500">
            <p>
              Your email address is not authorized to access the admin dashboard.
              Please contact the administrator if you believe this is an error.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Link href="/">
              <Button className="w-full" variant="outline">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button className="w-full" variant="outline">
                Try Different Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 