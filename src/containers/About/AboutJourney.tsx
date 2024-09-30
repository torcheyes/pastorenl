import React from "react";
import Image from "next/image";

const AboutJourney: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-8">
      <div className="max-w-[1200px] mx-auto bg-gradient-to-b from-orange-50 to-orange-200 rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[calc(100%-450px)] p-8 lg:p-12">
            <h2 className="text-orange-500 font-semibold mb-6">Our Journey</h2>
            <h3 className="text-4xl font-bold mb-8">
              Two Decades of Expertise in Audio Solutions
            </h3>
            <p className="text-gray-600">
              Founded in 2000 and based in The Hague, The Netherlands,
              we&apos;ve been recirculating professional audio equipment for
              over two decades. Our passion for quality and sustainability
              drives us to deliver the best second-hand audio solutions to
              businesses worldwide.
            </p>
          </div>
          <div className="w-full lg:w-[450px] h-[354px] relative">
            <Image
              src="/img/our-journey.png"
              alt="Our Journey in Audio Solutions"
              fill
              sizes="(max-width: 1023px) 100vw, 450px"
              style={{ objectFit: "cover" }}
              className="rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutJourney;

// path: src/containers/AboutMe/AboutJourney.tsx
