import clientPromise from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get user email
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    if (!email) {
      return NextResponse.json(
        { error: "No email found" },
        { status: 400 }
      );
    }

    // Single optimized database call
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");
    const failedAttempts = db.collection("failed_attempts");

    // Check if email is allowed first (most common case)
    const isAllowed = await allowedEmails.findOne({ email });
    if (isAllowed) {
      return NextResponse.json({
        authorized: true,
        email: email
      });
    }

    // Only check blocking if not allowed (less common case)
    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

    const isBlocked = await failedAttempts.findOne({
      email,
      $or: [
        { permanent: true },
        {
          timestamp: { $gte: fifteenMinutesAgo },
          blocked: true
        }
      ]
    });

    if (isBlocked) {
      return NextResponse.json(
        { error: "Too many failed attempts", blocked: true },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    );
  } catch (error) {
    console.error('Authorization check failed:', error);
    return NextResponse.json(
      { error: 'Authorization check failed' },
      { status: 500 }
    );
  }
} 