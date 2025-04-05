import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return Response.json(
        {
          error: "Invalid JSON payload",
          details: (parseError as Error).message,
        },
        { status: 400 }
      );
    }

    const { id } = body;

    if (!id) {
      return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}