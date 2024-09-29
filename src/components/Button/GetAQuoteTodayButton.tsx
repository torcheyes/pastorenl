import React from "react";
import Link from "next/link";
import Image from "next/image";

interface GetAQuoteTodayButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "light" | "dark";
}

export const GetAQuoteTodayButton: React.FC<GetAQuoteTodayButtonProps> = ({
  variant = "light",
  className = "",
  ...props
}) => {
  const isDark = variant === "dark";

  return (
    <Link
      href="/store"
      {...props}
      className={`inline-flex items-center justify-center text-base font-semibold px-6 py-3 rounded-full transition-colors duration-300 w-64 ${
        isDark
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-black hover:bg-gray-100"
      } ${className}`}
    >
      Get a Quote Today
      <Image
        src={
          isDark
            ? "/svg/arrow-right-circle-outline-light.svg"
            : "/svg/arrow-right-circle-outline.svg"
        }
        alt=""
        width={20}
        height={20}
        className="ml-2"
      />
    </Link>
  );
};

// path: src/components/Button/GetAQuoteTodayButton.tsx
