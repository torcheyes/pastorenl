import React from "react";
import { ExploreProductsButton } from "@components/Button/ExploreProductsButton";

const WhatWeOffer: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="max-w-[1200px] h-[371px] mx-auto bg-gradient-to-r from-orange-200 to-gray-100 rounded-3xl overflow-hidden shadow-lg relative">
        {/* Ellipse 1 */}
        <div className="absolute w-[900px] h-[900px] rounded-full border border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        {/* Ellipse 2 */}
        <div className="absolute w-[700px] h-[700px] rounded-full border-[2px] border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        {/* Ellipse 3 */}
        <div className="absolute w-[400px] h-[400px] rounded-full border-[3px] border-orange-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col items-center justify-center h-full text-center px-4 relative z-10">
          <h2 className="text-sm uppercase text-brand font-semibold mb-4">
            What We Offer
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            Top-Quality Second-Hand Professional Audio Gear
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl">
            Discover our expertly sourced pre-owned audio products, trusted by
            professionals worldwide.
          </p>
          <ExploreProductsButton />
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

// path: src/containers/Landing/WhatWeOffer.tsx
