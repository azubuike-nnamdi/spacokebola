import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: { default: 'Dashboard', template: '%s - Dashboard' },
  description: "Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
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