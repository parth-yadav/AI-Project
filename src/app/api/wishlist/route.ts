import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add a product to the wishlist
export async function POST(request: Request) {
  try {
    const { userId, productId } = await request.json();
    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Check if the user has a wishlist
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });
    if (!wishlist) {
      // Create a new wishlist for the user if it doesn't exist
      wishlist = await prisma.wishlist.create({
        data: { userId },
      });
    }

    // Add the product to the wishlist
    await prisma.wishlist.update({
      where: { id: wishlist.id },
      data: {
        products: {
          connect: { id: productId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// Remove a product from the wishlist
export async function DELETE(request: Request) {
  try {
    const { userId, productId } = await request.json();
    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    });
    if (!wishlist) {
      return NextResponse.json(
        { success: false, error: "Wishlist not found" },
        { status: 404 }
      );
    }

    // Remove the product from the wishlist
    await prisma.wishlist.update({
      where: { id: wishlist.id },
      data: {
        products: {
          disconnect: { id: productId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/wishlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove product" },
      { status: 500 }
    );
  }
}

// Check if a product is wishlisted
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: { products: true },
    });

    if (!wishlist) {
      return NextResponse.json({ isWishlisted: false });
    }

    const isWishlisted = wishlist.products.some(
      (product) => product.id === productId
    );

    return NextResponse.json({ isWishlisted });
  } catch (error) {
    if (error) {
      console.error("Error in GET /api/wishlist:", error);
    } else {
      console.error("Unknown error occurred in GET /api/wishlist");
    }
    return NextResponse.json(
      { success: false, error: "Failed to check wishlist" },
      { status: 500 }
    );
  }
}
