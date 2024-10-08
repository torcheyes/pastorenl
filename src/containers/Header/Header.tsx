"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactUsButton } from "@components/Button/ContactUsButton";
import { Logo } from "@components/svg/Logo";

const navItems = [
  { title: "Start", path: "/" },
  { title: "About", path: "/about" },
  { title: "Store", path: "/store" },
  { title: "Sell", path: "/sell" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 my-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between bg-white rounded-[20px] border border-[#0000000d] px-1.5 py-2">
            <Link href="/" className="ml-3 text-[24px] font-semibold text-[#464646]">
              <Logo/>
            </Link>
            <nav className="flex-grow max-lg:hidden">
              <ul className="flex justify-center gap-x-[3.5rem]">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`text-[14px] font-[500] ${
                        pathname === item.path
                          ? "text-brand"
                          : "text-[#464646] hover:text-brand"
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
      <div className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 my-3 lg:hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between bg-white rounded-[20px] border border-[#0000000d] px-8 py-2">
            <nav className="flex-grow flex justify-center">
                <ul className="flex justify-between max-w-[300px] w-full">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`text-[14px] font-[500] px-2 ${
                          pathname === item.path
                            ? "text-brand"
                            : "text-[#464646] hover:text-brand"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
};

export default Header;

// path: src/containers/Header/Header.tsx
