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
      <div className="bg-white rounded-[20px] transition-transform duration-300 hover:scale-105 relative h-[400px] flex flex-col">
        <div className="relative h-[200px] w-full flex-shrink-0 p-2.5">
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
              className="rounded-[12px]"
            />
            {sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                {" "}
                {/* Added rounded corners */}
                <span className="text-[#FF4343] text-[20px] font-bold bg-[#FFFFFF66] rounded-[12px] px-2 py-1">SOLD</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-[20px] text-[#464646] font-[600] mb-2 line-clamp-2">{title}</h2>
          <p className="text-[#9B9B9B] mb-4 line-clamp-3 text-[16px] leading-[19.36px] flex-grow">
            {tagline}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[24px] text-[#464646]">
              {price.toFixed(2)}€
            </span>
            <div className="bg-brand bg-opacity-20 p-2.5 rounded-[12px]">
              <Image
                src="/svg/icons/arrow.svg"
                alt="Arrow"
                width={16}
                height={16}
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
