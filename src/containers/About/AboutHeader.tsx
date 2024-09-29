import React from "react";
import Image from "next/image";

const AboutHeader: React.FC = () => {
  return (
    <div className="w-full mb-8">
      <div className="max-w-[1200px] mx-auto h-[300px] relative rounded-3xl overflow-hidden">
        <Image
          src="/img/about-header.png"
          alt="pa/store background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0  bg-opacity-50 backdrop-blur-md rounded-3xl"></div>
            <h1 className="text-white text-7xl font-bold relative z-10 px-8 py-4">
              pa/store
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;

// path: src/containers/About/AboutHeader.tsx
