import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  phoneNumber: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "",
  ...props
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white text-sm px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center"
      {...props}
    >
      <FaWhatsapp className="mr-2" />
      Chat on WhatsApp
    </a>
  );
};
