import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ExploreProductsButtonProps {
  className?: string;
}

export const ExploreProductsButton: React.FC<ExploreProductsButtonProps> = ({
  className = "",
}) => {
  return (
    <Link
      href="/store"
      className={`inline-flex items-center justify-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-colors duration-300 ${className}`}
    >
      Explore Products
      <Image
        src="/svg/dial.svg"
        alt="Explore"
        width={20}
        height={20}
        className="ml-2"
      />
    </Link>
  );
};

// path: src/components/Button/ExploreProductsButton.tsx
