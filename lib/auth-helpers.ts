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