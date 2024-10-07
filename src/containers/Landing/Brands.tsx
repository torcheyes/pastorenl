"use client";

import React from "react";
import { ParallaxLogos } from "@components/ParallaxLogos";

import { Beyma } from "@components/svg/brands/beyma";
import { LabGruppen } from "@components/svg/brands/labgruppen";
import { JBL } from "@components/svg/brands/jbl";
import { Dynacord } from "@components/svg/brands/dynacord";
import { MeyerSound } from "@components/svg/brands/meyersound";
import { RCF } from "@components/svg/brands/rcf";
import { MartinAudio } from "@components/svg/brands/martinaudio";
import { ElectroVoice } from "@components/svg/brands/electrovoice";

const brandList = [
  <Beyma key="beyma" />,
  <LabGruppen key="labgruppen" />,
  <JBL key="jbl" />,
  <Dynacord key="dynacord" />,
  <MeyerSound key="meyersound" />,
  <RCF key="rcf" />,
  <MartinAudio key="martinaudio" />,
  <ElectroVoice key="electrovoice" />,
];

const Brands: React.FC = () => {
  return (
    <section className="pt-[60px] bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-brand text-[16px] font-semibold mb-2">
            International Reach and Brands
          </p>
          <h2 className="text-3xl text-[#1F1F1F] font-bold mb-4">
            Trusted by Industry Leaders Worldwide
          </h2>
          <p className="text-gray-400 text-[20px]">
            We buy, sell, and specialize in products from leading professional audio brands, ensuring top-quality second-hand solutions.
          </p>
        </div>

        <div className="relative overflow-hidden h-20">
          <ParallaxLogos logos={brandList} baseVelocity={0.5} />
        </div>
      </div>
    </section>
  );
};

export default Brands;

// path: src/containers/Landing/Brands.tsx
