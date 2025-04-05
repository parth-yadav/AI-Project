import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
        wishlist: {
          include: {
            products: true,
          },
        },
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// app/api/profile/route.ts



export async function PUT(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      image,
      mobileNumber,
      addresses,
      editingAddressIndex,
    } = body;

    // Prepare the updated data object
    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (image !== undefined) updateData.image = image;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;

    // Handle addresses
    if (addresses && Array.isArray(addresses)) {
      if (editingAddressIndex !== undefined) {
        // Edit an existing address at the specified index
        updateData.addresses = {
          set: addresses.map((address, index) =>
            index === editingAddressIndex ? addresses[editingAddressIndex] : address
          ),
        };
      } else {
        // Add a new address to the array
        updateData.addresses = {
          push: addresses[addresses.length - 1], // Append the last address in the array
        };
      }
    }

    // Update the user profile in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
