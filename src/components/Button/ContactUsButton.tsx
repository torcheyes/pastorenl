import React from "react";
import { FaWhatsapp } from "react-icons/fa";

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
      className="flex items-center justify-center bg-secondary text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
    >
      <span className="font-medium mr-2">Contact Us</span>
      <FaWhatsapp className="text-green-500 h-5 w-5" />
    </button>
  );
};

// path: src/components/Button/ContactUsButton.tsx
