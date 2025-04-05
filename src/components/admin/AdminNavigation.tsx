import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


function AdminNavigation() {
    const pathname = usePathname();
     const tabs = [
       { name: "Users", path: "/admin/users" },
       { name: "All Products", path: "/admin/all-products" },
       { name: "Add Product", path: "/admin/add-product" },
       { name: "Landing Page Editor", path: "/admin/landingpageeditor" },
       { name: "Admin Panel", path: "/admin" },
     ];
    return (
      
    <nav className="flex mx-auto shadow-lg shadow-gray-600 w-fit rounded-lg  bg-gray-800 p-4">
      {tabs.map((tab) => (
        <Link key={tab.path} href={tab.path}>
          <span
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              pathname === tab.path ? "bg-blue-500 text-white" : "text-gray-300"
            }`}
          >
            {tab.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default AdminNavigation