"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import { useAuth } from "../../lib/useAuth";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import Loader from "@/components/Loader";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  size: string;
}

const ShoppingCart = () => {
  const { userId, loading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    if (loading) return;

    const fetchCart = async () => {
      setLoadingCart(true);
      try {
        const response = await fetch(`/api/cart?userId=${userId}`);
        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, [userId, loading]);

  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cartItemId, quantity: newQuantity }),
      });

      setCartItems((items) =>
        items.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cartItemId }),
      });

      setCartItems((items) => items.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleProductClick = (productId: string , name:string) => {
    router.push(`/collections/${encodeURIComponent(name)}/${productId}`); // Navigate to the product details page
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 15.99;
  const total = subtotal + shipping;

  if (loading || loadingCart) return <div>
    <Loader /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 overflow-x-hidden">
      <h1 className="text-3xl font-nofex font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 bg-white rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.product.images[0]} // Path to the image
                    alt={item.product.name} // Alt text for accessibility
                    width={500} // Specify the width of the image
                    height={500} // Specify the height of the image
                    className="w-full h-full object-cover rounded-md" // Apply styles
                  />
                </div>
                {/* Product Details */}
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between">
                    {/* Clickable Product Name */}
                    <Link
                      href={`/collections/${encodeURIComponent(
                        item.product.name
                      )}/${item.product.id}`}
                      className="font-nofex font-semibold text-black hover:underline cursor-pointer"
                      onClick={() =>
                        handleProductClick(item.product.id, item.product.name)
                      }
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-rebel-light transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5 text-black" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-black gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="font-bold text-black">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Your cart is empty.</div>
          )}
        </div>
        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <h2 className="text-xl text-rebel-dark font-nofex font-semibold">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-black">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-rebel-dark font-semibold">Total</span>
                  <span className="font-bold text-lg text-black">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full py-4 bg-rebel-light text-rebel-dark font-semibold rounded-md hover:opacity-90 transition-opacity">
              Proceed to Checkout
            </button>
            <p className="text-sm text-gray-500 text-center">
              Free shipping on orders over $200
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
