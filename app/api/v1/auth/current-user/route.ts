import { getCurrentUser } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized", user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user,
      success: true,
    });
  } catch (error) {
    console.error("[CURRENT_USER_GET]", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}