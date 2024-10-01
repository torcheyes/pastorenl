"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import Image from "next/image";

interface ParallaxLogosProps {
  logos: { src: string; alt: string }[];
  baseVelocity: number;
}

const ParallaxLogos: React.FC<ParallaxLogosProps> = ({
  logos,
  baseVelocity,
}) => {
  const baseX = useMotionValue(0);
  const directionFactor = useRef<number>(1);

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="flex" style={{ x }}>
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-8">
            <Image
              src={logo.src}
              alt={logo.alt}
              className="w-auto h-8 object-contain"
              width={60}
              height={60}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Clients: React.FC = () => {
  const topLogos = [
    { src: "/svg/brands/testimonials/aveq.svg", alt: "AVEQ" },
    { src: "/svg/brands/testimonials/dep.svg", alt: "DEP" },
    { src: "/svg/brands/testimonials/luxonos.svg", alt: "Luxonos" },
    { src: "/svg/brands/testimonials/hpa.svg", alt: "HPA" },
    { src: "/svg/brands/testimonials/roodhof.svg", alt: "Roodhof" },
  ];

  const bottomLogos = [
    { src: "/svg/brands/testimonials/sl.svg", alt: "SL" },
    { src: "/svg/brands/testimonials/imagination.svg", alt: "Imagination" },
    { src: "/svg/brands/testimonials/prg.svg", alt: "PRG" },
    { src: "/svg/brands/testimonials/eventus.svg", alt: "Eventus" },
    { src: "/svg/brands/testimonials/biiz.svg", alt: "Biiz" },
  ];

  return (
    <div className="relative py-16 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-100 to-transparent opacity-75" />
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
          <ParallaxLogos logos={topLogos} baseVelocity={-10} />
          <ParallaxLogos logos={bottomLogos} baseVelocity={10} />
        </div>
      </div>
    </div>
  );
};

export default Clients;

// path: src/containers/Landing/Clients.tsx
