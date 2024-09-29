"use client";

import React from "react";
import Link from "next/link";

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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-between items-center">
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
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-2 py-1 border rounded ${
              currentPage === number ? "bg-orange-500 text-white" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
      <Link href="/sell" className="bg-orange-500 text-white px-4 py-2 rounded">
        Submit Product
      </Link>
    </div>
  );
};

export default BottomNavigation;

// path: src/containers/Store/BottomNav.tsx
