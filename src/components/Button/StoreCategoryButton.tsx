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
      className={`px-4 py-2.5 text-[14px] font-medium rounded-[12px] transition-colors duration-200 leading-5 whitespace-nowrap ${
        isActive
          ? "bg-[#FF550026] text-brand"
          : "bg-[#0000000D] text-[#464646] hover:bg-gray-300"
      }`}
    >
      {category}
    </button>
  );
};

// path: src/components/Button/StoreCategoryButton.tsx
