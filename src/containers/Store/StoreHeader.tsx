"use client";

import React from "react";
import Image from "next/image";
import { StoreCategoryButton } from "@components/Button/StoreCategoryButton";
import { SortBySelect } from "@components/Select/SortBySelect";
import { FaSortAmountDown, FaSortAmountUp, FaStopwatch } from "react-icons/fa";

interface StoreHeaderProps {
  onCategoryChange: (category: string | undefined) => void;
  onSortChange: (sort: string) => void;
  currentCategory: string | undefined;
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

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category === "All" ? undefined : category);
  };

  return (
    <div className="w-full mb-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="h-[100px] relative rounded-xl overflow-hidden mb-4">
          <Image
            src="/img/store-header.png"
            alt="Equipment Marketplace background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand bg-opacity-25 backdrop-blur-md rounded-md"></div>
                <Image
                  src="/svg/icons/shop.svg"
                  alt="Shop Icon"
                  width={20}
                  height={20}
                  className="relative z-10 m-2"
                />
              </div>
              <h1 className="text-white text-xl font-bold ml-3">
                Equipment Marketplace
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <nav className="flex space-x-2 overflow-x-auto pb-2 flex-grow">
            {categories.map((category) => (
              <StoreCategoryButton
                key={category}
                category={category}
                isActive={
                  category === "All"
                    ? currentCategory === undefined
                    : currentCategory === category
                }
                onClick={() => handleCategoryChange(category)}
              />
            ))}
          </nav>
          <div className="flex items-center ml-4">
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
