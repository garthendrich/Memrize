import { Button, GameHeader } from "@/components";
import { useTimer } from "@/hooks";
import { ItemList } from "@/shared";

export interface MemorizationScreenProps {
  list: ItemList;
  onPhaseEnd: () => void;
}

export function MemorizationScreen({
  list,
  onPhaseEnd: endPhase,
}: MemorizationScreenProps) {
  const { timer } = useTimer({
    seconds: 300,
    onFinish: endPhase,
    willAutoStart: true,
  });
  console.log(list);

  return (
    <GameHeader
      timer={timer}
      gamePhase="memorization phase"
      nextPhaseButton={<Button>Start recall</Button>}
    />
  );
}
