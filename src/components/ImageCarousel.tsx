import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: string[];
  name: string;
}

export default function ImageCarousel({ images, name }: ImageCarouselProps) {
  return (
    <div className="md:sticky md:top-24">
      <div className="w-full h-[500px]">
        {images && images.length > 0 ? (
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {images.map((img: string, index: number) => (
                <CarouselItem key={index} className="h-full">
                  <div className="aspect-square relative h-full w-full">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${name} ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                      aria-label={`Product image ${index + 1}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-black text-purple-600 left-2" />
            <CarouselNext className="right-2 bg-black text-purple-600" />
          </Carousel>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No images available</p>
          </div>
        )}
      </div>
    </div>
  );
}
