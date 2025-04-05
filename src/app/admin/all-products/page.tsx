"use client";

import AdminNavigation from "@/components/admin/AdminNavigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  collection: string;
  images: string[];
  price: number;
  description: string;
  material: string;
  washcare: string;
  shipping: string;
  isPopular: boolean;
  hidden: boolean;
  tags: string[];
  stock: number;
  sizes: string[];
  keyFeatures: string[];
};

export default function AdminAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/admin/products");
    const data = await response.json();
    setProducts(data);
  };

  const editProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingProduct) {
      alert("No product selected for editing");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const updatedProduct = {
      id: editingProduct.id,
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      alert("Product updated successfully");
      setEditingProduct(null);
      fetchProducts();
    } else {
      alert("Failed to update product");
    }
  };

  const toggleIsPopular = async (productId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;

    const response = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, isPopular: updatedStatus }),
    });

    if (response.ok) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, isPopular: updatedStatus } : product
        )
      );
    } else {
      alert("Failed to update product popularity status");
    }
  };

  const toggleIsHidden = async (productId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;

    const response = await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, hidden: updatedStatus }),
    });

    if (response.ok) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, hidden: updatedStatus }
            : product
        )
      );
    } else {
      alert("Failed to update product hidden status");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Group products by collection
  const groupedProducts = products.reduce((acc, product) => {
    const collection = product.collection || "Uncategorized";
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <AdminNavigation />
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

      {/* Render Products Grouped by Collection */}
      {Object.entries(groupedProducts).map(([collection, productsInCollection]) => (
        <div key={collection} className="mb-10">
          {/* Collection Title */}
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{collection}</h3>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productsInCollection.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md text-center space-y-4"
              >
                {/* Product Name */}
                <p className="text-lg font-medium text-gray-900">{product.name}</p>

                {/* Product Price */}
                <p className="text-sm text-gray-500">${product.price}</p>

                {/* Is Popular Checkmark */}
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="checkbox"
                    checked={product.isPopular}
                    onChange={() => toggleIsPopular(product.id, product.isPopular)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label className="text-sm text-gray-600">Popular</label>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <input
                    type="checkbox"
                    checked={product.hidden}
                    onChange={() => toggleIsHidden(product.id, product.hidden)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label className="text-sm text-gray-600">Hide</label>
                </div>

                {/* Edit Button */}
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 transition"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    

      {/* Modal for Editing Product */}
      {editingProduct && (
        <div
          className="fixed inset-0 overflow-auto bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setEditingProduct(null)} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg p-8 max-w-2xl w-full overflow-y-auto max-h-[80vh]"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <form onSubmit={editProduct} className="space-y-4 text-black">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Product
              </h3>

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
                defaultValue={editingProduct.name}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Collection */}
              <label
                htmlFor="collection"
                className="block text-sm font-medium text-gray-700"
              >
                Collection
              </label>
              <input
                id="collection"
                type="text"
                name="collection"
                defaultValue={editingProduct.collection}
                placeholder="Collection"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

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
                defaultValue={editingProduct.images?.[0]}
                placeholder="Image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.price}
                placeholder="Price"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.description}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.material}
                placeholder="Material"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.washcare}
                placeholder="Wash Care"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.shipping}
                placeholder="Shipping Info"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.tags?.join(",")}
                placeholder="Tags (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.stock}
                placeholder="Stock"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={editingProduct.sizes?.join(",")}
                placeholder="Sizes (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Key Features */}
              <label
                htmlFor="keyFeatures"
                className="block text-sm font-medium text-gray-700"
              >
                Key Features (comma-separated)
              </label>
              <input
                id="keyFeatures"
                type="text"
                name="keyFeatures"
                defaultValue={editingProduct.keyFeatures?.join(",")}
                placeholder="Key Features (comma-separated)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
