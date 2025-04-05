import ProductPage from "@/components/ProductPage";

// Fetch product data in the Server Component
async function getProductData(productId: string) {
  try {
    console.log("Fetching product data for productId:", productId); // Debugging log
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch product data:", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export default async function ProductPagee({
  params,
}: {
  params: Promise<{ category: string; productId: string }>;
}) {
  // Await the params object to resolve it
  const awaitedParams = await params;
  const {  productId } = awaitedParams;

  console.log("Params received:", awaitedParams); // Debugging log

  // Validate productId
  if (!productId) {
    return <div>Invalid product</div>;
  }

  // Fetch product data
  const product = await getProductData(productId);

  // Handle missing product
  if (!product) {
    return <div>Product not found</div>;
  }

  // Render the ProductPage component
  return <ProductPage product={product} />;
}

//TODO : prod details not visible