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
      href="/sell"
      {...props}
      className={`inline-flex items-center justify-center text-[16px] font-[600] h-[44px] px-[20px] rounded-[14px] transition-colors duration-300 w-max-[237px] max-lg:max-w-[237px] cursor-pointer ${
        isDark
          ? "bg-brand text-white hover:bg-orange-600"
          : "bg-[#FFF] text-black hover:bg-gray-100"
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
        width={22}
        height={22}
        className="ml-2"
      />
    </Link>
  );
};

// path: src/components/Button/GetAQuoteTodayButton.tsx
