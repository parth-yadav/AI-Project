import { useState, useEffect } from "react";
import Image from "next/image";

type HeroProps = {
  data: {
    id: string;
    title: string;
    subtitle: string;
    image: string; // URL to the hero image
    link: string; // URL to the linked page
  }[]; // Array of hero slides
};

const Hero = ({ data }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle missing or empty data
  if (!data || data.length === 0) {
    return (
      <div className="relative h-screen bg-wolf-dark flex items-center justify-center">
        <p className="text-wolf-light text-2xl font-nofex">
          No hero content available
        </p>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data]);

  return (
    <div className="relative h-[85vh]">
      {data.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-75"
            />
          </div>

          {/* Overlay and Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-wolf-dark/50 to-transparent">
            <div className="absolute bottom-16 left-16">
              <h2 className="text-xl font-nofex mb-2 text-wolf-light/80">
                {slide.subtitle}
              </h2>
              <h1 className="text-6xl font-nofex font-bold mb-6">
                {slide.title}
              </h1>
              <a
                href={slide.link}
                className="text-wolf-light text-lg font-nofex hover:text-purple-500 transition-colors border-b border-transparent hover:border-purple-500"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;
