import { MainPanel } from "@/components/MainPanel";
import { useTimer } from "@/hooks";

export interface ItemFlasherProps {
  items: string[];
}

const flashDuration = 2;

export function ItemFlasher({ items }: ItemFlasherProps) {
  const timerDuration = items.length * flashDuration;

  const { timer } = useTimer({
    seconds: timerDuration,
  });

  const itemIndex = Math.floor((timerDuration - timer) / 2);

  return (
    <MainPanel>
      <div className="flex h-screen items-center justify-center">
        <p className="text-6xl">{items[itemIndex]}</p>
      </div>
    </MainPanel>
  );
}
