"use client";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation"; // Use usePathname for App Router
import AdminNavigation from "@/components/admin/AdminNavigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const pathname = usePathname(); // Get the current route

  const tabs = [
    { name: "Users", path: "/admin/users" },
    { name: "All Products", path: "/admin/all-products" },
    { name: "Add Product", path: "/admin/add-product" },
    { name: "Landing Page Editor", path: "/admin/landingpageeditor" },
  ];

  // Fetch all users
  const fetchUsers = async () => {
    const response = await fetch("/api/admin/users");
    const data = await response.json();
    setUsers(data);
  };

  // Delete a user
  const deleteUser = async (userId: string) => {
    if (!userId) {
      alert("Invalid user ID");
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });

    if (response.ok) {
      alert("User deleted successfully");
      fetchUsers(); // Refresh user list
    } else {
      const errorData = await response.json();
      alert(`Failed to delete user: ${errorData.error}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <AdminNavigation />

      {/* Navigation Tabs */}
      
      {/* User List */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
          >
            <span>{user.email}</span>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
