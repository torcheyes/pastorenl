import React from "react";
import Image from "next/image";
import { Testimonial } from "@types";

const TestimonialCard: React.FC<Testimonial> = ({ brand, quote, author }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-sm border border-orange-200 w-[380px] h-[215px] flex flex-col justify-between">
      <div className="flex justify-center mb-4">
        <Image
          src={`/svg/brands/testimonials/${brand}.svg`}
          alt={`${brand} logo`}
          width={120}
          height={30}
          objectFit="contain"
          className="h-8"
        />
      </div>
      <p className="text-gray-700 text-sm text-center flex-grow flex items-center justify-center px-4">
        "{quote}"
      </p>
      <p className="text-center text-orange-400 text-sm mt-4">- {author}</p>
    </div>
  );
};

export default TestimonialCard;

// path: src/components/Card/TestimonalCard.tsx
