import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define types for better type safety
// type CollectionResponse = string[]; // Array of collection names
// type ErrorResponse = { error: string }; // Error response type

export async function GET() {
  try {
    // Fetch only the 'name' field from the collections table
    const collections = await prisma.collection.findMany({
      select: {
        name: true,
      },
    });

    // Return the collection names as JSON
    return new Response(
      JSON.stringify(collections.map((collection) => collection.name)),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate", // Optional caching
        },
      }
    );
  } catch (error) {
    console.error("Error fetching collections:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to fetch collections" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
