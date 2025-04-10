"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiShoppingCart, FiMenu, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "../lib/useAuth";
import Image from "next/image";
import SearchBar from "./SearchBar";
import LogoutButton from "./Logout";
import ThemeToggle from "./ThemeTogglee";

// Define the shape of the collection data
interface Collection {
  id: string;
  name: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track mount state
  const [collections, setCollections] = useState<Collection[]>([]); // Store fetched collections
  const { user, loading } = useAuth();

  useEffect(() => {
    setIsMounted(true); // Set mounted state after hydration
    fetchCollections();
  }, []);

  // Fetch collections from the API
  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/collections"); // Replace with your API endpoint
      if (!response.ok) throw new Error("Failed to fetch collections");
      const data: Collection[] = await response.json();
      setCollections(data); // Update state with fetched collections
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <nav className=" dark:bg-wolf-dark bg-wolf-light dark:text-wolf-light text-wolf-dark py-4 px-6 fixed w-full z-50 border-b border-wolf-light/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="hover:opacity-80 transition-opacity -my-2">
            {/* Light mode logo */}
            <Image
              src="/images/white.jpg"
              alt="The wolf Logo"
              width={56}
              height={56}
              className="object-cover block dark:hidden"
            />

            {/* Dark mode logo */}
            <Image
              src="/images/black.jpg"
              alt="The wolf Logo Dark"
              width={56}
              height={56}
              className="object-cover hidden dark:block"
            />
          </Link>
{/* 
          <ThemeToggle /> */}

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-impact">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.name}`}
                className="hover:text-purple-500 transition-colors"
              >
                {collection.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side (Search, Cart, Profile, Menu) */}
        <div className="flex items-center space-x-6">
          {/* Search Bar (Desktop Only) */}
          {/* <div className="hidden md:flex items-center border border-wolf-light/20 rounded-full px-4 py-2 focus-within:border-wolf-light transition-colors">
            <FiSearch className="w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:outline-none ml-2 w-40 font-impact"
            />
          </div> */}
          <SearchBar />

          {/* Profile or Login */}
          <div className="relative">
            {user ? (
              <>
                {/* Profile Icon */}
                <div className="flex items-center space-x-4">
                  {/* Profile Button */}
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="hover:text-purple-500 transition-colors"
                    aria-label="Profile"
                  >
                    <FiUser className="w-6 h-6" />
                  </button>

                  {/* Shopping Cart Icon */}
                  <Link href="/shoppingcart" aria-label="Shopping Cart">
                    <FiShoppingCart className="w-6 h-6 cursor-pointer hover:text-purple-500 transition-colors" />
                  </Link>
                </div>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-wolf-light dark:bg-wolf-dark border border-wolf-light/20 rounded-lg shadow-xl py-2">
                    <Link
                      href="/shoppingcart"
                      className="block px-4 py-2 text-sm font-impact hover:bg-gray-500 transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm font-impact hover:bg-gray-500 transition-colors"
                    >
                      Profile
                    </Link>
                    <div className="border-t border-wolf-light/20 my-1"></div>
                    <LogoutButton />
                  </div>
                )}
              </>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="bg-purple-500 text-wolf-light px-6 py-2 rounded-full hover:bg-purple-600 transition-colors font-nofex"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-wolf-light dark:bg-wolf-dark border-t border-wolf-light/20 fade-in">
          <div className="flex flex-col p-4 space-y-4 font-impact">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.name}`}
                className="hover:text-purple-500 transition-colors"
              >
                {collection.name.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
