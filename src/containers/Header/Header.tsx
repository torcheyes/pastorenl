"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactUsButton } from "@components/Button/ContactUsButton";

const navItems = [
  { title: "Start", path: "/" },
  { title: "About", path: "/about" },
  { title: "Store", path: "/store" },
  { title: "Sell", path: "/sell" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 my-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-md px-4 py-2">
          <Link href="/" className="text-lg font-semibold text-gray-800">
            pa/store
          </Link>
          <nav className="flex-grow">
            <ul className="flex justify-center space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`text-sm ${
                      pathname === item.path
                        ? "text-brand font-semibold"
                        : "text-gray-600 hover:text-brand"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ContactUsButton phoneNumber="31687887743" />
        </div>
      </div>
    </header>
  );
};

export default Header;

// path: src/containers/Header/Header.tsx
