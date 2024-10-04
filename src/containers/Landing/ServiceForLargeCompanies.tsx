import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";
import { LandingChip } from "@components/Chip/LandingChip";
import { GradientBackground } from "@components/svg/GradientBackground";

const ServiceForLargeCompanies: React.FC = () => {
  return (
    <div className="max-w-[1200px] max-h-[407px] mx-auto mt-[100px]">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden bg-white">
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

        <div className="w-[380px] h-[355px] relative bg-brand rounded-xl overflow-hidden m-4">
          <GradientBackground />
          {/* Overlay images */}
          <div className="absolute inset-0">
            <Image
              src="/img/service/mic.png"
              alt="Microphone"
              width={182}
              height={253}
              className="absolute top-[10%] right-[5%] z-10"
            />
            <Image
              src="/img/service/mixer.png"
              alt="Mixer"
              width={246}
              height={143}
              className="absolute bottom-[15%] left-[-15%] z-10 scale-90"
            />
            <Image
              src="/img/service/piano.png"
              alt="Piano"
              width={427}
              height={225}
              className="absolute bottom-[-10%] right-[-20%] z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForLargeCompanies;

// path: src/containers/Landing/ServiceForLargeCompanies.tsx
