import { createAuditLog } from "@/lib/audit";
import { destroySession, getCurrentUser } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (user) {
      await createAuditLog({
        userId: user.id,
        action: "LOGOUT",
        entityType: "USER",
        entityId: user.id,
      });
    }

    await destroySession();

    return NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("[LOGOUT_POST]", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
