"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState, useEffect, TouchEvent } from "react";
import CollectionCard from "./CollectionCard";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CollectionsProps {
  data: Collection[];
}

const Collections = ({ data }: CollectionsProps) => {
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

  const totalItems = data.length;

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
      items.push(data[index]);
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
        <h2 className="text-3xl font-nofex font-bold mb-8">Collections</h2>
        <div className="relative">
          {/* Left Arrow Button */}
          {visibleItems === 4 && (
            <button
              onClick={() => navigate("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-6 h-6 text-rebel-light" />
            </button>
          )}

          {/* Carousel/Grid Container */}
          <div
            ref={carouselRef}
            className={`grid gap-4 ${
              visibleItems === 4 ? "grid-cols-4" : "grid-cols-2"
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleItems === 4
              ? getVisibleItems().map((collection) => (
               
                <CollectionCard
                  key={`${collection.id}-${currentIndex}`}
                  image={collection.image}
                  title={collection.name}
                  description={collection.description}
                  ismobile = {false}
                />
                 
              ))
              : data.map((collection) => (

                <CollectionCard
                  key={collection.id}
                  image={collection.image}
                  title={collection.name}
                  description={collection.description}
                  ismobile= {true}
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
              <FiChevronRight className="w-6 h-6 text-rebel-light" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Collections;
