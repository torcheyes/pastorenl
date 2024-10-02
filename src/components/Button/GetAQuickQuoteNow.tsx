import React from "react";
import Image from "next/image";

export const GetAQuickQuoteNow: React.FC = () => {
  return (
    <a
      href="#"
      className="inline-flex items-center px-4 py-2 bg-white text-brand rounded-full font-semibold hover:bg-gray-50 transition duration-300"
    >
      <Image
        src="/img/icon/whatsapp.png"
        alt="WhatsApp"
        width={24}
        height={24}
        className="mr-2 text-green"
      />
      Get a Quick Quote Now &gt;
    </a>
  );
};

// path: src/components/Button/GetAQuickQuoteNow.tsx
