import React from "react";
import Image from "next/image";

const AboutUs: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="max-w-[1200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-white rounded-[20px] max-xl:mx-4">
          {/* Local Roots Section */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/svg/icons/plug.svg"
                  alt="Plug Icon"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                <h2 className="text-[32px] font-[600] text-[#1F1F1F] leading-[38px]">
                  From Local Roots to Global Reach
                </h2>
              </div>
              <p className="text-gray-700 text-[20px]">
                In the early 2000s, the local DJ scene in The Hague was booming,
                and we saw an opportunity. We began sourcing and supplying
                second-hand audio equipment to help local DJs get the best sound
                without breaking the bank. From those humble beginnings, our
                expertise grew, and so did our network. Today, what started as a
                small operation now serves businesses in over 20 countries, but
                we&#39;ve never forgotten our roots.
              </p>
            </div>
          </div>

          {/* Local Roots Image */}
          <div className="relative h-[281px] w-full">
            <Image
              src="/img/local-roots.png"
              alt="Local DJ Equipment"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          {/* Expanding Image */}
          <div className="relative h-[281px] max-lg:hidden">
            <Image
              src="/img/expanding.png"
              alt="Global Audio Equipment"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>

          {/* Expanding Section */}
          <div className="flex flex-col justify-between rounded-lg p-4">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/svg/icons/arrows-diag.svg"
                  alt="Expanding Icon"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <h2 className="text-[32px] font-[600] text-[#1F1F1F] leading-[38px]">
                  Expanding to Serve the World
                </h2>
              </div>
              <p className="text-gray-700 text-[20px]">
                As we grew, so did our reputation for providing high-quality,
                second-hand audio equipment. Soon, international clients began
                reaching out, and we expanded to serve festivals, event spaces,
                and businesses worldwide. With over 10,000 products sold and
                500+ businesses served, we&#39;re proud to bring our expertise
                to a global audience.
              </p>
            </div>
          </div>

          <div className="relative h-[281px] lg:hidden">
            <Image
              src="/img/expanding.png"
              alt="Global Audio Equipment"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

// path: src/containers/About/AboutUs.tsx
