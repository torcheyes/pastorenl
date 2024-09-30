"use client";

import React from "react";
import Image from "next/image";
import { StoreCategoryButton } from "@components/Button/StoreCategoryButton";
import { SortBySelect } from "@components/Select/SortBySelect";
import { FaSortAmountDown, FaSortAmountUp, FaStopwatch } from "react-icons/fa";

interface StoreHeaderProps {
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  currentCategory: string;
  currentSort: string;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  onCategoryChange,
  onSortChange,
  currentCategory,
  currentSort,
}) => {
  const categories = [
    "All",
    "Speakers",
    "Amplifiers",
    "Mixing Panels",
    "Processors",
    "Equalizers",
    "Effects",
    "Lighting",
    "Other",
  ];

  const sortOptions = [
    { value: "latest", label: "Latest", icon: FaStopwatch },
    { value: "price_asc", label: "Price Asc.", icon: FaSortAmountUp },
    { value: "price_desc", label: "Price Desc.", icon: FaSortAmountDown },
  ];

  return (
    <div className="w-full mb-16">
      <div className="max-w-[1200px] mx-auto h-[141px] relative rounded-3xl overflow-hidden">
        <Image
          src="/img/store-header.png"
          alt="Equipment Marketplace background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 bg-opacity-25 backdrop-blur-md rounded-md"></div>
              <Image
                src="/svg/icons/shop.svg"
                alt="Shop Icon"
                width={24}
                height={24}
                className="relative z-10 m-2"
              />
            </div>
            <h1 className="text-white text-2xl font-bold ml-4">
              Equipment Marketplace
            </h1>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto my-4 pb-4 border-b-2">
        <div className="flex justify-between items-center">
          <nav className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <StoreCategoryButton
                key={category}
                category={category}
                isActive={currentCategory === category}
                onClick={() => onCategoryChange(category)}
              />
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <SortBySelect
              label="Sort by"
              options={sortOptions}
              value={currentSort}
              onChange={onSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;

// path: src/containers/Store/StoreHeader.tsx
