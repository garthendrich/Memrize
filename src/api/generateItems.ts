import randomWords from "random-words";

import { GameMode } from "@/shared";

const randomNumberStrings = () => {
  const numbers = Array.from({ length: 100 }, () =>
    Math.floor(Math.random() * 100)
  );

  return numbers.map((number) => number.toString().padStart(2, "0"));
};

export const generateItems = (gameMode: GameMode) => {
  switch (gameMode) {
    case "classic words":
    case "flash words":
      return randomWords({ exactly: 100 });
    case "classic numbers":
    case "flash numbers":
      return randomNumberStrings();
    default:
      return [];
  }
};
