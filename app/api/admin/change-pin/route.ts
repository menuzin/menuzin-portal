import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hashPin, getAdminSettings, updateAdminPin, verifyPin } from "@/lib/auth";
import { z } from "zod";

export const runtime = 'nodejs'

const changePinSchema = z.object({
  currentPin: z.string().length(6).regex(/^\d+$/, "PIN must be 6 digits"),
  newPin: z.string().length(6).regex(/^\d+$/, "PIN must be 6 digits"),
});

export async function POST(request: NextRequest) {
  try {
    // Check auth cookie
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session")?.value;
    
    if (!adminSession || adminSession !== "valid") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPin, newPin } = changePinSchema.parse(body);

    // Verify current PIN
    const settings = await getAdminSettings();
    if (!settings) {
      return NextResponse.json(
        { error: "Admin settings not found" },
        { status: 404 }
      );
    }

    const isValid = await verifyPin(currentPin, settings.pinHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current PIN is incorrect" },
        { status: 401 }
      );
    }

    // Update PIN
    const pinHash = await hashPin(newPin);
    await updateAdminPin(pinHash);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Change PIN error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}