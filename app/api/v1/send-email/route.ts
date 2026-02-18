import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const emailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  type: z.enum(["otp", "invitation"]),
  name: z.string().optional(),
  code: z.string().optional(),
  inviterName: z.string().optional(),
  invitationUrl: z.string().url().optional(),
  role: z.string().optional(),
  expiresIn: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body
    const validatedData = emailSchema.parse(body);

    const result = await sendEmail(validatedData);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Email sent successfully",
      data: result.data,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("API Error [send-email]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}