import React from "react";
import Image from "next/image";
import Link from "next/link";

interface EmailButtonProps {
  className?: string;
}

export const EmailButton: React.FC<EmailButtonProps> = ({ className = "" }) => {
  return (
    <Link
      href="mailto:info@pastore.nl"
      className={`flex items-center justify-center bg-gray-100 text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-200 transition-colors ${className}`}
    >
      <Image
        src="/svg/social/mail.svg"
        alt="Email"
        width={16}
        height={16}
        className="mr-2"
      />
      <span>Email</span>
    </Link>
  );
};

// path: src/components/Button/Contact/Email.tsx
