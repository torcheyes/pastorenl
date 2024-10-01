"use client";

import React from "react";
import Link from "next/link";
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
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
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
        startPage = endPage - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="max-w-[1200px] container mx-auto px-4 py-8 flex justify-between items-center">
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
              className={`px-2 py-1 border rounded ${
                currentPage === number ? "bg-brand text-white" : ""
              }`}
            >
              {number}
            </button>
          ) : (
            <span key={index} className="px-2 py-1">
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
      <Link href="/sell" className="bg-brand text-white px-4 py-2 rounded">
        Submit Product
      </Link>
    </div>
  );
};

export default BottomNavigation;

// path: src/containers/Store/BottomNav.tsx
