import React from "react";
import Image from "next/image";
import { LandingChip } from "@components/Chip/LandingChip";
import { CallButton } from "@components/Button/Contact/Call";
import { EmailButton } from "@components/Button/Contact/Email";
import { WhatsAppButton } from "@components/Button/Contact/WhatsApp";

const ServiceForSourcing: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-[100px]">
      <div className="flex flex-col md:flex-row rounded-3xl border border-[#0000000D] p-4 mx-5 sm:mx-10 lg:mx-20 xl:mx-0">
        <div className="flex-grow pr-8">
          <p className="text-brand text-sm font-semibold mb-2">
            Service for Sourcing and Installation
          </p>
          <h2 className="text-4xl font-[600] text-gray-800 mb-4">
            Expert Audio Sourcing & Installation
          </h2>
          <p className="text-[#9B9B9B] text-[20px] mb-6 max-w-[560px]">
            From festivals to restaurants and gyms, we provide expert advice,
            source quality second-hand audio equipment, and offer full
            installation services. Save on costs while helping the environment
          </p>
          <div className="flex max-lg:space-y-3 lg:space-x-4 max-lg:flex-col mb-6 max-md:w-full">
            <LandingChip icon="inspect" text="Inspected & Verified Equipment" />
            <LandingChip icon="user" text="Second Hand Audio Specialists" />
          </div>
          <div className="flex flex-wrap gap-4 max-md:hidden">
            <WhatsAppButton
              phoneNumber="31687887743"
              className="bg-[#3DED5E] text-[#464646]"
            />
            <EmailButton className="bg-gray-200 text-gray-700" />
            <CallButton className="bg-gray-200 text-gray-700" />
          </div>
        </div>
        <div className="w-full md:max-w-[400px] h-[400px] relative self-center flex-shrink-0 max-lg:mt-6">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <Image
              src="/img/expert-audio-sourcing.png"
              alt="Expert Audio Sourcing & Installation"
              fill
              objectFit="cover"
              className="grayscale"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:hidden">
          <WhatsAppButton
            phoneNumber="31687887743"
            className="bg-[#3DED5E] text-[#464646]"
          />
          <EmailButton className="bg-gray-200 text-gray-700" />
          <CallButton className="bg-gray-200 text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default ServiceForSourcing;

// path: src/containers/Landing/ServiceForSourcing.tsx
