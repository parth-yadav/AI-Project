// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { useRef } from "react";
// import ProductCard from "./ProductCard";

// interface Product {
//   id: number;
//   image: string;
//   name: string;
//   price: number;
// }

// interface ProductSliderProps {
//   title: string;
//   products: Product[];
// }

// const ProductSlider = ({ title, products }: ProductSliderProps) => {
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (sliderRef.current) {
//       const scrollAmount = direction === "left" ? -400 : 400;
//       sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="relative py-8">
//       <h2 className="text-2xl font-nofex font-bold mb-6 px-6">{title}</h2>
//       <div className="relative">
//         <button
//           onClick={() => scroll("left")}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
//         >
//           <FiChevronLeft className="w-6 h-6 text-rebel-light" />
//         </button>
//         <div
//           ref={sliderRef}
//           className="flex overflow-x-auto scrollbar-hide gap-6 px-6 py-4"
//           style={{ scrollSnapType: "x mandatory" }}
//         >
//           {products.map((product) => (
//             <div key={product.id} style={{ scrollSnapAlign: "start" }}>
//               <ProductCard {...product} />
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={() => scroll("right")}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black transition-colors"
//         >
//           <FiChevronRight className="w-6 h-6 text-rebel-light" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductSlider;
