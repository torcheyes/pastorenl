import React from 'react';
import Image from 'next/image';

interface AboutCardProps {
  icon: string;
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg flex-1">
      <div className="w-12 h-12 mb-6">
        <Image src={icon} alt={title} width={48} height={48} />
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default AboutCard;

// path: src/components/Card/AboutCard.tsx
