import { createAuditLog } from "@/lib/audit";
import { verifyOtp } from "@/lib/auth/otp";
import { createSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "OTP must be 6 digits"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = verifyOtpSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isBlocked: true,
        emailVerified: true,
      },
    });

    if (!user) {
      // Log failed attempt
      await prisma.loginAttempt.create({
        data: {
          email: email.toLowerCase(),
          ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
          success: false,
          failReason: "USER_NOT_FOUND",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or OTP code",
        },
        { status: 401 }
      );
    }

    // Check if user is blocked or inactive
    if (user.isBlocked || !user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is not active. Contact administrator.",
        },
        { status: 403 }
      );
    }

    // Verify OTP
    const otpResult = await verifyOtp({
      userId: user.id,
      code,
      purpose: "LOGIN",
    });

    if (!otpResult.success) {
      // Log failed attempt
      await prisma.loginAttempt.create({
        data: {
          userId: user.id,
          email: user.email,
          ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
          success: false,
          failReason: "INVALID_OTP",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: otpResult.message,
          remainingAttempts: otpResult.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // OTP verified successfully - create session
    await createSession(user.id);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Log successful login
    await prisma.loginAttempt.create({
      data: {
        userId: user.id,
        email: user.email,
        ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
        success: true,
      },
    });

    // Add Audit Log entry
    await createAuditLog({
      userId: user.id,
      action: "LOGIN",
      entityType: "USER",
      entityId: user.id,
      changes: { ip: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown" },
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        emailVerified: user.emailVerified,
      },
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

    console.error("Verify OTP error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Verification failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
