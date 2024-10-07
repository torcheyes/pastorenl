import { Whatsapp } from "@components/svg/Social/whatsapp";
import React from "react";

interface ContactUsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  phoneNumber: string;
}

export const ContactUsButton: React.FC<ContactUsButtonProps> = ({
  phoneNumber,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, "")}`, "_blank");
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className="flex text-[14px] leading-5 items-center justify-center bg-[#464646] text-[#FFFFFF] px-4 py-2 rounded-[12px] hover:bg-gray-800 transition-all duration-300  hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
    >
      <div className=" mr-2.5">Contact us</div>
      <Whatsapp className="text-[#3DED5E]" />
    </button>
  );
};

// path: src/components/Button/ContactUsButton.tsx
