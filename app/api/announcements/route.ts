import { supabaseServer } from "@/lib/supabase-server";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Helper: Check Clerk session and allowlist
async function isAllowed(request: NextRequest): Promise<string | null> {
  const { userId } = getAuth(request);
  if (!userId) return null;
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
  if (!email) return null;
  const { data, error } = await supabaseServer
    .from("allowed_emails")
    .select("email")
    .eq("email", email)
    .single();
  if (error || !data) return null;
  return email;
}

// GET: Publicly accessible
export async function GET() {
  const { data, error } = await supabaseServer
    .from("announcements")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: Create announcement (allowlist only)
export async function POST(request: NextRequest) {
  const allowed = await isAllowed(request);
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();

  const { title, date, category, image, excerpt, content } = body;

  if (!title || !date || !category || !excerpt || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from("announcements")
    .insert([{ title, date, category, image, excerpt, content }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// PUT: Update announcement (allowlist only)
export async function PUT(request: NextRequest) {
  const allowed = await isAllowed(request);
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const body = await request.json();
  const { title, date, category, image, excerpt, content } = body;

  const { data, error } = await supabaseServer
    .from("announcements")
    .update({ title, date, category, image, excerpt, content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE: Remove announcement (allowlist only)
export async function DELETE(request: NextRequest) {
  const allowed = await isAllowed(request);
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabaseServer
    .from("announcements")
    .delete()
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
  return NextResponse.json({ message: "Announcement deleted" });
} 