import React from "react";
import { FiX } from "react-icons/fi";

// Define a type for the collection object
interface Collection {
  title: string;
  description: string;
  category: string;
  image: string;
}

interface AdminCollectionFormProps {
  collection?: Collection; // Use the Collection type instead of any
  onClose: () => void;
  onSubmit: (data: Collection) => void; // Use the Collection type instead of any
}

const AdminCollectionForm = ({
  collection,
  onClose,
  onSubmit,
}: AdminCollectionFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Extract form values
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;

    // Create a Collection object
    const collectionData: Collection = {
      title,
      description,
      category,
      image,
    };

    // Call onSubmit with the Collection object
    onSubmit(collectionData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nofex font-bold">
          {collection ? "Edit Collection" : "Add New Collection"}
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
          <label className="block text-sm font-nofex mb-2">Title</label>
          <input
            type="text"
            name="title" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={collection?.title}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Description</label>
          <textarea
            name="description" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            rows={3}
            defaultValue={collection?.description}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Category ID</label>
          <input
            type="text"
            name="category" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={collection?.category}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Image URL</label>
          <input
            type="url"
            name="image" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-wolf-light/20 rounded-lg focus:outline-none focus:border-wolf-light transition-colors font-impact"
            defaultValue={collection?.image}
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

export default AdminCollectionForm;
