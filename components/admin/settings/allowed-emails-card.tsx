'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useWhitelistEmail from "@/hooks/mutation/useWhitelistEmail"
import { useGetWhitelistedEmail } from "@/hooks/query/useGetWhitelistedEmail"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type EmailFormData = z.infer<typeof emailSchema>

export function AllowedEmailsCard() {

  const { handleWhitelistEmail, isPending } = useWhitelistEmail()
  const { data, isPending: isLoading } = useGetWhitelistedEmail()


  // Extract emails from the response data
  const emails = data?.emails || []

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailFormData) => {
    handleWhitelistEmail(data.email)
    reset() // Clear the form after submission
  }



  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authorized Email Addresses</CardTitle>
          <CardDescription>
            Loading...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authorized Email Addresses</CardTitle>
        <CardDescription>
          Only users with these email addresses can access the CMS dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Label htmlFor="email">Add New Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              disabled={isPending}
            />
            <Button
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              loadingText="Adding..."
            >
              Add
            </Button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </form>

        <div className="space-y-2">
          <Label>Current Allowed Emails ({emails.length})</Label>
          <div className="space-y-2">
            {emails.length === 0 ? (
              <p className="text-sm text-muted-foreground">No emails added yet.</p>
            ) : (
              emails.map((email: string) => (
                <div key={email} className="flex items-center justify-between p-3 border rounded-md">
                  <span className="text-sm">{email}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => removeEmail(email)}
                    // disabled={isRemoving === email || isPending}
                    // isLoading={isRemoving === email}
                    loadingText="Removing..."
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Changes to this list will take effect immediately.
            Users with removed emails will be unable to access the dashboard on their next login attempt.
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 