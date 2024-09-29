import React from 'react';

interface SortOption {
  value: string;
  label: string;
}

interface SortBySelectProps {
  label: string;
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export const SortBySelect: React.FC<SortBySelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1"
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