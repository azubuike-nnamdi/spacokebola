/**
 * Email Service Utility
 * 
 * This is a placeholder implementation. In production, you should integrate with:
 * - SendGrid
 * - AWS SES
 * - Resend
 * - Postmark
 * - Mailgun
 */

interface EmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Send OTP email
 */
export async function sendOtpEmail(params: {
  email: string;
  code: string;
  expiresInMinutes: number;
}): Promise<void> {
  const { email, code, expiresInMinutes } = params;

  const subject = `Your OTP Code - ${code}`;
  const text = `
Your one-time password (OTP) is: ${code}

This code will expire in ${expiresInMinutes} minutes.

If you didn't request this code, please ignore this email.

Best regards,
St. Paul's Anglican Church Oke Bola
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">St. Paul's Anglican Church</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Oke Bola, Ibadan</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #333; margin-top: 0;">Your One-Time Password</h2>
    <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
      Use the following code to complete your login:
    </p>
    
    <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #667eea; font-family: 'Courier New', monospace;">
        ${code}
      </div>
    </div>
    
    <p style="color: #999; font-size: 14px; margin-top: 30px;">
      ⏰ This code will expire in <strong>${expiresInMinutes} minutes</strong>
    </p>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      If you didn't request this code, please ignore this email.
    </p>
    
    <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
      © ${new Date().getFullYear()} St. Paul's Anglican Church Oke Bola. All rights reserved.
    </p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
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

  const subject = `You've been invited to join St. Paul's Anglican Church`;
  const text = `
Hello,

${inviterName} has invited you to join the St. Paul's Anglican Church management system as a ${role}.

Click the link below to accept the invitation:
${invitationUrl}

This invitation will expire in ${expiresInDays} days.

Best regards,
St. Paul's Anglican Church Oke Bola
  `.trim();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation to Join</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">St. Paul's Anglican Church</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Oke Bola, Ibadan</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #333; margin-top: 0;">You've Been Invited!</h2>
    <p style="color: #666; font-size: 16px; margin-bottom: 30px;">
      ${inviterName} has invited you to join our church management system as a <strong>${role}</strong>.
    </p>
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="${invitationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Accept Invitation
      </a>
    </div>
    
    <p style="color: #999; font-size: 14px; margin-top: 30px;">
      ⏰ This invitation expires in <strong>${expiresInDays} days</strong>
    </p>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
      If you didn't expect this invitation, please ignore this email.
    </p>
    
    <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
      © ${new Date().getFullYear()} St. Paul's Anglican Church Oke Bola. All rights reserved.
    </p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({ to: email, subject, text, html });
}

/**
 * Core email sending function
 * 
 * TODO: Replace this with your actual email service integration
 */
async function sendEmail(params: EmailParams): Promise<void> {
  const { to, subject, text, html } = params;

  // In development, log to console
  if (process.env.APP_ENV === "development") {
    console.log("\n📧 Email would be sent:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Text:", text);
    if (html) {
      console.log("HTML Preview:", html.substring(0, 50) + "...");
    }
    console.log("\n");
    return;
  }

  // TODO: Integrate with your email service
  // Example with SendGrid:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  await sgMail.send({
    to,
    from: process.env.FROM_EMAIL,
    subject,
    text,
    html,
  });
  */

  // Example with Resend:
  /*
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    html,
  });
  */

  throw new Error("Email service not configured. Please set up an email provider in lib/auth/email.ts");
}
