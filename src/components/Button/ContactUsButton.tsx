import React from "react";

export const ContactUsButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <button
      {...props}
      className="bg-[#464646] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
    >
      Contact Us
    </button>
  );
};

// path: src/components/Button/ContactUsButton.tsx
