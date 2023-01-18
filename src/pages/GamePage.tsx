import { useState } from "react";

import { FocusScreen } from "@/screens";
import { GameMode, GamePhase, gamePhases } from "@/shared";

export interface GamePageProps {
  gameMode: GameMode;
}

export function GamePage({ gameMode }: GamePageProps) {
  const [gamePhase, setGamePhase] = useState<GamePhase>(gamePhases[0]);

  switch (gamePhase) {
    case "focus phase":
      return (
        <FocusScreen
          gameMode={gameMode}
          seconds={5}
          onPhaseEnd={() => setGamePhase("memorization phase")}
        />
      );
    case "memorization phase":
    case "recall phase":
    case "end phase":
    default:
  }

  return <div />;
}
