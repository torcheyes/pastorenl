import React from "react";

const AboutJourney: React.FC = () => {
  return (
    <div className="w-full pt-8 pb-8">
      <div className="max-w-[1200px] h-[354px] mx-auto px-8 text-center bg-gradient-to-b from-orange-50 to-orange-200 rounded-3xl flex flex-col justify-center">
        <h2 className="text-orange-500 font-semibold mb-6">Our Journey</h2>
        <h3 className="text-4xl font-bold mb-8">
          Two Decades of Expertise in Audio Solutions
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Founded in 2000 and based in The Hague, The Netherlands, we&apos;ve
          been recirculating professional audio equipment for over two decades.
          Our passion for quality and sustainability drives us to deliver the
          best second-hand audio solutions to businesses worldwide.
        </p>
      </div>
    </div>
  );
};

export default AboutJourney;

// path: src/containers/AboutMe/AboutJourney.tsx
