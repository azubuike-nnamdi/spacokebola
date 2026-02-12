import { sendOtpEmail } from "@/lib/auth/email";
import { canRequestNewOtp, createOtp } from "@/lib/auth/otp";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = requestOtpSchema.parse(body);

    console.log("email", email);
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        isActive: true,
        isBlocked: true,
        blockedReason: true,
      },
    });

    // Security: Don't leak if email exists or not
    if (!user) {
      // Return success but don't send email
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, an OTP has been sent.",
      });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        {
          success: false,
          message: `Account is blocked. ${user.blockedReason || "Contact administrator."}`,
        },
        { status: 403 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is inactive. Contact administrator.",
        },
        { status: 403 }
      );
    }

    // Check rate limiting
    const { canRequest, waitSeconds } = await canRequestNewOtp({
      userId: user.id,
      purpose: "LOGIN",
      cooldownSeconds: 60,
    });

    if (!canRequest) {
      return NextResponse.json(
        {
          success: false,
          message: `Please wait ${waitSeconds} seconds before requesting a new OTP.`,
          waitSeconds,
        },
        { status: 429 }
      );
    }

    // Create OTP
    const { code, expiresAt } = await createOtp({
      userId: user.id,
      purpose: "LOGIN",
      ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
    });

    // Send OTP email
    await sendOtpEmail({
      email: user.email,
      code,
      expiresInMinutes: 10,
    });

    // Log successful OTP request
    await prisma.loginAttempt.create({
      data: {
        userId: user.id,
        email: user.email,
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        success: true,
        failReason: "OTP_REQUESTED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email. Please check your inbox.",
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Request OTP error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send OTP. Please try again.",
      },
      { status: 500 }
    );
  }
}
