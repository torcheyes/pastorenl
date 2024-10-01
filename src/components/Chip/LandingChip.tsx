import Image from "next/image";

export const LandingChip: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center bg-white border border-brand rounded-full px-3 py-1 text-sm text-brand">
    <span className="mr-2">
      <Image
        src={`/svg/icons/${icon}.svg`}
        alt="Chip Icon"
        width={20}
        height={20}
      />
    </span>
    {text}
  </div>
);

// path: src/components/Chip/LandingChip.tsx
