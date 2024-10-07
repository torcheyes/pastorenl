import React from "react";
import { ExploreProductsButton } from "@components/Button/ExploreProductsButton";

const WhatWeOffer: React.FC = () => {
  return (
    <div className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 mt-[60px]">
      <div className="max-w-[1200px] h-[371px] mx-auto bg-gradient-to-r from-[#FF550033] to-gray-100 rounded-3xl overflow-hidden relative">
        {/* Ellipse 1 */}
        <div className="absolute w-[1050px] h-[1050px] rounded-full border-[2px] border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
        {/* Ellipse 2 */}
        <div className="absolute w-[900px] h-[900px] rounded-full border-[2px] border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-75" />
        {/* Ellipse 3 */}
        <div className="absolute w-[600px] h-[600px] rounded-full border-[3px] border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10">
          <h2 className="text-sm uppercase text-brand font-semibold mb-4">
            What We Offer
          </h2>
          <h3 className="text-[#1F1F1F] text-[24px] md:text-5xl font-bold mb-6 max-w-3xl">
            Top-Quality Second-Hand Professional Audio Gear
          </h3>
          <p className="text-[Secondary Brand Color] text-[20px] mb-8">
            Discover our expertly sourced pre-owned audio products, trusted by
            professionals worldwide.
          </p>
          <ExploreProductsButton className="!text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

// path: src/containers/Landing/WhatWeOffer.tsx
