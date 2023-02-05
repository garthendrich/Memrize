import { MainPanel } from "@/components/MainPanel";
import { useTimer } from "@/hooks";

export interface ItemFlasherProps {
  items: string[];
  onEnd: () => void;
}

const flashDuration = 2;

export function ItemFlasher({ items, onEnd: end }: ItemFlasherProps) {
  const timerDuration = items.length * flashDuration;

  const { timer } = useTimer({
    seconds: timerDuration,
    onFinish: end,
  });

  const itemIndex = Math.floor((timerDuration - timer) / flashDuration);

  return (
    <MainPanel>
      <div className="flex h-screen items-center justify-center">
        <p className="text-6xl">{items[itemIndex]}</p>
      </div>
    </MainPanel>
  );
}
