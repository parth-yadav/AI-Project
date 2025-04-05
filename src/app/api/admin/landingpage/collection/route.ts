import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all collections
export async function GET() {
  try {
    const collections = await prisma.collection.findMany();
    return Response.json(collections);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

// POST: Add a new collection
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image } = body;

    // Validate required fields
    if (!name || !description) {
      return Response.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    // Optional: Validate image URL format
    if (image && !isValidUrl(image)) {
      return Response.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    const newCollection = await prisma.collection.create({
      data: { name, description, image: image || undefined }, // Use default if no image provided
    });

    return Response.json(newCollection, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}

// PUT: Update a collection
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, image } = body;

    // Validate required fields
    if (!id || !name || !description) {
      return Response.json(
        { error: "ID, name, and description are required" },
        { status: 400 }
      );
    }

    // Optional: Validate image URL format
    if (image && !isValidUrl(image)) {
      return Response.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    const updatedCollection = await prisma.collection.update({
      where: { id },
      data: { name, description, image: image || undefined }, // Use default if no image provided
    });

    return Response.json(updatedCollection);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update collection" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a collection
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.collection.delete({
      where: { id },
    });

    return Response.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}

// Helper Function: Validate URL Format
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
