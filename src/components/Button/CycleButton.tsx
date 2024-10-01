import React from "react";
import Image from "next/image";

interface CycleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
  className?: string;
}

export const CycleButton: React.FC<CycleButtonProps> = ({
  direction,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 ${className}`}
    >
      <Image
        src="/svg/undo.svg"
        alt={`Cycle ${direction}`}
        width={20}
        height={20}
        className={direction === "right" ? "transform scale-x-[-1]" : ""}
      />
    </button>
  );
};

// path: src/components/Button/CycleButton.tsx
