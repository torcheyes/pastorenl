import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@models/product.model';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { slug, title, tagline, price, imagePath, discount } = product;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <Link href={`/store/${slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-48 w-full">
          <Image
            src={imagePath.split(',')[0]} // Use the first image
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{tagline}</p>
          <div className="flex items-center justify-between">
            <div>
              {discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {discountedPrice.toFixed(2)}€
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                    {price.toFixed(2)}€
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  {price.toFixed(2)}€
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

// path: src/components/Card/ProductCard.tsx