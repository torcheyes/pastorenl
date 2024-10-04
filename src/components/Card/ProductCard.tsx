import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@models/product.model";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { slug, title, tagline, price, imagePath, sold } = product;

  return (
    <Link href={`/store/${slug}`} className="block">
      <div className="bg-white rounded-lg transition-transform duration-300 hover:scale-105 relative h-[400px] flex flex-col">
        <div className="relative h-48 w-full flex-shrink-0 p-4">
          {" "}
          {/* Added p-4 for 16px padding */}
          <div className="relative h-full w-full">
            {" "}
            {/* New wrapper div */}
            <Image
              src={imagePath.split(",")[0]} // Use the first image
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                {" "}
                {/* Added rounded corners */}
                <span className="text-red-600 text-3xl font-bold">SOLD</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-grow">
            {tagline}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-gray-900">
              {price.toFixed(2)}€
            </span>
            <div className="bg-brand bg-opacity-20 px-1 rounded-md">
              <Image
                src="/svg/icons/arrow.svg"
                alt="Arrow"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

// path: src/components/Card/ProductCard.tsx
