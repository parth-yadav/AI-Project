// components/CollectionWrapper.tsx
"use client"; // Mark as a Client Component
import React from "react";
import ProductCard from "./ProductCard";
import { useAuth } from "../lib/useAuth";

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number; // Add other fields as needed
}

interface Collection {
  title: string;
  description: string;
  products: Product[];
}

interface CollectionWrapperProps {
  collection: Collection;
}

const CollectionWrapper: React.FC<CollectionWrapperProps> = ({
  collection,
}) => {
  const { userId } = useAuth(); // Get the authenticated user's ID

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-nofex font-bold mb-4">
            {collection.title}
          </h1>
          <p className="text-rebel-light/70 text-lg">
            {collection.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collection.products.map((product) => (
            <ProductCard
                  key={product.id}
                  {...product}
                  userId={userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionWrapper;
