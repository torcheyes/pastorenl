import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { LandingChip } from "@components/Chip/LandingChip";

const ServiceForLargeCompanies: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-[100px]">
      <div className="flex flex-col md:flex-row rounded-3xl border border-[#0000000D] p-4">
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <p className="text-brand font-semibold mb-2">
            Service for Large Companies
          </p>
          <h2 className="text-[32px] font-bold text-gray-800 mb-4">
            Sell Your Surplus Audio Equipment Hassle-Free
          </h2>
          <p className="text-[#9B9B9B] text-[20px] mb-6">
            We buy surplus or outdated professional audio equipment from
            businesses of all sizes. Get fast quotes and hassle-free pickups for
            your unused gear.
          </p>
          <div className="flex max-lg:space-y-3 lg:space-x-4 max-lg:flex-col mb-6 w-fit max-md:w-full">
            <LandingChip icon="stopwatch" text="Speedy Quotes" />
            <LandingChip icon="dolly" text="Quick pick-up service" />
          </div>
          <div className="w-full md:w-auto">
            <GetAQuoteTodayButton
              variant="dark"
              className="w-full md:w-auto py-3 text-[16px]"
            />
          </div>
        </div>

        <div className="w-full max-w-[400px] h-[400px] relative self-center flex-shrink-0 max-lg:mt-6">
          <div className="w-full max-w-[400px] absolute inset-0 rounded-xl brightness-[.5] overflow-hidden">
            <Image
              src="/img/sell-your-surplus-audio-equipment.jpg"
              alt="Sell Your Surplus Audio Equipment Hassle-Free"
              fill
              objectFit="cover"
              className="grayscale"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForLargeCompanies;

// path: src/containers/Landing/ServiceForLargeCompanies.tsx
