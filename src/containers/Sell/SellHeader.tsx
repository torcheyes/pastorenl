import React from "react";

const SellHeader: React.FC = () => {
  return (
    <div className="w-full py-8">
      <div className="max-w-[1200px] h-[197px] mx-auto bg-white rounded-3xl shadow-md p-8">
        <h3 className="text-brand font-semibold mb-2">
          Service for Large Companies
        </h3>
        <h2 className="text-3xl font-bold mb-4">
          Sell Your Professional Audio Equipment with Ease
        </h2>
        <p className="text-gray-600">
          We buy audio equipment from a wide range of industries, from
          nightclubs to IT and event companies. Get a fast quote, hassle-free
          pickups, and instant payments.
        </p>
      </div>
    </div>
  );
};

export default SellHeader;

// path: src/containers/SellHeader.tsx
