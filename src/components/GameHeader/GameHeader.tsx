import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { GamePhase } from "@/shared";
import { capitalize, displayTimer } from "@/utils";

export interface GameHeaderProps {
  timer: number;
  gamePhase: GamePhase;
  nextPhaseButton: JSX.Element;
}

export function GameHeader({
  timer,
  gamePhase,
  nextPhaseButton,
}: GameHeaderProps) {
  return (
    <Header isFixed className="bg-stroke shadow-lg">
      <Header.Segment>
        <Button variant="outlined">
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </Button>
        <p className="ml-4 text-lg font-semibold">{capitalize(gamePhase)}</p>
      </Header.Segment>
      <Header.Segment className="justify-end gap-4">
        <p className="text-xl font-semibold">{displayTimer(timer)}</p>
        {nextPhaseButton}
      </Header.Segment>
      <div className="absolute bottom-0 left-0">
        <div className="absolute top-0 left-0 h-24 w-screen bg-gradient-to-b from-primary-900 to-transparent" />
      </div>
    </Header>
  );
}
