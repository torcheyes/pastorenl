import React from "react";
import Image from "next/image";
import { LearnMoreButton } from "@components/Button/LearnMoreButton";

const ServiceForSourcing: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-[100px] mb-8">
      <div className="flex rounded-3xl overflow-hidden shadow-lg bg-white">
        <div className="w-[700px] p-10 flex flex-col justify-center">
          <p className="text-orange-500 text-sm font-semibold mb-2">
            Service for Sourcing and Installation
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Expert Audio Sourcing & Installation
          </h2>
          <p className="text-gray-600 mb-6 max-w-[560px]">
            From festivals to restaurants and gyms, we provide expert advice,
            source quality second-hand audio equipment, and offer full
            installation services. Save on costs while helping the environment
          </p>
          <div className="inline-block rounded-full p-1">
            <LearnMoreButton />
          </div>
        </div>
        <div className="w-[500px] h-[332px] relative">
          <Image
            src="/img/expert-audio-sourcing.png"
            alt="Expert Audio Sourcing & Installation"
            layout="fill"
            objectFit="cover"
            className="grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceForSourcing;

// path: src/containers/Landing/ServiceForSourcing.tsx
