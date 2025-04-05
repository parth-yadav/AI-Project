"use client";

import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

interface Product {
  id: string;
  name: string;
  images: string[];
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes and fetch search results
  const handleChange = async (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(value)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data: Product[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Clear the search bar when a product is clicked
  const handleProductClick = () => {
    setQuery(""); // Reset the query state
    setResults([]); // Clear the dropdown results
  };

  return (
    <div className="hidden md:flex items-center border border-wolf-dark  dark:border-wolf-light rounded-full px-4 py-2 focus-within:border-wolf-light transition-colors relative w-full max-w-md">
      {/* Search Icon */}
      <FiSearch className="w-5 h-5 text-wolf-dark dark:text-wolf-light" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent border-none focus:outline-none ml-2 w-40 font-impact text-wolf-dark dark:text-wolf-light placeholder:text-wolf-dark/60 dark:placeholder:text-wolf-light/60"
      />

      {/* Dropdown Results */}
      {query && results.length > 0 && (
        <div className="absolute top-full text-black left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${encodeURIComponent(product.name)}/${
                product.id
              }`}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleProductClick} // Clear the search bar on click
            >
              {/* Product Image */}
              <Image
                src={product.images[0] || "/placeholder.png"} // Fallback to a placeholder image
                alt={product.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
              {/* Product Name */}
              <span className="ml-3 text-sm">{product.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg mt-2 z-10">
          <div className="p-4 text-center">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
