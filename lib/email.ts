import { EmailTemplate } from "@/components/ui/email-template";
import * as React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendEmailParams {
  to: string;
  subject: string;
  type: "otp" | "invitation";
  name?: string;
  code?: string;
  inviterName?: string;
  invitationUrl?: string;
  role?: string;
  expiresIn?: string;
}

export async function sendEmail({
  to,
  subject,
  type,
  name,
  code,
  inviterName,
  invitationUrl,
  role,
  expiresIn,
}: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not defined");

    // In development, we can mock success to allow flow testing
    if (process.env.NODE_ENV === "development") {
      console.log("🛠️ DEVELOPMENT MODE: Email sending skipped (API Key missing)");
      console.log("To:", to);
      console.log("Subject:", subject);
      console.log("Type:", type);
      return { success: true, data: { id: "mock_id" } };
    }

    return { success: false, error: "Email service not configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "St. Paul's Anglican Church <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      react: React.createElement(EmailTemplate, {
        type,
        name,
        code,
        inviterName,
        invitationUrl,
        role,
        expiresIn,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
