import React from "react";

interface StoreCategoryButtonProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

export const StoreCategoryButton: React.FC<StoreCategoryButtonProps> = ({
  category,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
        isActive
          ? "bg-brand text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {category}
    </button>
  );
};

// path: src/components/Button/StoreCategoryButton.tsx
