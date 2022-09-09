import { Image } from "@/components/Image";

export interface GameModeItemProps {
  label: string;
  imageSrc: string;
}

export function GameModeItem({ label, imageSrc }: GameModeItemProps) {
  return (
    <div className="min-h-52 flex cursor-pointer flex-col items-center gap-4 rounded-2xl bg-white p-4 transition-transform hover:scale-105">
      <div className="overflow-hidden rounded-lg">
        <Image src={imageSrc} alt={`${label} display`} />
      </div>
      <p className="text-xl font-semibold">{label}</p>
    </div>
  );
}
