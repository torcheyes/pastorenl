import React from "react";

export const GradientBackground: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="orangeGradient"
          x1="0"
          y1="1"
          x2="1"
          y2="0"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" stopColor="#FF5500" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect width="500" height="300" rx="12" fill="url(#orangeGradient)" />
      <g opacity="0.15" stroke="black">
        <path d="M46 393L649.5 2" />
        <path d="M-149 298L454.5 -93" />
        <path d="M733.5 150L-27 -50" />
        <path d="M601.5 286L-159 86" />
      </g>
    </svg>
  );
};

// path: src/components/svg/GradientBackground.tsx
