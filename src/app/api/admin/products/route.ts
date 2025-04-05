import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      collection,
      images,
      price,
      description,
      material,
      washcare,
      shipping,
      tags,
      stock,
      sizes,
      keyFeatures,
    } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        collection,
        images,
        price,
        description,
        material,
        washcare,
        shipping,
        tags,
        stock,
        sizes,
        keyFeatures,
      },
    });

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// Add this route to handle product updates
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      collection,
      images,
      price,
      description,
      material,
      washcare,
      shipping,
      tags,
      stock,
      sizes,
      keyFeatures,
      isPopular, // Add isPopular to the destructured fields
      hidden
    } = body;

    if (!id) {
      return Response.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        collection,
        images,
        price,
        description,
        material,
        washcare,
        shipping,
        tags,
        stock,
        sizes,
        keyFeatures,
        isPopular, // Include isPopular in the update
        hidden

      },
    });

    return Response.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return Response.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
