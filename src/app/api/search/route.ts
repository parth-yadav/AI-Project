// app/api/search/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Fetch products where the name contains the query (case-insensitive)
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive", // Case-insensitive search
        },
      },
      select: {
        id: true,
        name: true,
        images: true,
      },
      take: 5, // Limit the number of results to 5
    });

    // Return the products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error searching products:", error);

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
