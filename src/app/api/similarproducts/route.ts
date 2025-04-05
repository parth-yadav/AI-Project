// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection");

  if (!collection) {
    return NextResponse.json(
      { message: "Collection parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch products for the specified collection
    const products = await prisma.product.findMany({
      where: { collection },
      select: {
        id: true,
        name: true,
        collection: true,
        images: true,
        price: true,
        sizes: true,
        description: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
