"use client";
import { FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";
import SimilarProducts from "@/components/SimilarProducts";
import Image from "next/image";
import { useAuth } from "@/lib/useAuth";
import ImageCarousel from "./ImageCarousel";

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  collection: string;
  material: string;
  washcare: string;
  shipping: string;
  price: number;
  sizes: string[];
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { userId } = useAuth();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State for popup notification
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { id, name, images, price, sizes } = product;

  useEffect(() => {
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

  const handleSizeClick = (size: string) => {
    console.log("handleSizeClick", size);
    setSelectedSize(size);
  };

  const addToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    setIsAddingToCart(true);

    try {
      console.log("Sending cart request with data:", {
        userId,
        productId: id,
        quantity: 1,
        size: selectedSize,
      });

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: id,
          quantity: 1,
          size: selectedSize,
        }),
      });

      console.log("Response status:", response.status);

      // For debugging, try to get the raw text first
      const rawText = await response.text();
      console.log("Raw response:", rawText);

      // Only try to parse as JSON if there's actual content
      let data;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch (parseError) {
          console.error("Failed to parse response as JSON:", parseError);
          throw new Error("Invalid response format from server");
        }
      } else {
        throw new Error("Empty response from server");
      }

      if (data && data.success) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        throw new Error(data?.error || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error instanceof Error ? error.message : String(error));
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      {/* Popup Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          Added to Cart!
        </div>
      )}

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Carousel */}
        <div className="md:sticky md:top-24">
          <ImageCarousel images={images} name={name} />
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6 px-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-nofex font-bold">{name}</h1>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking the button
                toggleWishlist();
              }}
              className="p-2 bg-black/50 rounded-full hover:bg-black transition-colors"
            >
              <FiHeart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted
                    ? "text-orange-500 fill-orange-500"
                    : "text-rebel-light"
                }`}
              />
            </button>
          </div>
          <div className="text-3xl font-bold"> ₹{(price ?? 0).toFixed(2)}</div>
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Select Size</h2>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => handleSizeClick(size)}
                  className={`py-3 border border-rebel-light rounded-md hover:bg-rebel-light hover:text-rebel-dark transition-colors ${
                    selectedSize === size
                      ? "bg-rebel-light text-rebel-dark"
                      : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={addToCart}
            className="w-full py-4 bg-orange-600 text-rebel-dark hover:text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
          >
            Add to Cart
          </button>
          <table className="w-full text-sm text-left">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-medium text-gray-200 ">
                  Description
                </th>
                <td className="py-3 px-4 text-gray-300">
                  {product.description}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-medium text-gray-200 ">
                  Material
                </th>
                <td className="py-3 px-4 text-gray-300">{product.material}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-medium text-gray-200 ">
                  Shipping
                </th>
                <td className="py-3 px-4 text-gray-300">{product.shipping}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-medium text-gray-200 ">
                  Washcare
                </th>
                <td className="py-3 px-4 text-gray-300">{product.washcare}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-16">
        <SimilarProducts collection={product.collection} />
      </div>
    </div>
  );
}
