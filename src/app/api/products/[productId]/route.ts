import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request, props: { params: Promise<{ productId: string }> }) {
  console.log("Fetching product data");
  const params = await props.params;
  if (!params.productId) {
    return NextResponse.json(
      { message: "Product ID is required" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
      hidden: false, // Exclude hidden products
      
     },

  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
