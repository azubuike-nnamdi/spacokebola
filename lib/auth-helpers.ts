import clientPromise from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";

export interface AuthResult {
  userId: string;
  email: string;
  isAuthorized: boolean;
}

export interface AuthError {
  status: number;
  message: string;
}

/**
 * Tracks unauthorized access attempts and blocks users after multiple failures
 * @param email User's email address
 * @param ip User's IP address (optional)
 * @returns Promise<boolean> - true if user should be blocked
 */
export async function checkAndTrackUnauthorizedAttempts(email: string, ip?: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");
    const failedAttempts = db.collection("failed_attempts");

    // First, check if the email is in the allowed list
    const isAllowed = await allowedEmails.findOne({ email });

    // If email is allowed, don't track or block
    if (isAllowed) {
      return false;
    }

    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000); // 15 minutes ago

    // Clean up old attempts (older than 15 minutes) but keep permanent blocks
    await failedAttempts.deleteMany({
      email,
      timestamp: { $lt: fifteenMinutesAgo },
      permanent: { $ne: true } // Don't delete permanent blocks
    });

    // Count recent failed attempts by email
    const recentAttemptsByEmail = await failedAttempts.countDocuments({
      email,
      timestamp: { $gte: fifteenMinutesAgo }
    });

    // Count recent failed attempts by IP (if available)
    let recentAttemptsByIP = 0;
    if (ip) {
      recentAttemptsByIP = await failedAttempts.countDocuments({
        ip,
        timestamp: { $gte: fifteenMinutesAgo }
      });
    }

    // Use the higher count for blocking (protects against both email and IP-based attacks)
    const recentAttempts = Math.max(recentAttemptsByEmail, recentAttemptsByIP);

    // Check for permanent block first
    const permanentBlock = await failedAttempts.findOne({
      email,
      permanent: true
    });

    if (permanentBlock) {
      return true; // Email is permanently blocked
    }

    // Progressive blocking strategy:
    // 3 attempts = 5 minute block
    // 5 attempts = PERMANENT block (admin intervention required)
    let blockDuration = 0;
    let isPermanent = false;

    if (recentAttempts >= 5) {
      isPermanent = true; // Permanent block
    } else if (recentAttempts >= 3) {
      blockDuration = 5; // 5 minutes
    }

    if (isPermanent) {
      // Mark user as permanently blocked
      await failedAttempts.insertOne({
        email,
        ip: ip || "unknown",
        timestamp: now,
        blocked: true,
        permanent: true,
        attemptsCount: recentAttempts,
        reason: "Exceeded 5 failed attempts"
      });

      return true;
    }

    if (blockDuration > 0) {
      // Check if user is currently blocked
      const blockExpiry = new Date(now.getTime() - blockDuration * 60 * 1000);
      const isCurrentlyBlocked = await failedAttempts.findOne({
        $or: [
          { email, timestamp: { $gte: blockExpiry }, blocked: true },
          ...(ip ? [{ ip, timestamp: { $gte: blockExpiry }, blocked: true }] : [])
        ]
      });

      if (isCurrentlyBlocked) {
        return true; // User is still blocked
      }

      // Mark user as blocked
      await failedAttempts.insertOne({
        email,
        ip: ip || "unknown",
        timestamp: now,
        blocked: true,
        permanent: false,
        blockDuration,
        attemptsCount: recentAttempts
      });

      return true;
    }

    // Record this failed attempt
    await failedAttempts.insertOne({
      email,
      ip: ip || "unknown",
      timestamp: now,
      blocked: false,
      permanent: false,
      attemptsCount: recentAttempts + 1
    });

    return false; // User not blocked yet
  } catch (error) {
    console.error("Failed to track unauthorized attempts:", error);
    return false; // Don't block if tracking fails
  }
}

/**
 * Authenticates and authorizes a user for admin operations
 * @returns Promise<AuthResult | AuthError>
 */
export async function authenticateAndAuthorize(): Promise<AuthResult | AuthError> {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return { status: 401, message: "Not authenticated" };
    }

    // Get user email
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    if (!email) {
      return { status: 400, message: "No email found" };
    }

    // Check if user is blocked due to repeated failed attempts
    const isBlocked = await checkAndTrackUnauthorizedAttempts(email);
    if (isBlocked) {
      return { status: 429, message: "Too many failed attempts. Please try again later." };
    }

    // Check authorization against allowed_emails collection
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      return { status: 403, message: "Not authorized" };
    }

    return {
      userId,
      email,
      isAuthorized: true
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { status: 500, message: "Authentication failed" };
  }
}

/**
 * Authenticates a user (without authorization check)
 * @returns Promise<AuthResult | AuthError>
 */
export async function authenticateOnly(): Promise<AuthResult | AuthError> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { status: 401, message: "Not authenticated" };
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    if (!email) {
      return { status: 400, message: "No email found" };
    }

    return {
      userId,
      email,
      isAuthorized: false // Not checked in this function
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { status: 500, message: "Authentication failed" };
  }
}

/**
 * Creates a Response object from an AuthError
 * @param error AuthError object
 * @returns Response
 */
export function createErrorResponse(error: AuthError): Response {
  return new Response(JSON.stringify({ message: error.message }), {
    status: error.status
  });
}

/**
 * Validates required fields in request body
 * @param body Request body
 * @param requiredFields Array of required field names
 * @returns AuthError | null (null if valid)
 */
export function validateRequiredFields(body: Record<string, unknown>, requiredFields: string[]): AuthError | null {
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== "string") {
      return { status: 400, message: `${field} is required` };
    }
  }
  return null;
} 