import React from "react";
import AboutCard from "@components/Card/AboutCard";

const AboutInfo: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <AboutCard
            icon="/svg/icons/earth.svg"
            title="Our Global Impact"
            description="With 20+ countries served, 500+ businesses trusted, and over 10,000 products recirculated, we're leading the way in second-hand audio solutions."
          />
          <AboutCard
            icon="/svg/icons/eye-dashed.svg"
            title="Our Vision"
            description="Recirculating audio is our mission. We believe in the power of extending the life of professional audio equipment—both for the environment and your bottom line. By choosing pre-owned gear, you save money while contributing to a more sustainable future."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;

// path: src/containers/About/AboutInfo
