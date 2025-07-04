import clientPromise from "@/lib/mongodb";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return new Response(JSON.stringify({ message: "No email found" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    const emails = await allowedEmails.find().sort({ created_at: 1 }).toArray();
    return new Response(JSON.stringify({ emails: emails.map(doc => doc.email) }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!userEmail) {
    return new Response(JSON.stringify({ message: "No email found" }), { status: 400 });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email: userEmail });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    await allowedEmails.insertOne({
      email: email.toLowerCase(),
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
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!userEmail) {
    return new Response(JSON.stringify({ message: "No email found" }), { status: 400 });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email: userEmail });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    const result = await allowedEmails.deleteOne({ email: email.toLowerCase() });
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
