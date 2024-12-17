import { NextRequest, NextResponse } from "next/server";
import { getUserSettings } from "@/db/queries/select";
import { upsertUserSetting } from "@/db/queries/update";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const settings = await getUserSettings(userId);
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, key, value } = body;

  if (!userId || !key || !value) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await upsertUserSetting(userId, key, value);
    return NextResponse.json({ message: "Setting updated successfully" });
  } catch (error) {
    console.error("Error updating user setting:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
  }
}
