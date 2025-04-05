// app/api/address/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all addresses for a user
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Add a new address
export async function POST(request: NextRequest) {
  const { userId, street, city, state, country, zipCode } =
    await request.json();

  if (!userId || !street || !city || !state || !country || !zipCode) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newAddress = await prisma.address.create({
      data: {
        userId,
        street,
        city,
        state,
        country,
        zipCode,
      },
    });

    return NextResponse.json(newAddress);
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing address
export async function PUT(request: NextRequest) {
  const addressId = request.nextUrl.pathname.split("/").pop();
  const { userId, street, city, state, country, zipCode } =
    await request.json();

  if (
    !addressId ||
    !userId ||
    !street ||
    !city ||
    !state ||
    !country ||
    !zipCode
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        street,
        city,
        state,
        country,
        zipCode,
      },
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete an address
export async function DELETE(request: NextRequest) {
    const addressId = request.nextUrl.pathname.split("/").pop();
    console.log("Deleting address with ID:", addressId);

  if (!addressId) {
    return NextResponse.json(
      { message: "Address ID is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
