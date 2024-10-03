"use client";

import React from "react";
import { ParallaxLogos } from "@components/ParallaxLogos";

import { AVEQ } from "@components/svg/clients/aveq";
import { DEP } from "@components/svg/clients/dep";
import { Luxonos } from "@components/svg/clients/luxonos";
import { HPA } from "@components/svg/clients/hpa";
import { Roodhof } from "@components/svg/clients/roodhof";

import { SL } from "@components/svg/clients/sl";
import { Imagination } from "@components/svg/clients/imagination";
import { PRG } from "@components/svg/clients/prg";
import { Eventus } from "@components/svg/clients/eventus";
import { Biiz } from "@components/svg/clients/biiz";

const Clients: React.FC = () => {
  const topLogos = [<AVEQ />, <DEP />, <Luxonos />, <HPA />, <Roodhof />];

  const bottomLogos = [<SL />, <Imagination />, <PRG />, <Eventus />, <Biiz />];

  return (
    <div className="relative py-16 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-100 to-transparent opacity-75 fixed" />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-brand tracking-wide uppercase">
            Local and International Partners
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Some of Our Clients
          </p>
        </div>
        <div className="space-y-16">
          <ParallaxLogos logos={topLogos} baseVelocity={1} />
          <ParallaxLogos logos={bottomLogos} baseVelocity={-1} />
        </div>
      </div>
    </div>
  );
};

export default Clients;

// path: src/containers/Landing/Clients.tsx
