import React from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  className?: string;
  phoneNumber: string;
  message?: string;
}

const whatsappUrl = (phoneNumber: string, message?: string) =>
  `https://wa.me/${phoneNumber.replace(/\s/g, "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  className = "",
  phoneNumber,
  message,
}) => {
  return (
    <a
      href={whatsappUrl(phoneNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-colors ${className}`}
    >
      <FaWhatsapp className="mr-2" size={16} />
      <span>WhatsApp</span>
    </a>
  );
};

export const ChatOnWhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  className = "",
  phoneNumber,
  message,
}) => {
  return (
    <a
      href={whatsappUrl(phoneNumber, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`cursor-pointer bg-gray-200 text-gray-700 text-lg px-2 py-1 rounded-xl hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center ${className}`}
    >
      <span className="mr-2">Chat on WhatsApp</span>
      <Image
        src="/img/icon/whatsapp.png"
        alt="WhatsApp"
        width={24}
        height={24}
      />
    </a>
  );
};

// path: src/components/Button/WhatsAppButton.tsx
