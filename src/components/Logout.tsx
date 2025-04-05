"use client";
import { useAuth } from "../lib/useAuth";
import Link from "next/link";

export default function LogoutButton() {
    const { user, logout } = useAuth();
    return (
      <button
        onClick={logout}
        className="block w-full text-left px-4 py-2 text-sm font-impact hover:bg-gray-500 transition-colors"
      >
        Logout
      </button>
    );
}
