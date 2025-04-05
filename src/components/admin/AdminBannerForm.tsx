import React from "react";
import { FiX } from "react-icons/fi";

// Define a type for the banner object
interface Banner {
  title: string;
  subtitle: string;
  link: string;
  image: string;
}

interface AdminBannerFormProps {
  banner?: Banner; // Use the Banner type instead of any
  onClose: () => void;
  onSubmit: (data: Banner) => void; // Use the Banner type instead of any
}

const AdminBannerForm = ({
  banner,
  onClose,
  onSubmit,
}: AdminBannerFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Extract form values
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as string;

    // Create a Banner object
    const bannerData: Banner = {
      title,
      subtitle,
      link,
      image,
    };

    // Call onSubmit with the Banner object
    onSubmit(bannerData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-nofex font-bold">
          {banner ? "Edit Banner" : "Add New Banner"}
        </h2>
        <button
          onClick={onClose}
          className="text-rebel-light/70 hover:text-rebel-light p-2"
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
            className="w-full px-4 py-2 bg-transparent border border-rebel-light/20 rounded-lg focus:outline-none focus:border-rebel-light transition-colors font-impact"
            defaultValue={banner?.title}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Subtitle</label>
          <input
            type="text"
            name="subtitle" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-rebel-light/20 rounded-lg focus:outline-none focus:border-rebel-light transition-colors font-impact"
            defaultValue={banner?.subtitle}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Link</label>
          <input
            type="text"
            name="link" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-rebel-light/20 rounded-lg focus:outline-none focus:border-rebel-light transition-colors font-impact"
            defaultValue={banner?.link}
          />
        </div>
        <div>
          <label className="block text-sm font-nofex mb-2">Image URL</label>
          <input
            type="url"
            name="image" // Add a name attribute
            className="w-full px-4 py-2 bg-transparent border border-rebel-light/20 rounded-lg focus:outline-none focus:border-rebel-light transition-colors font-impact"
            defaultValue={banner?.image}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-rebel-light/20 rounded-full hover:bg-rebel-light/10 transition-colors font-nofex"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-rebel-light rounded-full hover:bg-orange-600 transition-colors font-nofex"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBannerForm;
