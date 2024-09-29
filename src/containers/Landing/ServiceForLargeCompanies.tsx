import React from "react";
import Image from "next/image";
import { GetAQuoteTodayButton } from "@components/Button/GetAQuoteTodayButton";

const ServiceForLargeCompanies: React.FC = () => {
  return (
    <div className="max-w-[1168px] mx-auto mt-[136px] mb-8">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg bg-white">
        <div className="w-full md:w-[389px] h-[300px] relative bg-orange-500 rounded-3xl">
          <Image
            src="/svg/service-for-large-companies.svg"
            alt="Surplus Audio Equipment"
            layout="fill"
            objectFit="cover"
            className="mix-blend-multiply"
          />
        </div>

        <div className="w-full md:flex-1 p-8 flex flex-col justify-center">
          <p className="text-orange-500 font-semibold mb-2">
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
          <div className="w-full max-w-md">
            <GetAQuoteTodayButton
              variant="dark"
              className="w-full py-3 rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForLargeCompanies;

// path: src/containers/Landing/ServiceForLargeCompanies.tsx
