"use client";
import { useEffect, useState, useRef, TouchEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  collection: string;
  images: string[];
  price: number;
  sizes: string[];
  description: string;
}

interface SimilarProductsProps {
  collection: string; // Prop to filter products by collection
}

const SimilarProducts = ({ collection }: SimilarProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch products for the given collection
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/similarproducts?collection=${collection}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collection]);

  if (loading) return <div>Loading similar products...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalItems = products.length;

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
      items.push(products[index]);
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
    <div className="max-w-7xl mx-auto px-4 py-16">
     
        <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
        {/* <button className="text-rebel-light hover:underline">View All</button> */}
      

      {/* Carousel/Grid Container */}
      <div
        ref={carouselRef}
        className={`relative ${visibleItems === 4 ? "overflow-hidden" : ""}`}
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
            : products.map((product) => (
                <ProductCard key={product.id} {...product} isMobile={true} />
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
  );
};

export default SimilarProducts;
