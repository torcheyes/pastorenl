import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { ViewOurProductsButton } from "@components/Button/ViewOurProductsButton";

const Landing: React.FC = () => {
  return (
    <section className="w-full px-5 sm:px-10 lg:px-20 xl:px-0 mt-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative w-full aspect-[1200/789] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/img/landing-main.jpeg"
            alt="Professional Audio Equipment"
            layout="fill"
            objectFit="cover"
            style={{ transform: "scale(1.4) translate(10%, 10%)" }}
            className="filter saturate-[0.1] contrast-[1.2] brightness-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-white opacity-5"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="flex justify-between items-end">
              <div className="max-w-xl">
                <p className="text-orange-500 font-semibold mb-2">
                  Your Audio Source
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  Your Partner in
                  <br />
                  Professional Audio
                  <br />
                  Equipment
                </h1>
                <p className="text-base sm:text-lg text-gray-300 mb-8">
                  Serving 20+ Countries, Trusted by 500+ Businesses,
                  <br />
                  and Over 10,000 Products Sold
                </p>
                <div className="flex space-x-4">
                  <GetAQuoteTodayButton />
                  <ViewOurProductsButton />
                </div>
              </div>
              <p className="text-white text-xl font-bold">pa/store</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;

// path: src/containers/Landing/Landing.tsx
