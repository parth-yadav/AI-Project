import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = (await context.params);

    // Validate the category parameter
    if (!category || category.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing category parameter" },
        { status: 400 }
      );
    }

    // Fetch products that belong to the specified collection
    const products = await prisma.product.findMany({
      where: {
        collection: category,
        hidden: false, // Exclude hidden products
      },
    });

    // If no products are found, return a 404 response
    if (!products || products.length === 0) {
      return NextResponse.json(
        { message: `No products found for the '${category}' collection` },
        { status: 404 }
      );
    }

    // Return the collection with its products
    return NextResponse.json({
      title: capitalizeFirstLetter(category),
      description: `Products in the ${category} collection`,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle specific Prisma errors (optional)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal server error" },
        { status: 500 }
      );
    }

    // Fallback for unexpected errors
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
