import {
  authenticateAndAuthorize,
  createErrorResponse,
  validateRequiredFields
} from "@/lib/auth-helpers";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

// GET: View failed attempts (admin only)
export async function GET() {
  const authResult = await authenticateAndAuthorize();

  if ('status' in authResult) {
    return createErrorResponse(authResult);
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const failedAttempts = db.collection("failed_attempts");

    // Get all failed attempts, grouped by email
    const attempts = await failedAttempts
      .aggregate([
        {
          $group: {
            _id: "$email",
            attempts: { $push: "$$ROOT" },
            count: { $sum: 1 },
            lastAttempt: { $max: "$timestamp" },
            isPermanentlyBlocked: { $max: "$permanent" },
            blockedCount: {
              $sum: {
                $cond: [{ $eq: ["$blocked", true] }, 1, 0]
              }
            }
          }
        },
        { $sort: { lastAttempt: -1 } }
      ])
      .toArray();

    return new Response(JSON.stringify({ attempts }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// DELETE: Clear failed attempts for a specific email (admin only)
export async function DELETE(req: NextRequest) {
  const authResult = await authenticateAndAuthorize();

  if ('status' in authResult) {
    return createErrorResponse(authResult);
  }

  try {
    const body = await req.json();
    const validationError = validateRequiredFields(body, ['email']);
    if (validationError) {
      return createErrorResponse(validationError);
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const failedAttempts = db.collection("failed_attempts");

    const result = await failedAttempts.deleteMany({ email: body.email.toLowerCase() });

    return new Response(JSON.stringify({
      message: `Cleared ${result.deletedCount} failed attempts for ${body.email}`,
      deletedCount: result.deletedCount,
      email: body.email
    }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
} 