import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface PromotionsProps {
  data: Promotion[];
}

const Promotions = ({ data }: PromotionsProps) => {
  return (
    <section className="py-16 bg-rebel-light dark:bg-rebel-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-nofex font-bold mb-8">Featured</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="w-full h-[400px]"
        >
          {data.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="relative w-full h-full">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rebel-dark via-rebel-dark/50 to-transparent rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-nofex font-bold mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-rebel-light/70 text-xl">
                      {promo.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Promotions;
