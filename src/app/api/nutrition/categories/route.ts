import { NextRequest, NextResponse } from "next/server";
import { getUserCategories } from "@/db/queries/select";
import { addCategory } from "@/db/queries/insert";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const categories = await getUserCategories(userId);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Add a new custom category for a user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, unit, target } = body;

    console.log("userId: " + JSON.stringify(userId, null, 2));
    console.log("name: " + JSON.stringify(name, null, 2));
    console.log("unit: " + JSON.stringify(unit, null, 2));
    console.log("target: " + JSON.stringify(target, null, 2));

    // Validate the required fields
    if (!userId || !name || !unit || !target) {
      return NextResponse.json(
        { error: "Missing required fields: userId, name, unit, or target" },
        { status: 400 }
      );
    }

    // Create the category object for insertion
    const categoryData = {
      name,
      unit,
      target,
      type: null, // Always null for custom categories
    };

    // Use the existing addCategory function to insert the category
    await addCategory(userId, categoryData);

    return NextResponse.json(
      { message: "Category added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding custom category:", error);
    return NextResponse.json(
      { error: "Failed to add custom category" },
      { status: 500 }
    );
  }
}
