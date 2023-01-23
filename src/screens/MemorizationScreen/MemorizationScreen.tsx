import { Button, GameHeader } from "@/components";
import { useTimer } from "@/hooks";
import { Item } from "@/shared";

export interface MemorizationScreenProps {
  items: Item[];
  onPhaseEnd: () => void;
}

export function MemorizationScreen({
  items,
  onPhaseEnd: endPhase,
}: MemorizationScreenProps) {
  const { timer } = useTimer({
    seconds: 300,
    onFinish: endPhase,
    willAutoStart: true,
  });
  console.log(items);

  return (
    <GameHeader
      timer={timer}
      gamePhase="memorization phase"
      nextPhaseButton={<Button>Start recall</Button>}
    />
  );
}
