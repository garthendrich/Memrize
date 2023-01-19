import { useState } from "react";

import { FocusScreen, MemorizationScreen } from "@/screens";
import { GameMode, GamePhase, gamePhases, ItemList } from "@/shared";

// temp
const list: ItemList = [
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
    case "focus phase":
      return (
        <FocusScreen
          gameMode={gameMode}
          seconds={5}
          onPhaseEnd={() => setGamePhase("memorization phase")}
        />
      );
    case "memorization phase":
      return (
        <MemorizationScreen
          list={list}
          onPhaseEnd={() => setGamePhase("recall phase")}
        />
      );
    case "recall phase":
    case "end phase":
    default:
  }

  return <div />;
}
