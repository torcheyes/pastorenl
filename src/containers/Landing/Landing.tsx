import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { ViewOurProductsButton } from "@components/Button/ViewOurProductsButton";

const Landing: React.FC = () => {
  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 mt-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative w-full h-[789px] max-md:h-[573px] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/img/landing-main.jpeg"
            alt="Professional Audio Equipment"
            layout="fill"
            objectFit="cover"
            style={{ transform: "scale(1.25) translate(10%, 10%)" }}
            className="filter grayscale-[1] brightness-[1.2] object-[-50px_-30px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] to-black mix-blend-saturation"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] to-black mix-blend-soft-light"></div>
          <div style={{background: 'linear-gradient(179.93deg, rgba(0, 0, 0, 0) 0.06%, rgba(0, 0, 0, 0.6) 61.36%)'}} className="absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute inset-0 p-[60px] max-lg:p-[41px] max-md:p-[30px] flex flex-col justify-end">
            <div className="flex justify-between items-end">
              <div className="max-w-xl">
                <p className="text-brand font-semibold mb-2">
                  Your Audio Source
                </p>
                <h1 className="text-[32px] md:text-5xl font-bold text-white mb-4 leading-tight">
                  Your Partner in
                  <br />
                  Professional Audio
                  <br />
                  Equipment
                </h1>
                <p className="text-[16px] sm:text-lg text-gray-300 mb-8">
                  Serving 20+ Countries, Trusted by 500+ Businesses,
                  <br />
                  and Over 10,000 Products Sold
                </p>
                <div className="flex lg:space-x-4 max-lg:space-y-3 max-lg:flex-col">
                  <GetAQuoteTodayButton />
                  <ViewOurProductsButton />
                </div>
              </div>
              <p className="text-[#282828] text-xl font-bold max-lg:hidden">pa/store</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

// path: src/containers/Landing/Landing.tsx
