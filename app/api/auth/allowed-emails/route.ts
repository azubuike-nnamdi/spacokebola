import { supabaseServer } from "@/lib/supabase-server";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// --- Helpers ---

async function getSessionEmail(request: NextRequest): Promise<string | null> {
  const { userId } = getAuth(request);
  if (!userId) return null;
  const user = await currentUser();
  return user?.emailAddresses?.[0]?.emailAddress?.toLowerCase() ?? null;
}

async function isAllowed(request: NextRequest): Promise<boolean> {
  const email = await getSessionEmail(request);
  if (!email) return false;
  const { data } = await supabaseServer
    .from("allowed_emails")
    .select("email")
    .eq("email", email)
    .single();
  return !!data;
}

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}

function serverError(msg: string) {
  return NextResponse.json({ error: msg }, { status: 500 });
}

async function getAllEmails() {
  const { data } = await supabaseServer
    .from("allowed_emails")
    .select("email")
    .order("created_at");
  return data?.map(row => row.email) || [];
}

// --- Handlers ---

export async function GET(request: NextRequest) {
  if (!(await isAllowed(request))) return forbidden();
  try {
    const emails = await getAllEmails();
    return NextResponse.json({ emails });
  } catch {
    return serverError("Failed to fetch allowed emails");
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAllowed(request))) return forbidden();
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") return badRequest("Email is required");

    // Check if email already exists
    const { data: exists } = await supabaseServer
      .from("allowed_emails")
      .select("email")
      .eq("email", email.toLowerCase())
      .single();
    if (exists) {
      return NextResponse.json(
        { error: "Email already exists in the list" },
        { status: 409 }
      );
    }

    const { error: insertError } = await supabaseServer
      .from("allowed_emails")
      .insert([{ email: email.toLowerCase() }]);
    if (insertError) return serverError("Failed to add email to database");

    const emails = await getAllEmails();
    return NextResponse.json({ message: "Email added successfully", emails });
  } catch {
    return serverError("Failed to add email");
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAllowed(request))) return forbidden();
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") return badRequest("Email is required");

    const { error: deleteError } = await supabaseServer
      .from("allowed_emails")
      .delete()
      .eq("email", email.toLowerCase());
    if (deleteError) return serverError("Failed to remove email");

    const emails = await getAllEmails();
    return NextResponse.json({ message: "Email removed successfully", emails });
  } catch {
    return serverError("Failed to remove email");
  }
}
