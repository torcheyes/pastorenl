import React from "react";

const SellHeader: React.FC = () => {
  return (
    <div className="w-full mt-8">
      <div className="max-w-[1200px]  mx-auto bg-white rounded-3xl border border-[#0000000D] p-8">
        <h3 className="text-brand font-semibold mb-2">
          Service for Large Companies
        </h3>
        <h2 className="text-3xl font-bold mb-4">
          Sell Your Professional Audio Equipment with Ease
        </h2>
        <p className="text-[#9B9B9B] text-[20px]">
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
