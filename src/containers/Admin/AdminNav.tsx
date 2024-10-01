"use client";

import Link from "next/link";

import {
  FaChartBar,
  FaBox,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { useAuth } from "@hooks/useAuth";

const AdminNav = () => {
  const { logout } = useAuth();

  const navItems = [
    { href: "/admin/dashboard", label: "Insights", icon: FaChartBar },
    { href: "/admin/products", label: "Products", icon: FaBox },
    {
      href: "/admin/sell-requests",
      label: "Sell Requests",
      icon: FaShoppingCart,
    },
  ];

  return (
    <div className="">
      <nav className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        <ul className="flex items-center h-16">
          {navItems.map((item) => (
            <li key={item.href} className="mr-1">
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 rounded-t-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="mr-2" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminNav;

// path: src/containers/Admin/AdminNav.tsx
