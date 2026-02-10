import { AppSidebar } from "@/components/common/app-sidebar";
import { Header } from "@/components/common/header";
import { SidebarProvider } from "@/components/ui/sidebar";
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
        {/* TODO: Add authentication check here */}
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Authentication Disabled:</strong> Custom authentication will be implemented soon.
            Dashboard is temporarily accessible without login.
          </p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}