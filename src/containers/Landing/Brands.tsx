"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const brandList = [
  { name: "beyma", width: 100 },
  { name: "jbl", width: 60 },
  { name: "aveq", width: 100 },
  { name: "hpa", width: 100 },
  { name: "luxonos", width: 120 },
  { name: "meyer", width: 100 },
];

const Brands: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % brandList.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getOpacity = (index: number) => {
    const position = (index - offset + brandList.length) % brandList.length;
    if (position === 0 || position === 5) return 0.5; // Faded logos on the ends
    return 1;
  };

  return (
    <section className="pt-[60px] bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-orange-500 font-semibold mb-2">
            International Reach and Brands
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Industry Leaders Worldwide
          </h2>
          <p className="text-gray-400 font-bold">
            We've partnered with renowned brands and clients to deliver
            exceptional second-hand audio solutions globally.
          </p>
        </div>

        <div className="relative overflow-hidden h-20">
          <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#f8f8f8] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#f8f8f8] to-transparent z-10"></div>
          <div
            className="flex items-center absolute left-0 transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${offset * (100 / 6)}%)` }}
          >
            {[...brandList, ...brandList].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 px-4 transition-all duration-300 ease-in-out"
                style={{
                  width: `${100 / 6}%`, // 6 logos
                  opacity: getOpacity(index),
                }}
              >
                <Image
                  src={`/svg/brands/${brand.name}.svg`}
                  alt={`Brand ${brand.name}`}
                  width={brand.width}
                  height={50}
                  className="max-h-12 w-auto mx-auto"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

// path: src/containers/Landing/Brands.tsx
