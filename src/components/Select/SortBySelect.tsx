import React from "react";
import { IconType } from "react-icons";

interface SortOption {
  value: string;
  label: string;
  icon: IconType;
}

interface SortBySelectProps {
  label: string;
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export const SortBySelect: React.FC<SortBySelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative inline-block">
      <div className="flex items-center border rounded-md px-4 py-2 bg-white shadow-sm">
        <span className="mr-2 text-gray-700">{label}</span>
        <div className="flex items-center space-x-1">
          {selectedOption?.icon && (
            <selectedOption.icon className="text-orange-500" />
          )}
          <span className="text-orange-500 font-semibold">
            {selectedOption?.label}
          </span>
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// path: src/components/Select/SortBySelect.tsx
