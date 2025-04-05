"use client";

import { useEffect, useState, useRef, TouchEvent } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";

// Define the shape of the product data
interface Product {
  id: string;
  name: string;
  collection: string;
  images: string[];
  price: number;
  description: string;
  material: string;
  washcare: string;
  shipping: string;
  tags: string[];
  stock: number;
  sizes: string[];
  keyFeatures: string[];
  isPopular: boolean;
}

export default function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Carousel state and refs
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Dynamically calculate the number of visible items based on screen size
  const getVisibleItemsCount = () => {
    if (typeof window === "undefined") return 4; // Default for SSR
    return window.innerWidth < 768 ? 2 : 4; // 2 items on mobile, 4 on larger screens
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItemsCount());

  // Update visible items count on window resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItemsCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch popular products from the API
  useEffect(() => {
    const fetchPopularProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/landingpage/popularnow");
        if (!response.ok) throw new Error("Failed to fetch popular products");
        const data: Product[] = await response.json();
        setPopularProducts(data);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Popular Now</h2>
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-72 h-96 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (popularProducts.length === 0) {
    return null;
  }

  const totalItems = popularProducts.length;

  // Handle circular navigation
  const navigate = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  // Get the items to display in the carousel
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % totalItems;
      items.push(popularProducts[index]);
    }
    return items;
  };

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    if (distance > minSwipeDistance) {
      // Swiped left, move right
      navigate("right");
    } else if (distance < -minSwipeDistance) {
      // Swiped right, move left
      navigate("left");
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Popular Now</h2>

        {/* Carousel/Grid Container */}
        <div
          ref={carouselRef}
          className={`relative ${
            visibleItems === 4 ? "overflow-hidden" : ""
          }`}
        >
          {/* Left Arrow Button */}
          {visibleItems === 4 && (
            <button
              onClick={() => navigate("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Carousel/Grid Layout */}
          <div
            className={`grid gap-4 ${
              visibleItems === 4 ? "grid-cols-4" : "grid-cols-2"
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleItems === 4
              ? getVisibleItems().map((product) => (
                  <ProductCard
                    key={`${product.id}-${currentIndex}`}
                    {...product}
                    isMobile={false}
                  />
                ))
              : popularProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    isMobile={true}
                  />
                ))}
          </div>

          {/* Right Arrow Button */}
          {visibleItems === 4 && (
            <button
              onClick={() => navigate("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}