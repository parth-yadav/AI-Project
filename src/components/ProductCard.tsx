"use client";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  images: string | string[];
  name: string;
  price: number;
  userId?: string | null; // Pass the current user's ID
  isMobile?: boolean; // Optional boolean to determine if it's mobile UI
}

const ProductCard = ({
  id,
  images,
  name,
  price,
  userId,
  isMobile = false,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if the product is already wishlisted
    const checkWishlistStatus = async () => {
      const response = await fetch(
        `/api/wishlist?userId=${userId}&productId=${id}`
      );
      const data = await response.json();
      setIsWishlisted(data.isWishlisted);
    };
    checkWishlistStatus();
  }, [id, userId]);

  const toggleWishlist = async () => {
    const method = isWishlisted ? "DELETE" : "POST";
    const response = await fetch("/api/wishlist", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: id }),
    });
    const data = await response.json();
    if (data.success) {
      setIsWishlisted(!isWishlisted);
    }
  };

  // Extract the first image URL or use a fallback
  const imageUrl =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : typeof images === "string" && images.trim() !== ""
      ? images
      : "/placeholder.png"; // Replace with your fallback image path

  // Use Tailwind classes instead of inline styles with dynamic values
  const cardClasses = isMobile
    ? "w-[150px] h-[300px]" // Smaller dimensions for mobile
    : "w-72 h-[400px]"; // Larger dimensions for desktop

  return (
    <Link href={`/collections/${encodeURIComponent(name)}/${id}`} passHref>
      <div
        className={`group relative ${cardClasses} bg-rebel-dark rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-rebel-light/20 cursor-pointer`}
      >
        {/* Image Container */}
        <div className="relative h-[70%]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill // Automatically sizes the image to fit the container
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-400">No Image</p>
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the button
              toggleWishlist();
            }}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black transition-colors"
          >
            <FiHeart
              className={`w-5 h-5 transition-colors ${
                isWishlisted
                  ? "text-purple-500 fill-purple-500"
                  : "text-rebel-light"
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-4 text-rebel-light">
          <h3
            className={`font-nofex font-semibold mb-2 ${
              isMobile ? "text-sm" : "text-lg"
            }`}
          >
            {name}
          </h3>
          <div className="flex justify-between items-center">
            <span
              className={`font-impact ${isMobile ? "text-base" : "text-xl"}`}
            >
              ₹{price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
