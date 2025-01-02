import { NextRequest, NextResponse } from "next/server";
import { getFoodSubmissionLogsByUser } from "@/db/queries/select";

export async function GET(req: NextRequest) {
  try {
    // Get the userId from the query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Validate the userId
    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    // Fetch logs for the specified userId
    const submissions = await getFoodSubmissionLogsByUser(userId);

    // Return the submissions as JSON
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching food submissions:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch food submissions" },
      { status: 500 }
    );
  }
}
