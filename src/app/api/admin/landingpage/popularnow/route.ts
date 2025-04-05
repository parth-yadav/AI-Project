// app/api/popular-products/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch products where isPopular is true
    const popularProducts = await prisma.product.findMany({
      where: {
        isPopular: true,
      },
      select: {
        id: true,
        name: true,
        collection: true,
        images: true,
        price: true,
        description: true,
        material: true,
        washcare: true,
        shipping: true,
        tags: true,
        stock: true,
        sizes: true,
        keyFeatures: true,
        isPopular: true,
      },
    });

    // Return the products as JSON
    return NextResponse.json(popularProducts);
  } catch (error) {
    console.error("Error fetching popular products:", error);

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { error: "Failed to fetch popular products" },
      { status: 500 }
    );
  }
}
