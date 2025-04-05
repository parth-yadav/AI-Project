// app/api/collections/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all collections from the database
    const collections = await prisma.collection.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Return the collections as JSON
    return NextResponse.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}
