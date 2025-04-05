"use client";

import { useEffect, useState } from "react";
import AdminNavigation from "@/components/admin/AdminNavigation";

type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type Hero = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
};

type Featured = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
};

export default function AdminLandingPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [featured, setFeatured] = useState<Featured[]>([]);

  // State for modals
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [isAddingHero, setIsAddingHero] = useState(false);
  const [isAddingFeatured, setIsAddingFeatured] = useState(false);

  // State for editing
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );
  const [editingHero, setEditingHero] = useState<Hero | null>(null);
  const [editingFeatured, setEditingFeatured] = useState<Featured | null>(null);

  // Fetch all data
  const fetchData = async () => {
    const [collectionsRes, heroesRes, featuredRes] = await Promise.all([
      fetch("/api/admin/landingpage/collection").then((res) => res.json()),
      fetch("/api/admin/landingpage/hero").then((res) => res.json()),
      fetch("/api/admin/landingpage/featured").then((res) => res.json()),
    ]);
    setCollections(collectionsRes);
    setHeroes(heroesRes);
    setFeatured(featuredRes);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add Collection Handler
  const handleAddCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    if (!name || !description) {
      alert("Name and description are required");
      return;
    }

    const response = await fetch("/api/admin/landingpage/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, image }),
    });

    if (response.ok) {
      setIsAddingCollection(false);
      fetchData(); // Refresh data
    } else {
      alert("Failed to add collection");
    }
  };

  // Edit Collection Handler
  const handleEditCollection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCollection) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;

    if (!name || !description) {
      alert("Name and description are required");
      return;
    }

    const response = await fetch(`/api/admin/landingpage/collection`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingCollection.id,
        name,
        description,
        image,
      }),
    });

    if (response.ok) {
      setEditingCollection(null);
      fetchData(); // Refresh data
    } else {
      alert("Failed to update collection");
    }
  };

  // Delete Collection Handler
  const handleDeleteCollection = async (id: string) => {
    const response = await fetch(`/api/admin/landingpage/collection`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchData(); // Refresh data
    } else {
      alert("Failed to delete collection");
    }
  };

  const handleEditHero = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingHero) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const image = formData.get("image") as string;
    const link = formData.get("link") as string;

    if (!title || !subtitle || !image || !link) {
      alert("All fields are required");
      return;
    }

    const response = await fetch(`/api/admin/landingpage/hero`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingHero.id,
        title,
        subtitle,
        image,
        link,
      }),
    });

    if (response.ok) {
      setEditingHero(null);
      fetchData(); // Refresh data
    } else {
      alert("Failed to update hero entry");
    }
  };

  // Delete Hero
  const handleDeleteHero = async (id: string) => {
    const response = await fetch(`/api/admin/landingpage/hero`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchData(); // Refresh data
    } else {
      alert("Failed to delete hero entry");
    }
  };

  const handleEditFeatured = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingFeatured) return;

    const formData = new FormData(e.currentTarget);
    const image = formData.get("image") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;

    if (!image || !title || !subtitle) {
      alert("All fields are required");
      return;
    }

    const response = await fetch(`/api/admin/landingpage/featured`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingFeatured.id,
        image,
        title,
        subtitle,
      }),
    });

    if (response.ok) {
      setEditingFeatured(null);
      fetchData(); // Refresh data
    } else {
      alert("Failed to update featured entry");
    }
  };

  // Delete Featured
  const handleDeleteFeatured = async (id: string) => {
    const response = await fetch(`/api/admin/landingpage/featured`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      fetchData(); // Refresh data
    } else {
      alert("Failed to delete featured entry");
    }
  };

  // Similar logic for Hero and Featured...
  const handleAddHero = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const image = formData.get("image") as string;
    const link = formData.get("link") as string;

    if (!title || !subtitle || !image || !link) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("/api/admin/landingpage/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subtitle, image, link }),
    });

    if (response.ok) {
      setIsAddingHero(false);
      fetchData(); // Refresh data
    } else {
      alert("Failed to add hero entry");
    }
  };

  // Add Featured
  const handleAddFeatured = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const image = formData.get("image") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;

    if (!image || !title || !subtitle) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("/api/admin/landingpage/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, title, subtitle }),
    });

    if (response.ok) {
      setIsAddingFeatured(false);
      fetchData(); // Refresh data
    } else {
      alert("Failed to add featured entry");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <AdminNavigation />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Landing Page Management
      </h1>
      {/* Collections */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Collections</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsAddingCollection(true)}
          >
            Add Collection
          </button>
        </div>
        <ul className="space-y-2">
          {collections.map((collection) => (
            <li
              key={collection.id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{collection.name}</p>
                <p className="text-sm text-gray-500">
                  {collection.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setEditingCollection(collection)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCollection(collection.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add Collection Modal */}
        {isAddingCollection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleAddCollection}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-semibold">Add Collection</h3>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="url"
                name="image"
                placeholder="Image URL (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsAddingCollection(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Collection Modal */}
        {editingCollection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleEditCollection}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-semibold">Edit Collection</h3>
              <input
                type="text"
                name="name"
                defaultValue={editingCollection.name}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <textarea
                name="description"
                defaultValue={editingCollection.description}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="url"
                name="image"
                defaultValue={editingCollection.image}
                placeholder="Image URL (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditingCollection(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-bold text-2xl my-4">Hero Section</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddingHero(true)}
        >
          Add Hero
        </button>
      </div>
      <ul className="space-y-2">
        {isAddingHero && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleAddHero}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-semibold">Add Hero Entry</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                name="link"
                placeholder="Link URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsAddingHero(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}

        {heroes.map((hero) => (
          <li
            key={hero.id}
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{hero.title}</p>
              <p className="text-sm text-gray-500">{hero.subtitle}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setEditingHero(hero)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteHero(hero.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Edit Hero Modal */}
      {editingHero && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditHero}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold">Edit Hero Entry</h3>
            <input
              type="text"
              name="title"
              defaultValue={editingHero.title}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="subtitle"
              defaultValue={editingHero.subtitle}
              placeholder="Subtitle"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="image"
              defaultValue={editingHero.image}
              placeholder="Image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="link"
              defaultValue={editingHero.link}
              placeholder="Link URL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditingHero(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex justify-between items-center mt-6">
        <h1 className="font-bold text-2xl my-4 ">Featured Section</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsAddingFeatured(true)}
        >
          Add Featured
        </button>
      </div>
      <ul className="space-y-2">
        {isAddingFeatured && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
              onSubmit={handleAddFeatured}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
              <h3 className="text-xl font-semibold">Add Featured Entry</h3>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <input
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsAddingFeatured(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
        {featured.map((item) => (
          <li
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setEditingFeatured(item)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteFeatured(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Edit Featured Modal */}
      {editingFeatured && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditFeatured}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold">Edit Featured Entry</h3>
            <input
              type="text"
              name="image"
              defaultValue={editingFeatured.image}
              placeholder="Image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="title"
              defaultValue={editingFeatured.title}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <input
              type="text"
              name="subtitle"
              defaultValue={editingFeatured.subtitle}
              placeholder="Subtitle"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditingFeatured(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
