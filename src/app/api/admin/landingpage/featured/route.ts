import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all featured entries
export async function GET() {
  try {
    const featured = await prisma.featured.findMany();
    return Response.json(featured);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch featured entries" },
      { status: 500 }
    );
  }
}

// POST: Add a new featured entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, title, subtitle } = body;

    if (!image || !title || !subtitle) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newFeatured = await prisma.featured.create({
      data: { image, title, subtitle },
    });

    return Response.json(newFeatured, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create featured entry" },
      { status: 500 }
    );
  }
}

// PUT: Update a featured entry
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, image, title, subtitle } = body;

    if (!id || !image || !title || !subtitle) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedFeatured = await prisma.featured.update({
      where: { id },
      data: { image, title, subtitle },
    });

    return Response.json(updatedFeatured);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update featured entry" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a featured entry
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.featured.delete({
      where: { id },
    });

    return Response.json({ message: "Featured entry deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete featured entry" },
      { status: 500 }
    );
  }
}
