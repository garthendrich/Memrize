import { useState } from "react";

import { FocusScreen, MemorizationScreen } from "@/screens";
import { GameMode, GamePhase, gamePhases, Item } from "@/shared";

// temp
const items: Item[] = [
  "benzenoid",
  "prolusory",
  "craft",
  "glass",
  "indoor",
  "parade",
  "dog",
  "teacher",
  "tip",
  "inappropriate",
  "idea",
  "economist",
  "resort",
  "gun",
  "spill",
  "ear",
  "introduction",
  "museum",
  "combine",
  "disgrace",
];

export interface GamePageProps {
  gameMode: GameMode;
}

export function GamePage({ gameMode }: GamePageProps) {
  const [gamePhase, setGamePhase] = useState<GamePhase>(gamePhases[0]);

  switch (gamePhase) {
    case "memorization countdown":
      return (
        <FocusScreen
          gameMode={gameMode}
          text="Memorization phase will start in"
          seconds={5}
          onPhaseEnd={() => setGamePhase("memorization phase")}
        />
      );
    case "memorization phase":
      return (
        <MemorizationScreen
          items={items}
          onPhaseEnd={() => setGamePhase("recall countdown")}
        />
      );
    case "recall countdown":
      return (
        <FocusScreen
          gameMode={gameMode}
          text="Recall phase will start in"
          seconds={5}
          onPhaseEnd={() => setGamePhase("recall phase")}
        />
      );
    case "recall phase":
    case "result screen":
    default:
  }

  return <div />;
}
