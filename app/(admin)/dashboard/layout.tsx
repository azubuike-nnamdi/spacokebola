import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { checkAndTrackUnauthorizedAttempts } from "@/lib/auth-helpers";
import clientPromise from "@/lib/mongodb";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "../../globals.css";

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s - Dashboard' },
  description: "Dashboard",
};

async function checkAuthorization() {
  try {
    const user = await currentUser();
    if (!user) {
      redirect('/auth/login');
    }

    const email = user.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    if (!email) {
      redirect('/auth/unauthorized');
    }

    // Check if user is blocked due to repeated failed attempts
    const isBlocked = await checkAndTrackUnauthorizedAttempts(email);
    if (isBlocked) {
      redirect('/auth/blocked');
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      redirect('/auth/unauthorized');
    }

    return true;
  } catch (error) {
    console.error('Authorization check failed:', error);
    redirect('/auth/unauthorized');
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  // Check authorization server-side before rendering anything
  await checkAuthorization();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex-1 overflow-auto p-4 md:p-6">
        <Header />
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <SignIn afterSignInUrl="/dashboard" />
          </div>
        </SignedOut>
      </main>
    </SidebarProvider>
  )
}