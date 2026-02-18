import { sendEmail as sendBaseEmail } from "@/lib/email";




/**
 * Send OTP email
 */
export async function sendOtpEmail(params: {
  email: string;
  code: string;
  expiresInMinutes: number;
}): Promise<void> {
  const { email, code, expiresInMinutes } = params;

  const result = await sendBaseEmail({
    to: email,
    subject: `Your Verification Code - ${code}`,
    type: "otp",
    code,
    expiresIn: `${expiresInMinutes} minutes`,
  });

  if (!result.success) {
    throw new Error(typeof result.error === 'string' ? result.error : "Failed to send OTP email");
  }
}

/**
 * Send invitation email
 */
export async function sendInvitationEmail(params: {
  email: string;
  inviterName: string;
  role: string;
  invitationUrl: string;
  expiresInDays: number;
}): Promise<void> {
  const { email, inviterName, role, invitationUrl, expiresInDays } = params;

  const result = await sendBaseEmail({
    to: email,
    subject: `Invitation to Join St. Paul's Anglican Church`,
    type: "invitation",
    inviterName,
    role,
    invitationUrl,
    expiresIn: `${expiresInDays} days`,
  });

  if (!result.success) {
    throw new Error(typeof result.error === 'string' ? result.error : "Failed to send invitation email");
  }
}


