"use client";

import { useEffect, useState } from "react";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default function AdminProducts() {
  const [, setProducts] = useState([]);
  const [collections, setCollections] = useState<string[]>([]); // State to hold collection names

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    setProducts(data);
  };

  const fetchCollections = async () => {
    const response = await fetch("/api/collectionname");
    const data = await response.json();
    setCollections(data); // Store the collection names in state
  };

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name"),
      collection: formData.get("collection"),
      images: [formData.get("images")],
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description"),
      material: formData.get("material"),
      washcare: formData.get("washcare"),
      shipping: formData.get("shipping"),
      tags: [formData.get("tags")],
      stock: parseInt(formData.get("stock") as string),
      sizes: [formData.get("sizes")],
      keyFeatures: [formData.get("keyFeatures")],
    };

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      alert("Product added successfully");
      fetchProducts(); // Refresh product list
    } else {
      alert("Failed to add product");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCollections();
  }, []);

  return (
    <>
      <div className="text-black ">
        <AdminNavigation />
        <div className="flex justify-center my-4">
          <h2 className="text-2xl font-semibold text-gray-300">Add Product</h2>
        </div>

        <div className="flex  justify-center min-h-screen">
          {/* Responsive Flex Container */}
          <form
            onSubmit={addProduct}
            className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full md:w-1/2"
          >
            {/* Name */}
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Collection */}
            <label
              htmlFor="collection"
              className="block text-sm font-medium text-gray-700"
            >
              Collection
            </label>
            <select
              id="collection"
              name="collection"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a Collection</option>
              {collections.map((collection, index) => (
                <option key={index} value={collection}>
                  {collection}
                </option>
              ))}
            </select>

            {/* Image URL */}
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="images"
              type="text"
              name="images"
              placeholder="Image URL"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Price */}
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Price"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Description */}
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Material */}
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              id="material"
              type="text"
              name="material"
              placeholder="Material"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Wash Care */}
            <label
              htmlFor="washcare"
              className="block text-sm font-medium text-gray-700"
            >
              Wash Care
            </label>
            <input
              id="washcare"
              type="text"
              name="washcare"
              placeholder="Wash Care"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Shipping Info */}
            <label
              htmlFor="shipping"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Info
            </label>
            <input
              id="shipping"
              type="text"
              name="shipping"
              placeholder="Shipping Info"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Tags */}
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Stock */}
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="Stock"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Sizes */}
            <label
              htmlFor="sizes"
              className="block text-sm font-medium text-gray-700"
            >
              Sizes (comma-separated)
            </label>
            <input
              id="sizes"
              type="text"
              name="sizes"
              placeholder="Sizes (comma-separated)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Key Features */}
            <label
              htmlFor="keyFeatures"
              className="block text-sm font-medium text-gray-700 "
            >
              Key Features (comma-separated)
            </label>
            
            <input
              id="keyFeatures"
              type="text"
              name="keyFeatures"
              placeholder="Key Features (comma-separated)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
