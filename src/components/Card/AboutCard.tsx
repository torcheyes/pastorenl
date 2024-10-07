import React from "react";
import Image from "next/image";

interface AboutCardProps {
  icon: string;
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-3xl p-8 flex-1">
      <div className="w-14 h-14 mb-12">
        <Image src={icon} alt={title} width={60} height={60} />
      </div>
      <h3 className="text-[32px] font-bold mb-4">{title}</h3>
      <p className="text-gray-600 text-[20px]">{description}</p>
    </div>
  );
};

export default AboutCard;

// path: src/components/Card/AboutCard.tsx
