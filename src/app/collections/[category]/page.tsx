// app/collections/[category]/page.tsx
import CollectionWrapper from "@/components/CollectionWrapper";
interface Collection {
  title: string;
  description: string;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number; // Add other fields as needed
}

export default async function CollectionPage({
  params,
}: {
    params: Promise<{ category: string; }>;
}) {
 const awaitedParams = await params;
  const { category} = awaitedParams;
 

  if (!category) {
    return <div>Invalid category</div>;
  }

  const collection = await getCollectionData(category);
  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Collection not found</h1>
      </div>
    );
  }

  // Pass the collection data to the client-side wrapper
  return <CollectionWrapper collection={collection} />;
}

// Fetch collection data on the server
async function getCollectionData(category: string): Promise<Collection | null> {
  try {
    console.log("Fetching collection data for category:", category); // Debugging log
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/collections/${category}`,
      {
        cache: "no-store", // Disable caching for dynamic data
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch collection data:", response.status);
      return null;
    }
    const data: Collection = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    return null;
  }
}
