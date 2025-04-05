// components/AddressComponent.tsx

"use client";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface AddressComponentProps {
  userId: string | null;
}

export default function AddressComponent({ userId }: AddressComponentProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false); // Track "Add Address" state
  const [updatedAddress, setUpdatedAddress] = useState<Partial<Address>>({});

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/address?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch addresses");
        const data = await response.json();
        setAddresses(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred while fetching addresses"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userId]);

  // Add or update address
  const handleSaveAddress = async () => {
    try {
      const method = editingAddressId ? "PUT" : "POST";
      const url = editingAddressId
        ? `/api/address/${editingAddressId}`
        : `/api/address`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          ...updatedAddress,
        }),
      });

      if (!response.ok) throw new Error("Failed to save address");

      const responseData = await response.json();

      // Update the addresses state
      if (editingAddressId) {
        // Editing an existing address
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.id === editingAddressId ? responseData : address
          )
        );
      } else {
        // Adding a new address
        setAddresses((prevAddresses) => [...prevAddresses, responseData]);
      }

      // Reset states
      setIsAddingAddress(false); // Close the "Add Address" modal
      setEditingAddressId(null);
      setUpdatedAddress({});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while saving the address"
      );
    }
  };

  // Delete address
  const handleDeleteAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/address/${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete address");
      }

      // Remove the deleted address from the state
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred while deleting the address"
      );
    }
  };

  if (loading) return <div>Loading addresses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Addresses</h2>
      {addresses.length > 0 ? (
        <ul className="space-y-4">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="border p-4 rounded-lg shadow-md relative flex flex-col gap-2"
            >
              <div>
                <p className="font-semibold text-gray-200">{address.street}</p>
                <p className="text-gray-200">
                  {address.city}, {address.state}, {address.country}{" "}
                  {address.zipCode}
                </p>
              </div>
              {/* Button Container */}
              <div className="absolute top-2 right-2 flex gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => {
                    setEditingAddressId(address.id);
                    setUpdatedAddress({ ...address });
                  }}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                >
                  <FiEdit className="w-4 h-4" /> Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6 border rounded-lg bg-gray-50 shadow-md">
          <p className="text-gray-500 text-sm">No addresses added yet.</p>
        </div>
      )}
      {/* Add/Edit Address Modal */}
      {(isAddingAddress || editingAddressId !== null) && (
        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingAddressId ? "Edit Address" : "Add Address"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAddress();
              }}
              className="space-y-4"
            >
              {/* Street */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Street
                </label>
                <input
                  type="text"
                  value={updatedAddress.street || ""}
                  onChange={(e) =>
                    setUpdatedAddress({
                      ...updatedAddress,
                      street: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  value={updatedAddress.city || ""}
                  onChange={(e) =>
                    setUpdatedAddress({
                      ...updatedAddress,
                      city: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  State
                </label>
                <input
                  type="text"
                  value={updatedAddress.state || ""}
                  onChange={(e) =>
                    setUpdatedAddress({
                      ...updatedAddress,
                      state: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Country
                </label>
                <input
                  type="text"
                  value={updatedAddress.country || ""}
                  onChange={(e) =>
                    setUpdatedAddress({
                      ...updatedAddress,
                      country: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={updatedAddress.zipCode || ""}
                  onChange={(e) =>
                    setUpdatedAddress({
                      ...updatedAddress,
                      zipCode: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {/* Save and Cancel Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingAddressId(null);
                    setIsAddingAddress(false); // Close the "Add Address" modal
                    setUpdatedAddress({});
                  }}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
        </div>
      )}
      {/* Add Address Button */}
      {!editingAddressId && addresses.length < 3 && (
        <button
          onClick={() => {
            setIsAddingAddress(true); // Open the "Add Address" modal
            setUpdatedAddress({});
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Address
        </button>
      )}
    </div>
  );
}
