import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all hero entries
export async function GET() {
  try {
    const heroes = await prisma.hero.findMany();
    return Response.json(heroes);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch hero entries" },
      { status: 500 }
    );
  }
}

// POST: Add a new hero entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, image, link } = body;

    if (!title || !subtitle || !image || !link) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newHero = await prisma.hero.create({
      data: { title, subtitle, image, link },
    });

    return Response.json(newHero, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create hero entry" },
      { status: 500 }
    );
  }
}

// PUT: Update a hero entry
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, image, link } = body;

    if (!id || !title || !subtitle || !image || !link) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedHero = await prisma.hero.update({
      where: { id },
      data: { title, subtitle, image, link },
    });

    return Response.json(updatedHero);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to update hero entry" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a hero entry
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.hero.delete({
      where: { id },
    });

    return Response.json({ message: "Hero entry deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to delete hero entry" },
      { status: 500 }
    );
  }
}
