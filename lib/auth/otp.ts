import type { OtpPurpose } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import * as crypto from "crypto";

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;

/**
 * Generate a 6-digit OTP code
 */
function generateOtpCode(): string {
  // Generate a secure random 6-digit number
  const randomNumber = crypto.randomInt(100000, 1000000);
  return randomNumber.toString();
}

/**
 * Create and store an OTP code for a user
 */
export async function createOtp(params: {
  userId: string;
  purpose: OtpPurpose;
  ipAddress?: string;
}): Promise<{ code: string; expiresAt: Date }> {
  const { userId, purpose, ipAddress } = params;

  // Invalidate any existing unverified OTPs for this user and purpose
  await prisma.otpCode.updateMany({
    where: {
      userId,
      purpose,
      verified: false,
      expiresAt: { gte: new Date() },
    },
    data: {
      expiresAt: new Date(), // Expire immediately
    },
  });

  // Generate new OTP
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.otpCode.create({
    data: {
      userId,
      code,
      purpose,
      expiresAt,
      ipAddress,
    },
  });

  return { code, expiresAt };
}

/**
 * Verify an OTP code
 */
export async function verifyOtp(params: {
  userId: string;
  code: string;
  purpose: OtpPurpose;
}): Promise<{
  success: boolean;
  message: string;
  remainingAttempts?: number;
}> {
  const { userId, code, purpose } = params;

  // Find the OTP
  const otp = await prisma.otpCode.findFirst({
    where: {
      userId,
      code,
      purpose,
      verified: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!otp) {
    return {
      success: false,
      message: "Invalid OTP code",
    };
  }

  // Check if expired
  if (new Date() > otp.expiresAt) {
    return {
      success: false,
      message: "OTP code has expired. Please request a new one.",
    };
  }

  // Check max attempts
  if (otp.attempts >= MAX_ATTEMPTS) {
    return {
      success: false,
      message: "Maximum verification attempts exceeded. Please request a new OTP.",
    };
  }

  // Increment attempts
  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { attempts: otp.attempts + 1 },
  });

  // Verify code (constant-time comparison to prevent timing attacks)
  const isValid = crypto.timingSafeEqual(
    Buffer.from(code),
    Buffer.from(otp.code)
  );

  if (!isValid) {
    const remainingAttempts = MAX_ATTEMPTS - (otp.attempts + 1);
    return {
      success: false,
      message: `Invalid OTP code. ${remainingAttempts} attempt(s) remaining.`,
      remainingAttempts,
    };
  }

  // Mark as verified
  await prisma.otpCode.update({
    where: { id: otp.id },
    data: {
      verified: true,
      verifiedAt: new Date(),
    },
  });

  // Update user's email verification status if purpose is EMAIL_VERIFICATION
  if (purpose === "EMAIL_VERIFICATION") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });
  }

  return {
    success: true,
    message: "OTP verified successfully",
  };
}

/**
 * Clean up expired OTP codes (run this periodically via cron job)
 */
export async function cleanupExpiredOtps(): Promise<number> {
  const result = await prisma.otpCode.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });

  return result.count;
}

/**
 * Check if user has recent OTP (rate limiting)
 */
export async function canRequestNewOtp(params: {
  userId: string;
  purpose: OtpPurpose;
  cooldownSeconds?: number;
}): Promise<{ canRequest: boolean; waitSeconds?: number }> {
  const { userId, purpose, cooldownSeconds = 60 } = params;

  const recentOtp = await prisma.otpCode.findFirst({
    where: {
      userId,
      purpose,
      createdAt: {
        gte: new Date(Date.now() - cooldownSeconds * 1000),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!recentOtp) {
    return { canRequest: true };
  }

  const timeSinceCreation = Date.now() - recentOtp.createdAt.getTime();
  const waitSeconds = Math.ceil(
    (cooldownSeconds * 1000 - timeSinceCreation) / 1000
  );

  return {
    canRequest: false,
    waitSeconds: Math.max(0, waitSeconds),
  };
}
