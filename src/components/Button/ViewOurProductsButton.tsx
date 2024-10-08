import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ViewOurProductsButtonProps {
  className?: string;
}

export const ViewOurProductsButton: React.FC<ViewOurProductsButtonProps> = ({
  className = "",
}) => {
  return (
    <Link
      href="/store"
      className={`
                inline-flex items-center justify-center
                px-3 py-3
                bg-[#FFFFFF1A] hover:bg-gray-950
                text-white text-[20px] font-medium
                rounded-xl h-[44px] max-lg:max-w-[237px]
                transition-colors duration-300
                shadow-lg hover:shadow-xl
                ${className}
            `}
    >
      <span className="mr-2">View Our Products</span>
      <Image
        src="/svg/dial.svg"
        alt="Dial icon"
        width={20}
        height={20}
        className="w-5 h-5"
      />
    </Link>
  );
};

// path: src/components/Button/ViewOurProductsButton.tsx
