import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { LandingChip } from "@components/Chip/LandingChip";

const ServiceForLargeCompanies: React.FC = () => {
  return (
    <div className="max-w-[1200px] max-h-[407px] mx-auto mt-[136px] mb-8">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg bg-white">
        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
          <p className="text-brand font-semibold mb-2">
            Service for Large Companies
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sell Your Surplus Audio Equipment Hassle-Free
          </h2>
          <p className="text-gray-600 mb-6">
            We buy surplus or outdated professional audio equipment from
            businesses of all sizes. Get fast quotes and hassle-free pickups for
            your unused gear.
          </p>
          <div className="flex space-x-4 mb-6">
            <LandingChip icon="stopwatch" text="Speedy Quotes" />
            <LandingChip icon="dolly" text="Quick pick-up service" />
          </div>
          <div className="w-full md:w-auto">
            <GetAQuoteTodayButton
              variant="dark"
              className="w-full md:w-auto py-3"
            />
          </div>
        </div>

        <div className="w-[400px] md:w-1/3 h-[375px] relative bg-brand rounded-xl overflow-hidden">
          <Image
            src="/svg/service-for-large-companies.svg"
            alt="Surplus Audio Equipment"
            layout="fill"
            objectFit="cover"
            className="mix-blend-multiply"
          />
          {/* Overlay images */}
          <div className="absolute inset-0">
            <Image
              src="/img/service/mic.png"
              alt="Microphone"
              width={100}
              height={100}
              className="absolute top-[20%] right-[10%] z-10 scale-200"
            />
            <Image
              src="/img/service/mixer.png"
              alt="Mixer"
              width={150}
              height={100}
              className="absolute bottom-[10%] left-[5%] z-10 scale-150"
            />
            <Image
              src="/img/service/piano.png"
              alt="Piano"
              width={200}
              height={100}
              className="absolute bottom-[10%] right-[5%] z-10 scale-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForLargeCompanies;

// path: src/containers/Landing/ServiceForLargeCompanies.tsx
