import React from "react";
import Image from "next/image";
import { Whatsapp } from "@components/svg/Social/whatsapp";

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
      className={`flex items-center justify-center bg-[#3DED5E] rounded-xl px-4 py-2 hover:bg-green-600 transition-colors ${className}`}
    >
      <span>WhatsApp</span>
      <Whatsapp className="ml-2 text-gray-700" size={16} />
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
