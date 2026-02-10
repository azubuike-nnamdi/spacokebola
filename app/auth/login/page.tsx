import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 p-6 border rounded-lg shadow-sm">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm text-muted-foreground">
              Custom authentication will be implemented soon
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              🔨 <strong>Under Construction:</strong> The login system is being rebuilt with custom authentication.
              For now, you can access the <a href="/dashboard" className="underline font-semibold">dashboard directly</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
