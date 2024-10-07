import React from "react";
import Image from "next/image";

const AboutJourney: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="max-w-[1200px] mx-auto overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row gap-4 max-xl:mx-4">
          <div className="lg:w-[calc(100%-450px)] p-8 lg:p-12 rounded-3xl bg-gradient-to-b from-[#FFFFFF1A] to-[#FF55001A]">
            <h2 className="text-brand font-semibold mb-2">Our Journey</h2>
            <h3 className="text-[32px] font-bold mb-8 leading-9">
              Two Decades of Expertise in Audio Solutions
            </h3>
            <p className="text-[#464646] text-[20px]">
              Our journey began in the heart of The Hague, supplying second-hand PA equipment to local DJs and small venues. What started as a local mission soon grew, and today, we help businesses worldwide meet their audio needs.
            </p>
          </div>
          <div className="w-full lg:w-[450px] lg:min-h-[354px] max-lg:h-[200px] relative">
            <Image
              src="/img/our-journey.png"
              alt="Our Journey in Audio Solutions"
              fill
              sizes="(max-width: 1023px) 100vw, 450px"
              style={{ objectFit: "cover" }}
              className="rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutJourney;

// path: src/containers/AboutMe/AboutJourney.tsx
