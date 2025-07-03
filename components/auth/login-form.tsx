'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGetWhitelistedEmail } from "@/hooks/query/useGetWhitelistedEmail"
import { cn } from "@/lib/utils"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { signIn, isLoaded } = useSignIn()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { data, isPending } = useGetWhitelistedEmail()
  const emails = (data?.emails || []).map((e: string) => e.toLowerCase())

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (formData: LoginFormData) => {
    if (!isLoaded) return

    setError("")
    setIsLoading(true)

    try {
      // Use the hook's data for validation
      const isAllowed = emails.includes(formData.email.toLowerCase())

      if (!isAllowed) {
        setError("Access denied. Your email is not authorized to access this CMS.")
        setIsLoading(false)
        return
      }

      // Proceed with Clerk sign-in
      await signIn.create({
        identifier: formData.email,
        strategy: "email_code",
      })
    } catch (err) {
      console.error("Sign-in error:", err)
      setError("An error occurred during sign-in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image src="/assets/img/spac-logo.png" alt="SPAC OKE BOLA" width={50} height={50} />
            <h1 className="text-xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to access the CMS dashboard
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading || !isLoaded || isPending}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
