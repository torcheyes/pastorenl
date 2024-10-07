import Image from "next/image";

export const LandingChip: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center border border-brand rounded-[14px] px-3 py-2.5 text-[16px] text-brand font-semibold w-fit max-md:w-full">
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
