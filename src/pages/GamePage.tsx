import { useState } from "react";

import {
  FocusScreen,
  MemorizationScreen,
  RecallScreen,
  ResultScreen,
} from "@/screens";
import { GameMode, GamePhase, gamePhases } from "@/shared";

// temp
const items: string[] = [
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

  const [answers, setAnswers] = useState<string[]>(
    Array(items.length).fill("")
  );

  const restartGame = () => {
    setGamePhase("memorization countdown");
    setAnswers(Array(items.length).fill(""));
  };

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
          gameMode={gameMode}
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
      return (
        <RecallScreen
          answers={answers}
          setAnswers={setAnswers}
          onPhaseEnd={() => setGamePhase("result screen")}
        />
      );
    case "result screen":
      return (
        <ResultScreen
          gameMode={gameMode}
          items={items}
          answers={answers}
          restartGame={restartGame}
        />
      );
    default:
      return null;
  }
}
