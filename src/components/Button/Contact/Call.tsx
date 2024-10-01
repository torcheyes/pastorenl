import React from "react";
import Image from "next/image";

interface CallButtonProps {
  className?: string;
}

export const CallButton: React.FC<CallButtonProps> = ({ className = "" }) => {
  const phoneNumber = "+31 6 87887743";
  const formattedPhoneNumber = phoneNumber.replace(/\s/g, "");

  return (
    <a
      href={`tel:${formattedPhoneNumber}`}
      className={`flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-200 transition-colors ${className}`}
      data-rel="external"
    >
      <Image
        src="/svg/social/phone.svg"
        alt="Phone"
        width={16}
        height={16}
        className="mr-2"
      />
      <span>Call</span>
    </a>
  );
};

// path: src/components/Button/Contact/Call.tsx
