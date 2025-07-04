import {
  authenticateAndAuthorize,
  createErrorResponse,
  validateRequiredFields
} from "@/lib/auth-helpers";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET() {
  const authResult = await authenticateAndAuthorize();

  if ('status' in authResult) {
    return createErrorResponse(authResult);
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    const emails = await allowedEmails.find().sort({ created_at: 1 }).toArray();
    return new Response(JSON.stringify({ emails: emails.map(doc => doc.email) }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

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
    const allowedEmails = db.collection("allowed_emails");

    await allowedEmails.insertOne({
      email: body.email.toLowerCase(),
      created_at: new Date(),
      updated_at: new Date()
    });

    const emails = await allowedEmails.find().sort({ created_at: 1 }).toArray();
    return new Response(JSON.stringify({
      message: "Email added successfully",
      emails: emails.map(doc => doc.email)
    }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

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
    const allowedEmails = db.collection("allowed_emails");

    const result = await allowedEmails.deleteOne({ email: body.email.toLowerCase() });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: "Email not found" }), { status: 404 });
    }

    const emails = await allowedEmails.find().sort({ created_at: 1 }).toArray();
    return new Response(JSON.stringify({
      message: "Email removed successfully",
      emails: emails.map(doc => doc.email)
    }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}
