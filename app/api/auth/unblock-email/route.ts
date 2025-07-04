import {
  authenticateAndAuthorize,
  createErrorResponse,
  validateRequiredFields
} from "@/lib/auth-helpers";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
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

    const result = await failedAttempts.deleteMany({
      email: body.email.toLowerCase()
    });

    return new Response(JSON.stringify({
      message: `Unblocked ${body.email}`,
      deletedCount: result.deletedCount
    }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
} 