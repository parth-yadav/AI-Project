"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface CollectionCardProps {
  image: string;
  title: string;
  description: string;
  ismobile?: boolean; // Optional boolean to determine if it's mobile UI
}

const CollectionCard = ({
  image,
  title,
  description,
  ismobile = false,
}: CollectionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use Tailwind classes instead of inline styles with dynamic values
  const cardClasses = ismobile ? "w-[150px] h-[200px]" : "w-72 h-96"; // w-72 is 288px, h-96 is 384px in Tailwind

  return (
    <Link
      href={`/collections/${encodeURIComponent(title)}`}
      className={`relative ${cardClasses} group cursor-pointer ${
        isHovered ? "border-2 border-purple-500" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View collection: ${title}`}
    >
      {/* Card Image Container */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {/* Optimized Image */}
        <Image
          src={image}
          alt={title}
          fill // Automatically sizes the image to fit the container
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-rebel-dark via-rebel-dark/50 to-transparent" />
      </div>

      {/* Title and Description Container */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 text-rebel-light transition-all duration-300 ${
          isHovered ? "h-32" : "h-16"
        }`}
      >
        {/* Title */}
        <h3
          className={`text-2xl font-nofex font-bold mb-2 transition-transform duration-300 ${
            isHovered ? "-translate-y-16" : "translate-y-0"
          }`}
        >
          {title}
        </h3>
        {/* Description */}
        <p
          className={`text-rebel-light/70 font-nofex transform transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {description}
        </p>
      </div>
    </Link>
  );
};

export default CollectionCard;
