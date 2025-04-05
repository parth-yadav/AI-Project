"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/useAuth";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import AddressComponent from "@/components/profile/Address";
import Loader from "@/components/Loader";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
  mobileNumber: string | null;
  addresses: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }[];
  wishlist: {
    products: {
      id: string;
      name: string;
      images: string[];
      price: number;
    }[];
  };
  cart: {
    items: {
      id: string;
      quantity: number;
      product: {
        id: string;
        name: string;
        images: string[];
      };
    }[];
  };
}

export default function ProfilePage() {
  const { userId, loading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [editingField, setEditingField] = useState<
    "name" | "phone" | "mobileNumber" | null
  >(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");
 
 

  useEffect(() => {
    if (loading) return;

    if (!userId) {
      setError("User is not authenticated");
      return;
    }

    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const response = await fetch(`/api/profile?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching the profile"
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [userId, loading]);

  const handleUpdateProfile = async () => {
    if (!editingField || !profile) return;

    try {
      const response = await fetch(`/api/profile?userId=${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [editingField]: updatedValue }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedProfile = await response.json();
      setProfile((prev) => (prev ? { ...prev, ...updatedProfile } : null));
      setEditingField(null); // Close the editor
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while updating the profile"
      );
    }
  };



  if (loading) return <div>Loading authentication...</div>;
  if (error) return <div>Error: {error}</div>;
  if (isLoadingProfile) return <div>
    <Loader />
  </div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {/* Display User Details */}
      <div className="space-y-6">
        {/* Name */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-l font-medium text-gray-500">
              Name
            </label>
            <p className="text-lg font-semibold">{profile.name}</p>
          </div>
          <button
            onClick={() => {
              setEditingField("name");
              setUpdatedValue(profile.name);
            }}
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>

        {/* Email */}
        <div>
          <label className="block text-l font-medium text-gray-500">
            Email
          </label>
          <p className="text-lg font-semibold">{profile.email}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-l font-medium text-gray-500">
              Phone
            </label>
            <p className="text-lg font-semibold">{profile.phone || "N/A"}</p>
          </div>
          <button
            onClick={() => {
              setEditingField("phone");
              setUpdatedValue(profile.phone || "");
            }}
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          >
            <FiEdit className="w-4 h-4" /> Edit
          </button>
        </div>
      </div>

      {/* Edit Modal for Profile Fields */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit {editingField}</h2>
            <input
              type="text"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Addresses */}
      <AddressComponent userId={userId} />

      {/* Edit Address Modal */}

      {/* Display Wishlist */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Wishlist</h2>
      {profile.wishlist?.products && profile.wishlist.products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.wishlist.products.map((product) => (
            <ProductCard key={product.id} {...product} userId={userId} />
          ))}
        </ul>
      ) : (
        <div>No items in wishlist</div>
      )}
    </div>
  );
}
