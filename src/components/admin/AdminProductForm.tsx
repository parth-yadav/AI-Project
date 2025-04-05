import React from "react";
import { FiX } from "react-icons/fi";

// Define a type for the product object
interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
}

interface AdminProductFormProps {
  product?: Product; // Use the Product type instead of any
  onClose: () => void;
  onSubmit: (data: Product) => void; // Use the Product type instead of any
}

const AdminProductForm = ({
  product,
  onClose,
  onSubmit,
}: AdminProductFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Extract form values
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as string;

    // Create a Product object
    const productData: Product = {
      name,
      category,
      price,
      image,
    };

    // Call onSubmit with the Product object
    onSubmit(productData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nofex font-bold">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <button
          onClick={onClose}
          className="text-wolf-light/70 hover:text-wolf-light p-2"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-nofex mb-2">Name</label>
          <input
            type="text"
            name="name" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={product?.name}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Category</label>
          <select
            name="category" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={product?.category}
          >
            <option value="popular">Popular</option>
            <option value="anime">Anime</option>
            <option value="gaming">Gaming</option>
            <option value="souls">Souls</option>
            <option value="band">Band</option>
            <option value="movie">Movie</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Price (INR)</label>
          <input
            type="number"
            name="price" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={product?.price}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Image URL</label>
          <input
            type="url"
            name="image" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={product?.image}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-wolf-light/20 rounded-full hover:bg-wolf-light/10 transition-colors font-nofex"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-500 text-wolf-light rounded-full hover:bg-purple-600 transition-colors font-nofex"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
