// app/api/cart/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch the user's cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing userId" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: cart.items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// Add an item to the cart
export async function POST(request: Request) {
  try {
    // Log the incoming request for debugging
    console.log("Cart POST request received");

    // Parse and validate the request body
    let body;
    try {
      body = await request.json();
      console.log("Request body:", body);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { userId, productId, quantity, size } = body;

    if (!userId || !productId || !quantity || !size) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    console.log("Looking for cart with userId:", userId);

    // Find or create the user's cart
    let cart;
    try {
      cart = await prisma.cart.findUnique({
        where: { userId },
      });
      console.log("Existing cart:", cart);
    } catch (dbError) {
      console.error("Database error finding cart:", dbError);
      return NextResponse.json(
        { success: false, error: "Database error", message: String(dbError) },
        { status: 500 }
      );
    }

    if (!cart) {
      try {
        console.log("Creating new cart for userId:", userId);
        cart = await prisma.cart.create({
          data: { userId },
        });
        console.log("New cart created:", cart);
      } catch (createError) {
        console.error("Error creating cart:", createError);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to create cart",
            message: String(createError),
          },
          { status: 500 }
        );
      }
    }

    // Rest of your logic with similar try/catch blocks
    // ...

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        size,
      },
    });

    if (existingCartItem) {
      // Update the quantity if the item already exists
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Create a new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          size,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unhandled error in cart POST:", error);

    // Return a valid JSON response
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    // Always return a valid response, even if an error occurs above
    console.log("POST request processing completed");
  }
}


// Update the quantity of a cart item
export async function PUT(request: Request) {
  try {
    const { userId, cartItemId, quantity } = await request.json();

    if (!userId || !cartItemId || !quantity) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Update the cart item's quantity
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart item:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update cart item",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Remove an item from the cart
export async function DELETE(request: Request) {
  try {
    const { userId, cartItemId } = await request.json();

    if (!userId || !cartItemId) {
      return NextResponse.json(
        { success: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing cart item:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove cart item",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
