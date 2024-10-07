import React from "react";
import Link from "next/link";
import { Email } from "@components/svg/Social/Email";

interface EmailButtonProps {
  className?: string;
}

export const EmailButton: React.FC<EmailButtonProps> = ({ className = "" }) => {
  return (
    <Link
      href="mailto:info@pastore.nl"
      className={`flex items-center justify-center bg-[#0000000D] text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-200 transition-colors ${className}`}
    >
      <span className="max-lg:hidden" >Email</span>
      <Email className="ml-2"/>

    </Link>
  );
};

// path: src/components/Button/Contact/Email.tsx
