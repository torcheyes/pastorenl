import React from 'react';

interface StoreCategoryButtonProps {
  category: string;
  isActive: boolean;
  onClick: () => void;
}

export const StoreCategoryButton: React.FC<StoreCategoryButtonProps> = ({ category, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full ${
        isActive
          ? 'bg-orange-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {category}
    </button>
  );
};

// path: src/components/Button/StoreCategoryButton.tsx