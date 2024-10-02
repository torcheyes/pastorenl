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
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
        <div className="relative h-48 w-full">
          <Image
            src={imagePath.split(",")[0]} // Use the first image
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          {sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-red-600 text-3xl font-bold">SOLD</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{tagline}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {price.toFixed(2)}€
            </span>
            <span className="text-gray-500 text-sm">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

// path: src/components/Card/ProductCard.tsx
