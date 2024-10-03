"use client";

import React, { useState, useEffect } from "react";
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
  const [_, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % brandList.length);
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-[60px] bg-[#f8f8f8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-brand font-semibold mb-2">
            International Reach and Brands
          </p>
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Industry Leaders Worldwide
          </h2>
          <p className="text-gray-400 font-bold">
            We&apos;ve partnered with renowned brands and clients to deliver
            exceptional second-hand audio solutions globally.
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
