"use client";

import React from "react";
// import Link from "next/link";
import { CycleButton } from "@components/Button/CycleButton";

interface BottomNavigationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentPage,
  totalPages,
  //itemsPerPage,
  onPageChange,
  // onItemsPerPageChange,
}) => {
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="max-w-[1200px] container mx-auto py-8">
      <div className="flex justify-center items-center">
        {/*
        <div className="flex items-center">
          <span className="mr-2">Items</span>
          <select
            className="border rounded px-2 py-1"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
        */}
        <div className="flex items-center space-x-2">
          <CycleButton
            direction="left"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          />
          {renderPageNumbers().map((number, index) =>
            typeof number === "number" ? (
              <button
                key={index}
                onClick={() => onPageChange(number)}
                className={`px-3 py-1.5 border rounded-xl text-sm font-medium transition-colors duration-200 ${
                  currentPage === number
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {number}
              </button>
            ) : (
              <span key={index} className="px-2 py-1 text-gray-400">
                {number}
              </span>
            ),
          )}
          <CycleButton
            direction="right"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          />
        </div>
        {/*
        <Link href="/sell" className="bg-brand text-white px-4 py-2 rounded">
          Submit Product
        </Link>
        */}
      </div>
    </div>
  );
};

export default BottomNavigation;

// path: src/containers/Store/BottomNav.tsx
