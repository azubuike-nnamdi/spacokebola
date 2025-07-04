import clientPromise from "@/lib/mongodb";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

// GET: Publicly accessible
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const announcements = db.collection("announcements");

    const data = await announcements.find().sort({ date: -1 }).toArray();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// POST: Create announcement (allowlist only)
export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const { title, date, category, image, excerpt, content } = body;

    if (!title || !date || !category || !excerpt || !content) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");
    const announcements = db.collection("announcements");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    const doc = {
      title,
      date,
      category,
      image,
      excerpt,
      content,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await announcements.insertOne(doc);
    return new Response(JSON.stringify({ ...doc, _id: result.insertedId }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// PUT: Update announcement (allowlist only)
export async function PUT(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return new Response(JSON.stringify({ message: "No email found" }), { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
  }

  try {
    const body = await req.json();
    const { title, date, category, image, excerpt, content } = body;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");
    const announcements = db.collection("announcements");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    const { ObjectId } = await import('mongodb');
    const result = await announcements.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, date, category, image, excerpt, content, updated_at: new Date() } }
    );

    return new Response(JSON.stringify({ message: "Announcement updated successfully" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// DELETE: Remove announcement (allowlist only)
export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return new Response(JSON.stringify({ message: "No email found" }), { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const allowedEmails = db.collection("allowed_emails");
    const announcements = db.collection("announcements");

    // Check if user is allowed
    const isAllowed = await allowedEmails.findOne({ email });
    if (!isAllowed) {
      return new Response(JSON.stringify({ message: "Not authorized" }), { status: 403 });
    }

    const { ObjectId } = await import('mongodb');
    const result = await announcements.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Announcement deleted" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
} 